/* Loads GSAP / ScrollTrigger / Lenis. Order: assets/vendor/ (local) -> cdnjs -> jsdelivr -> unpkg.
   Sets window.libs (a Promise). The site still works with normal scrolling if a library cannot load. */
(function () {
  var V = "assets/vendor/",
    G = "3.12.5",
    want = document.currentScript.hasAttribute("data-gsap");
  var S = {
    gsap: [
      V + "gsap.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/" + G + "/gsap.min.js",
      "https://cdn.jsdelivr.net/npm/gsap@" + G + "/dist/gsap.min.js",
      "https://unpkg.com/gsap@" + G + "/dist/gsap.min.js",
    ],
    st: [
      V + "ScrollTrigger.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/gsap/" +
        G +
        "/ScrollTrigger.min.js",
      "https://cdn.jsdelivr.net/npm/gsap@" + G + "/dist/ScrollTrigger.min.js",
      "https://unpkg.com/gsap@" + G + "/dist/ScrollTrigger.min.js",
    ],
    lenis: [
      V + "lenis.min.js",
      "https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js",
      "https://unpkg.com/lenis@1.1.18/dist/lenis.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/lenis/1.1.18/lenis.min.js",
    ],
  };
  function load(list, ok) {
    return new Promise(function (res) {
      var i = 0;
      (function next() {
        if (i >= list.length) return res(ok());
        var s = document.createElement("script");
        s.src = list[i++];
        s.onload = function () {
          ok() ? res(true) : next();
        };
        s.onerror = function () {
          s.remove();
          next();
        };
        document.head.appendChild(s);
      })();
    });
  }
  var p = [
    load(S.lenis, function () {
      return !!window.Lenis;
    }),
  ];
  if (want)
    p.push(
      load(S.gsap, function () {
        return !!window.gsap;
      }).then(function (g) {
        return g
          ? load(S.st, function () {
              return !!window.ScrollTrigger;
            })
          : false;
      }),
    );
  window.libs = Promise.all(p);
})();
