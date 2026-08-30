(function () {
  const STORAGE_KEY = "counseling-course-v1";
  const root = document.getElementById("counseling-app");
  if (!root) return;

  const catalog = function () {
    return window.COUNSELING_CATALOG || { chapters: [], groups: [] };
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

  const safeHref = function (href) {
    const h = String(href || "");
    if (/^#\/[\w\-/%.\u4e00-\u9fff]*$/i.test(h)) return h;
    if (/^\.\.\/[^"]+$/.test(h)) return h;
    if (/^https?:\/\//i.test(h)) return h;
    return "#/";
  };

  const rich = function (s) {
    return esc(s)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, text, href) {
        return '<a class="csl-prose-link" href="' + esc(safeHref(href)) + '">' + text + "</a>";
      })
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
    if (parts[0] === "chapter" && parts[1]) {
      return { view: "chapter", id: parts[1], jump: parts[2] || "" };
    }
    if (parts[0] === "search") {
      return { view: "hub", q: decodeURIComponent(parts.slice(1).join("/") || "") };
    }
    return { view: "hub" };
  };

  const lessonCache = {};
  const loading = {};

  const loadLesson = function (id) {
    if (lessonCache[id]) return Promise.resolve(lessonCache[id]);
    if (window.COUNSELING_LESSONS && window.COUNSELING_LESSONS[id]) {
      lessonCache[id] = window.COUNSELING_LESSONS[id];
      return Promise.resolve(lessonCache[id]);
    }
    if (loading[id]) return loading[id];
    loading[id] = new Promise(function (resolve, reject) {
      const s = document.createElement("script");
      s.src = "data/" + id + ".js";
      s.onload = function () {
        const pack = (window.COUNSELING_LESSONS || {})[id];
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
      '<p class="verse">Bear one another’s burdens, and so fulfill the law of Christ. Galatians 6:2</p>' +
      "<p>「你們各人的重擔要互相擔當，如此，就完全了基督的律法。」加拉太書 6:2</p>" +
      '<p style="margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;font-size:0.78rem">本課以福音派神學院基督教輔導學教授的教室聲音授課。經文採用和合本。本網站是教學，不是緊急熱線，也不是診療或法律諮詢。插圖取自公開領域作品，僅作教學連線。</p>' +
      "</footer>"
    );
  };

  const sister = function () {
    return (
      '<div class="csl-sister">' +
      '<a href="../教會紀律/index.html">相關研讀：教會紀律</a>' +
      '<a href="../基督教經典書籍巡禮/index.html">相關研讀：基督教經典書籍巡禮</a>' +
      '<a href="../信仰討論/index.html">相關研讀：信仰討論</a>' +
      "</div>"
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
      '<a class="csl-card" href="#/chapter/' +
      esc(c.id) +
      '">' +
      '<div class="csl-card-media" style="--card-tone:' +
      esc(c.tone) +
      '"></div>' +
      '<div class="csl-card-body"><div class="csl-kicker">第 ' +
      esc(c.no) +
      " 講 · " +
      esc(c.era) +
      "</div>" +
      "<h3>" +
      esc(c.title) +
      "</h3>" +
      '<p class="csl-en">' +
      esc(c.titleEn) +
      "</p>" +
      '<p class="csl-excerpt">' +
      esc(c.blurb) +
      "</p>" +
      '<span class="site-cta">進入此講 <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></span>' +
      (isRead(c.id) ? '<span class="csl-read">已修讀</span>' : "") +
      "</div></a>"
    );
  };

  const renderHub = function (query, groupId) {
    const cat = catalog();
    const q = query || "";
    const g = groupId || "";
    let list = q ? searchChapters(q) : chapters();
    if (g && !q) {
      list = list.filter(function (c) {
        return c.group === g;
      });
    }
    const readCount = chapters().filter(function (c) {
      return isRead(c.id);
    }).length;

    document.title = "基督教輔導學｜聖經研讀";

    const chips = ['<button type="button" class="csl-chip' + (!g ? " is-on" : "") + '" data-group="">全部十九講</button>']
      .concat(
        (cat.groups || []).map(function (group) {
          return (
            '<button type="button" class="csl-chip' +
            (g === group.id ? " is-on" : "") +
            '" data-group="' +
            esc(group.id) +
            '">' +
            esc(group.title) +
            "</button>"
          );
        })
      )
      .join("");

    root.innerHTML =
      '<section class="csl-hero" aria-label="基督教輔導學">' +
      '<div class="csl-hero-media"><img src="' +
      esc(cat.hero.src) +
      '" alt="' +
      esc(cat.hero.alt) +
      '" width="1280" height="720"></div>' +
      '<div class="csl-hero-shade"></div>' +
      '<div class="csl-hero-inner">' +
      '<div class="site-eyebrow">Christian Counseling · Soul Care</div>' +
      "<h1>" +
      esc(cat.title) +
      "<em>" +
      esc(cat.titleEn) +
      "</em></h1>" +
      '<p class="csl-hero-lead">' +
      esc(cat.lead) +
      "</p>" +
      '<blockquote class="csl-hero-verse">「' +
      esc(cat.verse.zh) +
      "」<cite>" +
      esc(cat.verse.ref) +
      "</cite></blockquote>" +
      '<div class="csl-hero-stats">' +
      "<div><strong>19</strong><span>講課堂課文</span></div>" +
      "<div><strong>10</strong><span>個核心課題</span></div>" +
      "<div><strong>" +
      readCount +
      "</strong><span>講已修讀</span></div>" +
      "</div></div></section>" +
      '<main><div class="csl-wrap">' +
      '<aside class="csl-stance" aria-label="本課認信位置"><h2>教授開場：輔導服事福音，不代替福音</h2><p>' +
      esc(cat.stance) +
      "</p>" +
      '<div class="csl-limits"><h3>使用界限</h3><p>若你或身邊的人正面對自殺、家暴、性侵犯或急性精神症狀，請立刻聯絡當地緊急服務（香港可打 999）或前往急症室。本課程是神學與牧養教學，不是即時援助、不是診斷、不是處方。</p></div></aside>' +
      '<section class="csl-intro">' +
      "<div><div class=\"site-rule\"></div>" +
      "<h2>怎樣上這門課</h2>" +
      "<p>先讀導論與聖經神學，再看歷史學派與倫理，然後才進入十個核心課題。危機處理與華人處境不是附錄：它們校正我們，免得把北美課本原封不動搬進華人堂會。</p>" +
      "<p>每一講都有學習目標、教室講章、重點、金句、牧養應用、常見錯誤，以及「何時轉介」。實習反思題給神學生小組用。上方搜尋可找課題或經卷。已修讀的篇章會留下記號。</p>" +
      "</div>" +
      '<aside class="csl-panel"><ol>' +
      '<li><span class="csl-num">01</span><div><strong class="serif">聖經作裁判</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">學派、技巧與文化觀察都要站在聖經面前。有智慧就領受，有偏差就分辨。</p></div></li>' +
      '<li><span class="csl-num">02</span><div><strong class="serif">兩極都拒絕</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">不把心理學當福音，也不反智地否認身體、腦與醫學。過靈性化與過醫療化都傷害羊。</p></div></li>' +
      '<li><span class="csl-num">03</span><div><strong class="serif">帶回教會</strong><p style="margin:.25rem 0 0;color:var(--muted);line-height:1.65">輔導若使人離開講台、聖禮與肢體，就走歪了。靈魂關顧是門徒生活的一部分。</p></div></li>' +
      "</ol></aside></section>" +
      '<section class="csl-section-head" id="chapters">' +
      '<div class="site-eyebrow" style="color:#8a6d28">Nineteen lectures</div>' +
      " <h2>十九講課程</h2>" +
      (q
        ? '<p style="color:var(--muted);max-width:40rem;line-height:1.7">搜尋「' +
          esc(q) +
          "」：找到 " +
          list.length +
          " 講。</p>"
        : '<p style="color:var(--muted);max-width:42rem;line-height:1.7">建議按序修讀。也可先進入你正在牧養的課題，再回頭補根基。核心課題不是一句話的靈修金句，每講都當一堂課來讀。</p>') +
      '<div class="csl-chips" id="csl-chips">' +
      chips +
      "</div></section>" +
      '<div class="csl-grid">' +
      list.map(chapterCard).join("") +
      "</div>" +
      '<p class="csl-empty' +
      (list.length ? "" : " is-on") +
      '">沒有符合的篇章。試試「羞恥」「抑鬱」「轉介」「亞當斯」或「面子」。</p>' +
      sister() +
      "</div></main>" +
      footer();

    const box = document.getElementById("csl-chips");
    if (box) {
      box.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-group]");
        if (!btn) return;
        const searchInput = document.getElementById("counseling-search");
        renderHub(searchInput ? searchInput.value : "", btn.getAttribute("data-group") || "");
        const again = document.getElementById("counseling-search");
        if (again && searchInput) again.value = searchInput.value;
      });
    }

    const searchInput = document.getElementById("counseling-search");
    if (searchInput && q) searchInput.value = q;
  };

  const renderCallout = function (c) {
    if (!c) return "";
    const tone = c.tone || "judge";
    return (
      '<aside class="csl-callout csl-callout--' +
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
      '<div class="csl-table-wrap"><table class="csl-table">' +
      (t.caption ? "<caption>" + rich(t.caption) + "</caption>" : "") +
      "<thead><tr>" +
      heads +
      "</tr></thead><tbody>" +
      rows +
      "</tbody></table></div>"
    );
  };

  const renderVerse = function (v) {
    return (
      '<blockquote class="csl-verse"><p>「' +
      rich(v.zh) +
      "」</p><cite>" +
      esc(v.ref) +
      "</cite>" +
      (v.note ? '<span class="csl-note">' + rich(v.note) + "</span>" : "") +
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
      '<section class="csl-section" id="' +
      esc(sec.id) +
      '"><h2>' +
      rich(sec.heading) +
      "</h2>" +
      (sec.latin ? '<p class="csl-latin">' + esc(sec.latin) + "</p>" : "") +
      paras +
      list +
      renderTable(sec.table) +
      verses +
      renderCallout(sec.callout) +
      "</section>"
    );
  };

  const jumpTo = function (id) {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderLesson = function (meta, lesson, jump) {
    markRead(meta.id);
    const chs = chapters();
    const idx = chs.findIndex(function (c) {
      return c.id === meta.id;
    });
    const prev = idx > 0 ? chs[idx - 1] : null;
    const next = idx < chs.length - 1 ? chs[idx + 1] : null;
    const L = lesson || {};

    document.title = meta.title + "｜基督教輔導學";

    const tocItems = [{ id: "goals", heading: "學習目標" }]
      .concat(
        (L.sections || []).map(function (s) {
          return { id: s.id, heading: s.heading };
        })
      )
      .concat([
        { id: "highlights", heading: "本講重點" },
        { id: "verses", heading: "金句" },
        { id: "pastoral", heading: "牧養應用" },
        { id: "mistakes", heading: "常見錯誤" }
      ]);

    if (L.referWhen && L.referWhen.length) tocItems.push({ id: "refer", heading: "何時轉介" });
    if (L.practicum && L.practicum.length) tocItems.push({ id: "practicum", heading: "實習反思" });

    const goals =
      '<section class="csl-goals" id="goals"><h2>學習目標</h2><ul>' +
      (L.goals || [])
        .map(function (g) {
          return "<li>" + rich(g) + "</li>";
        })
        .join("") +
      "</ul></section>";

    const voice = L.voice
      ? '<p class="csl-voice"><strong>教授提要。</strong> ' + rich(L.voice) + "</p>"
      : "";

    const alertBox = L.alert
      ? '<aside class="csl-alert" role="alert"><h2>' +
        rich(L.alert.title || "安全提示") +
        "</h2><p>" +
        rich(L.alert.body || "") +
        "</p></aside>"
      : "";

    const highlights =
      '<section class="csl-highlights" id="highlights"><h2>本講重點</h2><ul>' +
      (L.highlights || [])
        .map(function (h) {
          return "<li>" + rich(h) + "</li>";
        })
        .join("") +
      "</ul></section>";

    const verses =
      '<section class="csl-verses" id="verses"><h2>金句</h2>' +
      (L.verses || []).map(renderVerse).join("") +
      "</section>";

    const pastoral =
      '<section class="csl-pastoral" id="pastoral"><h2>牧養應用</h2>' +
      (L.pastoral || [])
        .map(function (p) {
          return "<p>" + rich(p) + "</p>";
        })
        .join("") +
      "</section>";

    const mistakes =
      '<section class="csl-mistakes" id="mistakes"><h2>常見錯誤</h2><dl>' +
      (L.mistakes || [])
        .map(function (m) {
          return "<div><dt>" + rich(m.title) + "</dt><dd>" + rich(m.body) + "</dd></div>";
        })
        .join("") +
      "</dl></section>";

    const refer =
      L.referWhen && L.referWhen.length
        ? '<section class="csl-refer" id="refer"><h2>何時轉介</h2><dl>' +
          L.referWhen.map(function (m) {
            return "<div><dt>" + rich(m.title) + "</dt><dd>" + rich(m.body) + "</dd></div>";
          }).join("") +
          "</dl></section>"
        : "";

    const practicum =
      L.practicum && L.practicum.length
        ? '<section class="csl-practicum" id="practicum"><h2>實習反思</h2><ol>' +
          L.practicum.map(function (q) {
            return "<li>" + rich(q) + "</li>";
          }).join("") +
          "</ol></section>"
        : "";

    root.innerHTML =
      "<main><div class='csl-wrap'>" +
      '<nav class="csl-crumb"><a href="#/">基督教輔導學</a><span>/</span><span>第 ' +
      esc(meta.no) +
      " 講</span></nav>" +
      '<div class="csl-layout">' +
      '<nav class="csl-toc" aria-label="本講目錄"><h2>本講目錄</h2><ol>' +
      tocItems
        .map(function (t) {
          return (
            '<li><a href="#/chapter/' +
            esc(meta.id) +
            "/" +
            esc(t.id) +
            '">' +
            esc(t.heading) +
            "</a></li>"
          );
        })
        .join("") +
      "</ol></nav>" +
      '<article class="csl-article">' +
      '<header class="csl-chapter-hero"><div>' +
      '<div class="csl-kicker">第 ' +
      esc(meta.no) +
      " 講 · " +
      esc(meta.era) +
      "</div>" +
      "<h1>" +
      esc(meta.title) +
      "</h1>" +
      '<p class="csl-en">' +
      esc(meta.titleEn) +
      "</p>" +
      '<p style="color:var(--muted);line-height:1.8">' +
      esc(meta.blurb) +
      "</p></div></header>" +
      alertBox +
      goals +
      voice +
      (L.sections || []).map(renderSection).join("") +
      highlights +
      verses +
      pastoral +
      mistakes +
      refer +
      practicum +
      '<nav class="csl-pager">' +
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
      "</nav></article></div>" +
      sister() +
      "</div></main>" +
      footer();

    if (jump) {
      requestAnimationFrame(function () {
        jumpTo(jump);
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const route = function () {
    const loc = parseHash();
    if (loc.view === "chapter") {
      const meta = byId(loc.id);
      if (!meta) {
        renderHub();
        return;
      }
      const cached = lessonCache[meta.id];
      if (cached) {
        renderLesson(meta, cached, loc.jump);
        return;
      }
      document.title = meta.title + "｜基督教輔導學";
      root.innerHTML =
        '<main><div class="csl-wrap"><p class="csl-loading">正在展開第 ' +
        esc(meta.no) +
        " 講…</p></div></main>";
      loadLesson(meta.id)
        .then(function (lesson) {
          const now = parseHash();
          if (now.view !== "chapter" || now.id !== meta.id) return;
          renderLesson(meta, lesson, now.jump);
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
    renderHub(loc.q || "", "");
  };

  const searchInput = document.getElementById("counseling-search");
  if (searchInput) {
    let t = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(t);
      const q = searchInput.value;
      t = setTimeout(function () {
        const loc = parseHash();
        if (loc.view === "hub") {
          renderHub(q, "");
          const again = document.getElementById("counseling-search");
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
        renderHub(searchInput.value, "");
        const again = document.getElementById("counseling-search");
        if (again) again.value = searchInput.value;
      }
    });
  }

  window.addEventListener("hashchange", route);
  route();
})();
