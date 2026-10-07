/* Shared data + helpers for property.html, area.html, advisors.html */
const M = "https://img.magnific.com/free-photo/";
const RAW = {
  villa: "miami-luxury-house_649448-2903",
  living:
    "3d-rendering-loft-luxury-living-room-with-design-chandelier_105762-2226",
  pool: "light-garden-luxury-pool-nature_1203-4908",
  dining: "modern-dining-room-living-room-with-luxury-decor_105762-1672",
  deck: "swimming-pool_1203-3385",
  sea: "long-shot-tropical-resort-seaside_23-2148226482",
  view: "modern-spacious-room-with-large-panoramic-window_7502-7289",
  drone:
    "beautiful-aerial-view-futuristic-city-landscape-with-roads-cars-skyscrapers-dubai-uae_231208-7583",
  apt: "modern-high-buildings-with-multiple-apartments_114579-12139",
  town: "modern-townhouses-with-contemporary-architecture-dusk_84443-74054",
  semi: "modern-urban-townhouses-illuminated-dusk_84443-74075",
  compound:
    "high-angle-shot-buildings-beautiful-seashore-with-clear-blue-sky-background_181624-20318",
  metro: "train-by-night-dubai_641386-1183",
};
const LOCAL = ["hero", "palm", "rent", "marina"];
function src(k) {
  return LOCAL.includes(k) ? `assets/${k}.jpg` : `assets/img/${k}.jpg`;
}
function im(k, alt, x) {
  x = x || "";
  if (LOCAL.includes(k)) return `<img src="assets/${k}.jpg" alt="${alt}" ${x}>`;
  return `<img src="assets/img/${k}.jpg" onerror="this.onerror=null;this.src='${M}${RAW[k]}.jpg'" alt="${alt}" ${x}>`;
}
const AREAS = {
  palm: {
    name: "Palm Jumeirah",
    tag: "Beachfront villas",
    img: "palm",
    desc: "Private beaches, signature villas and a resort lifestyle on the world’s most famous island.",
  },
  hills: {
    name: "Emirates Hills",
    tag: "Gated estates",
    img: "villa",
    desc: "Large plots, lake and golf views, and some of the most private estate homes in Dubai.",
  },
  downtown: {
    name: "Downtown Dubai",
    tag: "Sky penthouses",
    img: "dining",
    desc: "Penthouses and residences beside the Burj Khalifa, Dubai Mall and the Opera District.",
  },
  marina: {
    name: "Dubai Marina",
    tag: "Waterfront suites",
    img: "view",
    desc: "High-floor suites on the water, with the promenade, tram and beach on your doorstep.",
  },
  dubaihills: {
    name: "Dubai Hills",
    tag: "Family villas",
    img: "pool",
    desc: "Green, family-friendly communities close to parks, schools and the golf course.",
  },
};
const TYPES = [
  {
    k: "apartments",
    name: "Apartments",
    tag: "Studios to four-bedroom homes in full-service towers",
    img: "rent",
  },
  {
    k: "penthouses",
    name: "Penthouses & Duplexes",
    tag: "Full-floor and two-level homes above the skyline",
    img: "living",
  },
  {
    k: "townhouses",
    name: "Townhouses",
    tag: "Multi-storey family homes on landscaped streets",
    img: "town",
  },
  {
    k: "standalone",
    name: "Standalone / Independent Villas",
    tag: "Private plots, private pools, no shared walls",
    img: "villa",
  },
  {
    k: "semi",
    name: "Semi-Detached / Twin Houses",
    tag: "Twin villas sharing one wall, with full privacy",
    img: "semi",
  },
  {
    k: "gated",
    name: "Compound & Gated Communities",
    tag: "Secure compounds with shared pools, parks and gyms",
    img: "compound",
  },
  {
    k: "villas",
    name: "Villas",
    tag: "Beachfront and garden villas in prime addresses",
    img: "pool",
  },
  {
    k: "metro",
    name: "Near-Metro Apartments",
    tag: "Easy living a short walk from a Dubai Metro station",
    img: "metro",
  },
];
const TYPE = Object.fromEntries(TYPES.map((t) => [t.k, t]));
const PROPS = {
  hills: {
    a: "hills",
    t: "standalone",
    name: "The Emirates Hills Villa",
    beds: 6,
    baths: 8,
    sqft: "14,200",
    price: 48000,
    imgs: ["villa", "pool", "living"],
    desc: "A gated estate villa with a private pool, landscaped gardens and a separate staff wing, set on one of the best plots in the community.",
    am: [
      "Private pool",
      "Cinema room",
      "Maid’s room",
      "Smart home",
      "Garden",
      "4-car garage",
    ],
  },
  hills2: {
    a: "hills",
    t: "standalone",
    name: "The Lakeview Mansion",
    beds: 7,
    baths: 9,
    sqft: "18,000",
    price: 85000,
    imgs: ["pool", "villa", "dining"],
    desc: "A grand lakefront mansion with double-height living spaces, a spa suite and a pool terrace facing the water.",
    am: [
      "Lake view",
      "Spa suite",
      "Elevator",
      "Pool",
      "Staff quarters",
      "6-car garage",
    ],
  },
  downtown: {
    a: "downtown",
    t: "penthouses",
    name: "Downtown Sky Penthouse",
    beds: 4,
    baths: 5,
    sqft: "6,100",
    price: 36000,
    imgs: ["dining", "living", "view"],
    desc: "A full-floor penthouse with floor-to-ceiling glass, a private elevator lobby and a terrace facing the Burj Khalifa.",
    am: [
      "Private elevator",
      "Concierge",
      "Terrace",
      "Gym",
      "Valet parking",
      "Fully furnished",
    ],
  },
  downtown2: {
    a: "downtown",
    t: "apartments",
    name: "Burj View Residence",
    beds: 2,
    baths: 3,
    sqft: "2,300",
    price: 18000,
    imgs: ["rent", "view", "living"],
    desc: "A bright two-bedroom apartment with a direct Burj Khalifa view, walkable to Dubai Mall and the fountain.",
    am: ["Burj view", "Balcony", "Gym", "Pool", "Covered parking", "Concierge"],
  },
  metro: {
    a: "downtown",
    t: "metro",
    name: "Metro Link Residence",
    beds: 2,
    baths: 2,
    sqft: "1,650",
    price: 14500,
    imgs: ["metro", "rent", "view"],
    desc: "A modern two-bedroom apartment a short walk from the metro, ideal for commuting across the city without a car.",
    am: [
      "Metro nearby",
      "Balcony",
      "Gym",
      "Pool",
      "Parking",
      "Retail downstairs",
    ],
  },
  palm: {
    a: "palm",
    t: "villas",
    name: "Palm Jumeirah Signature",
    beds: 5,
    baths: 6,
    sqft: "9,800",
    price: 52000,
    imgs: ["deck", "sea", "palm"],
    desc: "A beachfront villa on the Palm with direct sand access, an infinity pool and open living spaces made for the water.",
    am: [
      "Private beach",
      "Infinity pool",
      "Boat mooring",
      "BBQ deck",
      "Maid’s room",
      "Smart home",
    ],
  },
  palm2: {
    a: "palm",
    t: "villas",
    name: "Palm Garden Home",
    beds: 4,
    baths: 5,
    sqft: "6,400",
    price: 44000,
    imgs: ["sea", "deck", "living"],
    desc: "A garden villa on a quiet frond, with a shaded pool, a family majlis and a short walk to the beach.",
    am: [
      "Garden",
      "Pool",
      "Majlis",
      "Beach access",
      "Maid’s room",
      "Parking for 3",
    ],
  },
  marina: {
    a: "marina",
    t: "penthouses",
    name: "Marina Duplex Penthouse",
    beds: 3,
    baths: 4,
    sqft: "3,400",
    price: 29000,
    imgs: ["marina", "view", "dining"],
    desc: "A two-level penthouse with a wraparound marina view, built-in storage throughout and a short walk to the promenade.",
    am: [
      "Marina view",
      "Terrace",
      "Gym",
      "Pool",
      "Covered parking",
      "Tram nearby",
    ],
  },
  marina2: {
    a: "marina",
    t: "apartments",
    name: "Marina Harbour Apartment",
    beds: 3,
    baths: 4,
    sqft: "2,900",
    price: 22000,
    imgs: ["marina", "rent", "view"],
    desc: "A corner apartment above the harbour with wide balconies, an open kitchen and resort-style amenities.",
    am: ["Harbour view", "Balcony", "Gym", "Pool", "Valet", "Fully furnished"],
  },
  dubaihills: {
    a: "dubaihills",
    t: "gated",
    name: "Dubai Hills Family Villa",
    beds: 5,
    baths: 6,
    sqft: "7,200",
    price: 38000,
    imgs: ["pool", "villa", "compound"],
    desc: "A bright family villa inside a gated community, with a pool, a large garden and a flexible family room.",
    am: [
      "Gated community",
      "Pool",
      "Garden",
      "Family room",
      "Near schools",
      "Golf views",
    ],
  },
  dubaihills2: {
    a: "dubaihills",
    t: "townhouses",
    name: "Park Ridge Townhouse",
    beds: 4,
    baths: 4,
    sqft: "4,600",
    price: 27000,
    imgs: ["town", "living", "pool"],
    desc: "A modern townhouse on a green park lane, with a roof terrace, a private garden and a built-in home office.",
    am: [
      "Roof terrace",
      "Garden",
      "Home office",
      "Park view",
      "Parking for 2",
      "Near metro",
    ],
  },
  twin: {
    a: "dubaihills",
    t: "semi",
    name: "Hills Twin Residence",
    beds: 4,
    baths: 5,
    sqft: "5,300",
    price: 32000,
    imgs: ["semi", "town", "pool"],
    desc: "A semi-detached twin villa with its own entrance, private garden and pool, sharing only one wall.",
    am: [
      "Private garden",
      "Pool",
      "Maid’s room",
      "Park view",
      "Parking for 2",
      "Near schools",
    ],
  },
};
const WA = "971500000000";
const wa = (t) => "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
const fmt = (n) => n.toLocaleString("en-AE");
window.libs.then(() => {
  if (!window.Lenis) return;
  const l = new Lenis({ duration: 1.15 });
  const r = (t) => {
    l.raf(t);
    requestAnimationFrame(r);
  };
  requestAnimationFrame(r);
});
