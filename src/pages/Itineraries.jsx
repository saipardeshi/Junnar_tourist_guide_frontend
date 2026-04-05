import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyItineraries, createItinerary, deleteItinerary, getAllPlaces } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Itineraries() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [itineraries, setItineraries] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", numberOfDays: 1, placeIds: [] });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([getMyItineraries(), getAllPlaces()])
      .then(([iRes, pRes]) => { setItineraries(iRes.data); setPlaces(pRes.data); })
      .finally(() => setLoading(false));
  }, [user]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createItinerary(form);
      setItineraries([...itineraries, res.data]);
      setForm({ title: "", description: "", numberOfDays: 1, placeIds: [] });
      setShowForm(false);
    } catch { alert("Failed to create. Are you logged in?"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this itinerary?")) return;
    await deleteItinerary(id);
    setItineraries(itineraries.filter(it => it.id !== id));
  };

  const togglePlace = (placeId) => {
    setForm(prev => ({
      ...prev,
      placeIds: prev.placeIds.includes(placeId)
        ? prev.placeIds.filter(id => id !== placeId)
        : [...prev.placeIds, placeId]
    }));
  };

  const getPlaceName = (placeId) => places.find(p => p.id === placeId)?.name || placeId;

  if (loading) return <div style={styles.loading}><div style={styles.spinner} /></div>;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>MY <span style={{ color: "#ff6b00" }}>TRIPS</span></h1>
          <p style={styles.subtitle}>{itineraries.length} itinerary{itineraries.length !== 1 ? "ies" : ""} saved</p>
        </div>
        <button style={showForm ? styles.cancelBtn : styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ New Itinerary"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Plan a New Trip</h3>
          <form onSubmit={handleCreate}>
            <div style={styles.formGrid}>
              <div>
                <label style={styles.label}>Trip Title</label>
                <input style={styles.input} required placeholder="e.g. 2-Day Junnar Trek"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              </div>
              <div>
                <label style={styles.label}>Number of Days</label>
                <input style={styles.input} type="number" min="1" max="14"
                  value={form.numberOfDays} onChange={e => setForm({ ...form, numberOfDays: parseInt(e.target.value) })} />
              </div>
            </div>

            <label style={styles.label}>Description</label>
            <textarea style={{ ...styles.input, height: "80px", resize: "vertical" }}
              placeholder="What's your plan..." value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} />

            <label style={styles.label}>Select Places to Visit</label>
            <div style={styles.placeGrid}>
              {places.map(place => (
                <label key={place.id} style={{
                  ...styles.placeOption,
                  ...(form.placeIds.includes(place.id) ? styles.placeOptionActive : {})
                }}>
                  <input type="checkbox" style={{ display: "none" }}
                    checked={form.placeIds.includes(place.id)}
                    onChange={() => togglePlace(place.id)} />
                  <span>{place.name}</span>
                  <span style={styles.placeCat}>{place.category}</span>
                </label>
              ))}
            </div>

            <button type="submit" style={styles.submitBtn}>Create Itinerary →</button>
          </form>
        </div>
      )}

      {/* Empty State */}
      {itineraries.length === 0 && !showForm ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🗺️</div>
          <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>No trips planned yet</h3>
          <p style={{ color: "#555" }}>Click "+ New Itinerary" to start planning your Junnar adventure</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {itineraries.map(it => (
            <div key={it.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <h3 style={styles.cardTitle}>{it.title}</h3>
                  <span style={styles.daysBadge}>📅 {it.numberOfDays} Day{it.numberOfDays > 1 ? "s" : ""}</span>
                </div>
                <button onClick={() => handleDelete(it.id)} style={styles.deleteBtn}>🗑️</button>
              </div>
              {it.description && <p style={styles.cardDesc}>{it.description}</p>}
              {it.placeIds?.length > 0 && (
                <div style={styles.placeTags}>
                  {it.placeIds.map(pid => (
                    <span key={pid} style={styles.placeTag}>{getPlaceName(pid)}</span>
                  ))}
                </div>
              )}
              <p style={styles.createdAt}>
                Created {new Date(it.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1100px", margin: "0 auto" },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spinner: { width: "40px", height: "40px", border: "3px solid #1e1e1e", borderTop: "3px solid #ff6b00", borderRadius: "50%" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem" },
  title: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", letterSpacing: "0.05em" },
  subtitle: { color: "#555", fontSize: "0.88rem" },
  addBtn: { background: "#ff6b00", color: "#fff", border: "none", padding: "0.7rem 1.5rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.95rem" },
  cancelBtn: { background: "transparent", color: "#888", border: "1px solid #333", padding: "0.7rem 1.5rem", borderRadius: "8px", fontSize: "0.95rem" },
  formCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" },
  formTitle: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  label: { display: "block", color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", marginTop: "1rem" },
  input: { width: "100%", padding: "0.75rem 1rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff", fontSize: "0.92rem", boxSizing: "border-box" },
  placeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "0.5rem", marginTop: "0.5rem" },
  placeOption: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 1rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem", color: "#888", transition: "all 0.2s" },
  placeOptionActive: { border: "1px solid rgba(255,107,0,0.5)", background: "rgba(255,107,0,0.08)", color: "#ff6b00" },
  placeCat: { fontSize: "0.72rem", color: "#444" },
  submitBtn: { marginTop: "1.5rem", background: "#ff6b00", color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: "700", fontSize: "0.95rem" },
  empty: { textAlign: "center", padding: "5rem 0", color: "#555" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" },
  card: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" },
  cardTitle: { color: "#fff", fontSize: "1.05rem", fontWeight: "600", marginBottom: "0.4rem" },
  daysBadge: { background: "rgba(255,107,0,0.1)", color: "#ff6b00", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.78rem", fontWeight: "600" },
  deleteBtn: { background: "none", border: "none", fontSize: "1rem", cursor: "pointer", color: "#555" },
  cardDesc: { color: "#666", fontSize: "0.88rem", lineHeight: "1.5", marginBottom: "1rem" },
  placeTags: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" },
  placeTag: { background: "#161616", border: "1px solid #2a2a2a", color: "#888", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.78rem" },
  createdAt: { color: "#333", fontSize: "0.75rem", borderTop: "1px solid #1a1a1a", paddingTop: "0.8rem", marginTop: "0.5rem" },
};