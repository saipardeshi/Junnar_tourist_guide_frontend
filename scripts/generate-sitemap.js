import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.SITE_URL || "https://junnar-tourist-guide-frontend.vercel.app";
const API_URL = process.env.VITE_API_URL || "https://junnar-tourist-guide-backend.onrender.com/api";

const STATIC_ROUTES = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/places", priority: "0.9", changefreq: "weekly" },
  { path: "/map", priority: "0.9", changefreq: "weekly" },
  { path: "/hotels", priority: "0.8", changefreq: "weekly" },
  { path: "/experiences", priority: "0.8", changefreq: "weekly" },
  { path: "/events", priority: "0.8", changefreq: "weekly" },
  { path: "/ai-planner", priority: "0.8", changefreq: "monthly" },
  { path: "/cost", priority: "0.7", changefreq: "monthly" },
  { path: "/tips", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

// Fallback known place IDs in case backend is offline or sleeping
const FALLBACK_PLACE_IDS = [
  "6ae62c8b2b20b04a09839a1c", // Shivneri Fort
  "6ae62c8b2b20b04a09839a1d", // Naneghat
  "6ae62c8b2b20b04a09839a1e", // Jivdhan Fort
  "6ae62c8b2b20b04a09839a1f", // Chavand Fort
  "6ae62c8b2b20b04a09839a20", // Sindola Fort (Khireshwar)
  "6ae62c8b2b20b04a09839a21", // Nimgiri & Hanumantgad
  "6ae62c8b2b20b04a09839a22", // Hadsar Fort
  "6ae62c8b2b20b04a09839a23", // Habashi Mahal
  "6ae62c8b2b20b04a09839a24", // Ozar Ganpati Temple
  "6ae62c8b2b20b04a09839a25", // Kukdeshvar Temple
  "6ae62c8b2b20b04a09839a26", // Kulswami Khandoba Mandir
  "6ae62c8b2b20b04a09839a27", // Lenyadri Caves
  "6ae62c8b2b20b04a09839a28", // Bhimashankar Wildlife Sanctuary
  "6ae62c8b2b20b04a09839a29", // Amba Ambika Caves
  "6ae62c8b2b20b04a09839a2a", // The Tulja Caves
  "6ae62c8b2b20b04a09839a2b", // Malshej Ghat
  "6ae62c8b2b20b04a09839a2c", // Daryaghat
  "6ae62c8b2b20b04a09839a2d", // Manikdoh Dam
  "6ae62c8b2b20b04a09839a2e", // Wadaj Dam
  "6ae62c8b2b20b04a09839a2f", // Pimpalgaon Joge Dam
  "6ae62c8b2b20b04a09839a30", // Yedgaon Dam
  "6ae62c8b2b20b04a09839a31", // Dimbhe Dam
  "6ae62c8b2b20b04a09839a32", // Chilewadi Dam
  "6ae62c8b2b20b04a09839a33", // Shiv Shrusti
];

async function fetchPlaces() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(`${API_URL}/places`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((p) => p.id || p._id).filter(Boolean);
    }
  } catch (err) {
    console.warn("⚠️ Could not fetch dynamic places from backend (" + err.message + "), using fallback place IDs.");
  }
  return FALLBACK_PLACE_IDS;
}

async function generateSitemap() {
  const today = new Date().toISOString().split("T")[0];
  const placeIds = await fetchPlaces();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  for (const route of STATIC_ROUTES) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Dynamic place routes
  for (const id of placeIds) {
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/places/${id}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, xml, "utf-8");
  console.log(`✅ Sitemap successfully written to ${sitemapPath} (${STATIC_ROUTES.length + placeIds.length} URLs)`);
}

generateSitemap();
