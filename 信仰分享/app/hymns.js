(function () {
  const DRAFT_KEY = "faith-hymn-drafts-v1";
  const PLAY_KEY = "faith-hymn-last-v1";

  const esc = (s) =>
    String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const data = () => window.FAITH_HYMNS || { modules: [], songs: [] };
  const modules = () => data().modules || [];
  const songs = () => data().songs || [];

  function loadDrafts() {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveDrafts(list) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(list.slice(0, 24)));
  }

  function pick(arr, n) {
    if (!arr || !arr.length) return arr && arr[0];
    return arr[Math.abs(n) % arr.length];
  }

  function hashSeed(str) {
    let h = 2166136261;
    const s = String(str || "");
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function inferModule(prompt) {
    const q = (prompt || "").toLowerCase();
    let best = modules()[0];
    let score = -1;
    modules().forEach((m) => {
      let n = 0;
      (m.keywords || []).forEach((k) => {
        if (q.includes(k.toLowerCase())) n += 2;
      });
      if (q.includes(m.title) || q.includes((m.titleEn || "").toLowerCase())) n += 3;
      if (n > score) {
        score = n;
        best = m;
      }
    });
    return best;
  }

  function getModule(id) {
    return modules().find((m) => m.id === id) || null;
  }

  function getSong(id) {
    return songs().find((s) => s.id === id) || null;
  }

  function toneLabel(tone) {
    if (tone === "lament") return "哀歌／呼求";
    if (tone === "mission") return "差遣／宣教";
    if (tone === "comfort") return "安慰／信靠";
    return "敬拜／讚美";
  }

  function generateHymn(opts) {
    const prompt = String((opts && opts.prompt) || "").trim();
    const tone = (opts && opts.tone) || "worship";
    const lang = (opts && opts.lang) || "literary";
    const mod = (opts && opts.moduleId && getModule(opts.moduleId)) || inferModule(prompt);
    const seed = hashSeed((prompt || mod.id) + "|" + tone + "|" + Date.now().toString().slice(-4));
    const topic = prompt || mod.blurb;
    const image = pick(mod.images, seed);
    const title = prompt
      ? (prompt.length > 14 ? prompt.slice(0, 12) + "…" : prompt)
      : pick(mod.titles, seed >> 3);

    const spoken = lang === "cantonese";
    const v1 = spoken
      ? [
          `聽日或者會變，但祢應許唔會褪色。`,
          `我帶住「${topic}」嚟到祢面前，唔係靠自己夠好。`,
          `${image}，提醒我教會唔係表演，係被召出嚟嘅人。`,
          `經上記住：${mod.verseText}`
        ]
      : [
          `世界聲音很多，惟祢話語安定在天。`,
          `我帶著「${topic}」來到祢座前，不是因為自己配得。`,
          `${image}，叫我想起教會是被召出的群體，不是觀眾。`,
          `經上記著：${mod.verseText}`
        ];

    const chorusBank = {
      worship: spoken
        ? [`高舉祢名，因祢配得；\n我們係身體，祢係元首。\n聖道建造，聖靈聯合，\n直到主再來，仍然唱呢首歌。`]
        : [`高舉祢的名，因祢配得；\n我們是身體，祢是元首。\n聖道建造，聖靈聯合，\n直到主再來，仍唱這首歌。`],
      lament: spoken
        ? [`就算幽谷黑，我都要呼叫；\n祢支杖、祢支竿，仍然安慰我。\n信心唔係睇見先信，\n係捉住祢衣襟，等到天光。`]
        : [`縱在幽谷，我仍要呼喊；\n祢的杖、祢的竿，安慰我。\n信心不是先看見，\n乃是抓住祢衣襟，等候黎明。`],
      mission: spoken
        ? [`唔好淨係留喺牆入面；\n穿上鞋子，走進人群。\n福音嘅火，要喺街上燃燒，\n因大使命仍然未完。`]
        : [`不要只留在四面牆內；\n穿上鞋子，走進人群。\n福音的火要在街上燃燒，\n因大使命尚未完成。`],
      comfort: spoken
        ? [`阿爸父，我返屋企；\n唔再做孤兒，唔再靠表現。\n恩典夠用，裂縫有光，\n活祭獻上，每一日。`]
        : [`阿爸父，我回家；\n不再是孤兒，不再靠表現。\n恩典夠用，裂縫有光，\n活祭獻上，每一天。`]
    };

    const v2 = spoken
      ? [
          `紀律為挽回，擘餅為記念，聖道為建造。`,
          `若有人軟弱，我們一齊擔；若有人得榮，我們一齊謝。`,
          `不是熱鬧先算教會，係真理柱石同家。`
        ]
      : [
          `紀律為挽回，擘餅為記念，聖道為建造。`,
          `若有人受苦，我們一同擔；若有人得榮，我們一同謝。`,
          `熱鬧不是教會的標記；真理的柱石與家才是。`
        ];

    const bridge = spoken
      ? `對準神、對準靈魂、對準聖經。\n肉體同裝飾都要讓路。`
      : `對準神、對準靈魂、對準聖經。\n肉體與裝飾都要讓路。`;

    const lyrics = [
      `[Verse 1]`,
      v1.join("\n"),
      ``,
      `[Chorus]`,
      (chorusBank[tone] || chorusBank.worship)[0],
      ``,
      `[Verse 2]`,
      v2.join("\n"),
      ``,
      `[Bridge]`,
      bridge,
      ``,
      `[Outro]`,
      spoken ? `阿們。我們仍然係祢嘅教會。` : `阿們。我們仍是祢的教會。`
    ].join("\n");

    const notes = [
      `模組：${mod.title}（${mod.titleEn}）`,
      `經文錨點：${mod.verse}「${mod.verseText}」`,
      `語氣：${toneLabel(tone)}　語體：${spoken ? "粵語口語" : "書面語"}`,
      `這是教材用的詩歌草稿，不是正典，不能取代聖經與教會已有的聖詩。請用聖經核對神學，再決定是否用於聚會。`
    ].join("\n");

    const suno = [
      `[Style: ${mod.genre}]`,
      `[Mood: ${mod.mood} / ${toneLabel(tone)}]`,
      `[Language: ${spoken ? "Cantonese" : "Mandarin / Traditional Chinese"}]`,
      `[Theme: ${mod.title} — ${topic}]`,
      `[Structure: Verse, Chorus, Verse, Bridge, Outro]`,
      `[Vocal: congregational, sincere, not theatrical]`,
      ``,
      lyrics
    ].join("\n");

    return {
      id: "draft-" + Date.now(),
      title: title,
      moduleId: mod.id,
      moduleTitle: mod.title,
      verse: mod.verse,
      tone: tone,
      lang: lang,
      prompt: topic,
      lyrics: lyrics,
      notes: notes,
      suno: suno,
      related: (mod.related || []).slice(),
      at: Date.now()
    };
  }

  function mediaUrl(root, file) {
    const base = String(root || "").replace(/\/?$/, "/");
    return base + String(file).split("/").map(encodeURIComponent).join("/");
  }

  function fullPlayerHref(root) {
    return String(root || "").replace(/\/?$/, "/") + "player.html";
  }

  function lyricLines(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  }

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  const engine = {
    mediaRoot: "../../AI 歌曲/",
    extra: [],
    index: -1,
    filter: "all",
    query: "",
    onChange: [],
    media: null,
    speaking: false
  };

  function allTracks() {
    return songs().concat(engine.extra);
  }

  function visibleTracks() {
    const q = engine.query.trim().toLowerCase();
    return allTracks().filter((s) => {
      if (engine.filter !== "all" && s.module !== engine.filter) return false;
      if (!q) return true;
      return [s.title, s.theme, s.lyrics].join(" ").toLowerCase().indexOf(q) !== -1;
    });
  }

  function currentTrack() {
    const list = visibleTracks();
    if (engine.index < 0 || engine.index >= list.length) return null;
    return list[engine.index];
  }

  function notify() {
    engine.onChange.forEach((fn) => {
      try {
        fn();
      } catch (e) {}
    });
    persistLast();
  }

  function persistLast() {
    const t = currentTrack();
    try {
      localStorage.setItem(
        PLAY_KEY,
        JSON.stringify({
          id: t && t.id,
          filter: engine.filter,
          query: engine.query
        })
      );
    } catch (e) {}
  }

  function ensureMedia() {
    if (engine.media) return engine.media;
    let dock = document.getElementById("faith-hymn-dock");
    if (!dock) {
      dock = document.createElement("div");
      dock.id = "faith-hymn-dock";
      dock.className = "faith-hymn-dock is-hidden";
      dock.innerHTML = `
        <video id="faith-hymn-media" playsinline></video>
        <button type="button" class="faith-hymn-dock-btn" data-dock-prev title="上一首">⏮</button>
        <button type="button" class="faith-hymn-dock-btn is-main" data-dock-play title="播放／暫停">▶</button>
        <button type="button" class="faith-hymn-dock-btn" data-dock-next title="下一首">⏭</button>
        <div class="faith-hymn-dock-meta">
          <p class="faith-hymn-dock-title" data-dock-title>未選歌曲</p>
          <p class="faith-hymn-dock-sub" data-dock-sub>教會 · AI 詩歌播放</p>
        </div>
        <input type="range" min="0" max="1000" value="0" data-dock-seek class="faith-hymn-dock-seek" />
        <button type="button" class="faith-hymn-dock-btn" data-dock-close title="關閉停駐列">✕</button>`;
      document.body.appendChild(dock);
      dock.querySelector("[data-dock-play]").addEventListener("click", togglePlay);
      dock.querySelector("[data-dock-prev]").addEventListener("click", () => skip(-1));
      dock.querySelector("[data-dock-next]").addEventListener("click", () => skip(1));
      dock.querySelector("[data-dock-close]").addEventListener("click", stopAll);
      dock.querySelector("[data-dock-seek]").addEventListener("input", (e) => {
        const media = engine.media;
        if (!media || !media.duration) return;
        media.currentTime = (Number(e.target.value) / 1000) * media.duration;
      });
    }
    engine.media = document.getElementById("faith-hymn-media");
    if (engine.media && !engine.media._bound) {
      engine.media._bound = true;
      engine.media.addEventListener("timeupdate", notify);
      engine.media.addEventListener("ended", () => skip(1));
      engine.media.addEventListener("play", () => {
        const dock = document.getElementById("faith-hymn-dock");
        if (dock) dock.classList.remove("is-hidden");
        notify();
      });
      engine.media.addEventListener("pause", notify);
      engine.media.addEventListener("loadedmetadata", notify);
      engine.media.addEventListener("error", notify);
    }
    return engine.media;
  }

  function stopSpeech() {
    engine.speaking = false;
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function playTrack(index, autoplay) {
    stopSpeech();
    const list = visibleTracks();
    if (!list.length) return;
    engine.index = Math.max(0, Math.min(index, list.length - 1));
    const track = list[engine.index];
    const media = ensureMedia();
    const src = track.blobUrl || mediaUrl(engine.mediaRoot, track.file);
    if (media.getAttribute("data-src") !== src) {
      media.src = src;
      media.setAttribute("data-src", src);
    }
    if (autoplay !== false) {
      const p = media.play();
      if (p && p.catch) p.catch(function () {});
    }
    notify();
  }

  function playById(id, autoplay) {
    let list = visibleTracks();
    let i = list.findIndex((s) => s.id === id);
    if (i < 0) {
      engine.filter = "all";
      engine.query = "";
      list = visibleTracks();
      i = list.findIndex((s) => s.id === id);
    }
    if (i >= 0) playTrack(i, autoplay);
  }

  function togglePlay() {
    const media = ensureMedia();
    if (!currentTrack()) {
      playTrack(0, true);
      return;
    }
    if (media.paused) {
      const p = media.play();
      if (p && p.catch) p.catch(function () {});
    } else media.pause();
    notify();
  }

  function skip(dir) {
    const list = visibleTracks();
    if (!list.length) return;
    let i = engine.index + dir;
    if (i < 0) i = list.length - 1;
    if (i >= list.length) i = 0;
    playTrack(i, true);
  }

  function stopAll() {
    stopSpeech();
    if (engine.media) {
      engine.media.pause();
      engine.media.removeAttribute("src");
      engine.media.removeAttribute("data-src");
      engine.media.load();
    }
    engine.index = -1;
    const dock = document.getElementById("faith-hymn-dock");
    if (dock) dock.classList.add("is-hidden");
    notify();
  }

  function speakDraft(draft) {
    if (!window.speechSynthesis) return false;
    stopSpeech();
    if (engine.media) engine.media.pause();
    const text = lyricLines(draft.lyrics)
      .filter((l) => !/^\[/.test(l))
      .join("，");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = draft.lang === "cantonese" ? "zh-HK" : "zh-TW";
    u.rate = 0.92;
    engine.speaking = true;
    u.onend = function () {
      engine.speaking = false;
      notify();
    };
    speechSynthesis.speak(u);
    notify();
    return true;
  }

  function renderLyrics(text, currentTime, duration) {
    const lines = lyricLines(text);
    if (!lines.length) return `<p class="text-sm text-slate-500">暫無歌詞</p>`;
    const timed = isFinite(duration) && duration > 0;
    const idx = timed ? Math.min(lines.length - 1, Math.floor((currentTime / duration) * lines.length)) : -1;
    return lines
      .map((line, i) => {
        const tag = /^\[/.test(line);
        return `<p class="faith-lyric-line ${tag ? "is-tag" : ""} ${i === idx ? "is-active" : ""}">${esc(line)}</p>`;
      })
      .join("");
  }

  function renderStudio() {
    const drafts = loadDrafts();
    return `
      <header class="mb-6 border-b pb-4">
        <p class="text-xs tracking-widest uppercase" style="color:var(--faith-accent)">AI Hymn Modules</p>
        <h2 class="text-3xl font-bold">AI 詩歌模組</h2>
        <p class="text-sm text-slate-600 mt-2">按教會論主題起草詩歌：選模組、寫一句提示，產生歌詞結構、神學備註與 Suno 提示。草稿可朗讀，亦可跳去播放現有錄音。</p>
        <p class="mt-3"><button type="button" class="faith-hymn-action is-ghost" data-go="player">開啟詩歌播放軟件 →</button></p>
      </header>
      <div class="grid sm:grid-cols-2 gap-3 mb-6">
        ${modules()
          .map(
            (m) => `
          <button type="button" class="faith-card p-4 text-left hover:-translate-y-0.5 transition" data-hymn-mod="${m.id}">
            <p class="text-2xl mb-1">${m.icon}</p>
            <h3 class="font-bold">${esc(m.title)}</h3>
            <p class="text-xs text-slate-500 mb-2">${esc(m.titleEn)} · ${esc(m.verse)}</p>
            <p class="text-sm text-slate-600">${esc(m.blurb)}</p>
          </button>`
          )
          .join("")}
      </div>
      <section class="faith-card p-5 space-y-4" data-hymn-compose>
        <div class="flex flex-wrap gap-2 items-center">
          <span class="faith-chip faith-chip-shared">創作檯</span>
          <span class="text-sm text-slate-500" data-hymn-mod-label>未選模組時，會按提示自動對準主題</span>
        </div>
        <input type="hidden" data-hymn-mod-id value="">
        <label class="block">
          <span class="text-sm font-bold">提示（主題、經文、場合）</span>
          <textarea data-hymn-prompt rows="3" class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="例如：主日擘餅記念主的死；或：探訪軟弱的肢體；或：太 28:19 差遣青年短宣"></textarea>
        </label>
        <div class="grid sm:grid-cols-2 gap-3">
          <label class="block text-sm">
            <span class="font-bold">語氣</span>
            <select data-hymn-tone class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
              <option value="worship">敬拜／讚美</option>
              <option value="lament">哀歌／呼求</option>
              <option value="mission">差遣／宣教</option>
              <option value="comfort">安慰／信靠</option>
            </select>
          </label>
          <label class="block text-sm">
            <span class="font-bold">語體</span>
            <select data-hymn-lang class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2">
              <option value="literary">書面語</option>
              <option value="cantonese">粵語口語</option>
            </select>
          </label>
        </div>
        <div class="flex flex-wrap gap-2">
          <button type="button" class="faith-hymn-action" data-hymn-generate>生成詩歌草稿</button>
          <button type="button" class="faith-hymn-action is-ghost" data-hymn-clear>清空</button>
        </div>
        <p class="text-xs text-slate-500">本機模組按主題庫與提示組裝草稿，無需外接 API。產出後請用聖經核對，再用於敬拜。</p>
      </section>
      <section class="faith-card p-5 mt-5 hidden" data-hymn-result></section>
      <section class="mt-6 ${drafts.length ? "" : "hidden"}" data-hymn-drafts>
        <h3 class="font-bold mb-3">已儲存草稿</h3>
        <div class="space-y-2" data-hymn-draft-list></div>
      </section>`;
  }

  function resultHTML(draft) {
    const related = (draft.related || []).map(getSong).filter(Boolean);
    return `
      <p class="faith-chip faith-chip-shared mb-3">已生成</p>
      <h3 class="text-2xl font-bold faith-serif">${esc(draft.title)}</h3>
      <p class="text-sm text-slate-500 mb-4">${esc(draft.moduleTitle)} · ${esc(draft.verse)} · ${esc(toneLabel(draft.tone))}</p>
      <pre class="faith-hymn-lyrics">${esc(draft.lyrics)}</pre>
      <div class="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700 whitespace-pre-wrap">${esc(draft.notes)}</div>
      <details class="mt-3">
        <summary class="cursor-pointer font-bold text-sm">Suno／配樂提示</summary>
        <pre class="faith-hymn-lyrics mt-2 text-xs">${esc(draft.suno)}</pre>
      </details>
      <div class="flex flex-wrap gap-2 mt-4">
        <button type="button" class="faith-hymn-action" data-hymn-copy="lyrics">複製歌詞</button>
        <button type="button" class="faith-hymn-action is-ghost" data-hymn-copy="suno">複製提示</button>
        <button type="button" class="faith-hymn-action is-ghost" data-hymn-speak>朗讀歌詞</button>
        <button type="button" class="faith-hymn-action is-ghost" data-hymn-save>儲存草稿</button>
      </div>
      ${
        related.length
          ? `<div class="mt-5">
              <p class="font-bold text-sm mb-2">相關錄音（現有 AI 詩歌）</p>
              <div class="space-y-2">${related
                .map(
                  (s) =>
                    `<button type="button" class="faith-quiz-btn" data-hymn-play-related="${s.id}">▶ ${esc(s.title)} · ${esc(s.theme)}</button>`
                )
                .join("")}</div>
            </div>`
          : ""
      }
      <p class="text-xs text-slate-400 mt-3" data-hymn-status></p>`;
  }

  function renderPlayer(ctx) {
    const list = visibleTracks();
    const track = currentTrack();
    const media = engine.media;
    const playing = media && !media.paused && !media.ended;
    const t = media ? media.currentTime : 0;
    const d = media && media.duration ? media.duration : 0;
    const href = fullPlayerHref(engine.mediaRoot);
    return `
      <header class="mb-6 border-b pb-4">
        <p class="text-xs tracking-widest uppercase" style="color:var(--faith-accent)">Playback</p>
        <h2 class="text-3xl font-bold">詩歌播放軟件</h2>
        <p class="text-sm text-slate-600 mt-2">播放本站「AI 歌曲」錄音：清單、進度、歌詞跟讀、上一首／下一首。亦可上傳本機音訊。</p>
        <p class="mt-2"><a class="text-sm font-semibold" style="color:var(--faith-accent)" href="${esc(href)}">開啟獨立播放器 →</a></p>
      </header>
      <div class="grid md:grid-cols-5 gap-5">
        <div class="md:col-span-2 space-y-3">
          <div class="flex gap-2">
            <input type="search" data-hymn-q value="${esc(engine.query)}" placeholder="搜尋歌名、主題、歌詞" class="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm">
            <label class="faith-hymn-action is-ghost shrink-0 cursor-pointer">
              上傳
              <input type="file" data-hymn-upload accept="audio/*,video/*" multiple class="hidden">
            </label>
          </div>
          <div class="flex flex-wrap gap-1" data-hymn-filters>
            <button type="button" class="faith-chip ${engine.filter === "all" ? "text-white" : "bg-slate-100 text-slate-600"}" ${engine.filter === "all" ? 'style="background:var(--faith-accent)"' : ""} data-hymn-filter="all">全部</button>
            ${modules()
              .map(
                (m) =>
                  `<button type="button" class="faith-chip ${engine.filter === m.id ? "text-white" : "bg-slate-100 text-slate-600"}" ${engine.filter === m.id ? 'style="background:var(--faith-accent)"' : ""} data-hymn-filter="${m.id}">${esc(m.title)}</button>`
              )
              .join("")}
          </div>
          <div class="faith-card overflow-hidden">
            <div class="px-4 py-3 border-b text-sm font-bold flex justify-between">
              <span>播放清單</span><span class="text-slate-400 font-medium" data-hymn-count>${list.length} 首</span>
            </div>
            <div class="max-h-[28rem] overflow-y-auto" data-hymn-list>
              ${
                list.length
                  ? list
                      .map((s, i) => {
                        const active = track && s.id === track.id;
                        return `<button type="button" class="faith-hymn-track ${active ? "is-active" : ""}" data-hymn-i="${i}">
                          <span class="faith-hymn-num">${i + 1}</span>
                          <span class="min-w-0 text-left">
                            <span class="block font-semibold truncate">${esc(s.title)}</span>
                            <span class="block text-xs text-slate-500 truncate">${esc(s.theme)}${s.uploaded ? " · 本機" : ""}</span>
                          </span>
                        </button>`;
                      })
                      .join("")
                  : `<p class="p-6 text-sm text-slate-500 text-center">沒有符合的歌曲</p>`
              }
            </div>
          </div>
        </div>
        <div class="md:col-span-3 space-y-4">
          <div class="faith-card overflow-hidden">
            <div class="faith-hymn-stage">
              ${track ? `<p class="text-xs tracking-widest uppercase opacity-70">正在播放</p>
                <h3 class="text-2xl font-bold faith-serif mt-1">${esc(track.title)}</h3>
                <p class="text-sm opacity-80 mt-1">${esc(track.theme)}</p>` : `<p class="opacity-80">選擇一首詩歌開始播放</p>`}
            </div>
            <div class="p-4 space-y-3">
              <div class="faith-hymn-seek-wrap">
                <input type="range" min="0" max="1000" value="${d ? Math.round((t / d) * 1000) : 0}" data-hymn-seek class="faith-hymn-seek">
                <div class="flex justify-between text-xs text-slate-500"><span data-hymn-cur>${formatTime(t)}</span><span data-hymn-dur>${formatTime(d)}</span></div>
              </div>
              <div class="flex items-center justify-center gap-3">
                <button type="button" class="faith-hymn-ctrl" data-hymn-prev title="上一首">⏮</button>
                <button type="button" class="faith-hymn-ctrl is-main" data-hymn-toggle title="播放／暫停">${playing ? "⏸" : "▶"}</button>
                <button type="button" class="faith-hymn-ctrl" data-hymn-next title="下一首">⏭</button>
              </div>
              <label class="flex items-center gap-2 text-sm text-slate-600">
                <span>音量</span>
                <input type="range" min="0" max="100" value="${media ? Math.round((media.volume || 0.8) * 100) : 80}" data-hymn-vol class="flex-1">
              </label>
              ${media && media.error ? `<p class="text-xs text-rose-600">未能載入音訊。請用本機伺服器開啟網站，或改用「開啟獨立播放器」。</p>` : ""}
            </div>
          </div>
          <div class="faith-card p-4">
            <div class="flex justify-between items-center mb-2">
              <h4 class="font-bold">歌詞跟讀</h4>
              <span class="text-xs text-slate-400">按進度粗略對準段落</span>
            </div>
            <div class="faith-hymn-lyric-box" data-hymn-lyrics>${renderLyrics(track && track.lyrics, t, d)}</div>
          </div>
        </div>
      </div>`;
  }

  function paintDrafts(root) {
    const box = root.querySelector("[data-hymn-draft-list]");
    const wrap = root.querySelector("[data-hymn-drafts]");
    if (!box || !wrap) return;
    const drafts = loadDrafts();
    wrap.classList.toggle("hidden", !drafts.length);
    box.innerHTML = drafts
      .map(
        (d) =>
          `<div class="faith-card p-3 flex justify-between gap-3 items-center">
            <div class="min-w-0">
              <p class="font-bold truncate">${esc(d.title)}</p>
              <p class="text-xs text-slate-500">${esc(d.moduleTitle)} · ${new Date(d.at).toLocaleString("zh-HK")}</p>
            </div>
            <div class="flex gap-2 shrink-0">
              <button type="button" class="text-sm font-semibold" style="color:var(--faith-accent)" data-hymn-open-draft="${d.id}">開啟</button>
              <button type="button" class="text-sm text-slate-400" data-hymn-del-draft="${d.id}">刪</button>
            </div>
          </div>`
      )
      .join("");
    box.querySelectorAll("[data-hymn-open-draft]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const d = loadDrafts().find((x) => x.id === btn.getAttribute("data-hymn-open-draft"));
        if (d) {
          root._hymnDraft = d;
          showResult(root, d);
        }
      });
    });
    box.querySelectorAll("[data-hymn-del-draft]").forEach((btn) => {
      btn.addEventListener("click", () => {
        saveDrafts(loadDrafts().filter((x) => x.id !== btn.getAttribute("data-hymn-del-draft")));
        paintDrafts(root);
      });
    });
  }

  function showResult(root, draft) {
    const box = root.querySelector("[data-hymn-result]");
    if (!box) return;
    box.classList.remove("hidden");
    box.innerHTML = resultHTML(draft);
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    bindResult(root, draft);
  }

  function setStatus(root, msg) {
    const el = root.querySelector("[data-hymn-status]");
    if (el) el.textContent = msg || "";
  }

  function bindResult(root, draft) {
    root.querySelectorAll("[data-hymn-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const key = btn.getAttribute("data-hymn-copy");
        const text = key === "suno" ? draft.suno : draft.lyrics;
        try {
          await navigator.clipboard.writeText(text);
          setStatus(root, "已複製。");
        } catch {
          setStatus(root, "複製失敗，請手動選取文字。");
        }
      });
    });
    const speak = root.querySelector("[data-hymn-speak]");
    if (speak)
      speak.addEventListener("click", () => {
        if (!speakDraft(draft)) setStatus(root, "這個瀏覽器不支援朗讀。");
        else setStatus(root, "正在朗讀歌詞…");
      });
    const save = root.querySelector("[data-hymn-save]");
    if (save)
      save.addEventListener("click", () => {
        const list = loadDrafts().filter((d) => d.id !== draft.id);
        list.unshift(draft);
        saveDrafts(list);
        paintDrafts(root);
        setStatus(root, "草稿已儲存在本機。");
      });
    root.querySelectorAll("[data-hymn-play-related]").forEach((btn) => {
      btn.addEventListener("click", () => {
        ensureMedia();
        engine.filter = "all";
        playById(btn.getAttribute("data-hymn-play-related"), true);
        setStatus(root, "已開始播放相關錄音。底部停駐列可繼續控制。");
      });
    });
  }

  function bindStudio(root) {
    root.querySelectorAll("[data-hymn-mod]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-hymn-mod");
        const hidden = root.querySelector("[data-hymn-mod-id]");
        const label = root.querySelector("[data-hymn-mod-label]");
        const prompt = root.querySelector("[data-hymn-prompt]");
        if (hidden) hidden.value = id;
        const m = getModule(id);
        if (label && m) label.textContent = "已選：" + m.title + " · " + m.verse;
        root.querySelectorAll("[data-hymn-mod]").forEach((b) => b.classList.toggle("is-picked", b === btn));
        if (prompt && !prompt.value.trim() && m) prompt.placeholder = "例如：" + m.blurb;
      });
    });
    const gen = root.querySelector("[data-hymn-generate]");
    if (gen)
      gen.addEventListener("click", () => {
        const draft = generateHymn({
          moduleId: (root.querySelector("[data-hymn-mod-id]") || {}).value,
          prompt: (root.querySelector("[data-hymn-prompt]") || {}).value,
          tone: (root.querySelector("[data-hymn-tone]") || {}).value,
          lang: (root.querySelector("[data-hymn-lang]") || {}).value
        });
        root._hymnDraft = draft;
        showResult(root, draft);
      });
    const clear = root.querySelector("[data-hymn-clear]");
    if (clear)
      clear.addEventListener("click", () => {
        const ta = root.querySelector("[data-hymn-prompt]");
        const hid = root.querySelector("[data-hymn-mod-id]");
        const box = root.querySelector("[data-hymn-result]");
        if (ta) ta.value = "";
        if (hid) hid.value = "";
        if (box) {
          box.classList.add("hidden");
          box.innerHTML = "";
        }
        root.querySelectorAll("[data-hymn-mod]").forEach((b) => b.classList.remove("is-picked"));
      });
    paintDrafts(root);
  }

  function paintTrackList(root) {
    const box = root.querySelector("[data-hymn-list]");
    if (!box) return;
    const list = visibleTracks();
    const track = currentTrack();
    box.innerHTML = list.length
      ? list
          .map((s, i) => {
            const active = track && s.id === track.id;
            return `<button type="button" class="faith-hymn-track ${active ? "is-active" : ""}" data-hymn-i="${i}">
              <span class="faith-hymn-num">${i + 1}</span>
              <span class="min-w-0 text-left">
                <span class="block font-semibold truncate">${esc(s.title)}</span>
                <span class="block text-xs text-slate-500 truncate">${esc(s.theme)}${s.uploaded ? " · 本機" : ""}</span>
              </span>
            </button>`;
          })
          .join("")
      : `<p class="p-6 text-sm text-slate-500 text-center">沒有符合的歌曲</p>`;
    box.querySelectorAll("[data-hymn-i]").forEach((btn) => {
      btn.addEventListener("click", () => playTrack(Number(btn.getAttribute("data-hymn-i")), true));
    });
    const badge = root.querySelector("[data-hymn-count]");
    if (badge) badge.textContent = list.length + " 首";
    root.querySelectorAll("[data-hymn-filter]").forEach((btn) => {
      const on = btn.getAttribute("data-hymn-filter") === engine.filter;
      btn.classList.toggle("text-white", on);
      btn.classList.toggle("bg-slate-100", !on);
      btn.classList.toggle("text-slate-600", !on);
      if (on) btn.setAttribute("style", "background:var(--faith-accent)");
      else btn.removeAttribute("style");
    });
  }

  function bindPlayer(root) {
    const q = root.querySelector("[data-hymn-q]");
    if (q)
      q.addEventListener("input", () => {
        engine.query = q.value;
        paintTrackList(root);
      });
    root.querySelectorAll("[data-hymn-filter]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const keepId = currentTrack() && currentTrack().id;
        engine.filter = btn.getAttribute("data-hymn-filter");
        const next = visibleTracks();
        engine.index = keepId ? next.findIndex((s) => s.id === keepId) : -1;
        paintTrackList(root);
      });
    });
    paintTrackList(root);
    const toggle = root.querySelector("[data-hymn-toggle]");
    if (toggle) toggle.addEventListener("click", togglePlay);
    const prev = root.querySelector("[data-hymn-prev]");
    if (prev) prev.addEventListener("click", () => skip(-1));
    const next = root.querySelector("[data-hymn-next]");
    if (next) next.addEventListener("click", () => skip(1));
    const seek = root.querySelector("[data-hymn-seek]");
    if (seek)
      seek.addEventListener("input", () => {
        const media = ensureMedia();
        if (!media.duration) return;
        media.currentTime = (Number(seek.value) / 1000) * media.duration;
      });
    const vol = root.querySelector("[data-hymn-vol]");
    if (vol)
      vol.addEventListener("input", () => {
        ensureMedia().volume = Number(vol.value) / 100;
      });
    const upload = root.querySelector("[data-hymn-upload]");
    if (upload)
      upload.addEventListener("change", () => {
        Array.from(upload.files || []).forEach((file, i) => {
          engine.extra.push({
            id: "up-" + Date.now() + "-" + i,
            title: file.name.replace(/\.[^.]+$/, ""),
            theme: "本機上傳",
            module: "all",
            uploaded: true,
            lyrics: "",
            blobUrl: URL.createObjectURL(file)
          });
        });
        upload.value = "";
        paintTrackList(root);
      });
  }

  function syncDock() {
    const dock = document.getElementById("faith-hymn-dock");
    if (!dock) return;
    const track = currentTrack();
    const media = engine.media;
    const title = dock.querySelector("[data-dock-title]");
    const sub = dock.querySelector("[data-dock-sub]");
    const play = dock.querySelector("[data-dock-play]");
    const seek = dock.querySelector("[data-dock-seek]");
    if (title) title.textContent = track ? track.title : "未選歌曲";
    if (sub) sub.textContent = track ? track.theme : "教會 · AI 詩歌播放";
    if (play) play.textContent = media && !media.paused && !media.ended ? "⏸" : "▶";
    if (seek && media && media.duration) seek.value = String(Math.round((media.currentTime / media.duration) * 1000));
  }

  function syncPlayerView(root) {
    if (!root || !root.querySelector("[data-hymn-list]")) return;
    const track = currentTrack();
    const media = engine.media;
    const playing = media && !media.paused && !media.ended;
    const t = media ? media.currentTime : 0;
    const d = media && media.duration ? media.duration : 0;
    const list = visibleTracks();
    root.querySelectorAll("[data-hymn-i]").forEach((btn) => {
      const i = Number(btn.getAttribute("data-hymn-i"));
      btn.classList.toggle("is-active", !!(track && list[i] && list[i].id === track.id));
    });
    const toggle = root.querySelector("[data-hymn-toggle]");
    if (toggle) toggle.textContent = playing ? "⏸" : "▶";
    const cur = root.querySelector("[data-hymn-cur]");
    const dur = root.querySelector("[data-hymn-dur]");
    if (cur) cur.textContent = formatTime(t);
    if (dur) dur.textContent = formatTime(d);
    const seek = root.querySelector("[data-hymn-seek]");
    if (seek && d) seek.value = String(Math.round((t / d) * 1000));
    const lyrics = root.querySelector("[data-hymn-lyrics]");
    if (lyrics) lyrics.innerHTML = renderLyrics(track && track.lyrics, t, d);
    const stage = root.querySelector(".faith-hymn-stage");
    if (stage && track) {
      stage.innerHTML = `<p class="text-xs tracking-widest uppercase opacity-70">正在播放</p>
        <h3 class="text-2xl font-bold faith-serif mt-1">${esc(track.title)}</h3>
        <p class="text-sm opacity-80 mt-1">${esc(track.theme)}</p>`;
    }
  }

  function searchHits(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return [];
    const hits = [];
    modules().forEach((m) => {
      const blob = [m.title, m.titleEn, m.blurb, m.verse, m.verseText, (m.keywords || []).join(" ")].join(" ").toLowerCase();
      if (blob.includes(q)) {
        hits.push({
          topicId: "church",
          folder: "教會",
          sectionId: "hymns",
          title: "教會 · AI 詩歌 · " + m.title,
          snippet: m.blurb
        });
      }
    });
    songs().forEach((s) => {
      const blob = [s.title, s.theme, s.lyrics].join(" ").toLowerCase();
      if (blob.includes(q)) {
        hits.push({
          topicId: "church",
          folder: "教會",
          sectionId: "player",
          title: "教會 · 播放 · " + s.title,
          snippet: s.theme + " — " + (s.lyrics || "").slice(0, 42)
        });
      }
    });
    return hits.slice(0, 10);
  }

  window.FaithHymns = {
    renderStudio: renderStudio,
    renderPlayer: function () {
      ensureMedia();
      return renderPlayer();
    },
    mount(root, options) {
      options = options || {};
      engine.mediaRoot = options.mediaRoot || engine.mediaRoot;
      ensureMedia();
      if (options.section === "player") bindPlayer(root);
      else bindStudio(root);
      const uid = root._hymnSync;
      if (uid) engine.onChange = engine.onChange.filter((fn) => fn !== uid);
      const sync = function () {
        syncDock();
        syncPlayerView(root);
      };
      root._hymnSync = sync;
      engine.onChange.push(sync);
      sync();
    },
    searchHits: searchHits,
    generateHymn: generateHymn,
    playById: playById
  };
})();
