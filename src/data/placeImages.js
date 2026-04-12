// src/data/placeImages.js
//
// ⚠️  Keys MUST exactly match the `name` field in DataInitializer.java
//     so that getImagesForPlace() finds images for every place.

export const PLACE_IMAGES = {

  // ── FORTS (7) ────────────────────────────────────────────────────────────
  "Shivneri Fort": [
    "/img/Shivneri_1.jpg",
    "/img/Shivneri_2.webp",
    "/img/Shivneri_3.avif",
    "/img/Shivneri_4.jpg",
    "/img/Shivneri_5.jpeg",
  ],
  "Jivdhan Fort": [
    "/img/jivdhan_1.jpeg",
    "/img/jivdhan_2.jpeg",
    "/img/jivdhan_3.jpg",
    "/img/jivdhan_4.png",
  ],
  "Chavand Fort": [
    "/img/chavand_1.jpeg",
    "/img/chavand_2.jpeg",
    "/img/chavand_3.jpeg",
  ],
  "Sindola Fort (Khireshwar)": [
    "/img/sindola_1.webp",
    "/img/sindola_2.jpeg",
    "/img/sindola_3.jpg",
  ],
  "Nimgiri & Hanumantgad": [
    "/img/nimgiri_1.jpeg",
    "/img/nimgiri_2.jpg",
    "/img/nimgiri_3.jpeg",
  ],
  "Hadsar Fort": [
    "/img/hadsar_1.jpg",
    "/img/hadsar_2.jpg",
    "/img/hadsar_3.jpeg",
    "/img/hadsar_4.jpeg",
  ],

  // ── NATURE (incl. Naneghat — was "Naneghat Pass", now "Naneghat") ────────
  // KEY CHANGED: "Naneghat Pass" → "Naneghat" to match DataInitializer
  "Naneghat": [
    "/img/naneghat_1.avif",
    "/img/naneghat_2.jpeg",
    "/img/naneghat_3.jpg",
    "/img/naneghat_4.webp",
  ],
  "Malshej Ghat": [
    "/img/malshej_1.webp",
    "/img/malshej_2.webp",
    "/img/malshej_3.jpeg",
    "/img/malshej_4.jpeg",
    "/img/malshej_5.avif",
  ],
  "Daryaghat": [
    "/img/daryaghat_1.jpeg",
    "/img/daryaghat_2.jpeg",
    "/img/daryaghat_3.jpeg",
    "/img/daryaghat_4.jpeg",
  ],

  // ── HERITAGE (shows under All) ────────────────────────────────────────────
  "Habashi Mahal": [
    "/img/Habashi_mahal_1.webp",
    "/img/Habashi_mahal_2.webp",
    "/img/Habashi_mahal_3.jpeg",
    "/img/Habashi_mahal_4.jpeg",
  ],
  // Shiv Shrusti — no images yet, returns [] gracefully via getImagesForPlace
  "Shiv Shrusti": [
    "/img/Shiv_Shrusti_2.jpeg",
    "/img/Shiv_Shrusti_1.jpeg",
    "/img/Shiv_Shrusti_3.webp",
    "/img/Shiv_Shrusti_4.jpeg",
    "/img/Shiv_Shrusti_5.jpeg",
  ],

  // ── TEMPLES (5) ──────────────────────────────────────────────────────────
  "Ozar Ganpati Temple": [
    "/img/ozar_1.jpeg",
    "/img/ozar_2.jpg",
    "/img/ozar_3.jpeg",
  ],
  "Kukdeshvar Temple": [
    "/img/Kukdeshvar_1.jpeg",
    "/img/Kukdeshvar_2.webp",
    "/img/Kukdeshvar_3.jpg",
    "/img/Kukdeshvar_4.webp",
  ],
  // KEY CHANGED: "Kulswami Khandoba Mandir Vadaj" → "Kulswami Khandoba Mandir"
  "Kulswami Khandoba Mandir": [
    "/img/khandoba_1.jpeg",
    "/img/khandoba_2.jpg",
  ],
  // Lenyadri — category changed to Temple in DB, key stays the same
  "Lenyadri Caves": [
    "/img/Lenyadri_1.jpg",
    "/img/Lenyadri_2.webp",
    "/img/Lenyadri_3.jpg",
    "/img/Lenyadri_4.jpg",
  ],
  // Bhimashankar — category changed to Temple in DB, key stays the same
  "Bhimashankar Wildlife Sanctuary": [
    "/img/bhimashankar-shiva-temple_1.jpg",
    "/img/bhimashankar-shiva-temple_2.jpg",
    "/img/bhimashankar-shiva-temple_3.jpg",
    "/img/bhimashankar-shiva-temple_4.jpg",
  ],

  // ── CAVES (2) ────────────────────────────────────────────────────────────
  "Amba Ambika Caves": [
    "/img/Amba_ambika_caves_junnar_1.webp",
    "/img/Amba_ambika_caves_junnar_2.jpeg",
    "/img/Amba_ambika_caves_junnar_3.jpeg",
    "/img/Amba_ambika_caves_junnar_4.jpeg",
  ],
  "The Tulja Caves (Tulja Lena)": [
    "/img/tulja_caves_1.jpeg",
    "/img/tulja_caves_2.jpeg",
    "/img/tulja_caves_3.jpeg",
    "/img/tulja_caves_4.jpeg",
  ],

  // ── DAMS (6) ─────────────────────────────────────────────────────────────
  "Manikdoh Dam": [
    "/img/manikdoh_1.png",
    "/img/manikdoh_2.jpeg",
    "/img/manikdoh_3.jpg",
  ],
  "Wadaj Dam": [
    "/img/wadaj_1.jpeg",
    "/img/wadaj_2.jpg",
    "/img/wadaj_3.avif",
  ],
  "Pimpalgaon Joge Dam": [
    "/img/pimpalgaon_joge_1.webp",
    "/img/pimpalgaon_joge_2.jpg",
    "/img/pimpalgaon_joge_3.png",
  ],
  "Yedgaon Dam": [
    "/img/yedgaon_1.jpg",
    "/img/yedgaon_2.png",
    "/img/yedgaon_3.jpg",
  ],
  "Dimbhe Dam": [
    "/img/dimbhe_1.webp",
    "/img/dimbhe_2.png",
    "/img/dimbhe_3.jpeg",
  ],
  "Chilewadi Dam": [
    "/img/chilewadi_1.jpeg",
    "/img/chilewadi_2.jpeg",
    "/img/chilewadi_3.jpeg",
  ],
};

// ── Keyword aliases ───────────────────────────────────────────────────────────
// Used as fallback when a name doesn't exactly match a key above.
const ALIASES = {
  "shivneri":         "Shivneri Fort",
  "naneghat":         "Naneghat",             // updated — no longer "Naneghat Pass"
  "jivdhan":          "Jivdhan Fort",
  "chavand":          "Chavand Fort",
  "sindola":          "Sindola Fort (Khireshwar)",
  "khireshwar":       "Sindola Fort (Khireshwar)",
  "nimgiri":          "Nimgiri & Hanumantgad",
  "hanumantgad":      "Nimgiri & Hanumantgad",
  "hadsar":           "Hadsar Fort",
  "habashi":          "Habashi Mahal",
  "shiv shrusti":     "Shiv Shrusti",
  "shivshrusti":      "Shiv Shrusti",
  "ozar":             "Ozar Ganpati Temple",
  "kukdeshvar":       "Kukdeshvar Temple",
  "khandoba":         "Kulswami Khandoba Mandir",  // updated key
  "vadaj":            "Kulswami Khandoba Mandir",  // updated key
  "kulswami":         "Kulswami Khandoba Mandir",  // updated key
  "lenyadri":         "Lenyadri Caves",
  "bhimashankar":     "Bhimashankar Wildlife Sanctuary",
  "amba ambika":      "Amba Ambika Caves",
  "tulja":            "The Tulja Caves (Tulja Lena)",
  "malshej":          "Malshej Ghat",
  "daryaghat":        "Daryaghat",
  "manikdoh":         "Manikdoh Dam",
  "wadaj":            "Wadaj Dam",
  "pimpalgaon":       "Pimpalgaon Joge Dam",
  "yedgaon":          "Yedgaon Dam",
  "dimbhe":           "Dimbhe Dam",
  "chilewadi":        "Chilewadi Dam",
};

/**
 * Returns image array for a place name.
 * Priority: 1. Exact match  2. Alias match  3. Fuzzy match  4. []
 */
export function getImagesForPlace(name = "") {
  if (!name) return [];
  const lower = name.trim().toLowerCase();

  // 1. Exact match (case-insensitive)
  const exactKey = Object.keys(PLACE_IMAGES).find(k => k.toLowerCase() === lower);
  if (exactKey) return PLACE_IMAGES[exactKey] || [];

  // 2. Alias match
  for (const [alias, key] of Object.entries(ALIASES)) {
    if (lower.includes(alias)) return PLACE_IMAGES[key] || [];
  }

  // 3. Fuzzy match — key contains name or name contains key
  const fuzzyKey = Object.keys(PLACE_IMAGES).find(k => {
    const kl = k.toLowerCase();
    return lower.includes(kl) || kl.includes(lower);
  });
  return fuzzyKey ? (PLACE_IMAGES[fuzzyKey] || []) : [];
}