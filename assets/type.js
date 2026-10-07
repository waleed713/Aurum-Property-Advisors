/* Property type page: type.html?t=villas */
const t = new URLSearchParams(location.search).get("t"),
  tk = TYPE[t] ? t : "apartments",
  T = TYPE[tk];
const list = Object.keys(PROPS).filter((x) => PROPS[x].t === tk);
document.title = `${T.name} for Rent in Dubai | Aurum Property Advisors`;
document.querySelector("meta[name=description]").content =
  `${T.name} for rent in Dubai. ${T.tag}.`;
document.getElementById("type").innerHTML = `
<section class="area-hero">${im(T.img, T.name + " in Dubai")}<div><p class="crumb"><a href="index.html#types">Property types</a> / ${T.name}</p><h1>${T.name}</h1><p>${T.tag}.</p></div></section>
<section class="area-list"><h2 class="serif" style="font-size:clamp(2rem,4.4vw,4rem);color:var(--yellow)">${list.length} ${list.length == 1 ? "home" : "homes"} available</h2>
<div class="pgrid">${list
  .map((x) => {
    const p = PROPS[x],
      A = AREAS[p.a];
    return `<a class="pcard" href="property.html?id=${x}"><figure>${im(p.imgs[0], p.name + ", " + A.name, 'loading="lazy"')}</figure><span class="tag">${A.name}</span><h3 class="serif">${p.name}</h3><p>${p.beds} beds · ${p.baths} baths · ${p.sqft} sq ft</p><p class="price">AED ${fmt(p.price)} / month</p></a>`;
  })
  .join("")}</div>
<div style="margin-top:50px"><a class="btn" href="advisors.html">Talk to an advisor about ${T.name}</a></div></section>`;
