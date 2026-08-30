(function () {
  const STORAGE_KEY = "sacraments-course-v1";
  const root = document.getElementById("sacraments-app");
  if (!root) return;

  const catalog = function () {
    return window.SACRAMENTS_CATALOG || { chapters: [] };
  };

  const chapters = function () {
    return catalog().chapters || [];
  };

  const byId = function (id) {
    return chapters().find(function (c) {
      return c.id === id;
    });
  };

  const esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  const rich = function (s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  };

  const loadState = function () {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (e) {
      return {};
    }
  };

  const saveState = function (state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const markRead = function (id) {
    const st = loadState();
    st.read = st.read || [];
    if (st.read.indexOf(id) === -1) st.read.push(id);
    saveState(st);
  };

  const isRead = function (id) {
    return (loadState().read || []).indexOf(id) !== -1;
  };

  const parseHash = function () {
    const raw = (location.hash || "").replace(/^#\/?/, "").trim();
    if (!raw) return { view: "hub" };
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "chapter" && parts[1]) return { view: "chapter", id: parts[1] };
    if (parts[0] === "search") {
      return { view: "hub", q: decodeURIComponent(parts.slice(1).join("/") || "") };
    }
    return { view: "hub" };
  };

  const lessonCache = {};
  const loading = {};

  const loadLesson = function (id) {
    if (lessonCache[id]) return Promise.resolve(lessonCache[id]);
    if (window.SACRAMENTS_LESSONS && window.SACRAMENTS_LESSONS[id]) {
      lessonCache[id] = window.SACRAMENTS_LESSONS[id];
      return Promise.resolve(lessonCache[id]);
    }
    if (loading[id]) return loading[id];
    loading[id] = new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = "data/" + id + ".js";
      s.onload = function () {
        const pack = (window.SACRAMENTS_LESSONS || {})[id];
        if (!pack) {
          reject(new Error("章節資料不完整：" + id));
          return;
        }
        lessonCache[id] = pack;
        resolve(pack);
      };
      s.onerror = function () {
        reject(new Error("無法載入章節：" + id));
      };
      document.body.appendChild(s);
    });
    return loading[id];
  };

  const footer = function () {
    return (
      '<footer class="site-footer">' +
      '<p class="verse">For as often as you eat this bread and drink the cup, you proclaim the Lord’s death until he comes. 1 Corinthians 11:26</p>' +
      "<p>「你們每逢吃這餅，喝這杯，是表明主的死，直等到他來。」哥林多前書 11:26</p>" +
      '<p style="margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;font-size:0.78rem">本課以福音派、改革宗傾向的教室聲音授課，並公平陳述浸信、信義宗與其他傳統。經文採用和合本。插圖多取自 Wikimedia Commons，僅作教學連線。</p>' +
      "</footer>"
    );
  };

  const searchChapters = function (q) {
    const needle = q.trim().toLowerCase();
    if (!needle) return chapters();
    return chapters().filter(function (c) {
      const blob = [c.title, c.titleEn, c.blurb, c.era, c.keywords].join(" ").toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
  };

  const chapterCard = function (c) {
    return (
      '<a class="sac-card" href="#/chapter/' +
      esc(c.id) +
      '">' +
      '<div class="sac-card-media" style="--card-tone:' +
      esc(c.tone) +
      '">' +
      (c.image ? '<img src="' + esc(c.image) + '" alt="" loading="lazy" onerror="this.remove()">' : "") +
      "</div>" +
      '<div class="sac-card-body"><div class="sac-kicker">第 ' +
      esc(c.no) +
      " 講 · " +
      esc(c.era) +
      "</div>" +
      "<h3>" +
      esc(c.title) +
      "</h3>" +
      '<p class="sac-en">' +
      esc(c.titleEn) +
      "</p>" +
      '<p class="sac-excerpt">' +
      esc(c.blurb) +
      "</p>" +
      '<span class="site-cta">進入此講 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
      (isRead(c.id) ? '<span class="sac-read">已修讀</span>' : "") +
      "</div></a>"
    );
  };

  const renderHub = function (query) {
    const cat = catalog();
    const q = query || "";
    const list = q ? searchChapters(q) : chapters();
    const readCount = chapters().filter(function (c) {
      return isRead(c.id);
    }).length;

    document.title = "聖禮｜聖經研讀";

    root.innerHTML =
      '<section class="sac-hero" aria-label="聖禮">' +
      '<div class="sac-hero-media"><img src="' +
      esc(cat.hero.src) +
      '" alt="' +
      esc(cat.hero.alt) +
      '" width="1280" height="720"></div>' +
      '<div class="sac-hero-shade"></div>' +
      '<div class="sac-hero-inner">' +
      '<div class="site-eyebrow">Sacraments · Ordinances · Means of Grace</div>' +
      "<h1>" +
      esc(cat.title) +
      "<em>" +
      esc(cat.titleEn) +
      "</em></h1>" +
      '<p class="sac-hero-lead">' +
      esc(cat.lead) +
      "</p>" +
      '<blockquote class="sac-hero-verse">「' +
      esc(cat.verse.zh) +
      "」<cite>" +
      esc(cat.verse.ref) +
      "</cite></blockquote>" +
      '<div class="sac-hero-stats">' +
      "<div><strong>2</strong><span>大聖禮：洗禮與聖餐</span></div>" +
      "<div><strong>8</strong><span>講課堂課文</span></div>" +
      "<div><strong>" +
      readCount +
      "</strong><span>講已修讀</span></div>" +
      "</div></div></section>" +
      '<main><div class="sac-wrap">' +
      '<aside class="sac-stance" aria-label="本課認信位置"><h2>教授開場：這不是七聖事，也不是空桌子</h2><p>' +
      esc(cat.stance) +
      "</p></aside>" +
      '<section class="sac-intro">' +
      '<div><div class="site-rule"></div>' +
      " <h2>怎樣上這門課</h2>" +
      "<p>先讀經，再聽歷史與認信。聖禮不能代替福音，卻把福音放進水、餅與杯裡，叫信心有可抓住的應許。本課用教室的速度走八講：定義、聖經神學、歷史、洗禮、聖餐、比較、牧養、禮文。</p>" +
      "<p>浸信與改革宗／信義宗在嬰兒洗上的辯論，本課不會藏起來。慈運理的記念、加爾文的屬靈同在、路德的真實臨在，也會公正陳述，然後給出負責的福音派、改革宗傾向判斷。攻擊路德宗弟兄不是本課的功課。</p>" +
      "</div>" +
      '<aside class="sac-panel"><ol>' +
      '<li><span class="sac-num">01</span><div><strong class="serif">聖經作裁判</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">奧古斯丁、路德、加爾文、浸信認信都要站在聖經面前。有造就就領受，有偏差就分辨。</p></div></li>' +
      '<li><span class="sac-num">02</span><div><strong class="serif">兩極都拒絕</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">禮文本身不自動救人（反對 ex opere operato）。聖禮也不只是提醒板：它們見證、印證、堅固福音。</p></div></li>' +
      '<li><span class="sac-num">03</span><div><strong class="serif">帶回教會</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">讀完一講，問自己的堂會：洗禮與聖餐是蒙恩管道，還是節目空檔？未信者聽見的是邀請，還是廉價入場券？</p></div></li>' +
      "</ol></aside></section>" +
      '<section class="sac-section-head" id="chapters">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Eight lectures</div>' +
      "<h2>八講課程</h2>" +
      (q
        ? '<p style="color:var(--muted);max-width:40rem;line-height:1.7">搜尋「' +
          esc(q) +
          "」：找到 " +
          list.length +
          " 講。</p>"
        : '<p style="color:var(--muted);max-width:42rem;line-height:1.7">建議按序修讀。也可先進入洗禮或聖餐專章，再回頭補導論與歷史。已修讀的篇章會留下記號。</p>') +
      "</section>" +
      '<div class="sac-grid">' +
      list.map(chapterCard).join("") +
      "</div>" +
      '<p class="sac-empty' +
      (list.length ? "" : " is-on") +
      '">沒有符合的篇章。試試「洗禮」「聖餐」「嬰兒洗」「林前11」或「七聖事」。</p>' +
      "</div></main>" +
      footer();

    const searchInput = document.getElementById("sacraments-search");
    if (searchInput && q) searchInput.value = q;
  };

  const renderCallout = function (c) {
    if (!c) return "";
    const tone = c.tone || "judge";
    return (
      '<aside class="sac-callout sac-callout--' +
      esc(tone) +
      '"><h3>' +
      rich(c.title || "") +
      "</h3><p>" +
      rich(c.body || "") +
      "</p></aside>"
    );
  };

  const renderTable = function (t) {
    if (!t) return "";
    const heads = (t.headers || [])
      .map(function (h) {
        return "<th scope='col'>" + rich(h) + "</th>";
      })
      .join("");
    const rows = (t.rows || [])
      .map(function (row) {
        return (
          "<tr>" +
          row
            .map(function (cell) {
              return "<td>" + rich(cell) + "</td>";
            })
            .join("") +
          "</tr>"
        );
      })
      .join("");
    return (
      '<div class="sac-table-wrap"><table class="sac-table">' +
      (t.caption ? "<caption>" + rich(t.caption) + "</caption>" : "") +
      "<thead><tr>" +
      heads +
      "</tr></thead><tbody>" +
      rows +
      "</tbody></table></div>"
    );
  };

  const renderVerse = function (v) {
    const raw = String(v.zh || "");
    const body = /^[「"]/.test(raw) ? rich(raw) : "「" + rich(raw) + "」";
    return (
      '<blockquote class="sac-verse"><p>' +
      body +
      "</p><cite>" +
      esc(v.ref) +
      "</cite>" +
      (v.note ? '<span class="sac-note">' + rich(v.note) + "</span>" : "") +
      "</blockquote>"
    );
  };

  const renderSection = function (sec) {
    const paras = (sec.paragraphs || [])
      .map(function (p) {
        return "<p>" + rich(p) + "</p>";
      })
      .join("");
    const list = sec.list
      ? "<ul>" +
        sec.list
          .map(function (item) {
            return "<li>" + rich(item) + "</li>";
          })
          .join("") +
        "</ul>"
      : "";
    const verses = (sec.verses || []).map(renderVerse).join("");
    return (
      '<section class="sac-section" id="' +
      esc(sec.id) +
      '"><h2>' +
      rich(sec.heading) +
      "</h2>" +
      (sec.latin ? '<p class="sac-latin">' + esc(sec.latin) + "</p>" : "") +
      paras +
      list +
      renderTable(sec.table) +
      verses +
      renderCallout(sec.callout) +
      "</section>"
    );
  };

  const renderLesson = function (meta, lesson) {
    markRead(meta.id);
    const chs = chapters();
    const idx = chs.findIndex(function (c) {
      return c.id === meta.id;
    });
    const prev = idx > 0 ? chs[idx - 1] : null;
    const next = idx < chs.length - 1 ? chs[idx + 1] : null;
    const L = lesson || {};

    document.title = meta.title + "｜聖禮";

    const tocItems = [
      { id: "goals", heading: "學習目標" }
    ]
      .concat(
        (L.sections || []).map(function (s) {
          return { id: s.id, heading: s.heading };
        })
      )
      .concat([
        { id: "highlights", heading: "本講重點" },
        { id: "verses", heading: "金句" },
        { id: "pastoral", heading: "牧養應用" },
        { id: "mistakes", heading: "常見錯謬" }
      ]);

    const goals =
      '<section class="sac-goals" id="goals"><h2>學習目標</h2><ul>' +
      (L.goals || [])
        .map(function (g) {
          return "<li>" + rich(g) + "</li>";
        })
        .join("") +
      "</ul></section>";

    const voice = L.voice
      ? '<p class="sac-voice"><strong>教授提要。</strong> ' + rich(L.voice) + "</p>"
      : "";

    const highlights =
      '<section class="sac-highlights" id="highlights"><h2>本講重點</h2><ul>' +
      (L.highlights || [])
        .map(function (h) {
          return "<li>" + rich(h) + "</li>";
        })
        .join("") +
      "</ul></section>";

    const verses =
      '<section class="sac-verses" id="verses"><h2>金句</h2>' +
      (L.verses || []).map(renderVerse).join("") +
      "</section>";

    const pastoral =
      '<section class="sac-pastoral" id="pastoral"><h2>牧養應用</h2>' +
      (L.pastoral || [])
        .map(function (p) {
          return "<p>" + rich(p) + "</p>";
        })
        .join("") +
      "</section>";

    const mistakes =
      '<section class="sac-mistakes" id="mistakes"><h2>常見錯謬</h2><dl>' +
      (L.mistakes || [])
        .map(function (m) {
          return "<div><dt>" + rich(m.title) + "</dt><dd>" + rich(m.body) + "</dd></div>";
        })
        .join("") +
      "</dl></section>";

    root.innerHTML =
      "<main><div class='sac-wrap'>" +
      '<nav class="sac-crumb"><a href="#/">聖禮課程</a><span>/</span><span>第 ' +
      esc(meta.no) +
      " 講</span></nav>" +
      '<div class="sac-layout">' +
      '<nav class="sac-toc" aria-label="本講目錄"><h2>本講目錄</h2><ol>' +
      tocItems
        .map(function (t) {
          return '<li><a href="#' + esc(t.id) + '">' + esc(t.heading) + "</a></li>";
        })
        .join("") +
      "</ol></nav>" +
      '<article class="sac-article">' +
      '<header class="sac-chapter-hero"><figure>' +
      (meta.image
        ? '<img src="' + esc(meta.image) + '" alt="' + esc(meta.title) + '" onerror="this.remove()">'
        : "") +
      "</figure><div>" +
      '<div class="sac-kicker">第 ' +
      esc(meta.no) +
      " 講 · " +
      esc(meta.era) +
      "</div>" +
      "<h1>" +
      esc(meta.title) +
      "</h1>" +
      '<p class="sac-en">' +
      esc(meta.titleEn) +
      "</p>" +
      '<p style="color:var(--muted);line-height:1.8">' +
      esc(meta.blurb) +
      "</p></div></header>" +
      goals +
      voice +
      (L.sections || []).map(renderSection).join("") +
      highlights +
      verses +
      pastoral +
      mistakes +
      '<nav class="sac-pager">' +
      (prev
        ? '<a href="#/chapter/' +
          esc(prev.id) +
          '"><span>上一講</span><strong>' +
          esc(prev.title) +
          "</strong></a>"
        : "<span></span>") +
      (next
        ? '<a class="is-next" href="#/chapter/' +
          esc(next.id) +
          '"><span>下一講</span><strong>' +
          esc(next.title) +
          "</strong></a>"
        : "") +
      "</nav></article></div></div></main>" +
      footer();

    window.scrollTo(0, 0);
  };

  const route = function () {
    const loc = parseHash();
    if (loc.view === "chapter") {
      const meta = byId(loc.id);
      if (!meta) {
        renderHub();
        return;
      }
      document.title = meta.title + "｜聖禮";
      root.innerHTML =
        '<main><div class="sac-wrap"><p class="sac-loading">正在展開第 ' +
        esc(meta.no) +
        " 講…</p></div></main>";
      loadLesson(meta.id)
        .then(function (lesson) {
          const now = parseHash();
          if (now.view !== "chapter" || now.id !== meta.id) return;
          renderLesson(meta, lesson);
        })
        .catch(function () {
          renderLesson(meta, {
            goals: ["請檢查網絡後重新載入本講。"],
            voice: "課文檔案未能載入。請回到課程首頁再試。",
            sections: [],
            highlights: [],
            verses: [],
            pastoral: [],
            mistakes: []
          });
        });
      return;
    }
    renderHub(loc.q || "");
  };

  const searchInput = document.getElementById("sacraments-search");
  if (searchInput) {
    let t = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(t);
      const q = searchInput.value;
      t = setTimeout(function () {
        const loc = parseHash();
        if (loc.view === "hub") {
          renderHub(q);
          const again = document.getElementById("sacraments-search");
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
        renderHub(searchInput.value);
        const again = document.getElementById("sacraments-search");
        if (again) again.value = searchInput.value;
      }
    });
  }

  window.addEventListener("hashchange", route);
  route();
})();
