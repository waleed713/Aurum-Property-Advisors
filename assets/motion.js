/* Animations: Lenis smooth scroll + GSAP / ScrollTrigger (hero, word reveal, pinned collections, panels, skyline) */
window.libs.then(function () {
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP failed to load, using normal scroll");
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  var run = function (f) {
      try {
        f();
      } catch (e) {
        console.error(e);
      }
    },
    lenis = null;

  run(function () {
    /* Lenis smooth scroll */
    if (!window.Lenis) return;
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) {
      lenis.raf(t * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          lenis.scrollTo(id);
        }
      });
    });
  });

  run(function () {
    /* hero entrance */
    gsap.from(".hero h1 span b", {
      yPercent: 110,
      duration: 1.3,
      ease: "power4.out",
      stagger: 0.15,
      delay: 0.15,
    });
    gsap.from(".hero-row > *", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      stagger: 0.15,
    });
  });

  run(function () {
    /* statement: words light up while scrolling */
    var st = document.getElementById("statement");
    st.innerHTML = st.textContent
      .split(" ")
      .map(function (w) {
        return '<span class="w">' + w + "</span>";
      })
      .join(" ");
    gsap.to("#statement .w", {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".statement",
        start: "top 70%",
        end: "bottom 65%",
        scrub: true,
      },
    });
  });

  run(function () {
    /* collections: pinned (sticky) scroll */
    var imgs = gsap.utils.toArray(".col-img"),
      txt = gsap.utils.toArray(".col-txt"),
      dots = gsap.utils.toArray(".dots b");
    gsap.set(imgs.slice(1), { clipPath: "inset(100% 0 0 0)" });
    var tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".collections",
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    imgs.forEach(function (im, i) {
      tl.to(im.firstElementChild, { scale: 1, duration: 1 }, i ? "<" : 0);
      if (i < imgs.length - 1) {
        var n = i + 1;
        tl.to(imgs[n], { clipPath: "inset(0% 0 0 0)", duration: 1 }, "+=.4")
          .to(imgs[n].firstElementChild, { scale: 1, duration: 1 }, "<")
          .to(txt[i], { opacity: 0, y: -30, duration: 0.5 }, "<")
          .fromTo(
            txt[n],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6 },
            "<.4",
          )
          .call(
            function () {
              dots.forEach(function (d, k) {
                d.classList.toggle("on", k === n);
              });
            },
            null,
            "<",
          );
        tl.to({}, { duration: 0.3 });
      }
    });
  });

  run(function () {
    /* residences panels */
    gsap.from(".pan", {
      opacity: 0,
      y: 70,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".panels", start: "top 85%" },
    });
  });

  run(function () {
    /* palm image: frame opens as you scroll (no zoom, so no extra blur) */
    gsap.fromTo(
      ".sky .bg",
      { clipPath: "inset(14% 10% 14% 10% round 2px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 2px)",
        ease: "none",
        scrollTrigger: {
          trigger: ".sky",
          start: "top 90%",
          end: "top 35%",
          scrub: true,
        },
      },
    );
  });

  run(function () {
    /* property type cards */
    gsap.set(".tcard", { opacity: 0, y: 60 });
    ScrollTrigger.batch(".tcard", {
      start: "top 92%",
      once: true,
      onEnter: function (b) {
        gsap.to(b, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        });
      },
    });
  });
  run(function () {
    /* hour-by-hour: soft zoom-in feel without scaling the photos */
    gsap.from(".day-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".day", start: "top 60%" },
    });
  });
  var refresh = function () {
    ScrollTrigger.refresh();
  };
  if (document.readyState === "complete") refresh();
  else addEventListener("load", refresh);
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(refresh);
});
