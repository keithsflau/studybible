(function () {
  const STORAGE_KEY = "classics-tour-v1";
  const root = document.getElementById("classics-app");
  if (!root) return;

  const catalog = () => window.CLASSICS_CATALOG || { chapters: [], books: [] };
  const books = () => window.CLASSICS_BOOKS || [];
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
    if (parts[0] === "chapter" && parts[1]) return { view: "chapter", id: parts[1] };
    if (parts[0] === "book" && parts[1]) return { view: "book", id: parts[1] };
    if (parts[0] === "search") return { view: "search", q: decodeURIComponent(parts.slice(1).join("/") || "") };
    return { view: "hub" };
  }

  function go(hash) {
    location.hash = hash;
  }

  const chapterCache = {};
  const loading = {};

  function loadChapter(chapterId) {
    if (chapterCache[chapterId]) return Promise.resolve(chapterCache[chapterId]);
    if (loading[chapterId]) return loading[chapterId];
    loading[chapterId] = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "data/" + chapterId + ".js";
      s.onload = function () {
        const pack = (window.CLASSICS_ESSAYS || {})[chapterId] || {};
        chapterCache[chapterId] = pack;
        resolve(pack);
      };
      s.onerror = function () {
        reject(new Error("無法載入章節：" + chapterId));
      };
      document.body.appendChild(s);
    });
    return loading[chapterId];
  }

  function bookMeta(id) {
    return books().find((b) => b.id === id);
  }

  function booksInChapter(chapterId) {
    return books().filter((b) => b.chapter === chapterId);
  }

  function coverHtml(book, extraClass) {
    const title = esc(book.titleZh);
    const author = esc(book.author);
    const src = book.cover || "";
    return (
      '<div class="clx-cover ' +
      (extraClass || "") +
      '" data-cover>' +
      (src
        ? '<img src="' +
          esc(src) +
          '" alt="《' +
          title +
          '》封面或代表性圖像" loading="lazy" onerror="this.parentNode.classList.add(\'is-fallback\')">'
        : "") +
      '<div class="clx-cover-fallback"' +
      (src ? "" : ' style="display:flex"') +
      "><strong>" +
      title +
      "</strong><span>" +
      author +
      "</span></div></div>"
    );
  }

  function searchBooks(q) {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return books().filter((b) => {
      const blob = [b.titleZh, b.titleOrig, b.author, b.year, b.era, b.blurb, b.lang]
        .join(" ")
        .toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
  }

  function footer() {
    return (
      '<footer class="site-footer">' +
      '<p class="verse">Remember your leaders, who spoke the word of God to you. Consider the outcome of their way of life and imitate their faith. Hebrews 13:7</p>' +
      "<p>「從前引導你們、傳神之道給你們的人，你們要想念他們，效法他們的信心，留心看他們為人的結局。」希伯來書 13:7</p>" +
        '<p style="margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;font-size:0.78rem">書封為本站保存的歷史封面、扉頁或著名版本圖像（Wikimedia Commons、Internet Archive、Open Library 等公有來源）。若圖像未能載入，才改以書名封面顯示。金句為著名原文之中譯，並附原文引句以便核對。</p>' +
      "</footer>"
    );
  }

  function renderHub(filterId, query) {
    const cat = catalog();
    const chs = cat.chapters || [];
    const featured = bookMeta(cat.featuredId) || books().find((b) => b.featured);
    const q = query || "";
    const filtered = filterId ? booksInChapter(filterId) : books();
    const list = q ? searchBooks(q) : filtered;

    document.title = "基督教經典書籍巡禮｜聖經研讀";

    const chips = ['<button type="button" class="clx-chip' + (!filterId ? " is-on" : "") + '" data-filter="">全部 100 本</button>']
      .concat(
        chs.map(
          (c) =>
            '<button type="button" class="clx-chip' +
            (filterId === c.id ? " is-on" : "") +
            '" data-filter="' +
            esc(c.id) +
            '">' +
            esc(c.no) +
            " " +
            esc(c.title) +
            "</button>"
        )
      )
      .join("");

    root.innerHTML =
      '<section class="clx-hero" aria-label="基督教經典書籍巡禮">' +
      '<div class="clx-hero-media"><img src="' +
      esc(cat.hero.src) +
      '" alt="' +
      esc(cat.hero.alt) +
      '" width="1280" height="720"></div>' +
      '<div class="clx-hero-shade"></div>' +
      '<div class="clx-hero-inner">' +
      '<div class="site-eyebrow">Christian Classics</div>' +
      "<h1>" +
      esc(cat.title) +
      "<em>" +
      esc(cat.titleEn) +
      "</em></h1>" +
      '<p class="clx-hero-lead">' +
      esc(cat.lead) +
      "</p>" +
      '<blockquote class="clx-hero-verse">「' +
      esc(cat.verse.zh) +
      '」<cite>' +
      esc(cat.verse.ref) +
      "</cite></blockquote>" +
      '<div class="clx-hero-stats">' +
      "<div><strong>100</strong><span>本精選經典</span></div>" +
      "<div><strong>7</strong><span>個歷史篇章</span></div>" +
      "<div><strong>1</strong><span>條以基督為中心的天路</span></div>" +
      "</div></div></section>" +
      '<main><div class="clx-wrap">' +
      (featured
        ? '<a class="clx-featured" href="#/book/' +
          esc(featured.id) +
          '">' +
          '<div class="clx-featured-media">' +
          '<span class="clx-featured-badge">本巡禮中心書</span>' +
          '<img src="' +
          esc(featured.extraCover || featured.cover) +
          '" alt="《天路歷程》" onerror="this.style.opacity=.2">' +
          "</div>" +
          '<div class="clx-featured-body">' +
          '<div class="site-eyebrow" style="color:#8a6d28">Featured · 約翰·班揚</div>' +
          " <h2>《天路歷程》</h2>" +
          '<p class="latin">The Pilgrim\'s Progress from This World to That Which Is to Come</p>' +
          "<p>1678 年，補鍋匠班揚在貝德福監獄裡寫下這部寓言。基督徒從毀滅城出走，經解釋者之家、十字架、虛華市集、懷疑堡，直抵天城。這不是兒童故事，而是把羅馬書與希伯來書畫成可走的路。</p>" +
          "<p>本巡禮特別加長此書的介紹、寓言地圖與金句，作為閱讀其餘九十九本的「門檻」：先看見福音是一條路，再進入教父、改革與當代的書房。</p>" +
          '<span class="site-cta">進入《天路歷程》 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
          "</div></a>"
        : "") +
      '<section class="clx-intro">' +
      '<div><div class="site-rule"></div>' +
      "<h2>怎樣走這條巡禮</h2>" +
      "<p>這些書不能代替聖經。它們是雲彩般的見證人：有人在監獄裡認信，有人在講台上拆毀廉價恩典，有人把福音帶到緬甸、中國與倫敦貧民窟。我們讀他們，是為了更愛那本他們所愛的書。</p>" +
      "<p>巡禮按時代分七章。你可以先讀《天路歷程》，再按興趣進入一章；也可以用上方搜尋找作者或書名。每本書都有福音派視角的「為何值得讀」、較完整的介紹、書中重點與可核對的金句。少數中世紀神秘作品與近代作者附有謹慎說明。</p>" +
      "</div>" +
      '<aside class="clx-panel"><ol>' +
      '<li><span class="clx-num">01</span><div><strong class="serif">聖經作裁判</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">教父、改革者、清教徒與當代作者都要站在聖經面前。有造就就領受，有偏差就分辨。</p></div></li>' +
      '<li><span class="clx-num">02</span><div><strong class="serif">基督作中心</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">值得一讀的書，最終把人帶到十架與空墳墓，而不是作者的天才或我們的熱心。</p></div></li>' +
      '<li><span class="clx-num">03</span><div><strong class="serif">慢讀，並活出來</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">不必一年吞一百本。選一章、讀透兩本，用禱告與教會生活消化，勝過收藏書單。</p></div></li>' +
      "</ol></aside></section>" +
      '<section class="clx-section-head" id="chapters">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Seven chapters</div>' +
      "<h2>七個篇章</h2></section>" +
      '<div class="clx-grid-3">' +
      chs
        .map(function (c) {
          const count = booksInChapter(c.id).length;
          return (
            '<a class="clx-card" href="#/chapter/' +
            esc(c.id) +
            '">' +
            '<div class="clx-card-media" style="--card-tone:' +
            esc(c.tone) +
            '">' +
            (c.image
              ? '<img src="' + esc(c.image) + '" alt="" loading="lazy" onerror="this.remove()">'
              : "") +
            "</div>" +
            '<div class="clx-card-body"><div class="clx-kicker">第 ' +
            esc(c.no) +
            " 章 · " +
            count +
            " 本</div>" +
            "<h3>" +
            esc(c.title) +
            "</h3>" +
            '<p class="clx-en">' +
            esc(c.titleEn) +
            "</p>" +
            '<p class="clx-excerpt">' +
            esc(c.blurb) +
            "</p>" +
            '<span class="site-cta">進入此章 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
            "</div></a>"
          );
        })
        .join("") +
      "</div>" +
      '<section class="clx-section-head" id="books">' +
      '<div class="site-eyebrow" style="color:#8a6d28">The hundred</div>' +
      "<h2>一百本書</h2>" +
      '<p style="color:var(--muted);max-width:40rem;line-height:1.7">點選篇章篩選，或直接進入一本書。已讀過的書會留下記號，方便你慢慢走完這條巡禮。</p>' +
      '<div class="clx-chips" id="clx-chips">' +
      chips +
      "</div></section>" +
      '<div class="clx-grid-books" id="clx-book-grid">' +
      list.map(bookCard).join("") +
      "</div>" +
      '<p class="clx-empty' +
      (list.length ? "" : " is-on") +
      '" id="clx-empty">沒有符合的書。試試另一個關鍵字，或點「全部」。</p>' +
      "</div></main>" +
      footer();

    bindChips();
    const searchInput = document.getElementById("classics-search");
    if (searchInput && q) searchInput.value = q;
  }

  function bookCard(b) {
    const ch = chaptersById()[b.chapter];
    return (
      '<a class="clx-book" href="#/book/' +
      esc(b.id) +
      '">' +
      coverHtml(b) +
      '<div class="clx-book-body">' +
      '<div class="clx-book-meta"><span>' +
      (ch ? esc(ch.title) : "") +
      "</span><span>" +
      esc(b.year) +
      "</span></div>" +
      "<h3>" +
      (b.featured ? '<span class="clx-star">★ 中心書</span> ' : "") +
      esc(b.titleZh) +
      "</h3>" +
      '<p class="clx-en">' +
      esc(b.titleOrig) +
      "</p>" +
      '<p class="clx-excerpt">' +
      esc(b.blurb) +
      "</p>" +
      (b.caution ? '<span class="clx-caution">需分辨而讀</span>' : "") +
      (isRead(b.id) ? '<span class="clx-kicker" style="margin-top:.5rem">已讀</span>' : "") +
      "</div></a>"
    );
  }

  function bindChips() {
    const box = document.getElementById("clx-chips");
    if (!box) return;
    box.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const id = btn.getAttribute("data-filter");
      const q = (document.getElementById("classics-search") || {}).value || "";
      renderHub(id || "", q);
      const search = document.getElementById("classics-search");
      if (search) search.value = q;
    });
  }

  function renderChapter(id) {
    const ch = chaptersById()[id];
    if (!ch) {
      renderHub();
      return;
    }
    const list = booksInChapter(id);
    document.title = ch.title + "｜基督教經典書籍巡禮";
    root.innerHTML =
      '<main><div class="clx-wrap">' +
      '<nav class="clx-crumb"><a href="#/">巡禮首頁</a><span>/</span><span>' +
      esc(ch.title) +
      "</span></nav>" +
      '<section class="clx-chapter-hero">' +
      "<figure>" +
      (ch.image
        ? '<img src="' + esc(ch.image) + '" alt="' + esc(ch.title) + '" onerror="this.remove()">'
        : "") +
      "</figure>" +
      "<div>" +
      '<div class="clx-kicker">第 ' +
      esc(ch.no) +
      " 章 · " +
      esc(ch.era) +
      "</div>" +
      "<h1>" +
      esc(ch.title) +
      "</h1>" +
      '<p class="clx-en">' +
      esc(ch.titleEn) +
      "</p>" +
      '<p style="color:var(--muted);line-height:1.8">' +
      esc(ch.blurb) +
      "</p>" +
      '<p style="color:var(--gold-text);margin-top:1rem">本章共 ' +
      list.length +
      " 本</p>" +
      "</div></section>" +
      '<div class="clx-grid-books">' +
      list.map(bookCard).join("") +
      "</div>" +
      "</div></main>" +
      footer();
  }

  function renderBookLoading(meta) {
    document.title = (meta ? meta.titleZh : "載入中") + "｜基督教經典書籍巡禮";
    root.innerHTML =
      '<main><div class="clx-wrap"><p class="clx-loading">正在展開這本書的巡禮介紹…</p></div></main>';
  }

  function renderBook(meta, essay) {
    const ch = chaptersById()[meta.chapter];
    const all = books();
    const idx = all.findIndex((b) => b.id === meta.id);
    const prev = idx > 0 ? all[idx - 1] : null;
    const next = idx < all.length - 1 ? all[idx + 1] : null;
    const e = essay || {};
    markRead(meta.id);

    const intro = (e.intro || []).map((p) => "<p>" + p + "</p>").join("");
    const points = (e.highlights || []).map((p) => "<li>" + p + "</li>").join("");
    const quotes = (e.quotes || [])
      .map(function (q) {
        return (
          '<blockquote class="clx-quote"><p>' +
          q.zh +
          "</p>" +
          (q.orig ? '<p class="orig">' + esc(q.orig) + "</p>" : "") +
          (q.src ? "<cite>" + esc(q.src) + "</cite>" : "") +
          "</blockquote>"
        );
      })
      .join("");

    const allegory =
      e.allegory && e.allegory.length
        ? '<h2>寓言地圖：走一遍天路</h2><div class="clx-allegory">' +
          e.allegory
            .map(function (a) {
              return "<article><h3>" + a.title + "</h3><p>" + a.body + "</p></article>";
            })
            .join("") +
          "</div>"
        : "";

    document.title = "《" + meta.titleZh + "》｜基督教經典書籍巡禮";

    root.innerHTML =
      '<main><div class="clx-wrap">' +
      '<nav class="clx-crumb"><a href="#/">巡禮首頁</a><span>/</span>' +
      (ch ? '<a href="#/chapter/' + esc(ch.id) + '">' + esc(ch.title) + "</a><span>/</span>" : "") +
      "<span>《" +
      esc(meta.titleZh) +
      "》</span></nav>" +
      '<article class="clx-book-page">' +
      '<aside class="clx-book-side">' +
      coverHtml(meta) +
      (meta.featured ? '<p class="clx-star" style="margin-top:0.8rem">本巡禮中心書</p>' : "") +
      "</aside>" +
      "<div>" +
      (meta.featured ? '<div class="clx-kicker">Featured classic</div>' : '<div class="clx-kicker">' + esc(meta.era) + "</div>") +
      "<h1>《" +
      esc(meta.titleZh) +
      "》</h1>" +
      '<p class="clx-en">' +
      esc(meta.titleOrig) +
      "</p>" +
      '<dl class="clx-dl">' +
      "<dt>作者</dt><dd>" +
      esc(meta.author) +
      "</dd>" +
      "<dt>年代</dt><dd>" +
      esc(meta.year) +
      "</dd>" +
      "<dt>原文</dt><dd>" +
      esc(meta.lang) +
      "</dd>" +
      (ch ? "<dt>篇章</dt><dd>" + esc(ch.title) + "</dd>" : "") +
      "</dl>" +
      '<div class="clx-prose">' +
      "<h2>為何值得讀（福音派視角）</h2>" +
      "<p>" +
      (e.why || meta.blurb) +
      "</p>" +
      "<h2>詳細介紹</h2>" +
      intro +
      allegory +
      (points ? "<h2>書中重點</h2><ul class='clx-points'>" + points + "</ul>" : "") +
      (quotes ? " <h2>金句</h2>" + quotes : "") +
      (e.forWhom
        ? '<div class="clx-note"><h3>誰適合讀</h3><p>' + e.forWhom + "</p></div>"
        : "") +
      (e.tip ? '<div class="clx-note"><h3>閱讀建議</h3><p>' + e.tip + "</p></div>" : "") +
      (e.caution
        ? '<div class="clx-note is-caution"><h3>需謹慎之處</h3><p>' + e.caution + "</p></div>"
        : "") +
      "</div>" +
      '<nav class="clx-nav-books">' +
      (prev
        ? '<a href="#/book/' +
          esc(prev.id) +
          '"><small>上一本</small><strong class="serif">《' +
          esc(prev.titleZh) +
          "》</strong></a>"
        : "<span></span>") +
      (next
        ? '<a href="#/book/' +
          esc(next.id) +
          '" style="text-align:right"><small>下一本</small><strong class="serif">《' +
          esc(next.titleZh) +
          "》</strong></a>"
        : "<span></span>") +
      "</nav>" +
      "</div></article></div></main>" +
      footer();
  }

  function route() {
    const loc = parseHash();
    const searchInput = document.getElementById("classics-search");
    if (loc.view === "hub") {
      renderHub("", searchInput ? searchInput.value : "");
      return;
    }
    if (loc.view === "search") {
      renderHub("", loc.q || "");
      return;
    }
    if (loc.view === "chapter") {
      renderChapter(loc.id);
      return;
    }
    if (loc.view === "book") {
      const meta = bookMeta(loc.id);
      if (!meta) {
        renderHub();
        return;
      }
      const cached = chapterCache[meta.chapter];
      if (cached && cached[meta.id]) {
        renderBook(meta, cached[meta.id]);
        return;
      }
      renderBookLoading(meta);
      loadChapter(meta.chapter)
        .then(function (pack) {
          const now = parseHash();
          if (now.view !== "book" || now.id !== meta.id) return;
          renderBook(meta, pack[meta.id]);
        })
        .catch(function () {
          renderBook(meta, {
            why: meta.blurb,
            intro: ["此書的詳細介紹暫時未能載入。請檢查網絡後再試，或先回到篇章列表。"],
            highlights: [],
            quotes: []
          });
        });
    }
  }

  const searchInput = document.getElementById("classics-search");
  if (searchInput) {
    let t = null;
    function runSearch(q) {
      if (location.hash && location.hash !== "#/" && location.hash !== "#") {
        location.hash = "#/";
      }
      renderHub("", q);
      const again = document.getElementById("classics-search");
      if (again) {
        again.value = q;
        again.focus();
        const end = q.length;
        try {
          again.setSelectionRange(end, end);
        } catch (err) {}
      }
    }
    searchInput.addEventListener("input", function () {
      clearTimeout(t);
      const q = searchInput.value;
      t = setTimeout(function () {
        runSearch(q);
      }, 180);
    });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        runSearch(searchInput.value);
      }
    });
  }

  window.addEventListener("hashchange", route);
  route();
})();
