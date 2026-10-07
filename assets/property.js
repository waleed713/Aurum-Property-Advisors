/* Single property page: property.html?id=palm */
const id = new URLSearchParams(location.search).get("id"),
  k = PROPS[id] ? id : "hills",
  p = PROPS[k],
  A = AREAS[p.a];
document.title = `${p.name}, ${A.name} | Aurum Property Advisors Dubai`;
document.querySelector("meta[name=description]").content =
  `${p.name} for rent in ${A.name}, Dubai. ${p.beds} bedrooms, ${p.baths} bathrooms, ${p.sqft} sq ft. AED ${fmt(p.price)} per month.`;
const ld = document.createElement("script");
ld.type = "application/ld+json";
ld.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Accommodation",
  name: p.name,
  numberOfBedrooms: p.beds,
  numberOfBathroomsTotal: p.baths,
  floorSize: {
    "@type": "QuantitativeValue",
    value: +p.sqft.replace(",", ""),
    unitCode: "FTK",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: A.name + ", Dubai",
    addressCountry: "AE",
  },
  image: p.imgs.map(src),
});
document.head.appendChild(ld);
document.getElementById("pd").innerHTML = `
<p class="crumb"><a href="index.html#residences">Residences</a> / <a href="area.html?a=${p.a}">${A.name}</a></p>
<h1>${p.name}</h1>
<div class="gal">${p.imgs.map((s, i) => `<figure>${im(s, `${p.name} photo ${i + 1}`, i ? 'loading="lazy"' : "")}</figure>`).join("")}</div>
<div class="pd-body"><div>
 <a class="tag" href="type.html?t=${p.t}">${TYPE[p.t].name}</a>
 <p style="max-width:560px;font-size:1.1rem;margin-top:8px">${p.desc}</p>
 <div class="specs"><div><b>${p.beds}</b>Bedrooms</div><div><b>${p.baths}</b>Bathrooms</div><div><b>${p.sqft}</b>Sq ft</div><div><b>${A.name.split(" ")[0]}</b>Area</div></div>
 <h2 class="serif" style="font-size:1.6rem;color:var(--yellow)">Included</h2><div class="am">${p.am.map((a) => `<span>${a}</span>`).join("")}</div>
</div>
<aside class="side"><div><small>From</small><div class="p">AED ${fmt(p.price)}</div><small>per month</small></div>
 <a class="btn" href="${wa("Hello Aurum, I would like to view " + p.name + " in " + A.name + ".")}" target="_blank" rel="noopener">Book a viewing on WhatsApp</a>
 <a class="btn ghost" href="advisors.html">Talk to an advisor</a>
 <a class="btn ghost" href="index.html#cost">Check move-in total</a></aside></div>`;
const others = Object.keys(PROPS)
  .filter((x) => x !== k)
  .sort((x, y) => (PROPS[y].a === p.a) - (PROPS[x].a === p.a))
  .slice(0, 4);
document.getElementById("more").innerHTML = others
  .map(
    (x) =>
      `<a href="property.html?id=${x}"><figure>${im(PROPS[x].imgs[0], PROPS[x].name, 'loading="lazy"')}</figure><h3 class="serif" style="font-size:1.3rem">${PROPS[x].name}</h3><small>AED ${fmt(PROPS[x].price)} / month</small></a>`,
  )
  .join("");
