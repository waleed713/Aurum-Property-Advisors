/* Advisors page. Edit the ADVISORS list below with your real team (name, role, areas, languages, phone, email, optional photo URL). */
const ADVISORS = [
  {
    n: "Omar Al Farsi",
    r: "Villas & estates",
    a: ["hills", "dubaihills"],
    t: ["standalone", "villas", "gated"],
    l: ["Arabic", "English"],
    p: "+971501112201",
    e: "omar@aurumpropertyadvisors.com",
    photo: "",
  },
  {
    n: "Sara Mitchell",
    r: "Penthouses & Downtown",
    a: ["downtown", "marina"],
    t: ["penthouses", "apartments", "metro"],
    l: ["English", "French"],
    p: "+971501112202",
    e: "sara@aurumpropertyadvisors.com",
    photo: "",
  },
  {
    n: "Rashid Khan",
    r: "Palm Jumeirah & waterfront",
    a: ["palm", "marina"],
    t: ["villas", "penthouses", "standalone"],
    l: ["English", "Urdu", "Hindi"],
    p: "+971501112203",
    e: "rashid@aurumpropertyadvisors.com",
    photo: "",
  },
  {
    n: "Elena Petrova",
    r: "Family homes & long lets",
    a: ["dubaihills", "downtown"],
    t: ["townhouses", "semi", "gated", "apartments"],
    l: ["English", "Russian"],
    p: "+971501112204",
    e: "elena@aurumpropertyadvisors.com",
    photo: "",
  },
];
const advRoot = document.getElementById("advpage");
const waTo = (p, t) =>
  "https://wa.me/" + p.replace("+", "") + "?text=" + encodeURIComponent(t);
const dubai = () => {
  const d = new Date(),
    h =
      +new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hour12: false,
        timeZone: "Asia/Dubai",
      }).format(d) % 24;
  return {
    on: h >= 9 && h < 21,
    txt: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Dubai",
    }).format(d),
  };
};
const allLang = [...new Set(ADVISORS.flatMap((x) => x.l))];
advRoot.innerHTML = `
<section class="adv-hero"><p class="crumb"><a href="index.html">Home</a> / Advisors</p>
 <h1>Speak to the advisor who knows your street.</h1>
 <p class="lead">Every enquiry goes to a named person, not a queue. Tell us what you are looking for and we will point you to the right advisor.</p>
 <div class="clockbar"><span class="dot"></span><b id="dtime"></b>&nbsp;in Dubai &middot; <span id="dstat"></span></div></section>
<section class="match"><h2 class="serif">Find your advisor</h2>
 <div class="mrow">
  <label>Property type<select id="mt"><option value="">Any</option>${TYPES.map((t) => `<option value="${t.k}">${t.name}</option>`).join("")}</select></label>
  <label>Area<select id="ma"><option value="">Any</option>${Object.keys(AREAS)
    .map((k) => `<option value="${k}">${AREAS[k].name}</option>`)
    .join("")}</select></label>
  <label>Language<select id="ml"><option value="">Any</option>${allLang.map((l) => `<option>${l}</option>`).join("")}</select></label>
  <button class="btn" id="mgo" type="button">Match me</button></div>
 <p class="mres" id="mres" aria-live="polite"></p></section>
<section class="advgrid">${ADVISORS.map(
  (x, i) => `
 <article class="advc" id="adv${i}"><div class="top"><div class="ava">${
   x.photo
     ? `<img src="${x.photo}" alt="${x.n}">`
     : x.n
         .split(" ")
         .map((w) => w[0])
         .join("")
 }</div>
  <div><h2 class="serif">${x.n}</h2><p class="role">${x.r}</p><p class="live"><span class="dot"></span><span class="st"></span></p></div></div>
  <div class="chips2">${x.a.map((k) => `<a href="area.html?a=${k}">${AREAS[k].name}</a>`).join("")}</div>
  <p class="lg"><b>Speaks</b> ${x.l.join(", ")}</p>
  <div class="slots"><span>Book a call</span><button type="button" data-i="${i}" data-s="today evening">Today evening</button><button type="button" data-i="${i}" data-s="tomorrow morning">Tomorrow morning</button><button type="button" data-i="${i}" data-s="tomorrow afternoon">Tomorrow afternoon</button></div>
  <div class="acts"><a class="btn" data-wa="${i}" href="${waTo(x.p, "Hello " + x.n.split(" ")[0] + ", I found you on Aurum Property Advisors and would like some help finding a home in Dubai.")}" target="_blank" rel="noopener">WhatsApp</a><a class="btn ghost" href="tel:${x.p}">Call</a><a class="btn ghost" href="mailto:${x.e}">Email</a></div>
 </article>`,
).join("")}</section>
<section class="office"><div><h2 class="serif">Prefer to talk to the office?</h2><p>Business Bay, Dubai, UAE &middot; open daily 9:00 AM to 9:00 PM Dubai time. Viewings can be arranged after hours.</p></div>
 <a class="btn" href="${wa("Hello Aurum, I have a question about renting in Dubai.")}" target="_blank" rel="noopener">General enquiry on WhatsApp</a></section>`;
function upd() {
  const d = dubai();
  advRoot.querySelector("#dtime").textContent = d.txt;
  advRoot.querySelector("#dstat").textContent = d.on
    ? "advisors are online, replies usually within the hour"
    : "advisors are offline, back at 9:00 AM Dubai time";
  advRoot.querySelectorAll(".advc .live").forEach((e) => {
    e.classList.toggle("off", !d.on);
    e.querySelector(".st").textContent = d.on
      ? "Online now"
      : "Back at 9:00 AM";
  });
  advRoot.querySelector(".clockbar").classList.toggle("off", !d.on);
}
upd();
clearInterval(window.__advT);
window.__advT = setInterval(upd, 30000);
const ctx = () => {
  const t = advRoot.querySelector("#mt"),
    a = advRoot.querySelector("#ma");
  return (
    (t.value ? TYPE[t.value].name : "a home") +
    (a.value ? " in " + AREAS[a.value].name : "")
  );
};
advRoot.querySelector("#mgo").addEventListener("click", () => {
  const t = advRoot.querySelector("#mt").value,
    a = advRoot.querySelector("#ma").value,
    l = advRoot.querySelector("#ml").value;
  const sc = ADVISORS.map(
    (x) =>
      (a && x.a.includes(a) ? 2 : 0) +
      (t && x.t.includes(t) ? 2 : 0) +
      (l && x.l.includes(l) ? 1 : 0),
  );
  const b = sc.indexOf(Math.max(...sc)),
    x = ADVISORS[b];
  advRoot
    .querySelectorAll(".advc")
    .forEach((e, i) => e.classList.toggle("hl", i === b));
  advRoot.querySelector("#mres").innerHTML =
    `Best match: <b>${x.n}</b>, ${x.r.toLowerCase()}.`;
  const w = advRoot.querySelector(`[data-wa="${b}"]`);
  w.href = waTo(
    x.p,
    `Hello ${x.n.split(" ")[0]}, I'm looking for ${ctx()}${l ? " and prefer to speak " + l : ""}.`,
  );
  document
    .getElementById("adv" + b)
    .scrollIntoView({ behavior: "smooth", block: "center" });
});
advRoot.querySelectorAll(".slots button").forEach((btn) =>
  btn.addEventListener("click", () => {
    const x = ADVISORS[+btn.dataset.i];
    open(
      waTo(
        x.p,
        `Hello ${x.n.split(" ")[0]}, could we speak ${btn.dataset.s}? I'm looking for ${ctx()}.`,
      ),
      "_blank",
    );
  }),
);
