(function () {
  const STORAGE_KEY = "faith-share-v1";

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

  const topicState = (topicId) => {
    const all = loadState();
    if (!all[topicId]) all[topicId] = { read: [], quiz: null, last: null };
    return { all, cur: all[topicId] };
  };

  const markRead = (topicId, sectionId) => {
    const { all, cur } = topicState(topicId);
    if (!cur.read.includes(sectionId)) cur.read.push(sectionId);
    cur.last = sectionId;
    all[topicId] = cur;
    saveState(all);
  };

  const saveQuiz = (topicId, score, total) => {
    const { all, cur } = topicState(topicId);
    cur.quiz = { score, total, at: Date.now() };
    all[topicId] = cur;
    saveState(all);
  };

  const getTopic = (id) => (window.FAITH_TOPICS || {})[id];

  const catalog = () => window.FAITH_CATALOG || [];

  function parseHash(mode, fallbackTopic) {
    const raw = (location.hash || "").replace(/^#\/?/, "").trim();
    if (mode === "hub") {
      if (!raw) return { topicId: null, sectionId: null };
      const [topicId, sectionId] = raw.split("/");
      return { topicId: topicId || null, sectionId: sectionId || null };
    }
    const sectionId = raw.replace(/^\/+/, "") || null;
    return { topicId: fallbackTopic, sectionId };
  }

  function setHash(mode, topicId, sectionId) {
    if (mode === "hub") {
      location.hash = sectionId ? `/${topicId}/${sectionId}` : `/${topicId}`;
    } else {
      location.hash = sectionId ? `/${sectionId}` : "";
    }
  }

  function collectText(block) {
    if (!block) return "";
    const parts = [];
    ["title", "body", "zh", "notes", "research", "explanation", "lemma", "gloss", "html", "left", "right"].forEach((k) => {
      if (block[k]) parts.push(String(block[k]));
    });
    if (Array.isArray(block.paragraphs)) parts.push(block.paragraphs.join(" "));
    if (Array.isArray(block.items)) parts.push(block.items.map((i) => (i.title || "") + " " + (i.body || "")).join(" "));
    if (Array.isArray(block.points)) parts.push(block.points.join(" "));
    if (Array.isArray(block.rows)) parts.push(block.rows.map((r) => r.join(" ")).join(" "));
    return parts.join(" ");
  }

  function searchAll(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hits = [];
    catalog().forEach((meta) => {
      const topic = getTopic(meta.id);
      if (!topic) return;
      (topic.sections || []).forEach((sec) => {
        const blob = [sec.title, sec.titleEn, ...(sec.blocks || []).map(collectText)].join(" ").toLowerCase();
        if (blob.includes(q)) {
          const idx = blob.indexOf(q);
          hits.push({
            topicId: topic.id,
            folder: meta.folder,
            sectionId: sec.id,
            title: `${topic.title} · ${sec.title}`,
            snippet: blob.slice(Math.max(0, idx - 24), idx + 56)
          });
        }
      });
      (topic.quiz || []).forEach((item) => {
        const blob = [item.question, item.feedback, ...(item.options || [])].join(" ").toLowerCase();
        if (blob.includes(q)) {
          hits.push({
            topicId: topic.id,
            folder: meta.folder,
            sectionId: "lab",
            title: `${topic.title} · 測驗`,
            snippet: item.question
          });
        }
      });
      (topic.lexicon || []).forEach((w) => {
        const blob = [w.lemma, w.translit, w.gloss, w.research, w.explanation].join(" ").toLowerCase();
        if (blob.includes(q)) {
          hits.push({
            topicId: topic.id,
            folder: meta.folder,
            sectionId: "lexicon",
            title: `${topic.title} · 原文詞庫 · ${w.lemma}`,
            snippet: (w.gloss || "") + " — " + (w.explanation || "").slice(0, 48)
          });
        }
      });
    });
    if (window.FaithHymns && window.FaithHymns.searchHits) {
      hits.push.apply(hits, window.FaithHymns.searchHits(query));
    }
    return hits.slice(0, 18);
  }

  function renderBlock(block, topic) {
    switch (block.type) {
      case "lead":
        return `<p class="text-lg leading-relaxed text-slate-700">${block.html || esc(block.body)}</p>`;
      case "prose":
        if (block.html) return `<div class="space-y-3 leading-relaxed text-slate-700">${block.html}</div>`;
        return `<div class="space-y-3 leading-relaxed text-slate-700">${(block.paragraphs || [block.body || ""]).map((p) => `<p>${p}</p>`).join("")}</div>`;
      case "verse":
        return `
          <figure class="faith-verse rounded-r-xl p-5 my-4">
            ${block.original ? `<p class="${block.lang === "el" ? "faith-el" : "faith-he"} text-xl mb-3">${block.original}</p>` : ""}
            <blockquote class="faith-serif text-lg text-slate-900">${esc(block.zh)}</blockquote>
            <figcaption class="mt-2 text-right text-sm font-semibold" style="color:var(--faith-accent)">${esc(block.ref)}</figcaption>
            ${block.notes ? `<p class="mt-3 text-sm text-slate-600">${block.notes}</p>` : ""}
          </figure>`;
      case "wordstudy":
        return `
          <article class="rounded-xl p-5 my-4 border-l-4" style="border-color:var(--faith-accent);background:linear-gradient(135deg,#fffbeb,#fef3c7)">
            <p class="text-xs font-bold tracking-widest uppercase text-amber-800 mb-2">原文研究</p>
            <h4 class="text-xl font-bold mb-1">${block.lang === "el" ? `<span class="faith-el">${esc(block.lemma)}</span>` : `<span class="faith-he">${esc(block.lemma)}</span>`}
              <span class="text-base font-medium text-slate-600"> ${esc(block.translit || "")}</span>
            </h4>
            <p class="text-sm font-semibold text-slate-800 mb-3">${esc(block.gloss || "")}</p>
            <div class="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div><p class="font-bold text-slate-900 mb-1">詳細研究</p><p>${block.research || ""}</p></div>
              <div><p class="font-bold text-slate-900 mb-1">解釋與應用</p><p>${block.explanation || ""}</p></div>
            </div>
            ${block.parse ? `<p class="mt-3 text-xs text-slate-500">文法：${esc(block.parse)}</p>` : ""}
          </article>`;
      case "cards":
        return `<div class="grid md:grid-cols-${block.cols || 3} gap-4 my-4">${(block.items || []).map((item) => `
          <div class="faith-card p-4">
            <p class="text-2xl mb-2">${item.icon || ""}</p>
            <h4 class="font-bold mb-1">${esc(item.title)}</h4>
            <p class="text-sm text-slate-600">${item.body || ""}</p>
          </div>`).join("")}</div>`;
      case "compare":
        return `
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="faith-card p-5 border-t-4 border-t-blue-600">
              <p class="faith-chip faith-chip-es mb-3">一種理解</p>
              <h4 class="font-bold mb-2">${esc(block.leftTitle || "一種理解")}</h4>
              <div class="text-sm text-slate-700 space-y-2">${block.left}</div>
            </div>
            <div class="faith-card p-5 border-t-4 border-t-pink-600">
              <p class="faith-chip faith-chip-pec mb-3">另一種理解</p>
              <h4 class="font-bold mb-2">${esc(block.rightTitle || "另一種理解")}</h4>
              <div class="text-sm text-slate-700 space-y-2">${block.right}</div>
            </div>
          </div>
          ${block.note ? `<p class="text-xs text-slate-500">${block.note}</p>` : ""}`;
      case "stance": {
        const cls = block.kind === "evangel" ? "faith-chip-es" : block.kind === "pec" ? "faith-chip-pec" : "faith-chip-shared";
        const label = block.kind === "evangel" ? "認信重點" : block.kind === "pec" ? "牧養重點" : "核心認信";
        return `
          <aside class="faith-card p-5 my-4">
            <p class="faith-chip ${cls} mb-3">${label}</p>
            <h4 class="font-bold mb-2">${esc(block.title || "")}</h4>
            <div class="text-sm text-slate-700 leading-relaxed">${block.body}</div>
          </aside>`;
      }
      case "research":
        return `
          <div class="faith-card p-5 my-4">
            <h4 class="font-bold mb-3">詳細研究：${esc(block.title || "")}</h4>
            <ul class="space-y-2 text-sm text-slate-700">${(block.points || []).map((p) => `<li class="pl-4 border-l-2" style="border-color:var(--faith-accent)">${p}</li>`).join("")}</ul>
          </div>`;
      case "callout":
        return `<div class="rounded-xl p-4 my-4 ${block.tone === "warn" ? "bg-amber-50 border border-amber-200" : "bg-slate-50 border border-slate-200"}">
          <p class="font-bold mb-1">${esc(block.title || "")}</p>
          <p class="text-sm text-slate-700">${block.body}</p>
        </div>`;
      case "table":
        return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border-collapse">
          <thead><tr>${(block.headers || []).map((h) => `<th class="text-left p-2 bg-slate-900 text-white">${esc(h)}</th>`).join("")}</tr></thead>
          <tbody>${(block.rows || []).map((r, i) => `<tr class="${i % 2 ? "bg-slate-50" : "bg-white"}">${r.map((c) => `<td class="p-2 align-top border-b border-slate-100">${c}</td>`).join("")}</tr>`).join("")}</tbody>
        </table></div>`;
      case "timeline":
        return `<ol class="space-y-3 my-4">${(block.items || []).map((it) => `
          <li class="faith-card p-4 flex gap-4">
            <span class="faith-chip text-white shrink-0" style="background:var(--faith-accent)">${esc(it.step)}</span>
            <div><p class="font-bold">${esc(it.title)}</p><p class="text-sm text-slate-600">${it.body || ""}</p></div>
          </li>`).join("")}</ol>`;
      case "original":
        return `<div class="faith-original my-4">
          <p class="text-xs uppercase tracking-widest text-slate-400 mb-2">${esc(block.label || "原文")}</p>
          <p class="${block.lang === "el" ? "faith-el" : "faith-he"} text-2xl">${block.text}</p>
          ${block.gloss ? `<p class="mt-2 text-sm text-slate-300">${block.gloss}</p>` : ""}
        </div>`;
      case "reflection":
        return `<div class="rounded-xl p-5 my-4 text-white" style="background:linear-gradient(135deg,var(--faith-accent),var(--faith-accent-2))">
          <p class="text-xs tracking-widest uppercase opacity-80 mb-2">反思與應用</p>
          <h4 class="font-bold mb-2">${esc(block.title || "")}</h4>
          <ul class="text-sm space-y-1">${(block.questions || []).map((q) => `<li>• ${q}</li>`).join("")}</ul>
        </div>`;
      case "workshop":
        return renderWorkshop(block);
      default:
        return "";
    }
  }

  function renderWorkshop(block) {
    const words = block.words || [];
    return `
      <div class="faith-card p-5 my-4" data-workshop>
        <h4 class="font-bold mb-1">${esc(block.title || "原文工作坊")}</h4>
        <p class="text-sm text-slate-500 mb-4">${esc(block.intro || "點擊詞語，查看研究與解釋。")}</p>
        <p class="faith-he text-2xl leading-loose mb-4">${words.map((w, i) =>
          `<button type="button" class="faith-word mx-1" data-ws="${i}">${esc(w.form)}</button>`
        ).join(" ")}</p>
        <div class="rounded-lg bg-slate-50 p-4 text-sm" data-ws-panel>
          <p class="text-slate-500">請選擇上方一個原文詞。</p>
        </div>
      </div>`;
  }

  function workshopHTML(word) {
    return `
      <p class="faith-he text-2xl mb-1">${esc(word.form)}</p>
      <p class="text-sm font-semibold text-slate-800">${esc(word.lemma || "")} · ${esc(word.translit || "")} · ${esc(word.gloss || "")}</p>
      <p class="mt-2"><strong>研究：</strong>${word.research || ""}</p>
      <p class="mt-1"><strong>解釋：</strong>${word.explanation || ""}</p>`;
  }

  function renderLexicon(topic) {
    return `
      <div class="grid md:grid-cols-2 gap-4">
        ${(topic.lexicon || []).map((w, i) => `
          <button type="button" class="faith-card p-4 text-left hover:-translate-y-0.5 transition" data-lex="${i}">
            <p class="${w.lang === "el" ? "faith-el" : "faith-he"} text-2xl">${esc(w.lemma)}</p>
            <p class="text-xs text-slate-500">${esc(w.translit || "")} · ${esc(w.pos || "")}</p>
            <p class="font-bold mt-1">${esc(w.gloss || "")}</p>
            <p class="text-sm text-slate-600 mt-1">${esc((w.explanation || "").slice(0, 72))}…</p>
          </button>`).join("")}
      </div>`;
  }

  function renderLab(topic) {
    const matching = topic.matching || [];
    const quiz = topic.quiz || [];
    return `
      <div class="space-y-8">
        <section class="faith-card p-5">
          <h3 class="text-xl font-bold mb-3">經文／原文配對</h3>
          <p class="text-sm text-slate-500 mb-4">點左邊主題，右邊顯示對應經文與解釋。</p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">${matching.map((m, i) =>
              `<button type="button" class="faith-quiz-btn" data-match="${i}">${esc(m.prompt)}</button>`
            ).join("")}</div>
            <div class="rounded-xl bg-slate-900 text-slate-200 p-5 min-h-[180px] flex items-center" data-match-panel>
              <p class="italic text-slate-400">請選擇左側項目…</p>
            </div>
          </div>
        </section>
        <section class="faith-card p-5">
          <h3 class="text-xl font-bold mb-3">主日學測驗</h3>
          <div class="space-y-6" data-quiz>
            ${quiz.map((q, qi) => `
              <div data-q="${qi}">
                <p class="font-bold mb-2">${qi + 1}. ${esc(q.question)}</p>
                <div class="space-y-2">${(q.options || []).map((opt, oi) =>
                  `<button type="button" class="faith-quiz-btn" data-q="${qi}" data-opt="${oi}">${esc(opt)}</button>`
                ).join("")}</div>
                <p class="hidden mt-2 text-sm" data-fb></p>
              </div>`).join("")}
          </div>
          <p class="mt-4 text-sm font-semibold" data-quiz-score></p>
        </section>
      </div>`;
  }

  function renderSection(topic, sectionId) {
    if (sectionId === "lexicon") {
      return `<header class="mb-6 border-b pb-4"><p class="text-xs tracking-widest uppercase" style="color:var(--faith-accent)">Lexicon</p><h2 class="text-3xl font-bold">原文詞庫</h2></header>${renderLexicon(topic)}`;
    }
    if (sectionId === "lab") {
      return `<header class="mb-6 border-b pb-4"><p class="text-xs tracking-widest uppercase" style="color:var(--faith-accent)">Laboratory</p><h2 class="text-3xl font-bold">互動主日學實驗室</h2></header>${renderLab(topic)}`;
    }
    if (sectionId === "hymns" && window.FaithHymns) {
      return window.FaithHymns.renderStudio();
    }
    if (sectionId === "player" && window.FaithHymns) {
      return window.FaithHymns.renderPlayer();
    }
    const sec = (topic.sections || []).find((s) => s.id === sectionId) || topic.sections[0];
    return `
      <header class="mb-6 border-b pb-4">
        <p class="text-xs tracking-widest uppercase" style="color:var(--faith-accent)">${esc(sec.titleEn || "")}</p>
        <h2 class="text-3xl font-bold">${esc(sec.title)}</h2>
      </header>
      <div class="space-y-2">${(sec.blocks || []).map((b) => renderBlock(b, topic)).join("")}</div>`;
  }

  function navItems(topic) {
    const items = (topic.sections || []).map((s, i) => ({
      id: s.id,
      label: `${String(i + 1).padStart(2, "0")}. ${s.title}`
    }));
    items.push({ id: "lexicon", label: "原文詞庫" });
    items.push({ id: "lab", label: "互動實驗室" });
    if (topic.id === "church" && window.FaithHymns) {
      items.push({ id: "hymns", label: "AI 詩歌模組" });
      items.push({ id: "player", label: "詩歌播放" });
    }
    return items;
  }

  function topicHref(meta, sectionId, ctx) {
    if (ctx.mode === "hub") return `#/${meta.id}${sectionId ? "/" + sectionId : ""}`;
    const prefix = ctx.base ? ctx.base + "/" : "";
    return `${prefix}${meta.folder}/index.html${sectionId ? "#/" + sectionId : ""}`;
  }

  function renderHubLanding(ctx) {
    const q = ctx.lastQuery || "";
    const hits = q ? searchAll(q) : [];
    const state = loadState();
    return `
      <div class="faith-fade max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section class="text-center space-y-4">
          <p><a href="../index.html" class="text-sm text-slate-500 hover:text-slate-800">← 返回主頁</a></p>
          <p class="faith-chip faith-chip-shared mx-auto">原文 · 研究 · 解釋</p>
          <h1 class="text-4xl md:text-5xl font-bold">信仰分享</h1>
          <p class="text-slate-600 max-w-2xl mx-auto">以「人論」為內容深度與模板：原文、詳細研究、解釋，按聖經與福音派認信整理六大教義。遇有不同理解，分開對照，不強行合併。</p>
          <label class="block max-w-xl mx-auto">
            <span class="sr-only">搜尋</span>
            <input type="search" data-global-search value="${esc(q)}" placeholder="搜尋原文、教義、經文…" class="w-full rounded-full border border-slate-200 px-5 py-3 shadow-sm">
          </label>
        </section>
        <section class="faith-card p-5 ${hits.length ? "" : "hidden"}" data-search-results>
          <h3 class="font-bold mb-3">搜尋結果</h3>
          <ul class="space-y-2" data-search-list>${hits.map((h) =>
            `<li><a class="text-sm hover:underline" style="color:var(--faith-accent)" href="${ctx.mode === "hub" ? `#/${h.topicId}/${h.sectionId}` : topicHref({ id: h.topicId, folder: h.folder }, h.sectionId, ctx)}">${esc(h.title)}</a><p class="text-xs text-slate-500">${esc(h.snippet)}</p></li>`
          ).join("")}</ul>
        </section>
        <section class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          ${catalog().map((m) => {
            const t = getTopic(m.id);
            const st = state[m.id] || { read: [] };
            const total = ((t && t.sections) || []).length + 2;
            const pct = Math.round((st.read.length / Math.max(total, 1)) * 100);
            return `
              <a href="${topicHref(m, st.last || (t && t.sections[0] && t.sections[0].id), ctx)}" class="faith-card p-6 hover:-translate-y-1 transition block">
                <p class="text-xs uppercase tracking-widest text-slate-400">${esc(m.en)}</p>
                <h3 class="text-2xl font-bold my-1">${esc(m.title)}</h3>
                <p class="text-sm text-slate-600 mb-4">${esc(m.blurb)}</p>
                <div class="faith-progress mb-2"><span style="width:${pct}%"></span></div>
                <p class="text-xs text-slate-500">進度 ${pct}%</p>
              </a>`;
          }).join("")}
        </section>
        ${window.FaithHymns ? `<section class="faith-card p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <p class="faith-chip faith-chip-shared mb-2">教會論新單元</p>
            <h2 class="text-2xl font-bold mb-1">AI 詩歌模組與播放軟件</h2>
            <p class="text-sm text-slate-600">按團契、聖道、十架、聖靈、宣教等主題起草詩歌，並播放本站 AI 詩歌錄音。</p>
          </div>
          <div class="flex flex-wrap gap-2 shrink-0">
            <a href="${ctx.mode === "hub" ? "#/church/hymns" : topicHref({ id: "church", folder: "教會" }, "hymns", ctx)}" class="faith-hymn-action">AI 詩歌模組</a>
            <a href="${ctx.mode === "hub" ? "#/church/player" : topicHref({ id: "church", folder: "教會" }, "player", ctx)}" class="faith-hymn-action is-ghost">詩歌播放</a>
          </div>
        </section>` : ""}
        <section class="faith-card p-6 md:p-8">
          <h2 class="text-2xl font-bold mb-3">怎樣讀這套教材</h2>
          <div class="grid md:grid-cols-3 gap-4 text-sm">
            <div><p class="font-bold mb-1">1. 原文</p><p class="text-slate-600">希伯來文／希臘文詞形、音譯、文法與上下文。</p></div>
            <div><p class="font-bold mb-1">2. 詳細研究</p><p class="text-slate-600">字根、同義詞、救贖歷史與系統神學位置。</p></div>
            <div><p class="font-bold mb-1">3. 解釋</p><p class="text-slate-600">按聖經與福音派認信說明；遇有不同理解則另欄對照。</p></div>
          </div>
        </section>
        <footer class="text-center py-6 text-slate-500 text-sm">
          <p class="italic mb-1">But God made the earth by his power… Jeremiah 10:12</p>
          <p class="text-xs">「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」耶利米書 10:12</p>
          <p class="text-xs mt-2 pt-2 border-t">按聖經與福音派認信整理 · Prepared by SF Lau</p>
        </footer>
      </div>`;
  }

  function renderReader(ctx, topic, sectionId) {
    const items = navItems(topic);
    const active = sectionId || items[0].id;
    const { cur } = topicState(topic.id);
    const pct = Math.round((cur.read.length / items.length) * 100);
    const idx = items.findIndex((i) => i.id === active);
    const prev = items[idx - 1];
    const next = items[idx + 1];
    const meta = catalog().find((c) => c.id === topic.id) || {};

    return `
      <div class="flex min-h-screen">
        <aside class="faith-aside" data-aside>
          <div class="p-5 border-b border-slate-700">
            <a href="${ctx.mode === "hub" ? "#" : ctx.base + "/index.html"}" class="text-xs text-slate-400 hover:text-white">← 信仰分享總覽</a>
            <h1 class="text-xl font-bold text-white mt-2">${esc(topic.title)}</h1>
            <p class="text-xs text-slate-400">${esc(topic.titleEn || "")}</p>
            <div class="faith-progress mt-3"><span style="width:${pct}%"></span></div>
          </div>
          <nav class="p-3 space-y-1 overflow-y-auto">${items.map((it) =>
            `<button type="button" class="faith-nav-btn ${it.id === active ? "is-active" : ""}" data-go="${it.id}">${esc(it.label)}${cur.read.includes(it.id) ? " ·" : ""}</button>`
          ).join("")}</nav>
        </aside>
        <div class="flex-1 min-w-0">
          <header class="faith-topbar">
            <div class="px-4 py-2.5 flex items-center gap-3">
              <button type="button" class="md:hidden text-amber-300 shrink-0" data-menu>☰</button>
              <div class="min-w-0 flex-1">
                <p class="text-xs text-slate-300">${esc(topic.verseRef || "")}</p>
                <p class="truncate text-sm">${esc(topic.verse || "")}</p>
              </div>
              <input type="search" data-topic-search placeholder="本主題搜尋" class="hidden sm:block w-44 rounded-full px-3 py-1 text-slate-900 text-sm shrink-0">
            </div>
            <div class="px-4 pb-2.5 flex gap-2 overflow-x-auto">
              ${catalog().map((m) =>
                `<a href="${topicHref(m, null, ctx)}" class="faith-chip ${m.id === topic.id ? "text-white" : "bg-slate-700 text-slate-200"}" ${m.id === topic.id ? 'style="background:var(--faith-accent)"' : ""}>${esc(m.title)}</a>`
              ).join("")}
            </div>
          </header>
          <main class="max-w-4xl mx-auto px-4 py-8 faith-fade" data-main>
            ${renderSection(topic, active)}
            <div class="flex justify-between mt-10 pt-6 border-t">
              ${prev ? `<button type="button" class="font-semibold" style="color:var(--faith-accent)" data-go="${prev.id}">← ${esc(prev.label.replace(/^\d+\.\s/, ""))}</button>` : "<span></span>"}
              ${next ? `<button type="button" class="font-bold" style="color:var(--faith-accent)" data-go="${next.id}">${esc(next.label.replace(/^\d+\.\s/, ""))} →</button>` : "<span></span>"}
            </div>
          </main>
          <footer class="text-center py-6 text-slate-500 text-sm">
            <p class="italic mb-1">But God made the earth by his power… Jeremiah 10:12</p>
            <p class="text-xs">「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」耶利米書 10:12</p>
            <p class="text-xs mt-2 pt-2 border-t">按聖經與福音派認信整理 · Prepared by SF Lau</p>
          </footer>
        </div>
      </div>
      <div class="hidden" data-modal></div>`;
  }

  function bindReader(root, ctx, topic, sectionId) {
    const active = sectionId || navItems(topic)[0].id;
    markRead(topic.id, active);

    root.querySelectorAll("[data-go]").forEach((btn) => {
      btn.addEventListener("click", () => setHash(ctx.mode, topic.id, btn.getAttribute("data-go")));
    });

    const menu = root.querySelector("[data-menu]");
    const aside = root.querySelector("[data-aside]");
    if (menu && aside) menu.addEventListener("click", () => aside.classList.toggle("is-open"));

    const search = root.querySelector("[data-topic-search]");
    if (search) {
      search.addEventListener("input", () => {
        const hits = searchAll(search.value).filter((h) => h.topicId === topic.id);
        if (!hits.length || !search.value.trim()) return;
      });
      search.addEventListener("keydown", (e) => {
        if (e.key !== "Enter") return;
        const hit = searchAll(search.value).find((h) => h.topicId === topic.id);
        if (hit) setHash(ctx.mode, topic.id, hit.sectionId);
      });
    }

    root.querySelectorAll("[data-lex]").forEach((btn) => {
      btn.addEventListener("click", () => openLex(root, topic.lexicon[Number(btn.getAttribute("data-lex"))]));
    });

    root.querySelectorAll("[data-workshop]").forEach((box) => {
      const words = (topic.sections.find((s) => s.id === active) || {}).blocks;
      const ws = (words || []).find((b) => b.type === "workshop");
      box.querySelectorAll("[data-ws]").forEach((b) => {
        b.addEventListener("click", () => {
          const w = ws && ws.words[Number(b.getAttribute("data-ws"))];
          const panel = box.querySelector("[data-ws-panel]");
          if (w && panel) panel.innerHTML = workshopHTML(w);
        });
      });
    });

    const matchPanel = root.querySelector("[data-match-panel]");
    root.querySelectorAll("[data-match]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const m = topic.matching[Number(btn.getAttribute("data-match"))];
        if (!m || !matchPanel) return;
        matchPanel.innerHTML = `<div><p class="faith-serif text-lg mb-2">${esc(m.verse)}</p><p class="text-sm text-slate-300">${m.explain}</p></div>`;
      });
    });

    const answered = {};
    if (window.FaithHymns && (active === "hymns" || active === "player")) {
      const mediaRoot = (ctx.base || ".").replace(/\/$/, "") + "/../AI 歌曲/";
      window.FaithHymns.mount(root, { section: active, mediaRoot: mediaRoot });
    }

    root.querySelectorAll("[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const qi = Number(btn.getAttribute("data-q"));
        const oi = Number(btn.getAttribute("data-opt"));
        const q = topic.quiz[qi];
        const wrap = root.querySelector(`[data-q="${qi}"]`);
        if (!q || !wrap || answered[qi]) return;
        answered[qi] = true;
        wrap.querySelectorAll("[data-opt]").forEach((b) => {
          b.disabled = true;
          if (Number(b.getAttribute("data-opt")) === q.correct) b.classList.add("is-right");
        });
        if (oi === q.correct) btn.classList.add("is-right");
        else btn.classList.add("is-wrong");
        const fb = wrap.querySelector("[data-fb]");
        fb.classList.remove("hidden");
        fb.innerHTML = (oi === q.correct ? "✅ " : "❌ ") + q.feedback;
        const done = Object.keys(answered).length;
        if (done === topic.quiz.length) {
          const score = topic.quiz.reduce((n, item, i) => {
            const chosen = root.querySelector(`[data-q="${i}"] .is-wrong`) ? -1 : item.correct;
            const rightBtn = root.querySelector(`[data-q="${i}"] .is-right`);
            return n + (rightBtn && !root.querySelector(`[data-q="${i}"] .is-wrong`) ? 1 : rightBtn && root.querySelector(`[data-q="${i}"] [data-opt="${item.correct}"].is-right`) && !root.querySelector(`[data-q="${i}"] .is-wrong`) ? 1 : 0);
          }, 0);
          let right = 0;
          topic.quiz.forEach((item, i) => {
            const wrong = root.querySelector(`[data-q="${i}"] .is-wrong`);
            if (!wrong) right += 1;
          });
          saveQuiz(topic.id, right, topic.quiz.length);
          const el = root.querySelector("[data-quiz-score]");
          if (el) el.textContent = `你答對 ${right} / ${topic.quiz.length} 題。`;
        }
      });
    });
  }

  function openLex(root, word) {
    const box = root.querySelector("[data-modal]");
    if (!box || !word) return;
    box.className = "faith-modal";
    box.innerHTML = `
      <div class="faith-modal-panel">
        <div class="flex justify-between items-start mb-3">
          <div>
            <p class="${word.lang === "el" ? "faith-el" : "faith-he"} text-3xl">${esc(word.lemma)}</p>
            <p class="text-sm text-slate-500">${esc(word.translit || "")} · ${esc(word.pos || "")}</p>
          </div>
          <button type="button" data-close class="text-slate-400">✕</button>
        </div>
        <p class="font-bold mb-2">${esc(word.gloss || "")}</p>
        <p class="text-sm mb-2"><strong>詳細研究：</strong>${word.research || ""}</p>
        <p class="text-sm mb-2"><strong>解釋：</strong>${word.explanation || ""}</p>
        ${word.refs ? `<p class="text-xs text-slate-500">經文：${esc(word.refs)}</p>` : ""}
      </div>`;
    box.querySelector("[data-close]").addEventListener("click", () => {
      box.className = "hidden";
      box.innerHTML = "";
    });
    box.addEventListener("click", (e) => {
      if (e.target === box) {
        box.className = "hidden";
        box.innerHTML = "";
      }
    });
  }

  function render(root, ctx) {
    const parsed = parseHash(ctx.mode, ctx.topicId);
    document.body.classList.add("faith-app-body");
    document.body.className = document.body.className.replace(/theme-\S+/g, "");

    if (ctx.mode === "hub" && !parsed.topicId) {
      document.body.setAttribute("data-theme", "emerald");
      root.innerHTML = `<div class="faith-shell">${renderHubLanding(ctx)}</div>`;
      const input = root.querySelector("[data-global-search]");
      const box = root.querySelector("[data-search-results]");
      const list = root.querySelector("[data-search-list]");
      if (input && box && list) {
        input.addEventListener("input", () => {
          ctx.lastQuery = input.value;
          const found = searchAll(input.value);
          if (!found.length) {
            box.classList.add("hidden");
            list.innerHTML = "";
            return;
          }
          box.classList.remove("hidden");
          list.innerHTML = found.map((h) =>
            `<li><a class="text-sm hover:underline" style="color:var(--faith-accent)" href="${ctx.mode === "hub" ? `#/${h.topicId}/${h.sectionId}` : topicHref({ id: h.topicId, folder: h.folder }, h.sectionId, ctx)}">${esc(h.title)}</a><p class="text-xs text-slate-500">${esc(h.snippet)}</p></li>`
          ).join("");
        });
      }
      return;
    }

    const topic = getTopic(parsed.topicId);
    if (!topic) {
      root.innerHTML = `<p class="p-8">找不到主題。</p>`;
      return;
    }
    document.body.setAttribute("data-theme", topic.color || "emerald");
    const sectionId = parsed.sectionId || (topic.sections[0] && topic.sections[0].id);
    root.innerHTML = renderReader(ctx, topic, sectionId);
    bindReader(root, ctx, topic, sectionId);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  window.FaithApp = {
    mount(root, options) {
      const ctx = {
        mode: options.mode || "topic",
        topicId: options.topicId || root.getAttribute("data-topic"),
        base: options.base || root.getAttribute("data-base") || ".",
        lastQuery: ""
      };
      const go = () => render(root, ctx);
      window.addEventListener("hashchange", go);
      go();
    }
  };
})();
