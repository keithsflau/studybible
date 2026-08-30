(function () {
  const current = document.body && document.body.getAttribute("data-slug");
  if (!current) return;
  document.querySelectorAll("[data-nav-slug]").forEach(function (el) {
    if (el.getAttribute("data-nav-slug") === current) el.classList.add("is-on");
  });
})();
