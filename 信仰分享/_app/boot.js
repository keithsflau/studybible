(function () {
  const el = document.getElementById("faith-app");
  if (!el) return;
  if (!window.FaithApp) {
    el.innerHTML = '<p style="padding:3rem 1.5rem;text-align:center;font-family:sans-serif;color:#334155">教材未能載入。請按 Ctrl+F5 強制重新整理。</p>';
    return;
  }
  const mode = el.getAttribute("data-mode") || "topic";
  const topicId = el.getAttribute("data-topic") || "";
  const base = el.getAttribute("data-base") || ".";
  window.FaithApp.mount(el, { mode: mode, topicId: topicId, base: base });
})();
