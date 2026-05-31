const EVENTS = [
  // {
  //   month: "",
  //   events: [
  //     { name: "Shivneri Utsav", date: "19 Jan", desc: "Shivaji Maharaj's birth anniversary celebrated at Shivneri Fort with cultural programs, historical re-enactments and thousands of devotees.", tag: "Cultural", icon: "" },
  //   ]
  // },
  {
    month: "February",
    events: [
      { name: " Chhatrapati Shivaji Maharaj Jayanti", desc: "Celebrates the birth of Chhatrapati Shivaji Maharaj ,Honors his bravery, leadership, and vision of Swarajya.", tag: "Festival", icon: "" },
      { name: "National Science Day (GMRT Khodad)", date: "28 Feb", desc: "Celebrates the discovery of the Raman Effect by C. V. Raman and promotes science and innovation, observed at GMRT Khodad.", tag: "Science", icon: "" },
    ]
  },
  
  {
    month: "August–September",
    events: [
      { name: "Ganesh Chaturthi at Ozar", date: "Aug/Sep", desc: "One of the most magnificent Ganesh festivals at Vighnahar Ganpati Temple. Thousands of pilgrims, processions and celebrations.", tag: "Festival", icon: "" },
      { name: "Ganesh Chaturthi at Lenyadri", date: "Aug/Sep", desc: "Ancient Ashtavinayaka shrine celebration on the hill. Unique atmosphere with Buddhist caves backdrop.", tag: "Festival", icon: "" },
    ]
  },
  {
    month: "August–October",
    events: [
      { name: "Malshej Ghat", date: "Aug/Oct", desc: "At Malshej Ghat, waterfalls look breathtakingly beautiful and create a magical natural view.", tag: "Nature", icon: "" },
      { name: "Naneghat Trek ", date: "Aug/Oct", desc: "Peak monsoon waterfall season with fog and reverse waterfall .At Naneghat, the scenery is stunning with dramatic cliffs and ancient caves, making it a truly mesmerizing place.", tag: "Monsoon destination", icon: "" },
      { name: "Daryaghat Trek", date: "Aug/Oct", desc: "Famous for reverse waterfall in monsoon with strong winds, offering breathtaking valley views and a thrilling experience.", tag: "Monsoon destination", icon: "" },
    ]
  },
  {
    month: "December–January",
    events: [
      { name: "Shivneri Fort  Trek", date: "Dec–Jan", desc: "Peak trekking season. Clear skies, cool weather, panoramic views of Sahyadri. Thousands of tourists visit.", tag: "Trekking", icon: "" },
      { name: "Jivdhan Fort Trek", date: "Dec–Jan", desc: "Peak trekking season. Clear skies, cool weather, and thrilling rock patches with stunning Sahyadri views.", tag: "Trekking", icon: "" },
      { name: "Nimgiri Fort Trek", date: "Dec–Jan", desc: "Ideal winter trek with pleasant climate, scenic hill views, and peaceful surroundings.", tag: "Trekking", icon: "" },
      { name: "Junnar Heritage Walk", date: "Dec", desc: "Guided walks through Junnar's ancient sites including Buddhist caves, old temples and traditional markets.", tag: "Cultural", icon: "" },
    ]
  },
];

const TAG_COLORS = {
  Cultural: "#8b5cf6",
  Adventure: "#ff6b00",
  Festival: "#f59e0b",
  Nature: "#10b981",
  Trekking: "#ef4444",
};

export default function Events() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          EVENTS & <span style={{ color: "#ff6b00" }}>FESTIVALS</span>
        </h1>
        <p style={styles.subtitle}>Plan your visit around Junnar's most vibrant celebrations</p>
      </div>

      {/* Legend */}
      <div style={styles.legend}>
        {Object.entries(TAG_COLORS).map(([tag, color]) => (
          <span key={tag} style={{ ...styles.legendItem, borderColor: color, color }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div style={styles.timeline}>
        {EVENTS.map((group) => (
          <div key={group.month} style={styles.monthGroup}>
            <div style={styles.monthLabel}>{group.month}</div>
            <div style={styles.monthEvents}>
              {group.events.map((event) => (
                <div key={event.name} style={styles.eventCard}>
                  <div style={styles.eventLeft}>
                    <div style={styles.eventIcon}>{event.icon}</div>
                    <div style={{ ...styles.eventTag, background: TAG_COLORS[event.tag] + "22", color: TAG_COLORS[event.tag], border: `1px solid ${TAG_COLORS[event.tag]}44` }}>
                      {event.tag}
                    </div>
                  </div>
                  <div style={styles.eventRight}>
                    <div style={styles.eventHeader}>
                      <h3 style={styles.eventName}>{event.name}</h3>
                      <span style={styles.eventDate}> {event.date}</span>
                    </div>
                    <p style={styles.eventDesc}>{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={styles.note}>
        <span style={styles.noteIcon}>ℹ</span>
        <p style={styles.noteText}>
          Exact dates for festivals like Ganesh Chaturthi vary by Hindu calendar each year.
          Check with local tourism board or call <strong style={{ color: "#ff6b00" }}>1800-200-5885</strong> for confirmed schedules.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1000px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "2rem" },
  title: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", letterSpacing: "0.05em" },
  subtitle: { color: "#555", marginTop: "0.5rem" },
  legend: { display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "3rem" },
  legendItem: { padding: "0.3rem 0.9rem", borderRadius: "20px", border: "1px solid", fontSize: "0.8rem", fontWeight: "600" },
  timeline: { display: "flex", flexDirection: "column", gap: "2.5rem" },
  monthGroup: {},
  monthLabel: {
    fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem",
    color: "#ff6b00", letterSpacing: "0.1em",
    borderBottom: "1px solid #1e1e1e", paddingBottom: "0.5rem", marginBottom: "1rem",
  },
  monthEvents: { display: "flex", flexDirection: "column", gap: "0.8rem" },
  eventCard: {
    display: "flex", gap: "1.5rem",
    background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px",
    padding: "1.5rem", transition: "border-color 0.2s",
  },
  eventLeft: { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem", minWidth: "60px" },
  eventIcon: { fontSize: "2rem" },
  eventTag: { padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700", textAlign: "center", whiteSpace: "nowrap" },
  eventRight: { flex: 1 },
  eventHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" },
  eventName: { color: "#fff", fontSize: "1.05rem", fontWeight: "600" },
  eventDate: { color: "#ff6b00", fontSize: "0.82rem", fontWeight: "600" },
  eventDesc: { color: "#777", fontSize: "0.88rem", lineHeight: "1.6" },
  note: {
    display: "flex", gap: "1rem", alignItems: "flex-start",
    background: "#111", border: "1px solid #1e1e1e",
    borderRadius: "10px", padding: "1.2rem", marginTop: "2rem",
  },
  noteIcon: { fontSize: "1.2rem" },
  noteText: { color: "#666", fontSize: "0.88rem", lineHeight: "1.6" },
};