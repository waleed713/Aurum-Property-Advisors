/* Area page: area.html?a=palm (lists that area's properties, each opens property.html?id=...) */
const a = new URLSearchParams(location.search).get("a"),
  ak = AREAS[a] ? a : "palm",
  A = AREAS[ak];
const list = Object.keys(PROPS).filter((x) => PROPS[x].a === ak);
document.title = `${A.name} Luxury Rentals | Aurum Property Advisors Dubai`;
document.querySelector("meta[name=description]").content =
  `Luxury homes for rent in ${A.name}, Dubai. ${A.desc}`;
document.getElementById("area").innerHTML = `
<section class="area-hero">${im(A.img, A.name + ", Dubai")}<div><p class="crumb"><a href="index.html#areas">Where we rent</a> / ${A.name}</p><h1>${A.name}</h1><p>${A.desc}</p></div></section>
<section class="area-list"><h2 class="serif" style="font-size:clamp(2rem,4.4vw,4rem);color:var(--yellow)">${list.length} residences in ${A.name}</h2>
<div class="pgrid">${list
  .map((x) => {
    const p = PROPS[x];
    return `<a class="pcard" href="property.html?id=${x}"><figure>${im(p.imgs[0], p.name + ", " + A.name, 'loading="lazy"')}</figure><span class="tag">${TYPE[p.t].name}</span><h3 class="serif">${p.name}</h3><p>${p.beds} beds · ${p.baths} baths · ${p.sqft} sq ft</p><p class="price">AED ${fmt(p.price)} / month</p></a>`;
  })
  .join("")}</div>
<div style="margin-top:50px"><a class="btn" href="advisors.html">Talk to an advisor about ${A.name}</a></div></section>`;
