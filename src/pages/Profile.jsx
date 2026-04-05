import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, getAllPlaces } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [favPlaces, setFavPlaces] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    Promise.all([getProfile(), getAllPlaces()])
      .then(([pRes, plRes]) => {
        setProfile(pRes.data);
        setNewName(pRes.data.name);
        const favIds = pRes.data.favourites || [];
        setFavPlaces(plRes.data.filter(p => favIds.includes(p.id)));
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    const res = await updateProfile({ name: newName });
    setProfile(prev => ({ ...prev, name: res.data.name }));
    setEditing(false);
  };

  if (loading) return <div style={styles.loading}><div style={styles.spinner} /></div>;

  const STAT_ITEMS = [
    { label: "Itineraries", value: profile.itineraryCount, icon: "🗺️" },
    { label: "Reviews", value: profile.reviewCount, icon: "⭐" },
    { label: "Favourites", value: favPlaces.length, icon: "❤️" },
  ];

  return (
    <div style={styles.page}>
      {/* Profile Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>{profile.name?.[0]?.toUpperCase()}</div>
        <div style={styles.profileInfo}>
          {editing ? (
            <div style={styles.editRow}>
              <input style={styles.editInput} value={newName} onChange={e => setNewName(e.target.value)} />
              <button style={styles.saveBtn} onClick={handleSave}>Save</button>
              <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div style={styles.nameRow}>
              <h2 style={styles.name}>{profile.name}</h2>
              <button style={styles.editBtn} onClick={() => setEditing(true)}>✏️ Edit</button>
            </div>
          )}
          <p style={styles.email}>{profile.email}</p>
          <span style={styles.roleBadge}>{profile.role}</span>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {STAT_ITEMS.map(s => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statNum}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Favourites */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>❤️ Saved Places</h3>
        {favPlaces.length === 0 ? (
          <p style={styles.empty}>No saved places yet. Heart a place to save it here!</p>
        ) : (
          <div style={styles.favGrid}>
            {favPlaces.map(place => (
              <div key={place.id} style={styles.favCard} onClick={() => navigate(`/places/${place.id}`)}>
                <div style={styles.favEmoji}>🏔️</div>
                <div>
                  <div style={styles.favName}>{place.name}</div>
                  <div style={styles.favCat}>{place.category}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div style={styles.dangerZone}>
        <button style={styles.logoutBtn} onClick={() => { logout(); navigate("/"); }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "900px", margin: "0 auto" },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spinner: { width: "40px", height: "40px", border: "3px solid #1e1e1e", borderTop: "3px solid #ff6b00", borderRadius: "50%" },
  profileCard: { display: "flex", alignItems: "center", gap: "2rem", background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" },
  avatar: { width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,107,0,0.2)", color: "#ff6b00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "700", flexShrink: 0 },
  profileInfo: { flex: 1 },
  nameRow: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.3rem" },
  name: { color: "#fff", fontSize: "1.5rem", fontWeight: "700" },
  editBtn: { background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "0.85rem" },
  editRow: { display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" },
  editInput: { padding: "0.4rem 0.8rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "6px", color: "#fff", fontSize: "1rem" },
  saveBtn: { background: "#ff6b00", border: "none", color: "#fff", padding: "0.4rem 0.8rem", borderRadius: "6px", fontWeight: "600", cursor: "pointer", fontSize: "0.85rem" },
  cancelBtn: { background: "none", border: "1px solid #333", color: "#666", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" },
  email: { color: "#555", fontSize: "0.9rem", marginBottom: "0.5rem" },
  roleBadge: { background: "rgba(255,107,0,0.1)", color: "#ff6b00", border: "1px solid rgba(255,107,0,0.2)", padding: "0.2rem 0.7rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "2rem" },
  statCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem", textAlign: "center" },
  statIcon: { fontSize: "1.8rem", marginBottom: "0.5rem" },
  statNum: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.5rem", color: "#ff6b00", lineHeight: 1 },
  statLabel: { color: "#555", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.3rem" },
  section: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" },
  sectionTitle: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem" },
  empty: { color: "#444", fontSize: "0.88rem" },
  favGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "0.8rem" },
  favCard: { display: "flex", gap: "0.8rem", alignItems: "center", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "0.8rem", cursor: "pointer" },
  favEmoji: { fontSize: "1.5rem" },
  favName: { color: "#ccc", fontSize: "0.88rem", fontWeight: "600" },
  favCat: { color: "#555", fontSize: "0.75rem" },
  dangerZone: { display: "flex", justifyContent: "flex-end" },
  logoutBtn: { background: "transparent", border: "1px solid #333", color: "#666", padding: "0.6rem 1.5rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" },
};