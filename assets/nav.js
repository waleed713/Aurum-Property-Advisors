/* Mobile / tablet menu */
(function () {
  var h = document.querySelector("header"),
    b = h && h.querySelector(".burger");
  if (!b) return;
  function set(o) {
    h.classList.toggle("open", o);
    b.setAttribute("aria-expanded", o);
    document.body.classList.toggle("noscroll", o);
    if (window.lenis) o ? window.lenis.stop() : window.lenis.start();
  }
  b.addEventListener("click", function () {
    set(!h.classList.contains("open"));
  });
  h.querySelectorAll("nav a").forEach(function (a) {
    a.addEventListener("click", function () {
      set(false);
    });
  });
  addEventListener("keydown", function (e) {
    if (e.key === "Escape") set(false);
  });
  addEventListener("resize", function () {
    if (innerWidth > 1000) set(false);
  });
})();
