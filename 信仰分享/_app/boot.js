(function () {
  const el = document.getElementById("faith-app");
  if (!el || !window.FaithApp) return;
  const mode = el.getAttribute("data-mode") || "topic";
  const topicId = el.getAttribute("data-topic") || "";
  const base = el.getAttribute("data-base") || ".";
  window.FaithApp.mount(el, { mode: mode, topicId: topicId, base: base });
})();
