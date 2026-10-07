/* UI: header, enquiry form, residence panels, hour-by-hour photo section, move-in cost calculator */
const $ = (id) => document.getElementById(id);
const safe = (f) => {
  try {
    f();
  } catch (e) {
    console.error(e);
  }
};
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

safe(() => {
  /* header + enquiry form */
  const header = document.querySelector("header");
  const tog = () => header.classList.toggle("solid", scrollY > 60);
  tog();
  addEventListener(
    "scroll",
    () => header.classList.toggle("solid", scrollY > 60),
    { passive: true },
  );
  $("enq").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const t = `Hello Aurum, I'm ${f.get("name")} (${f.get("phone")}). I'm looking for: ${f.get("type")}. Budget: AED ${f.get("budget") || "flexible"}. ${f.get("msg")}`;
    open("https://wa.me/971500000000?text=" + encodeURIComponent(t), "_blank");
  });
});

safe(() => {
  /* residence panels: hover / focus / tap to open */
  const pans = [...document.querySelectorAll(".pan")];
  pans.forEach((p) =>
    ["mouseenter", "focus"].forEach((e) =>
      p.addEventListener(e, () =>
        pans.forEach((x) => x.classList.toggle("on", x === p)),
      ),
    ),
  );
});

safe(() => {
  /* hour by hour: ONE real photo (golden marina). Sun, sky, light and night change with the slider. 18:15 = the original photo. */
  const rng = $("rng"),
    img = $("dImg"),
    glow = $("dGlow"),
    wash = $("wash"),
    nl = $("nightl"),
    patch = $("patch"),
    sun = $("sun2"),
    stars = $("stars2");
  /* [hour, brightness, saturate, wash r,g,b, washA, nightA, glowA, patch r,g,b, patchA, sunA, starsA] */
  const K = [
    [5, 0.55, 0.9, 80, 70, 150, 0.45, 0.85, 0.5, 30, 40, 100, 0.9, 0, 0.9],
    [6.2, 0.8, 1, 255, 150, 110, 0.4, 0.25, 0.2, 255, 150, 110, 0.65, 0.9, 0.2],
    [8, 1.05, 1, 120, 175, 235, 0.75, 0, 0, 120, 175, 235, 1, 1, 0],
    [12, 1.15, 1.05, 70, 150, 235, 0.9, 0, 0, 70, 150, 235, 1, 1, 0],
    [16, 1.1, 1.05, 110, 170, 235, 0.7, 0, 0, 110, 170, 235, 1, 1, 0],
    [17.4, 1.04, 1.04, 255, 190, 110, 0.4, 0, 0, 255, 190, 110, 0.5, 1, 0],
    [18.3, 1, 1, 255, 160, 80, 0, 0, 0, 255, 160, 80, 0, 0, 0],
    [19.3, 0.85, 1, 120, 60, 110, 0.2, 0.35, 0.15, 255, 140, 60, 0, 0, 0],
    [20.3, 0.78, 0.97, 30, 30, 100, 0.15, 0.7, 0.5, 10, 16, 50, 0.9, 0, 0.5],
    [23, 0.68, 0.95, 8, 14, 48, 0, 0.82, 0.75, 8, 14, 48, 0.95, 0, 1],
  ];
  const C = [
    [6.2, "Before dawn. The marina is still and the towers are quiet."],
    [8.5, "Sunrise. Warm light reaches the terraces and the water."],
    [11.5, "Morning. Clear, bright light fills every room."],
    [16, "Midday to afternoon. Bright and warm, best from a shaded terrace."],
    [17.8, "Late afternoon. The light softens and turns golden."],
    [18.8, "Sunset. This is the view as it is: the marina in golden light."],
    [20, "Dusk. The sky deepens and the city lights come on."],
    [24, "Night. The towers and the marina glow against a dark sky."],
  ];
  function paint() {
    const h = +rng.value;
    let i = K.findIndex((k) => k[0] > h);
    if (i < 1) i = i < 0 ? K.length - 1 : 1;
    const a = K[i - 1],
      b = K[i],
      t = clamp((h - a[0]) / (b[0] - a[0]), 0, 1),
      v = a.map((x, k) => x + (b[k] - x) * t),
      r = (n) => Math.round(n);
    img.style.filter = glow.style.filter = "";
    img.style.filter = `brightness(${v[1].toFixed(3)}) saturate(${v[2].toFixed(3)})`;
    wash.style.background = `rgb(${r(v[3])},${r(v[4])},${r(v[5])})`;
    wash.style.opacity = v[6];
    nl.style.opacity = v[7];
    glow.style.opacity = v[8];
    stars.style.opacity = v[14];
    patch.style.opacity = clamp(v[12], 0, 1);
    const st = clamp((h - 6) / 12.3, 0, 1);
    sun.style.left = 95 - 90 * st + "%";
    sun.style.top = 19 - 11 * Math.sin(Math.PI * st) + "%";
    sun.style.opacity = h < 6 ? 0 : v[13];
    const hh = Math.floor(h),
      mm = Math.round((h % 1) * 60);
    $("clk").textContent =
      `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`;
    $("cap").textContent = C.find((c) => h < c[0])[1];
  }
  rng.addEventListener("input", paint);
  paint();
});

safe(() => {
  /* move-in cost (indicative figures, edit here) */
  const f = (n) => Math.round(n).toLocaleString("en-AE"),
    ids = ["rent", "ctype", "chq", "furn"];
  function cost() {
    const r = +$("rent").value,
      v = $("ctype").value === "Villa",
      fu = $("furn").checked,
      n = +$("chq").value;
    const L = [
        ["First rent cheque", r / n],
        [`Security deposit (${fu ? 10 : 5}%)`, r * (fu ? 0.1 : 0.05)],
        ["Agency fee (5%)", r * 0.05],
        ["Utilities deposit", v ? 4000 : 2000],
        ["Ejari registration", 220],
      ],
      T = L.reduce((s, l) => s + l[1], 0),
      col = ["#4a0e1b", "#f2b705", "#6b1428", "#c98b0a", "#a85a6a"];
    $("rentO").textContent = "AED " + f(r);
    $("tot").textContent = "AED " + f(T);
    $("bar").innerHTML = L.map(
      (l, i) =>
        `<i style="width:${(l[1] / T) * 100}%;background:${col[i]}"></i>`,
    ).join("");
    $("lst").innerHTML = L.map(
      (l, i) =>
        `<li><span><b style="background:${col[i]}"></b>${l[0]}</span><span>AED ${f(l[1])}</span></li>`,
    ).join("");
  }
  ids.forEach((i) => $(i).addEventListener("input", cost));
  cost();
});
