const TIPS = [
  {
    icon: "", title: "How to Reach Junnar",
    items: [
      "From Pune: ST Bus from Shivajinagar Bus Stand (2.5 hrs, ₹150)",
      "From Mumbai: Via kalyan and malshej (4.5 hrs)",
      "By Car: Pune-Junnar via Chakan-Rajgurunagar route (97 km)",
      "Nearest Railway Station: Pune(Khadki) (97 km) or Kalyan (112 km)",
    ]
  },
  {
    icon: "", title: "Local Food to Try",
    items: [
      "Zunka Bhakar — traditional Maharashtrian village food",
      "Jaggery from Junnar — locally produced, famous in region",
      "Bhakri with Thecha — spicy green chilli chutney",
      "Puran Poli — especially during festival season",
      "Misal Pav — spicy sprouted lentil curry with Pav",
      "vada pav — popular street food, try from local stalls",
    ]
  },
  {
    icon: "", title: "Where to Stay",
    items: [
      "MTDC Resort near Malshej Ghat (government resort)",
      "Local homestays in Junnar town (budget-friendly)",
      "Hotels in Narayangaon (15 km from Junnar)",
      "Camping near Bhimashankar during trekking season",
    ]
  },
  {
    icon: "", title: "Do's & Don'ts",
    items: [
      "✅ Carry cash — ATMs are limited in remote areas",
      "✅ Start treks early morning (5-6 AM) especially in summer",
      "✅ Carry water bottle & snacks for fort visits",
      "❌ Don't litter at historical sites & sanctuaries",
      "❌ Don't visit Malshej Ghat waterfalls too close — slippery",
    ]
  },
  {
    icon: "", title: "Emergency Contacts",
    items: [
      "Junnar Police Station: 02132-222233",
      "Junnar Rural Hospital: 02132-222055",
      "Forest Department (Bhimashankar): 02114-243277",
      "Tourist Helpline Maharashtra: 1800-200-5885 (Toll Free)",
    ]
  },
  {
    icon: "", title: "What to Pack",
    items: [
      "Trekking shoes (mandatory for Shivneri, Naneghat)",
      "Rain jacket  (July–October)",
      "Sunscreen & cap (February–April)",
      "Power bank — charging points rare on trails",
    ]
  },
  {
  icon: "", title: "Must Buy from Junnar",
  items: [
    "High-quality wheat grown locally",
    "Famous Indrayani rice (aromatic & soft)",
    "Ankur Kedar wheat (well-known local variety)",
    "Fresh farm produce directly from local farmers",
    "Support local agriculture "
  ]
},
];

const DISTANCES = [
  { from: "Pune", km: "90 km", time: "2.5 hrs" },
  { from: "Mumbai", km: "180 km", time: "4 hrs" },
  { from: "Nashik", km: "150 km", time: "3 hrs" },
  { from: "Chh. Sambhajinagar", km: "230 km", time: "4 hrs" },
  { from: "Ahilyanagar", km: "109 km", time: "2.5 hrs" },
];

export default function TravelTips() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          TRAVEL <span style={{ color: "#ff6b00" }}>TIPS</span>
        </h1>
        <p style={styles.subtitle}>Everything you need to know before visiting Junnar</p>
      </div>

      {/* Distance Cards */}
      <section style={styles.distanceSection}>
        <h2 style={styles.sectionTitle}> Distance from Major Cities</h2>
        <div style={styles.distanceGrid}>
          {DISTANCES.map(d => (
            <div key={d.from} style={styles.distanceCard}>
              <div style={styles.distanceCity}>{d.from}</div>
              <div style={styles.distanceKm}>{d.km}</div>
              <div style={styles.distanceTime}> {d.time}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Grid */}
      <div style={styles.tipsGrid}>
        {TIPS.map((tip) => (
          <div key={tip.title} style={styles.tipCard}>
            <div style={styles.tipIcon}>{tip.icon}</div>
            <h3 style={styles.tipTitle}>{tip.title}</h3>
            <ul style={styles.tipList}>
              {tip.items.map((item, i) => (
                <li key={i} style={styles.tipItem}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Best Seasons */}
      <section style={styles.seasonSection}>
        <h2 style={styles.sectionTitle}>Best Seasons to Visit</h2>
        <div style={styles.seasonGrid}>
          {[
            { season: "Winter", months: "Oct – Jan", emoji: "", desc: "Best overall. All places accessible. Pleasant weather.", color: "#ff6b00" },
            { season: "Monsoon", months: "July – Oct", emoji: "", desc: "Malshej Ghat is magical. Waterfalls at peak. Leeches on trails.", color: "#0ea5e9" },
            { season: "Summer", months: "Feb – Apr", emoji: "", desc: "Hot but less crowded. Start treks by 6 AM.", color: "#f59e0b" },
          ].map(s => (
            <div key={s.season} style={{ ...styles.seasonCard, borderColor: s.color }}>
              <div style={{ fontSize: "2.5rem" }}>{s.emoji}</div>
              <h3 style={{ ...styles.seasonName, color: s.color }}>{s.season}</h3>
              <div style={styles.seasonMonths}>{s.months}</div>
              <p style={styles.seasonDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "3rem" },
  title: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", letterSpacing: "0.05em" },
  subtitle: { color: "#555", marginTop: "0.5rem" },
  distanceSection: { marginBottom: "3rem" },
  sectionTitle: { color: "#fff", fontSize: "1.1rem", fontWeight: "600", marginBottom: "1.2rem" },
  distanceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" },
  distanceCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem", textAlign: "center" },
  distanceCity: { color: "#aaa", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" },
  distanceKm: { color: "#ff6b00", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem" },
  distanceTime: { color: "#555", fontSize: "0.82rem", marginTop: "0.3rem" },
  tipsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.2rem", marginBottom: "3rem" },
  tipCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem" },
  tipIcon: { fontSize: "2rem", marginBottom: "0.8rem" },
  tipTitle: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", fontWeight: "700" },
  tipList: { paddingLeft: "0", listStyle: "none" },
  tipItem: { color: "#888", fontSize: "0.88rem", lineHeight: "1.7", padding: "0.3rem 0", borderBottom: "1px solid #161616" },
  seasonSection: { marginBottom: "3rem" },
  seasonGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" },
  seasonCard: { background: "#111", border: "1px solid", borderRadius: "12px", padding: "1.8rem" },
  seasonName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.05em", margin: "0.5rem 0 0.2rem" },
  seasonMonths: { color: "#555", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem" },
  seasonDesc: { color: "#777", fontSize: "0.88rem", lineHeight: "1.6" },
};