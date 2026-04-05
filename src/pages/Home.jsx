// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// const SEASON_DATA = {
//   monsoon: { months: [6,7,8,9], label: "Monsoon Season 🌧️", tip: "Perfect for Malshej Ghat waterfalls & lush greenery!", color: "#0ea5e9" },
//   winter:  { months: [10,11,12,1,2], label: "Winter Season ❄️", tip: "Best time! Visit Shivneri Fort, Lenyadri & Naneghat.", color: "#ff6b00" },
//   summer:  { months: [3,4,5], label: "Summer Season ☀️", tip: "Early morning visits recommended. Try Ozar Temple & caves.", color: "#f59e0b" },
// };

// const STATS = [
//   { number: "6+", label: "Tourist Places" },
//   { number: "2", label: " 2/8 Ashtavinayak Temple" },
//   { number: "1st", label: "Tourist Taluka in MH" },
//   { number: "2000+", label: "Years of History" },
// ];

// const HIGHLIGHTS = [
//   { emoji: "🏔️", name: "Shivneri Fort", tag: "Heritage", desc: "Birthplace of Chhatrapati Shivaji Maharaj" },
//   { emoji: "🦁", name: "Lenyadri", tag: "Heritage and Temple", desc: "One of from eight Ashtavinayak Temples" },
//   { emoji: "🪨", name: "Ozar Temple", tag: "Temple", desc: "One of from eight Ashtavinayak Temples" },
//   { emoji: "🌊", name: "Malshej Ghat", tag: "Nature", desc: "Stunning waterfalls & misty valleys" },
// ];

// function getCurrentSeason() {
//   const month = new Date().getMonth() + 1;
//   if (SEASON_DATA.monsoon.months.includes(month)) return SEASON_DATA.monsoon;
//   if (SEASON_DATA.winter.months.includes(month)) return SEASON_DATA.winter;
//   return SEASON_DATA.summer;
// }

// export default function Home() {
//   const navigate = useNavigate();
//   const season = getCurrentSeason();
//   const [visible, setVisible] = useState(false);

//   useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

//   return (
//     <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>

//       {/* HERO */}
//       <section style={styles.hero}>
//         {/* Background geometric shapes */}
//         <div style={styles.heroBg1} />
//         <div style={styles.heroBg2} />

//         <div style={{ ...styles.heroContent, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s ease" }}>
//           <div style={styles.heroBadge}>
//             🏆 Maharashtra's First Tourist Taluka
//           </div>
//           <h1 style={styles.heroTitle}>
//             DISCOVER<br />
//             <span style={styles.heroAccent}>JUNNAR</span>
//           </h1>
//           <p style={styles.heroSub}>
//             Where history meets nature — forts, caves, wildlife & temples<br />
//             await you in the heart of Sahyadri
//           </p>
//           <div style={styles.heroButtons}>
//             <button style={styles.primaryBtn} onClick={() => navigate("/places")}>
//               Explore Places →
//             </button>
//             <button style={styles.secondaryBtn} onClick={() => navigate("/tips")}>
//               Plan Your Trip
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* SEASON BANNER */}
//       <section style={{ ...styles.seasonBanner, borderColor: season.color }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
//           <span style={{ ...styles.seasonTag, background: season.color }}>{season.label}</span>
//           <p style={styles.seasonText}>{season.tip}</p>
//         </div>
//         <button style={styles.seasonBtn} onClick={() => navigate("/places")}>
//           See Best Places Now →
//         </button>
//       </section>

//       {/* STATS */}
//       <section style={styles.statsSection}>
//         {STATS.map((s) => (
//           <div key={s.label} style={styles.statCard}>
//             <div style={styles.statNumber}>{s.number}</div>
//             <div style={styles.statLabel}>{s.label}</div>
//           </div>
//         ))}
//       </section>

//       {/* TOP ATTRACTIONS */}
//       <section style={styles.section}>
//         <div style={styles.sectionHeader}>
//           <h2 style={styles.sectionTitle}>Top <span style={{ color: "#ff6b00" }}>Attractions</span></h2>
//           <button style={styles.viewAllBtn} onClick={() => navigate("/places")}>View All →</button>
//         </div>
//         <div style={styles.highlightGrid}>
//           {HIGHLIGHTS.map((h, i) => (
//             <div
//               key={h.name}
//               style={{ ...styles.highlightCard, animationDelay: `${i * 0.1}s` }}
//               onClick={() => navigate("/places")}
//             >
//               <div style={styles.highlightEmoji}>{h.emoji}</div>
//               <span style={styles.highlightTag}>{h.tag}</span>
//               <h3 style={styles.highlightName}>{h.name}</h3>
//               <p style={styles.highlightDesc}>{h.desc}</p>
//               <div style={styles.cardArrow}>→</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ABOUT JUNNAR */}
//       <section style={styles.aboutSection}>
//         <div style={styles.aboutLeft}>
//           <h2 style={styles.sectionTitle}>About <span style={{ color: "#ff6b00" }}>Junnar</span></h2>
//           <p style={styles.aboutText}>
//             Junnar is a historic city in Pune district, Maharashtra — declared the state's
//             <strong style={{ color: "#ff6b00" }}> first tourist taluka</strong>. Home to the
//             mighty Shivneri Fort (birthplace of Chhatrapati Shivaji Maharaj), ancient
//             Lenyadri Buddhist caves, and the biodiverse Bhimashankar Wildlife Sanctuary.
//           </p>
//           <p style={{ ...styles.aboutText, marginTop: "1rem" }}>
//             From Ashtavinayaka pilgrimages to Sahyadri treks, Junnar offers a rare blend
//             of heritage, spirituality, and raw natural beauty — all within 100km of Pune.
//           </p>
//           <button style={styles.primaryBtn} onClick={() => navigate("/tips")} >
//             Plan Your Visit →
//           </button>
//         </div>
//         <div style={styles.aboutRight}>
//           {["🏯 2000+ years of history", "🦁 Endangered species habitat", "🛕Ashtavinayaka shrines", "🌿 Western Ghats biodiversity (Sahyadri)", "🚵 Trekking & adventure", "🎭 Rich Maratha heritage",].map((item) => (
//             <div key={item} style={styles.aboutChip}>{item}</div>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section style={styles.ctaSection}>
//         <h2 style={styles.ctaTitle}>Ready to Explore Junnar?</h2>
//         <p style={styles.ctaSub}>Create an account to save itineraries and plan your perfect trip</p>
//         <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
//           <button style={styles.primaryBtn} onClick={() => navigate("/register")}>Get Started Free</button>
//           <button style={styles.secondaryBtn} onClick={() => navigate("/places")}>Browse Places</button>
//         </div>
//       </section>

//     </div>
//   );
// }

// const styles = {
//   hero: {
//     position: "relative", overflow: "hidden",
//     minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center",
//     padding: "4rem 2rem",
//   },
//   heroBg1: {
//     position: "absolute", top: "-200px", right: "-200px",
//     width: "600px", height: "600px", borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   heroBg2: {
//     position: "absolute", bottom: "-150px", left: "-150px",
//     width: "500px", height: "500px", borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   heroContent: { textAlign: "center", maxWidth: "750px", position: "relative", zIndex: 1 },
//   heroBadge: {
//     display: "inline-block", padding: "0.4rem 1.2rem",
//     border: "1px solid rgba(255,107,0,0.4)", borderRadius: "20px",
//     color: "#ff6b00", fontSize: "0.85rem", marginBottom: "2rem",
//     background: "rgba(255,107,0,0.08)",
//   },
//   heroTitle: {
//     fontFamily: "'Bebas Neue', sans-serif",
//     fontSize: "clamp(4rem, 10vw, 7rem)", lineHeight: "0.95",
//     letterSpacing: "0.05em", color: "#fff", marginBottom: "1.5rem",
//   },
//   heroAccent: { color: "#ff6b00", WebkitTextStroke: "2px #ff6b00" },
//   heroSub: { color: "#888", fontSize: "1.1rem", lineHeight: "1.8", marginBottom: "2.5rem" },
//   heroButtons: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
//   primaryBtn: {
//     padding: "0.8rem 2rem", background: "#ff6b00", color: "#fff",
//     border: "none", borderRadius: "8px", fontSize: "1rem",
//     fontWeight: "600", cursor: "pointer",
//   },
//   secondaryBtn: {
//     padding: "0.8rem 2rem", background: "transparent", color: "#aaa",
//     border: "1px solid #333", borderRadius: "8px", fontSize: "1rem",
//     cursor: "pointer",
//   },
//   seasonBanner: {
//     margin: "0 2rem", borderRadius: "12px", padding: "1.2rem 2rem",
//     background: "#111", border: "1px solid",
//     display: "flex", justifyContent: "space-between", alignItems: "center",
//     flexWrap: "wrap", gap: "1rem",
//   },
//   seasonTag: {
//     padding: "0.3rem 0.8rem", borderRadius: "6px",
//     color: "#fff", fontSize: "0.8rem", fontWeight: "700",
//     whiteSpace: "nowrap",
//   },
//   seasonText: { color: "#ccc", fontSize: "0.95rem" },
//   seasonBtn: {
//     background: "transparent", border: "1px solid #333",
//     color: "#ff6b00", padding: "0.4rem 1rem", borderRadius: "6px",
//     fontSize: "0.85rem", whiteSpace: "nowrap",
//   },
//   statsSection: {
//     display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
//     gap: "1px", background: "#1a1a1a", margin: "2rem",
//     borderRadius: "12px", overflow: "hidden", border: "1px solid #1e1e1e",
//   },
//   statCard: {
//     background: "#111", padding: "2rem 1rem", textAlign: "center",
//   },
//   statNumber: {
//     fontFamily: "'Bebas Neue', sans-serif",
//     fontSize: "2.8rem", color: "#ff6b00", lineHeight: 1,
//   },
//   statLabel: { color: "#666", fontSize: "0.8rem", marginTop: "0.3rem", textTransform: "uppercase", letterSpacing: "0.08em" },
//   section: { padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" },
//   sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
//   sectionTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.4rem", letterSpacing: "0.05em" },
//   viewAllBtn: {
//     background: "transparent", border: "1px solid #333",
//     color: "#ff6b00", padding: "0.4rem 1rem", borderRadius: "6px", fontSize: "0.85rem",
//   },
//   highlightGrid: {
//     display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem",
//   },
//   highlightCard: {
//     background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px",
//     padding: "1.8rem", cursor: "pointer", transition: "all 0.3s ease",
//     position: "relative", overflow: "hidden",
//     animation: "fadeInUp 0.6s ease forwards",
//   },
//   highlightEmoji: { fontSize: "2.5rem", marginBottom: "1rem" },
//   highlightTag: {
//     background: "rgba(255,107,0,0.15)", color: "#ff6b00",
//     padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.72rem",
//     fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em",
//   },
//   highlightName: { color: "#fff", marginTop: "0.8rem", marginBottom: "0.4rem", fontSize: "1.1rem" },
//   highlightDesc: { color: "#666", fontSize: "0.88rem", lineHeight: "1.5" },
//   cardArrow: {
//     position: "absolute", bottom: "1.5rem", right: "1.5rem",
//     color: "#ff6b00", fontSize: "1.2rem", opacity: 0.6,
//   },
//   aboutSection: {
//     display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
//     padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto",
//     alignItems: "center",
//   },
//   aboutLeft: {},
//   aboutText: { color: "#888", lineHeight: "1.8", marginBottom: "1rem" },
//   aboutRight: { display: "flex", flexWrap: "wrap", gap: "0.8rem" },
//   aboutChip: {
//     background: "#111", border: "1px solid #222", borderRadius: "8px",
//     padding: "0.7rem 1.1rem", color: "#ccc", fontSize: "0.88rem",
//   },
//   ctaSection: {
//     background: "linear-gradient(135deg, #111 0%, #1a0d00 100%)",
//     borderTop: "1px solid #1e1e1e", padding: "5rem 2rem", textAlign: "center",
//   },
//   ctaTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", marginBottom: "1rem" },
//   ctaSub: { color: "#666", marginBottom: "2rem" },
// };
import Herosection from "./Herosection";

export default function Home() {
  return (
    <div>
      <Herosection />
    </div>
  );
}