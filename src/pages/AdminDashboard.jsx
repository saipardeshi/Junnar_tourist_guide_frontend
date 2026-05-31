import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats, getAdminUsers, adminDeletePlace, adminAddPlace, getAllPlaces } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats]   = useState(null);
  const [users, setUsers]   = useState([]);
  const [places, setPlaces] = useState([]);
  const [tab, setTab]       = useState("overview");
  const [loading, setLoading] = useState(true);
  const [addForm, setAddForm] = useState({ name:"", description:"", category:[], location:"Junnar", imageUrl:"", rating:4.0, entryFee:"Free", timings:"", bestTimeToVisit:"", tags:"" });

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([getAdminStats(), getAdminUsers(), getAllPlaces()])
      .then(([sRes, uRes, pRes]) => {
        setStats(sRes.data); setUsers(uRes.data); setPlaces(pRes.data);
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleDeletePlace = async (id) => {
    if (!window.confirm("Delete this place?")) return;
    await adminDeletePlace(id);
    setPlaces(places.filter(p => p.id !== id));
  };

  const handleAddPlace = async (e) => {
    e.preventDefault();
    const payload = { ...addForm, tags: addForm.tags.split(",").map(t => t.trim()), rating: parseFloat(addForm.rating) };
    const res = await adminAddPlace(payload);
    setPlaces([...places, res.data]);
    setAddForm({ name:"", description:"", category:"Fort", location:"Junnar", imageUrl:"", rating:4.0, entryFee:"Free", timings:"", bestTimeToVisit:"", tags:"" });
  };

  if (loading) return <div style={styles.loading}><div style={styles.spinner} /></div>;

  const TABS = ["overview", "places", "users", "add-place"];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>ADMIN <span style={{ color: "#ff6b00" }}>DASHBOARD</span></h1>
        <span style={styles.adminBadge}>🔑 Admin</span>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}>
            {t.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && stats && (
        <div style={styles.statsGrid}>
          {[
            { label: "Total Users",       value: stats.totalUsers,       icon: "" },
            { label: "Total Places",      value: stats.totalPlaces,      icon: "" },
            { label: "Total Reviews",     value: stats.totalReviews,     icon: "" },
            { label: "Total Itineraries", value: stats.totalItineraries, icon: "" },
          ].map(s => (
            <div key={s.label} style={styles.statCard}>
              <div style={styles.statIcon}>{s.icon}</div>
              <div style={styles.statNum}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Places */}
      {tab === "places" && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>{["Name","Category","Location","Rating","Action"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {places.map(p => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}><span style={styles.catBadge}>{p.category}</span></td>
                  <td style={styles.td}>{p.location}</td>
                  <td style={styles.td}>⭐ {p.rating}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleDeletePlace(p.id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Users */}
      {tab === "users" && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>{["Name","Email","Role"].map(h => (
                <th key={h} style={styles.th}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>{u.name}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.catBadge, background: u.role === "ADMIN" ? "rgba(255,107,0,0.15)" : "rgba(255,255,255,0.05)", color: u.role === "ADMIN" ? "#ff6b00" : "#888" }}>
                      {u.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Place */}
      {tab === "add-place" && (
        <div style={styles.formCard}>
          <h3 style={styles.formHeading}>Add New Place</h3>
          <form onSubmit={handleAddPlace}>
            <div style={styles.formGrid}>
              {[["name","Name"],["location","Location"],["imageUrl","Image URL"],["entryFee","Entry Fee"],["timings","Timings"],["bestTimeToVisit","Best Time to Visit"]].map(([key,label]) => (
                <div key={key}>
                  <label style={styles.label}>{label}</label>
                  <input style={styles.input} value={addForm[key]}
                    onChange={e => setAddForm({ ...addForm, [key]: e.target.value })}
                    required={key === "name"} />
                </div>
              ))}
              <div>
                <label style={styles.label}>Category</label>
                <select style={styles.input} value={addForm.category}
                  onChange={e => setAddForm({ ...addForm, category: e.target.value })}>
                  {["Fort","Cave","Temple","Wildlife","Ghat","Waterfall"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={styles.label}>Rating</label>
                <input type="number" min="1" max="5" step="0.1" style={styles.input}
                  value={addForm.rating} onChange={e => setAddForm({ ...addForm, rating: e.target.value })} />
              </div>
            </div>
            <label style={styles.label}>Description</label>
            <textarea style={{ ...styles.input, height: "100px", resize: "vertical" }}
              value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} required />
            <label style={styles.label}>Tags (comma separated)</label>
            <input style={styles.input} placeholder="heritage, trekking, history"
              value={addForm.tags} onChange={e => setAddForm({ ...addForm, tags: e.target.value })} />
            <button type="submit" style={styles.addBtn}>Add Place →</button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spinner: { width: "40px", height: "40px", border: "3px solid #1e1e1e", borderTop: "3px solid #ff6b00", borderRadius: "50%" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" },
  title: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", letterSpacing: "0.05em" },
  adminBadge: { background: "rgba(255,107,0,0.1)", color: "#ff6b00", border: "1px solid rgba(255,107,0,0.2)", padding: "0.4rem 1rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "700" },
  tabs: { display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" },
  tab: { padding: "0.5rem 1.2rem", background: "#111", border: "1px solid #2a2a2a", borderRadius: "6px", color: "#666", cursor: "pointer", fontSize: "0.88rem" },
  tabActive: { border: "1px solid rgba(255,107,0,0.5)", background: "rgba(255,107,0,0.1)", color: "#ff6b00" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" },
  statCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "2rem", textAlign: "center" },
  statIcon: { fontSize: "2rem", marginBottom: "0.5rem" },
  statNum: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color: "#ff6b00", lineHeight: 1 },
  statLabel: { color: "#555", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.3rem" },
  tableCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", overflow: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "1rem 1.2rem", textAlign: "left", color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "1px solid #1e1e1e" },
  tr: { borderBottom: "1px solid #1a1a1a" },
  td: { padding: "0.9rem 1.2rem", color: "#888", fontSize: "0.88rem" },
  catBadge: { background: "rgba(255,107,0,0.1)", color: "#ff6b00", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600" },
  deleteBtn: { background: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", padding: "0.3rem 0.8rem", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" },
  formCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "2rem" },
  formHeading: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" },
  label: { display: "block", color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", marginTop: "0.8rem" },
  input: { width: "100%", padding: "0.7rem 1rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" },
  addBtn: { marginTop: "1.5rem", background: "#ff6b00", color: "#fff", border: "none", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: "700", cursor: "pointer" },
};