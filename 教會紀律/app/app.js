(function () {
  const STORAGE_KEY = "church-discipline-v1";
  const root = document.getElementById("discipline-app");
  if (!root) return;

  window.DISCIPLINE_LESSONS = window.DISCIPLINE_LESSONS || {};

  const catalog = () => window.DISCIPLINE_CATALOG || { chapters: [] };
  const chapters = () => catalog().chapters || [];
  const chapterById = (id) => chapters().find((c) => c.id === id);

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const rich = (s) =>
    esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  };

  const saveState = (state) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  const markRead = (id) => {
    const st = loadState();
    st.read = st.read || [];
    if (!st.read.includes(id)) st.read.push(id);
    saveState(st);
  };

  const isRead = (id) => (loadState().read || []).includes(id);

  function parseHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "").trim();
    if (!raw) return { view: "hub" };
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "chapter" && parts[1]) {
      return { view: "chapter", id: parts[1], section: parts[2] || "" };
    }
    if (parts[0] === "search") {
      return { view: "search", q: decodeURIComponent(parts.slice(1).join("/") || "") };
    }
    return { view: "hub" };
  }

  const lessonCache = {};
  const loading = {};

  function loadLesson(id) {
    if (lessonCache[id]) return Promise.resolve(lessonCache[id]);
    if (window.DISCIPLINE_LESSONS[id]) {
      lessonCache[id] = window.DISCIPLINE_LESSONS[id];
      return Promise.resolve(lessonCache[id]);
    }
    if (loading[id]) return loading[id];
    loading[id] = new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = "data/" + id + ".js";
      s.onload = function () {
        const pack = window.DISCIPLINE_LESSONS[id];
        if (!pack) {
          reject(new Error("課次資料不完整：" + id));
          return;
        }
        lessonCache[id] = pack;
        resolve(pack);
      };
      s.onerror = function () {
        reject(new Error("無法載入課次：" + id));
      };
      document.body.appendChild(s);
    });
    return loading[id];
  }

  function loadAllLessons() {
    return Promise.all(chapters().map((c) => loadLesson(c.id).catch(function () { return null; })));
  }

  function collectText(lesson) {
    if (!lesson) return "";
    const parts = [];
    (lesson.objectives || []).forEach((x) => parts.push(x));
    (lesson.takeaways || []).forEach((x) => parts.push(x));
    (lesson.applications || []).forEach((x) => parts.push(x));
    (lesson.errors || []).forEach((e) => parts.push((e.title || "") + " " + (e.body || "")));
    if (lesson.verse) parts.push((lesson.verse.zh || "") + " " + (lesson.verse.ref || ""));
    (lesson.sections || []).forEach((sec) => {
      parts.push(sec.heading || "", sec.body || "", sec.title || "", sec.note || "");
      (sec.paragraphs || []).forEach((p) => parts.push(p));
      (sec.items || []).forEach((i) => {
        if (typeof i === "string") parts.push(i);
        else parts.push((i.q || i.title || "") + " " + (i.a || i.body || i.hint || ""));
      });
      (sec.rows || []).forEach((r) => parts.push(r.join(" ")));
      (sec.fields || []).forEach((f) => parts.push((f.label || "") + " " + (f.hint || "")));
      if (sec.zh) parts.push(sec.zh, sec.ref || "");
    });
    return parts.join(" ");
  }

  function searchAll(q) {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const hits = [];
    chapters().forEach((ch) => {
      const lesson = lessonCache[ch.id] || window.DISCIPLINE_LESSONS[ch.id];
      const blob = [ch.title, ch.titleEn, ch.blurb, ch.keywords, collectText(lesson)].join(" ").toLowerCase();
      if (blob.indexOf(needle) !== -1) {
        const idx = blob.indexOf(needle);
        hits.push({
          id: ch.id,
          title: "第 " + ch.no + " 課 · " + ch.title,
          snippet: blob.slice(Math.max(0, idx - 28), idx + 64)
        });
      }
    });
    return hits;
  }

  function footer() {
    return (
      '<footer class="site-footer">' +
      '<p class="verse">Brothers and sisters, if someone is caught in a sin, you who live by the Spirit should restore that person gently. Galatians 6:1</p>' +
      "<p>「弟兄們，若有人偶然被過犯所勝，你們屬靈的人就當用溫柔的心把他挽回過來。」加拉太書 6:1</p>" +
      '<p style="margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;font-size:0.78rem">本單元是福音派地方教會的教學手冊，不是天主教教會法，也不是任何堂會的內部章程。涉及刑事罪行必須向民事當局報案；教會紀律不能代替報案。</p>' +
      "</footer>"
    );
  }

  function renderHub() {
    const cat = catalog();
    const chs = chapters();
    const featured = chapterById(cat.featuredId) || chs[3];
    document.title = "教會紀律｜聖經研讀";

    root.innerHTML =
      '<section class="site-hero" aria-label="教會紀律">' +
      '<div class="site-hero-shade"></div>' +
      '<div class="site-hero-inner">' +
      '<div class="site-eyebrow">Church Discipline</div>' +
      "<h1>" +
      esc(cat.title) +
      "<em>" +
      esc(cat.titleEn) +
      "</em></h1>" +
      '<p class="site-hero-lead">' +
      esc(cat.lead) +
      "</p>" +
      '<blockquote class="site-hero-verse">「' +
      esc(cat.verse.zh) +
      '」<cite>' +
      esc(cat.verse.ref) +
      "</cite></blockquote>" +
      '<div class="dsc-hero-stats">' +
      "<div><strong>10</strong><span>課長老手冊</span></div>" +
      "<div><strong>8</strong><span>段核心經文</span></div>" +
      "<div><strong>4</strong><span>個紀律目的</span></div>" +
      "</div></div></section>" +
      '<main><div class="dsc-wrap">' +
      '<div class="dsc-banner" role="note"><strong>先說清楚：</strong>本教材幫助長老與會友按聖經思想紀律。它不是收集個資的表格系統，也不能代替律師、社工、醫生或警方。家暴、性侵犯與其他刑事罪行，必須先保護人、並向民事當局報案。</div>' +
      '<section class="dsc-intro">' +
      '<div><div class="site-rule"></div>' +
      " <h2>紀律是愛的形狀</h2>" +
      "<p>地方教會若只有講台而沒有牧養界線，愛會變成放任；若只有規條而沒有福音，紀律會變成轄制。新約把挽回寫進身體的生活裡：基督是頭，教會是身體，聖經是最後權威，長老與會眾一同看守這份聖潔。</p>" +
      "<p>本單元按十課展開：先問為何、再立聖經、再講精神與程序，然後處理範圍、主餐與會籍、特殊個案、復和，以及錯謬與教學模板。請慢讀，並帶回禱告與長老會議，而不是當成對付人的武器。</p>" +
      "</div>" +
      '<aside class="dsc-panel"><ol>' +
      '<li><span class="dsc-num">01</span><div><strong class="serif">聖經作裁判</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">人情、票數、家族與面子，都不能高過太18與林前5。程序服事經文，不是相反。</p></div></li>' +
      '<li><span class="dsc-num">02</span><div><strong class="serif">挽回作目標</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">得著弟兄是主所愛的結局。除名是不悔改時的最後一步；悔改就要快快復和。</p></div></li>' +
      '<li><span class="dsc-num">03</span><div><strong class="serif">保護作責任</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">不可用「饒恕」封住受害者的口。羊群的安全、見證的清潔，與那人的靈魂，要一齊看顧。</p></div></li>' +
      "</ol></aside></section>" +
      '<section class="dsc-section-head"><div class="site-eyebrow" style="color:#8a6d28">Four aims</div><h2>四個目的</h2></section>' +
      '<div class="dsc-aims">' +
      (cat.aims || [])
        .map(function (a) {
          return (
            '<article class="dsc-aim"><div class="dsc-kicker">' +
            esc(a.no) +
            "</div><h3>" +
            esc(a.title) +
            "</h3><p>" +
            esc(a.body) +
            "</p></article>"
          );
        })
        .join("") +
      "</div>" +
      (featured
        ? '<a class="dsc-featured" href="#/chapter/' +
          esc(featured.id) +
          '">' +
          '<div class="dsc-featured-media"><strong>私下勸勉 → 一兩個人 → 告訴教會 → 看他像外邦人稅吏</strong></div>' +
          '<div class="dsc-featured-body">' +
          '<div class="site-eyebrow" style="color:#8a6d28">Handbook core</div>' +
          "<h2>" +
          esc(featured.title) +
          "</h2>" +
          '<p class="latin">' +
          esc(featured.titleEn) +
          "</p>" +
          "<p>" +
          esc(featured.blurb) +
          "</p>" +
          "<p>這是長老會議最常用的一課：怎樣走、怎樣記、怎樣保密、何時召開會友大會。請先把太18讀熟，再打開程序。</p>" +
          '<span class="site-cta">進入程序手冊 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
          "</div></a>"
        : "") +
      '<section class="dsc-section-head" id="lessons">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Ten lessons</div>' +
      " <h2>十課目錄</h2>" +
      '<p style="color:var(--muted);max-width:40rem;line-height:1.7">每課含學習目標、詳細講解、重點、金句、牧養應用與常見錯誤。已讀過的課會留下記號。</p></section>' +
      '<div class="dsc-grid">' +
      chs
        .map(function (c) {
          return (
            '<a class="dsc-card" href="#/chapter/' +
            esc(c.id) +
            '">' +
            '<div class="dsc-card-media" style="--card-tone:' +
            esc(c.tone) +
            '"></div>' +
            '<div class="dsc-card-body"><div class="dsc-kicker">第 ' +
            esc(c.no) +
            " 課</div>" +
            "<h3>" +
            esc(c.title) +
            "</h3>" +
            '<p class="dsc-en">' +
            esc(c.titleEn) +
            "</p>" +
            '<p class="dsc-excerpt">' +
            esc(c.blurb) +
            "</p>" +
            '<span class="site-cta">開始此課 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
            (isRead(c.id) ? '<span class="dsc-read">已讀</span>' : "") +
            "</div></a>"
          );
        })
        .join("") +
      "</div></div></main>" +
      footer();
  }

  function sectionHeading(sec, i) {
    return sec.heading || sec.title || (sec.type === "verse" ? sec.ref || "金句" : "第 " + (i + 1) + " 段");
  }

  function renderSection(sec, i) {
    const hid = sec.id || "s" + i;
    const heading = sectionHeading(sec, i);
    switch (sec.type) {
      case "lead":
        return '<p class="dsc-prose" style="font-size:1.08rem">' + rich(sec.body || "") + "</p>";
      case "prose":
        return (
          '<section class="dsc-prose" id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '">' +
          (sec.heading ? "<h2>" + esc(sec.heading) + "</h2>" : "") +
          (sec.paragraphs || []).map((p) => "<p>" + rich(p) + "</p>").join("") +
          "</section>"
        );
      case "verse":
        return (
          '<figure class="dsc-verse" id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '">' +
          (heading && sec.heading ? "<h2 class=\"serif\" style=\"margin:0 0 .5rem;font-size:1.05rem\">" + esc(sec.heading) + "</h2>" : "") +
          "<p>「" +
          esc(sec.zh) +
          "」</p><cite>" +
          esc(sec.ref) +
          "</cite>" +
          (sec.note ? '<p class="dsc-note">' + rich(sec.note) + "</p>" : "") +
          "</figure>"
        );
      case "callout":
        return (
          '<aside class="dsc-callout is-' +
          esc(sec.tone || "note") +
          '"><h3>' +
          esc(sec.title || "") +
          "</h3><p>" +
          rich(sec.body || "") +
          "</p></aside>"
        );
      case "points":
        return (
          '<section class="dsc-box" id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '"><h2>' +
          esc(sec.title || heading) +
          "</h2><ul>" +
          (sec.items || []).map((it) => "<li>" + rich(it) + "</li>").join("") +
          "</ul></section>"
        );
      case "table":
        return (
          '<section id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '">' +
          (sec.title ? '<h2 class="serif" style="font-size:1.18rem;margin:1.4rem 0 .7rem">' + esc(sec.title) + "</h2>" : "") +
          (sec.intro ? "<p style=\"color:var(--muted);line-height:1.75\">" + rich(sec.intro) + "</p>" : "") +
          '<div class="dsc-table-wrap"><table class="dsc-table"><thead><tr>' +
          (sec.headers || []).map((h) => "<th>" + esc(h) + "</th>").join("") +
          "</tr></thead><tbody>" +
          (sec.rows || [])
            .map((r) => "<tr>" + r.map((c) => "<td>" + rich(c) + "</td>").join("") + "</tr>")
            .join("") +
          "</tbody></table></div></section>"
        );
      case "qa":
        return (
          '<section id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '">' +
          (sec.heading ? "<h2 class=\"serif\" style=\"font-size:1.18rem;margin:1.4rem 0 .7rem\">" + esc(sec.heading) + "</h2>" : "") +
          (sec.items || [])
            .map(function (qa) {
              return (
                '<details class="dsc-qa"><summary>' +
                esc(qa.q) +
                "</summary><p>" +
                rich(qa.a) +
                "</p></details>"
              );
            })
            .join("") +
          "</section>"
        );
      case "template":
        return (
          '<section class="dsc-template" id="' +
          esc(hid) +
          '" data-sec="' +
          esc(hid) +
          '"><h3>' +
          esc(sec.title || "教學模板") +
          "</h3><p>" +
          rich(sec.intro || "此為教學大綱，請自行抄寫到教會內部保密紀錄。請勿在此頁填寫真實姓名、電話或案情。") +
          "</p><ul class=\"dsc-fields\">" +
          (sec.fields || [])
            .map(function (f) {
              return "<li><strong>" + esc(f.label) + "</strong><span>" + rich(f.hint || "") + "</span></li>";
            })
            .join("") +
          "</ul></section>"
        );
      default:
        return "";
    }
  }

  function renderLesson(meta, lesson, sectionId) {
    markRead(meta.id);
    const chs = chapters();
    const idx = chs.findIndex((c) => c.id === meta.id);
    const prev = idx > 0 ? chs[idx - 1] : null;
    const next = idx < chs.length - 1 ? chs[idx + 1] : null;
    const L = lesson || {};
    const tocItems = (L.sections || [])
      .map(function (sec, i) {
        if (!sec.heading && !sec.title && sec.type !== "verse") return "";
        const hid = sec.id || "s" + i;
        return (
          "<li><a href=\"#/chapter/" +
          esc(meta.id) +
          "/" +
          esc(hid) +
          "\">" +
          esc(sectionHeading(sec, i)) +
          "</a></li>"
        );
      })
      .join("");

    document.title = meta.title + "｜教會紀律";

    root.innerHTML =
      '<main><div class="dsc-wrap">' +
      '<nav class="dsc-crumb" aria-label="麵包屑"><a href="#/">教會紀律</a><span>/</span><span>第 ' +
      esc(meta.no) +
      " 課</span></nav>" +
      '<article class="dsc-lesson">' +
      '<aside class="dsc-toc" aria-label="本課大綱"><h2>本課大綱</h2><ol>' +
      '<li><a href="#objectives">學習目標</a></li>' +
      tocItems +
      '<li><a href="#takeaways">重點</a></li>' +
      '<li><a href="#verse">金句</a></li>' +
      '<li><a href="#apply">牧養應用</a></li>' +
      '<li><a href="#errors">常見錯誤</a></li>' +
      "</ol></aside>" +
      '<div class="dsc-lesson-body">' +
      '<div class="dsc-kicker">第 ' +
      esc(meta.no) +
      " 課 · Lesson " +
      esc(meta.no) +
      "</div>" +
      "<h1>" +
      esc(meta.title) +
      "</h1>" +
      '<p class="dsc-en">' +
      esc(meta.titleEn) +
      "</p>" +
      '<p style="color:var(--muted);line-height:1.8">' +
      esc(meta.blurb) +
      "</p>" +
      '<section class="dsc-objectives" id="objectives"><h2>學習目標</h2><ol>' +
      (L.objectives || []).map((o) => "<li>" + rich(o) + "</li>").join("") +
      "</ol></section>" +
      (L.sections || []).map(renderSection).join("") +
      '<section class="dsc-box" id="takeaways"><h2>重點</h2><ul>' +
      (L.takeaways || []).map((t) => "<li>" + rich(t) + "</li>").join("") +
      "</ul></section>" +
      (L.verse
        ? '<figure class="dsc-verse" id="verse"><p>「' +
          esc(L.verse.zh) +
          "」</p><cite>" +
          esc(L.verse.ref) +
          "</cite>" +
          (L.verse.note ? '<p class="dsc-note">' + rich(L.verse.note) + "</p>" : "") +
          "</figure>"
        : "") +
      '<section class="dsc-box" id="apply"><h2>牧養應用</h2><ul>' +
      (L.applications || []).map((t) => "<li>" + rich(t) + "</li>").join("") +
      "</ul></section>" +
      '<section class="dsc-errors" id="errors"><h2 class="serif" style="font-size:1.18rem;margin:1.2rem 0 .4rem">常見錯誤</h2>' +
      (L.errors || [])
        .map(function (e) {
          return '<article class="dsc-error"><h3>' + esc(e.title) + "</h3><p>" + rich(e.body) + "</p></article>";
        })
        .join("") +
      "</section>" +
      '<nav class="dsc-pager" aria-label="課次翻頁">' +
      (prev
        ? '<a href="#/chapter/' + esc(prev.id) + '"><small>上一課</small>' + esc(prev.title) + "</a>"
        : "<span></span>") +
      (next
        ? '<a href="#/chapter/' + esc(next.id) + '"><small>下一課</small>' + esc(next.title) + "</a>"
        : "<span></span>") +
      "</nav></div></article></div></main>" +
      footer();

    if (sectionId) {
      const el = document.getElementById(sectionId) || document.querySelector('[data-sec="' + sectionId + '"]');
      if (el) el.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function renderSearch(q) {
    document.title = "搜尋｜教會紀律";
    root.innerHTML =
      '<main><div class="dsc-wrap">' +
      '<nav class="dsc-crumb"><a href="#/">教會紀律</a><span>/</span><span>搜尋</span></nav>' +
      "<h1 class=\"serif\" style=\"font-size:clamp(1.6rem,3vw,2.2rem)\">搜尋結果</h1>" +
      '<p style="color:var(--muted)">關鍵字：' +
      esc(q) +
      "</p>" +
      '<p class="dsc-loading">正在翻查各課…</p></div></main>';

    loadAllLessons().then(function () {
      const hits = searchAll(q);
      const box = root.querySelector(".dsc-wrap");
      if (!box) return;
      const last = box.querySelector(".dsc-loading");
      if (last) last.remove();
      if (!hits.length) {
        box.insertAdjacentHTML("beforeend", '<p class="dsc-empty">沒有符合的課次。試試「太18」「主餐」「家暴」「復和」或「會友大會」。</p>');
        return;
      }
      box.insertAdjacentHTML(
        "beforeend",
        '<div class="dsc-hits">' +
          hits
            .map(function (h) {
              return (
                '<a class="dsc-hit" href="#/chapter/' +
                esc(h.id) +
                '"><div class="dsc-kicker">課次</div><h3>' +
                esc(h.title) +
                "</h3><p>" +
                esc(h.snippet) +
                "…</p></a>"
              );
            })
            .join("") +
          "</div>"
      );
    });
  }

  function route() {
    const r = parseHash();
    if (r.view === "search") {
      const input = document.getElementById("discipline-search");
      if (input && r.q) input.value = r.q;
      renderSearch(r.q || "");
      return;
    }
    if (r.view === "chapter") {
      const meta = chapterById(r.id);
      if (!meta) {
        renderHub();
        return;
      }
      root.innerHTML = '<main><div class="dsc-wrap"><p class="dsc-loading">正在展開這一課…</p></div></main>';
      loadLesson(r.id)
        .then(function (lesson) {
          renderLesson(meta, lesson, r.section);
        })
        .catch(function () {
          root.innerHTML =
            '<main><div class="dsc-wrap"><p class="dsc-empty">這一課暫時未能載入。請回到<a href="#/">目錄</a>。</p></div></main>';
        });
      return;
    }
    renderHub();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);

  const searchInput = document.getElementById("discipline-search");
  if (searchInput) {
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        const q = searchInput.value.trim();
        location.hash = q ? "#/search/" + encodeURIComponent(q) : "#/";
      }
    });
  }

  route();
})();
