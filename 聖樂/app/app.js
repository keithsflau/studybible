(function () {
  const STORAGE_KEY = "sacred-music-v1";
  const root = document.getElementById("smc-app");
  if (!root) return;

  const catalog = () => window.SACRED_MUSIC_CATALOG || { chapters: [], hymns: [] };
  const hymns = () => catalog().hymns || [];
  const chaptersById = () => {
    const map = {};
    (catalog().chapters || []).forEach((c) => {
      map[c.id] = c;
    });
    return map;
  };

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const saveState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  const markRead = (kind, id) => {
    const st = loadState();
    const key = kind === "hymn" ? "hymns" : "chapters";
    st[key] = st[key] || [];
    if (!st[key].includes(id)) st[key].push(id);
    saveState(st);
  };

  const isRead = (kind, id) => {
    const st = loadState();
    const key = kind === "hymn" ? "hymns" : "chapters";
    return (st[key] || []).includes(id);
  };

  function parseHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "").trim();
    if (!raw) return { view: "hub" };
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "chapter" && parts[1]) return { view: "chapter", id: parts[1] };
    if (parts[0] === "hymn" && parts[1]) return { view: "hymn", id: parts[1] };
    if (parts[0] === "search") return { view: "search", q: decodeURIComponent(parts.slice(1).join("/") || "") };
    return { view: "hub" };
  }

  const lessonCache = {};
  const hymnPackCache = {};
  const loading = {};

  function loadScript(src, cacheKey, bucket) {
    if (bucket[cacheKey]) return Promise.resolve(bucket[cacheKey]);
    if (loading[cacheKey]) return loading[cacheKey];
    loading[cacheKey] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = function () {
        bucket[cacheKey] = true;
        resolve(true);
      };
      s.onerror = function () {
        reject(new Error("無法載入：" + src));
      };
      document.body.appendChild(s);
    });
    return loading[cacheKey];
  }

  function loadLesson(id) {
    return loadScript("data/" + id + ".js", "lesson:" + id, lessonCache).then(function () {
      return (window.SACRED_MUSIC_LESSONS || {})[id] || {};
    });
  }

  function lyricsFileFor(pack) {
    return pack === "hymns-b" ? "lyrics-b.js" : "lyrics-a.js";
  }

  function loadHymnPack(pack) {
    return loadScript("data/" + pack + ".js", "pack:" + pack, hymnPackCache)
      .then(function () {
        return loadScript("data/" + lyricsFileFor(pack), "lyrics:" + pack, hymnPackCache);
      })
      .then(function () {
        return window.SACRED_MUSIC_HYMN_TEXTS || {};
      });
  }

  function hymnLyrics(id, text) {
    const fromPack = (window.SACRED_MUSIC_HYMN_LYRICS || {})[id];
    if (fromPack) return fromPack;
    return (text && text.lyrics) || null;
  }

  function hymnMeta(id) {
    return hymns().find((h) => h.id === id);
  }

  function hasPlayable(h) {
    return !!(h && h.audio && h.audio.src && !h.audio.restricted);
  }

  function stopHymnAudio() {
    document.querySelectorAll("#smc-player audio, .smc-player audio").forEach(function (el) {
      try {
        el.pause();
      } catch (_) {}
    });
  }

  function searchAll(q) {
    const needle = q.trim().toLowerCase();
    if (!needle) return { hymns: [], chapters: [] };
    const chs = (catalog().chapters || []).filter((c) => {
      const blob = [c.title, c.titleEn, c.blurb, c.era].join(" ").toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
    const hs = hymns().filter((h) => {
      const a = h.audio || {};
      const blob = [
        h.titleZh,
        h.titleEn,
        h.lyricist,
        h.composer,
        h.year,
        h.theme,
        h.blurb,
        (h.occasions || []).join(" "),
        a.performer,
        a.title,
        a.license,
        hasPlayable(h) ? "可播放" : "",
        h.copyright ? "版權摘句" : "全文 全部歌詞"
      ]
        .join(" ")
        .toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
    return { hymns: hs, chapters: chs };
  }

  function footer() {
    return (
      '<footer class="site-footer">' +
      '<p class="verse">Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God. Colossians 3:16</p>' +
      "<p>「當用各樣的智慧，把基督的道理豐豐富富地存在心裡，用詩章、頌詞、靈歌，彼此教導，互相勸戒，心被恩感，歌頌神。」歌羅西書 3:16</p>" +
      '<p style="margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;font-size:0.78rem">公開領域聖詩提供完整原文與本課教學中譯。仍受版權保護的作品只附極短教學句與 CCLI 提示，不錄可投影全文。可播放錄音均連線 Wikimedia Commons 的公開領域或創用 CC 檔。圖片多取自 Wikimedia Commons，僅作教學連線。</p>' +
      "</footer>"
    );
  }

  function scoreHtml(hymn, extraClass) {
    return (
      '<div class="smc-score ' +
      (extraClass || "") +
      '" style="--card-tone:' +
      esc(hymn.tone || "#1d2a4a") +
      '"><div class="smc-score-inner"><strong>' +
      esc(hymn.titleZh) +
      "</strong><span>" +
      esc(hymn.titleEn) +
      "</span></div></div>"
    );
  }

  function fmtTime(t) {
    if (!isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
  }

  function audioPlayerHtml(meta) {
    const a = (meta && meta.audio) || null;
    if (a && a.restricted) {
      return (
        '<section class="smc-player is-empty is-restricted" aria-labelledby="smc-player-title">' +
        '<h3 id="smc-player-title">樂曲錄音</h3>' +
        "<p>" +
        esc(a.note || "此曲錄音仍受版權保護。請於 CCLI／合法來源播放，本課不提供未授權全曲。") +
        "</p></section>"
      );
    }
    if (!a || !a.src) {
      return (
        '<section class="smc-player is-empty" aria-labelledby="smc-player-title">' +
        '<h3 id="smc-player-title">樂曲錄音</h3>' +
        "<p>暫無合法錄音。本教室只連線公開領域或創用 CC 可重用的檔案，不轉載受版權保護的商業專輯。</p></section>"
      );
    }
    const label = "《" + (meta.titleZh || a.title || "聖詩") + "》";
    return (
      '<section class="smc-player" id="smc-player" aria-labelledby="smc-player-title">' +
      '<div class="smc-player-head">' +
      '<h3 id="smc-player-title">樂曲錄音</h3>' +
      (a.kindLabel ? '<span class="smc-pill is-play">' + esc(a.kindLabel) + "</span>" : "") +
      "</div>" +
      '<p class="smc-player-track"><strong>' +
      esc(a.title || meta.titleEn) +
      "</strong></p>" +
      '<audio preload="metadata">' +
      (a.src ? '<source src="' + esc(a.src) + '" type="audio/mpeg">' : "") +
      (a.srcOgg ? '<source src="' + esc(a.srcOgg) + '" type="audio/ogg">' : "") +
      "</audio>" +
      '<div class="smc-player-controls">' +
      '<button type="button" class="smc-player-play" aria-label="播放' +
      esc(label) +
      '" aria-pressed="false">' +
      '<svg class="icon-play" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14z"/></svg>' +
      '<svg class="icon-pause" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/></svg>' +
      "</button>" +
      '<label class="smc-player-seek-wrap"><span class="sr-only">播放進度</span>' +
      '<input class="smc-player-seek" type="range" min="0" max="1000" value="0" step="1" aria-label="' +
      esc(label) +
      '播放進度"></label>' +
      '<span class="smc-player-time" aria-live="off"><span data-cur>0:00</span><span aria-hidden="true"> / </span><span data-dur>0:00</span></span>' +
      "</div>" +
      '<p class="smc-player-credit">演出／來源：' +
      esc(a.performer || a.source || "—") +
      (a.license
        ? a.licenseUrl
          ? ' · 授權：<a href="' + esc(a.licenseUrl) + '" target="_blank" rel="noopener noreferrer">' + esc(a.license) + "</a>"
          : " · 授權：" + esc(a.license)
        : "") +
      (a.sourcePage
        ? ' · <a href="' + esc(a.sourcePage) + '" target="_blank" rel="noopener noreferrer">Wikimedia Commons 檔案頁</a>'
        : "") +
      "</p>" +
      '<p class="smc-player-error" hidden>錄音暫時無法載入。請檢查網絡後再試，或改從 Commons 檔案頁下載。</p>' +
      "</section>"
    );
  }

  function bindHymnPlayer() {
    const wrap = document.getElementById("smc-player");
    if (!wrap) return;
    const audio = wrap.querySelector("audio");
    const btn = wrap.querySelector(".smc-player-play");
    const seek = wrap.querySelector(".smc-player-seek");
    const curEl = wrap.querySelector("[data-cur]");
    const durEl = wrap.querySelector("[data-dur]");
    const errEl = wrap.querySelector(".smc-player-error");
    if (!audio || !btn || !seek) return;

    let scrubbing = false;
    const playLabel = btn.getAttribute("aria-label") || "播放";
    const pauseLabel = playLabel.replace(/^播放/, "暫停");

    function setPlaying(on) {
      wrap.classList.toggle("is-playing", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? pauseLabel : playLabel);
    }

    function syncSeek() {
      if (scrubbing) return;
      const dur = audio.duration;
      if (!dur || !isFinite(dur)) return;
      seek.value = String(Math.round((audio.currentTime / dur) * 1000));
      if (curEl) curEl.textContent = fmtTime(audio.currentTime);
    }

    btn.addEventListener("click", function () {
      if (audio.paused) {
        const p = audio.play();
        if (p && p.catch) p.catch(function () {});
      } else {
        audio.pause();
      }
    });

    seek.addEventListener("pointerdown", function () {
      scrubbing = true;
    });
    seek.addEventListener("pointerup", function () {
      scrubbing = false;
    });
    seek.addEventListener("input", function () {
      const dur = audio.duration;
      if (!dur || !isFinite(dur)) return;
      const t = (Number(seek.value) / 1000) * dur;
      if (curEl) curEl.textContent = fmtTime(t);
      audio.currentTime = t;
    });

    audio.addEventListener("play", function () {
      setPlaying(true);
    });
    audio.addEventListener("pause", function () {
      setPlaying(false);
    });
    audio.addEventListener("ended", function () {
      setPlaying(false);
      seek.value = "0";
      if (curEl) curEl.textContent = "0:00";
    });
    audio.addEventListener("timeupdate", syncSeek);
    audio.addEventListener("loadedmetadata", function () {
      if (durEl) durEl.textContent = fmtTime(audio.duration);
      syncSeek();
    });
    audio.addEventListener("error", function () {
      if (errEl) errEl.hidden = false;
      wrap.classList.add("is-error");
    });
  }

  function hymnCard(h) {
    return (
      '<a class="smc-hymn" href="#/hymn/' +
      esc(h.id) +
      '">' +
      scoreHtml(h) +
      '<div class="smc-hymn-body">' +
      '<div class="smc-hymn-meta"><span>' +
      esc(h.theme) +
      "</span><span>" +
      esc(h.year) +
      "</span></div>" +
      "<h3>" +
      esc(h.titleZh) +
      "</h3>" +
      '<p class="smc-en">' +
      esc(h.titleEn) +
      "</p>" +
      '<p class="smc-excerpt">' +
      esc(h.blurb) +
      "</p>" +
      '<div class="smc-pills">' +
      (hasPlayable(h) ? '<span class="smc-pill is-play">可播放</span>' : "") +
      (h.copyright
        ? '<span class="smc-pill is-copy">版權摘句</span>'
        : '<span class="smc-pill is-full">全文</span>') +
      (h.occasions || [])
        .slice(0, 3)
        .map(function (o) {
          return '<span class="smc-pill">' + esc(o) + "</span>";
        })
        .join("") +
      (isRead("hymn", h.id) ? '<span class="smc-pill">已讀</span>' : "") +
      "</div></div></a>"
    );
  }

  function renderHub(filter, query) {
    const cat = catalog();
    const chs = cat.chapters || [];
    const featured = hymnMeta(cat.featuredId);
    const q = query || "";
    const occ = filter || "";
    let list = hymns();
    if (occ === "__playable") list = list.filter(hasPlayable);
    else if (occ) list = list.filter((h) => (h.occasions || []).indexOf(occ) !== -1);
    const searched = q ? searchAll(q) : { hymns: list, chapters: [] };
    if (q) list = searched.hymns;

    document.title = "聖樂｜聖經研讀";

    const occasions = cat.occasions || [];
    const chips = [
      '<button type="button" class="smc-chip' + (!occ ? " is-on" : "") + '" data-filter="">全部聖詩</button>',
      '<button type="button" class="smc-chip' +
        (occ === "__playable" ? " is-on" : "") +
        '" data-filter="__playable">可播放</button>'
    ]
      .concat(
        occasions.map(function (o) {
          return (
            '<button type="button" class="smc-chip' +
            (occ === o ? " is-on" : "") +
            '" data-filter="' +
            esc(o) +
            '">' +
            esc(o) +
            "</button>"
          );
        })
      )
      .join("");

    root.innerHTML =
      '<section class="smc-hero" aria-label="聖樂教室">' +
      '<div class="smc-hero-media"><img src="' +
      esc(cat.hero.src) +
      '" alt="' +
      esc(cat.hero.alt) +
      '" width="1280" height="720"></div>' +
      '<div class="smc-hero-shade"></div>' +
      '<div class="smc-hero-inner">' +
      '<div class="site-eyebrow">Sacred Music</div>' +
      "<h1>" +
      esc(cat.title) +
      "<em>" +
      esc(cat.titleEn) +
      "</em></h1>" +
      '<p class="smc-hero-lead">' +
      esc(cat.lead) +
      "</p>" +
      '<blockquote class="smc-hero-verse">「' +
      esc(cat.verse.zh) +
      '」<cite>' +
      esc(cat.verse.ref) +
      "</cite></blockquote>" +
      '<div class="smc-hero-stats">' +
      "<div><strong>10</strong><span>個教學篇章</span></div>" +
      "<div><strong>30</strong><span>首聖詩精選課</span></div>" +
      "<div><strong>1</strong><span>條以聖道為中心的敬拜路</span></div>" +
      "</div></div></section>" +
      '<main><div class="smc-wrap">' +
      (featured
        ? '<a class="smc-featured" href="#/hymn/' +
          esc(featured.id) +
          '">' +
          '<div class="smc-featured-media">' +
          '<span class="smc-featured-badge">本教室入門聖詩</span>' +
          '<img src="' +
          esc(cat.featuredImage) +
          '" alt="《奇異恩典》" onerror="this.style.opacity=.2">' +
          "</div>" +
          '<div class="smc-featured-body">' +
          '<div class="site-eyebrow" style="color:#8a6d28">Featured · John Newton</div>' +
          "<h2>《奇異恩典》</h2>" +
          '<p class="latin">Amazing Grace, How Sweet the Sound</p>' +
          "<p>1779 年，販奴船長悔改後寫下這首敘事聖詩。它不是情緒高潮的背景音樂，而是一個被恩典追上的人，用會眾能唱的普通格律，把提摩太前書一章十五節唱出來。</p>" +
          "<p>本教室以它為門檻：先承認我們需要恩典，再學習怎樣讓音樂服事聖道，而不是壓過聖道。課內可讀牛頓六節全文（中英對照），並可播放公開領域的軍樂團錄音。</p>" +
          '<span class="site-cta">進入這首精選課 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
          "</div></a>"
        : "") +
      '<section class="smc-intro">' +
      '<div><div class="site-rule"></div>' +
      "<h2>怎樣走這間聖樂教室</h2>" +
      "<p>聖樂不是點綴崇拜的裝飾，也不是屬靈氣氛的技術。敬拜是受造之物對啟示的回應：神先說話，我們才歌唱。歌詞必須合乎聖經；旋律、和聲與編曲都是僕人，不是主人。</p>" +
      "<p>你可以先讀導論與聖經中的聖樂，再走歷史巡禮，然後用三十首精選課操練「怎樣帶會眾唱」。敬拜策劃與評鑑標準，是給詩班、敬拜隊與牧者的實習課。上方搜尋可找曲名、作者、神學主題或場合。</p>" +
      "</div>" +
      '<aside class="smc-panel"><ol>' +
      '<li><span class="smc-num">01</span><div><strong class="serif">聖經作裁判</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">一首詩能不能進主日，不先問好不好聽，而先問它有沒有把基督的道理唱對。</p></div></li>' +
      '<li><span class="smc-num">02</span><div><strong class="serif">會眾歌唱優先</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">詩班與樂隊是教師與僕人。若會眾唱不上去，再華麗的編曲也偏離了聖樂的職分。</p></div></li>' +
      '<li><span class="smc-num">03</span><div><strong class="serif">謹慎娛樂化</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">情感應當健康：可以哀傷、可以歡騰，卻不要把敬拜變成表演者的秀場。</p></div></li>' +
      "</ol></aside></section>" +
      '<section class="smc-section-head" id="chapters">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Ten chapters</div>' +
      "<h2>十個篇章</h2></section>" +
      '<div class="smc-grid-3">' +
      chs
        .map(function (c) {
          return (
            '<a class="smc-card" href="#/chapter/' +
            esc(c.id) +
            '">' +
            '<div class="smc-card-media" style="--card-tone:' +
            esc(c.tone) +
            '">' +
            (c.image
              ? '<img src="' + esc(c.image) + '" alt="" loading="lazy" onerror="this.remove()">'
              : "") +
            "</div>" +
            '<div class="smc-card-body"><div class="smc-kicker">第 ' +
            esc(c.no) +
            " 章 · " +
            esc(c.kindLabel) +
            "</div>" +
            "<h3>" +
            esc(c.title) +
            "</h3>" +
            '<p class="smc-en">' +
            esc(c.titleEn) +
            "</p>" +
            '<p class="smc-excerpt">' +
            esc(c.blurb) +
            "</p>" +
            '<span class="site-cta">進入此章 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
            "</div></a>"
          );
        })
        .join("") +
      "</div>" +
      '<section class="smc-section-head" id="hymns">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Thirty hymns</div>' +
      "<h2>三十首精選聖詩</h2>" +
      '<p style="color:var(--muted);max-width:42rem;line-height:1.7">按場合或「可播放」篩選，或直接進入一課。卡片上的「全文」表示公開領域完整歌詞（原文與教學中譯）；「版權摘句」表示仍受保護、本課不錄全文。錄音只連線公開領域或創用 CC 來源。</p>' +
      '<div class="smc-chips" id="smc-chips">' +
      chips +
      "</div></section>" +
      (q && searched.chapters.length
        ? '<p class="smc-kicker" style="margin-bottom:0.6rem">相關篇章</p><div class="smc-pills" style="margin-bottom:1rem">' +
          searched.chapters
            .map(function (c) {
              return '<a class="smc-pill" href="#/chapter/' + esc(c.id) + '">' + esc(c.title) + "</a>";
            })
            .join("") +
          "</div>"
        : "") +
      '<div class="smc-grid-hymns">' +
      list.map(hymnCard).join("") +
      "</div>" +
      '<p class="smc-empty' +
      (list.length ? "" : " is-on") +
      '">沒有符合的聖詩。試試另一個關鍵字，或點「全部聖詩」。</p>' +
      '<div class="smc-sister"><a href="../基督教經典書籍巡禮/index.html">相關研讀：基督教經典書籍巡禮</a></div>' +
      "</div></main>" +
      footer();

    bindChips();
    const searchInput = document.getElementById("smc-search");
    if (searchInput && q) searchInput.value = q;
  }

  function bindChips() {
    const box = document.getElementById("smc-chips");
    if (!box) return;
    box.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const id = btn.getAttribute("data-filter");
      const q = (document.getElementById("smc-search") || {}).value || "";
      renderHub(id || "", q);
      const search = document.getElementById("smc-search");
      if (search) search.value = q;
    });
  }

  function renderSection(sec) {
    let html = "<h2>" + esc(sec.title);
    if (sec.titleEn) html += '<span class="latin">' + esc(sec.titleEn) + "</span>";
    html += "</h2>";
    (sec.body || []).forEach(function (p) {
      html += "<p>" + p + "</p>";
    });
    (sec.verses || []).forEach(function (v) {
      html +=
        '<blockquote class="smc-quote"><p>' +
        v.zh +
        "</p>" +
        (v.orig ? '<p class="orig">' + esc(v.orig) + "</p>" : "") +
        (v.ref ? "<cite>" + esc(v.ref) + "</cite>" : "") +
        "</blockquote>";
    });
    if (sec.points && sec.points.length) {
      html +=
        "<ul class='smc-points'>" +
        sec.points
          .map(function (p) {
            return "<li>" + p + "</li>";
          })
          .join("") +
        "</ul>";
    }
    if (sec.cards && sec.cards.length) {
      html +=
        '<div class="smc-cards">' +
        sec.cards
          .map(function (c) {
            return "<article><h3>" + esc(c.title) + "</h3><p>" + c.body + "</p></article>";
          })
          .join("") +
        "</div>";
    }
    if (sec.flow && sec.flow.length) {
      html +=
        '<ol class="smc-flow">' +
        sec.flow
          .map(function (f) {
            return "<li><strong>" + esc(f.title) + "</strong><span>" + esc(f.body) + "</span></li>";
          })
          .join("") +
        "</ol>";
    }
    if (sec.table) {
      html +=
        '<div class="smc-table-wrap"><table class="smc-table"><thead><tr>' +
        sec.table.headers
          .map(function (h) {
            return "<th>" + esc(h) + "</th>";
          })
          .join("") +
        "</tr></thead><tbody>" +
        sec.table.rows
          .map(function (row) {
            return (
              "<tr>" +
              row
                .map(function (cell) {
                  return "<td>" + cell + "</td>";
                })
                .join("") +
              "</tr>"
            );
          })
          .join("") +
        "</tbody></table></div>";
    }
    if (sec.note) {
      html +=
        '<div class="smc-note' +
        (sec.note.caution ? " is-caution" : "") +
        '"><h3>' +
        esc(sec.note.title) +
        "</h3><p>" +
        sec.note.body +
        "</p></div>";
    }
    if (sec.hymns && sec.hymns.length) {
      const related = sec.hymns.map(hymnMeta).filter(Boolean);
      if (related.length) {
        html += '<div class="smc-related"><p class="smc-kicker">相關精選課</p></div>';
        html += '<div class="smc-grid-hymns" style="margin-top:0.6rem">' + related.map(hymnCard).join("") + "</div>";
      }
    }
    return html;
  }

  function renderChapterLoading(ch) {
    document.title = (ch ? ch.title : "載入中") + "｜聖樂";
    root.innerHTML =
      '<main><div class="smc-wrap"><p class="smc-loading">正在展開這一章的教室講章…</p></div></main>';
  }

  function renderChapter(ch, lesson) {
    markRead("chapter", ch.id);
    const e = lesson || {};
    const related = (ch.relatedHymns || []).map(hymnMeta).filter(Boolean);
    document.title = ch.title + "｜聖樂";

    const sections = (e.sections || []).map(renderSection).join("");

    root.innerHTML =
      '<main><div class="smc-wrap">' +
      '<nav class="smc-crumb"><a href="#/">聖樂首頁</a><span>/</span><span>' +
      esc(ch.title) +
      "</span></nav>" +
      '<section class="smc-chapter-hero">' +
      "<figure>" +
      (ch.image
        ? '<img src="' + esc(ch.image) + '" alt="' + esc(ch.title) + '" onerror="this.remove()">'
        : "") +
      "</figure>" +
      "<div>" +
      '<div class="smc-kicker">第 ' +
      esc(ch.no) +
      " 章 · " +
      esc(ch.era) +
      "</div>" +
      "<h1>" +
      esc(ch.title) +
      "</h1>" +
      '<p class="smc-en">' +
      esc(ch.titleEn) +
      "</p>" +
      '<p style="color:var(--muted);line-height:1.8">' +
      esc(ch.blurb) +
      "</p>" +
      (isRead("chapter", ch.id) ? '<p class="smc-kicker" style="margin-top:1rem">已讀此章</p>' : "") +
      "</div></section>" +
      '<article class="smc-prose">' +
      (e.lead ? "<p>" + e.lead + "</p>" : "") +
      sections +
      (ch.id === "hymns"
        ? "<h2>三十首課表</h2><p>以下按神學主題排列。點進去可見作者、全部歌詞、場合與帶領提示。</p>"
        : "") +
      "</article>" +
      (ch.id === "hymns" || related.length
        ? '<div class="smc-grid-hymns">' +
          (ch.id === "hymns" ? hymns() : related).map(hymnCard).join("") +
          "</div>"
        : "") +
      "</div></main>" +
      footer();
  }

  function renderHymnLoading(meta) {
    document.title = (meta ? meta.titleZh : "載入中") + "｜聖樂";
    root.innerHTML =
      '<main><div class="smc-wrap"><p class="smc-loading">正在展開這首聖詩的教室講章…</p></div></main>';
  }

  function linesHtml(lines) {
    return (
      '<p class="smc-stanza-lines">' +
      (lines || [])
        .map(function (line) {
          return esc(line);
        })
        .join("<br>") +
      "</p>"
    );
  }

  function teachingExcerptHtml(t) {
    if (!t.excerpt || !(t.excerpt.zh || t.excerpt.en)) return "";
    return (
      '<div class="smc-lyric is-teaching">' +
      "<h3>" +
      esc(t.excerpt.label || "教學指認（非全文）") +
      "</h3>" +
      '<div class="smc-lyric-col">' +
      (t.excerpt.zh ? "<pre>" + esc(t.excerpt.zh) + "</pre>" : "") +
      (t.excerpt.en ? '<pre class="orig">' + esc(t.excerpt.en) + "</pre>" : "") +
      "</div>" +
      (t.excerpt.note
        ? '<p class="smc-full-lyrics-note">' + esc(t.excerpt.note) + "</p>"
        : "") +
      "</div>"
    );
  }

  function stanzaHtml(s, L) {
    const isChorus = s.kind === "chorus";
    const hasEn = !!(s.en && s.en.length);
    const head = isChorus
      ? '<span class="smc-stanza-tag is-chorus">副歌</span>' +
        (s.repeat ? '<span class="smc-stanza-hint">' + esc(s.repeat) + "</span>" : "")
      : '<span class="smc-stanza-tag">第 ' +
        esc(String(s.n)) +
        " 節</span>" +
        (s.note ? '<span class="smc-stanza-hint">' + esc(s.note) + "</span>" : "");
    return (
      '<article class="smc-stanza' +
      (isChorus ? " is-chorus" : "") +
      '">' +
      '<header class="smc-stanza-head">' +
      head +
      "</header>" +
      '<div class="smc-stanza-body' +
      (hasEn ? " has-en" : "") +
      '">' +
      '<div class="smc-stanza-col is-zh"><span class="smc-stanza-lang">' +
      esc(L.zhLabel || "中文") +
      "</span>" +
      linesHtml(s.zh) +
      "</div>" +
      '<div class="smc-stanza-col is-orig"><span class="smc-stanza-lang">' +
      esc(L.origLabel || "原文") +
      "</span>" +
      linesHtml(s.orig) +
      "</div>" +
      (hasEn
        ? '<div class="smc-stanza-col is-en"><span class="smc-stanza-lang">' +
          esc(L.enLabel || "英語") +
          "</span>" +
          linesHtml(s.en) +
          "</div>"
        : "") +
      "</div></article>"
    );
  }

  function lyricsHtml(meta, t) {
    const L = hymnLyrics(meta.id, t);
    if (!L) return teachingExcerptHtml(t);

    const hasStanzas = !!(L.stanzas && L.stanzas.length);
    const title = L.full === false && !hasStanzas ? "全部歌詞（版權限制）" : "全部歌詞";
    const eyebrow = L.full ? "Complete text" : L.originalPd ? "Public-domain original" : "Copyright notice";
    const banner =
      L.full === false
        ? '<div class="smc-note is-caution smc-lyrics-copy"><h3>版權說明</h3><p>' +
          esc(
            L.reason ||
              t.copyrightNote ||
              "此曲或其通行譯詞仍受版權保護。本課不提供可投影全文。請向 CCLI／原出版者取得合法授權後，於合法詩歌本或授權平台查看全文。"
          ) +
          "</p>" +
          (L.hint ? "<p>" + esc(L.hint) + "</p>" : "") +
          "</div>"
        : "";
    const teaching =
      L.full === false && L.keepExcerpt !== false ? teachingExcerptHtml(t) : "";
    const stanzas = hasStanzas
      ? '<div class="smc-stanzas">' +
        L.stanzas
          .map(function (s) {
            return stanzaHtml(s, L);
          })
          .join("") +
        "</div>"
      : "";

    return (
      '<section class="smc-full-lyrics' +
      (L.full ? "" : " is-limited") +
      '" id="lyrics">' +
      "<header>" +
      '<div class="site-eyebrow" style="color:#8a6d28">' +
      esc(eyebrow) +
      "</div>" +
      "<h2>" +
      title +
      "</h2>" +
      (L.lead ? '<p class="smc-full-lyrics-lead">' + esc(L.lead) + "</p>" : "") +
      "</header>" +
      banner +
      teaching +
      stanzas +
      (L.note ? '<p class="smc-full-lyrics-note">' + esc(L.note) + "</p>" : "") +
      "</section>"
    );
  }

  function renderHymn(meta, text) {
    const t = text || {};
    const all = hymns();
    const idx = all.findIndex((h) => h.id === meta.id);
    const prev = idx > 0 ? all[idx - 1] : null;
    const next = idx < all.length - 1 ? all[idx + 1] : null;
    const L = hymnLyrics(meta.id, t);
    markRead("hymn", meta.id);
    document.title = "《" + meta.titleZh + "》｜聖樂";

    const jumpLabel =
      L && L.full === false && !(L.stanzas && L.stanzas.length)
        ? "版權說明與教學摘句"
        : "全部歌詞";

    root.innerHTML =
      '<main><div class="smc-wrap">' +
      '<nav class="smc-crumb"><a href="#/">聖樂首頁</a><span>/</span><a href="#/chapter/hymns">聖詩精選課</a><span>/</span><span>《' +
      esc(meta.titleZh) +
      "》</span></nav>" +
      '<article class="smc-hymn-page">' +
      '<aside class="smc-hymn-side">' +
      scoreHtml(meta) +
      '<div class="smc-pills" style="margin-top:.8rem">' +
      (hasPlayable(meta) ? '<span class="smc-pill is-play">可播放</span>' : "") +
      (meta.copyright
        ? '<span class="smc-pill is-copy">版權摘句</span>'
        : '<span class="smc-pill is-full">全文</span>') +
      (meta.occasions || [])
        .map(function (o) {
          return '<span class="smc-pill">' + esc(o) + "</span>";
        })
        .join("") +
      "</div></aside>" +
      "<div>" +
      '<div class="smc-kicker">' +
      esc(meta.theme) +
      "</div>" +
      "<h1>《" +
      esc(meta.titleZh) +
      "》</h1>" +
      '<p class="smc-en">' +
      esc(meta.titleEn) +
      "</p>" +
      '<p class="smc-lyrics-jump"><button type="button" class="smc-lyrics-jump-btn" data-scroll="lyrics">' +
      jumpLabel +
      "</button></p>" +
      '<dl class="smc-dl">' +
      "<dt>詞</dt><dd>" +
      esc(meta.lyricist) +
      "</dd>" +
      "<dt>曲</dt><dd>" +
      esc(meta.composer) +
      "</dd>" +
      "<dt>年代</dt><dd>" +
      esc(meta.year) +
      "</dd>" +
      "<dt>格律</dt><dd>" +
      esc(meta.meter || "—") +
      "</dd>" +
      "<dt>調性／速度</dt><dd>" +
      esc((meta.key || "") + (meta.tempo ? " · " + meta.tempo : "")) +
      "</dd>" +
      "</dl>" +
      (meta.copyright
        ? '<div class="smc-note is-caution"><h3>版權提示</h3><p>' +
          (t.copyrightNote || "此曲或其通行譯詞仍受版權保護。本課只提供教學說明與極短摘句，請向 CCLI／原出版者取得合法授權後再於崇拜使用。") +
          "</p></div>"
        : "") +
      audioPlayerHtml(meta) +
      '<div class="smc-prose">' +
      "<h2>神學主題</h2><p>" +
      (t.theology || meta.theme) +
      "</p>" +
      "<h2>詳細介紹</h2>" +
      (t.intro || []).map(function (p) { return "<p>" + p + "</p>"; }).join("") +
      lyricsHtml(meta, t) +
      (t.teaching && t.teaching.length
        ? "<h2>教學提示：怎樣帶領會眾</h2><ul class='smc-points'>" +
          t.teaching
            .map(function (p) {
              return "<li>" + p + "</li>";
            })
            .join("") +
          "</ul>"
        : "") +
      (t.misuse && t.misuse.length
        ? '<div class="smc-note is-caution"><h3>常見誤用</h3><p>' + t.misuse.join(" ") + "</p></div>"
        : "") +
      (t.occasionsText
        ? '<div class="smc-note"><h3>適合場合</h3><p>' + t.occasionsText + "</p></div>"
        : "") +
      "</div>" +
      '<nav class="smc-nav-hymns">' +
      (prev
        ? '<a href="#/hymn/' +
          esc(prev.id) +
          '"><small>上一首</small><strong class="serif">《' +
          esc(prev.titleZh) +
          "》</strong></a>"
        : "<span></span>") +
      (next
        ? '<a href="#/hymn/' +
          esc(next.id) +
          '" style="text-align:right"><small>下一首</small><strong class="serif">《' +
          esc(next.titleZh) +
          "》</strong></a>"
        : "<span></span>") +
      "</nav>" +
      "</div></article></div></main>" +
      footer();
    bindHymnPlayer();
    root.querySelectorAll("[data-scroll]").forEach(function (el) {
      el.addEventListener("click", function () {
        const target = document.getElementById(el.getAttribute("data-scroll"));
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function route() {
    stopHymnAudio();
    const loc = parseHash();
    const searchInput = document.getElementById("smc-search");
    if (loc.view === "hub") {
      renderHub("", searchInput ? searchInput.value : "");
      return;
    }
    if (loc.view === "search") {
      renderHub("", loc.q || "");
      return;
    }
    if (loc.view === "chapter") {
      const ch = chaptersById()[loc.id];
      if (!ch) {
        renderHub();
        return;
      }
      if (ch.id === "hymns") {
        renderChapter(ch, { lead: ch.blurb, sections: [] });
        return;
      }
      const cached = (window.SACRED_MUSIC_LESSONS || {})[ch.id];
      if (cached && lessonCache["lesson:" + ch.id]) {
        renderChapter(ch, cached);
        return;
      }
      renderChapterLoading(ch);
      loadLesson(ch.id)
        .then(function (lesson) {
          const now = parseHash();
          if (now.view !== "chapter" || now.id !== ch.id) return;
          renderChapter(ch, lesson);
        })
        .catch(function () {
          renderChapter(ch, {
            lead: "此章詳細講章暫時未能載入。請檢查網絡後再試。",
            sections: []
          });
        });
      return;
    }
    if (loc.view === "hymn") {
      const meta = hymnMeta(loc.id);
      if (!meta) {
        renderHub();
        return;
      }
      const pack = meta.pack || "hymns-a";
      const texts = window.SACRED_MUSIC_HYMN_TEXTS || {};
      if (hymnPackCache["pack:" + pack] && hymnPackCache["lyrics:" + pack] && texts[meta.id]) {
        renderHymn(meta, texts[meta.id]);
        return;
      }
      renderHymnLoading(meta);
      loadHymnPack(pack)
        .then(function (textsNow) {
          const now = parseHash();
          if (now.view !== "hymn" || now.id !== meta.id) return;
          renderHymn(meta, textsNow[meta.id]);
        })
        .catch(function () {
          renderHymn(meta, {
            theology: meta.theme,
            intro: ["此課詳細介紹暫時未能載入。請檢查網絡後再試，或先回到精選課列表。"],
            teaching: [],
            misuse: []
          });
        });
    }
  }

  const searchInput = document.getElementById("smc-search");
  if (searchInput) {
    let t = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(t);
      const q = searchInput.value;
      t = setTimeout(function () {
        const loc = parseHash();
        if (loc.view === "hub" || loc.view === "search") {
          renderHub("", q);
          const again = document.getElementById("smc-search");
          if (again) {
            again.value = q;
            again.focus();
            const end = q.length;
            again.setSelectionRange(end, end);
          }
        }
      }, 180);
    });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        renderHub("", searchInput.value);
        const again = document.getElementById("smc-search");
        if (again) again.value = searchInput.value;
      }
    });
  }

  window.addEventListener("hashchange", route);
  route();
})();
