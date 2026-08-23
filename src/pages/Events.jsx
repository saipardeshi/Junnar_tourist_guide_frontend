import { useEffect, useState } from "react";
import { getEvents } from "../services/api";

const TAG_COLORS = {
  Cultural:              "#8b5cf6",
  Adventure:             "#ff6b00",
  Festival:              "#f59e0b",
  Nature:                "#10b981",
  Trekking:              "#ef4444",
  Science:               "#0ea5e9",
  "Monsoon destination": "#06b6d4",
};

export default function Events() {
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [filterTag, setFilterTag] = useState("All");

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data))
      .catch(() => setEvents(FALLBACK_EVENTS))
      .finally(() => setLoading(false));
  }, []);

  // Group events by month dynamically
  const filtered = filterTag === "All" ? events : events.filter(e => e.tag === filterTag);
  const grouped  = filtered.reduce((acc, ev) => {
    const key = ev.month || "Other";
    acc[key] = acc[key] ? [...acc[key], ev] : [ev];
    return acc;
  }, {});

  const allTags = ["All", ...Object.keys(TAG_COLORS)];

  return (
    <div style={styles.page}>
      <style>{`
        .ev-card { display: flex; gap: 1.5rem; }
        .ev-left { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; min-width: 60px; }
        @media (max-width: 600px) {
          .ev-card { flex-direction: column; gap: 0.8rem !important; }
          .ev-left { flex-direction: row !important; min-width: auto !important; justify-content: flex-start; }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          EVENTS &amp; <span style={{ color: "#ff6b00" }}>FESTIVALS</span>
        </h1>
        <p style={styles.subtitle}>Plan your visit around Junnar's most vibrant celebrations</p>
      </div>

      {/* Tag filter */}
      <div style={styles.legend}>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(tag)}
            style={{
              ...styles.legendItem,
              borderColor: filterTag === tag ? (TAG_COLORS[tag] || "#ff6b00") : "#2a2a2a",
              color:       filterTag === tag ? (TAG_COLORS[tag] || "#ff6b00") : "#555",
              background:  filterTag === tag ? `${TAG_COLORS[tag] || "#ff6b00"}18`  : "transparent",
              cursor: "pointer",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Loading skeleton */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              height: 100, background: "linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)",
              backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
              borderRadius: 12, border: "1px solid #1e1e1e",
            }} />
          ))}
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎭</div>
          <p>No events found for this filter.</p>
        </div>
      ) : (
        <div style={styles.timeline}>
          {Object.entries(grouped).map(([month, evts]) => (
            <div key={month} style={styles.monthGroup}>
              <div style={styles.monthLabel}>{month}</div>
              <div style={styles.monthEvents}>
                {evts.map(event => {
                  const tagColor = TAG_COLORS[event.tag] || "#ff6b00";
                  return (
                    <div key={event.id || event.name} className="ev-card" style={styles.eventCard}>
                      <div className="ev-left" style={styles.eventLeft}>
                        <div style={styles.eventIcon}>{event.icon}</div>
                        <div style={{ ...styles.eventTag, background: tagColor + "22", color: tagColor, border: `1px solid ${tagColor}44` }}>
                          {event.tag}
                        </div>
                      </div>
                      <div style={styles.eventRight}>
                        <div style={styles.eventHeader}>
                          <h3 style={styles.eventName}>{event.name}</h3>
                          {event.date && <span style={styles.eventDate}>📅 {event.date}</span>}
                        </div>
                        <p style={styles.eventDesc}>{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

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

// ── Fallback data used when backend is not running ────────────────────────────
const FALLBACK_EVENTS = [
  { name: "Chhatrapati Shivaji Maharaj Jayanti", month: "February",         date: "19 Feb",   description: "Celebrates the birth of Chhatrapati Shivaji Maharaj — honors his bravery, leadership, and vision of Swarajya.",                                     tag: "Festival",            icon: "🚩" },
  { name: "National Science Day (GMRT Khodad)",  month: "February",         date: "28 Feb",   description: "Celebrates the discovery of the Raman Effect by C. V. Raman and promotes science and innovation, observed at GMRT Khodad.",                      tag: "Science",             icon: "🔭" },
  { name: "Ganesh Chaturthi at Ozar",            month: "August–September", date: "Aug/Sep",  description: "Magnificent Ganesh festival at Vighnahar Ganpati Temple. Thousands of pilgrims, processions and celebrations.",                                   tag: "Festival",            icon: "🐘" },
  { name: "Ganesh Chaturthi at Lenyadri",        month: "August–September", date: "Aug/Sep",  description: "Ancient Ashtavinayaka shrine celebration with a unique Buddhist caves backdrop.",                                                                 tag: "Festival",            icon: "🕌" },
  { name: "Malshej Ghat Waterfalls",             month: "August–October",   date: "Aug–Oct",  description: "Waterfalls look breathtakingly beautiful at Malshej Ghat, creating a magical natural view.",                                                      tag: "Nature",              icon: "🌊" },
  { name: "Naneghat Monsoon Trek",               month: "August–October",   date: "Aug–Oct",  description: "Peak monsoon waterfall season with fog and reverse waterfall. Dramatic cliffs and ancient caves.",                                                tag: "Monsoon destination", icon: "🌧️" },
  { name: "Daryaghat Trek",                      month: "August–October",   date: "Aug–Oct",  description: "Famous for reverse waterfall in monsoon with strong winds and breathtaking valley views.",                                                       tag: "Monsoon destination", icon: "🏔️" },
  { name: "Shivneri Fort Trek Season",           month: "December–January", date: "Dec–Jan",  description: "Peak trekking season. Clear skies, cool weather, and panoramic views of Sahyadri.",                                                              tag: "Trekking",            icon: "🧗" },
  { name: "Jivdhan Fort Trek",                   month: "December–January", date: "Dec–Jan",  description: "Clear skies, cool weather, and thrilling rock patches with stunning Sahyadri views.",                                                             tag: "Trekking",            icon: "⛰️" },
  { name: "Junnar Heritage Walk",                month: "December–January", date: "Dec",      description: "Guided walks through Junnar's ancient sites including Buddhist caves, old temples and traditional markets.",                                       tag: "Cultural",            icon: "🏛️" },
];

const styles = {
  page:       { background: "#0a0a0a", minHeight: "100vh", padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)", maxWidth: "1000px", margin: "0 auto" },
  header:     { textAlign: "center", marginBottom: "2rem" },
  title:      { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 7vw, 3.5rem)", letterSpacing: "0.05em" },
  subtitle:   { color: "#555", marginTop: "0.5rem" },
  legend:     { display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center", marginBottom: "3rem" },
  legendItem: { padding: "0.3rem 0.9rem", borderRadius: "20px", border: "1px solid", fontSize: "0.8rem", fontWeight: "600", transition: "all 0.2s" },
  empty:      { textAlign: "center", color: "#555", padding: "5rem 0" },
  timeline:   { display: "flex", flexDirection: "column", gap: "2.5rem" },
  monthGroup: {},
  monthLabel: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", color: "#ff6b00", letterSpacing: "0.1em", borderBottom: "1px solid #1e1e1e", paddingBottom: "0.5rem", marginBottom: "1rem" },
  monthEvents:{ display: "flex", flexDirection: "column", gap: "0.8rem" },
  eventCard:  { display: "flex", gap: "1.5rem", background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem", transition: "border-color 0.2s" },
  eventLeft:  { display: "flex", flexDirection: "column", alignItems: "center", gap: "0.8rem", minWidth: "60px" },
  eventIcon:  { fontSize: "2rem" },
  eventTag:   { padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700", textAlign: "center", whiteSpace: "nowrap" },
  eventRight: { flex: 1 },
  eventHeader:{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" },
  eventName:  { color: "#fff", fontSize: "1.05rem", fontWeight: "600" },
  eventDate:  { color: "#ff6b00", fontSize: "0.82rem", fontWeight: "600" },
  eventDesc:  { color: "#777", fontSize: "0.88rem", lineHeight: "1.6" },
  note:       { display: "flex", gap: "1rem", alignItems: "flex-start", background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "1.2rem", marginTop: "2rem" },
  noteIcon:   { fontSize: "1.2rem" },
  noteText:   { color: "#666", fontSize: "0.88rem", lineHeight: "1.6" },
};