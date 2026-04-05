import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { path: "/",           label: "Home" },
  { path: "/places",     label: "Explore" },
  { path: "/map",        label: "Map" },
  { path: "/cost",       label: "Budget" },
  { path: "/tips",       label: "Travel Tips" },
  { path: "/events",     label: "Events" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    color: isActive(path) ? "#ff6b00" : "#666",
    fontWeight: isActive(path) ? "600" : "400",
    fontSize: "0.88rem",
    letterSpacing: "0.02em",
    transition: "color 0.2s",
    paddingBottom: "2px",
    borderBottom: isActive(path) ? "1px solid #ff6b00" : "1px solid transparent",
    whiteSpace: "nowrap",
  });

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        <span style={styles.logoAccent}>J</span>UNNAR
        <span style={styles.logoSub}> Guide</span>
      </Link>

      {/* Desktop Links */}
      <div style={styles.links}>
        {NAV_LINKS.map(l => (
          <Link key={l.path} to={l.path} style={linkStyle(l.path)}>{l.label}</Link>
        ))}
        {user && (
          <Link to="/itineraries" style={linkStyle("/itineraries")}>My Trips</Link>
        )}
      </div>

      {/* Auth */}
      <div style={styles.auth}>
        {user ? (
          <div style={styles.userMenu}>
            <button style={styles.userBtn} onClick={() => setMenuOpen(!menuOpen)}>
              <span style={styles.avatar}>{user.name?.[0]?.toUpperCase()}</span>
              <span style={styles.userName}>{user.name}</span>
              <span style={{ color: "#555" }}>▾</span>
            </button>
            {menuOpen && (
              <div style={styles.dropdown}>
                <Link to="/profile" style={styles.dropItem} onClick={() => setMenuOpen(false)}>👤 Profile</Link>
                <Link to="/itineraries" style={styles.dropItem} onClick={() => setMenuOpen(false)}>🗺️ My Trips</Link>
                {user.role === "ADMIN" && (
                  <Link to="/admin" style={styles.dropItem} onClick={() => setMenuOpen(false)}>🔑 Admin Dashboard</Link>
                )}
                <div style={styles.dropDivider} />
                <button style={styles.dropLogout} onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login"    style={styles.outlineBtn}>Login</Link>
            <Link to="/register" style={styles.accentBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.9rem 2.5rem",
    background: "rgba(10,10,10,0.97)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #1a1a1a",
    position: "sticky", top: 0, zIndex: 200,
    gap: "1.5rem",
  },
  logo: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "1.5rem", letterSpacing: "0.1em",
    color: "#fff", textDecoration: "none", flexShrink: 0,
  },
  logoAccent: { color: "#ff6b00" },
  logoSub: { fontSize: "0.7rem", color: "#444", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.04em" },
  links: { display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "nowrap", overflow: "hidden" },
  auth: { display: "flex", gap: "0.7rem", alignItems: "center", flexShrink: 0 },
  outlineBtn: {
    padding: "0.4rem 1rem", borderRadius: "6px",
    border: "1px solid #2a2a2a", background: "transparent",
    color: "#666", fontSize: "0.85rem", cursor: "pointer",
    textDecoration: "none", display: "inline-block", whiteSpace: "nowrap",
  },
  accentBtn: {
    padding: "0.4rem 1.1rem", borderRadius: "6px",
    background: "#ff6b00", color: "#fff",
    border: "none", fontSize: "0.85rem", fontWeight: "700",
    cursor: "pointer", textDecoration: "none", display: "inline-block", whiteSpace: "nowrap",
  },
  userMenu: { position: "relative" },
  userBtn: {
    display: "flex", alignItems: "center", gap: "0.5rem",
    background: "#111", border: "1px solid #2a2a2a",
    borderRadius: "8px", padding: "0.4rem 0.8rem",
    cursor: "pointer", color: "#ccc",
  },
  avatar: {
    width: "24px", height: "24px", borderRadius: "50%",
    background: "#ff6b00", color: "#fff",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.75rem", fontWeight: "700",
  },
  userName: { fontSize: "0.85rem", color: "#aaa" },
  dropdown: {
    position: "absolute", top: "calc(100% + 8px)", right: 0,
    background: "#111", border: "1px solid #2a2a2a",
    borderRadius: "10px", minWidth: "180px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
    overflow: "hidden", zIndex: 300,
  },
  dropItem: {
    display: "block", padding: "0.7rem 1rem",
    color: "#888", fontSize: "0.88rem",
    textDecoration: "none", transition: "background 0.15s",
    borderBottom: "1px solid #1a1a1a",
  },
  dropDivider: { height: "1px", background: "#1a1a1a" },
  dropLogout: {
    display: "block", width: "100%", padding: "0.7rem 1rem",
    background: "none", border: "none", color: "#666",
    fontSize: "0.85rem", textAlign: "left", cursor: "pointer",
  },
};