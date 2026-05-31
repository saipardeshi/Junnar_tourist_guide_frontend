import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { path: "/",         label: "Home" },
  { path: "/places",   label: "Explore" },
  { path: "/map",      label: "Map" },
  { path: "/hotels",   label: "Hotels" },
  { path: "/cost",     label: "Budget" },
  { path: "/tips",     label: "Travel Tips" },
  { path: "/events",   label: "Events" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate          = useNavigate();
  const location          = useLocation();
  const [menuOpen, setMenuOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    textDecoration: "none",
  });

  const mobileLinkStyle = (path) => ({
    display: "block",
    padding: "0.85rem 1.4rem",
    color: isActive(path) ? "#ff6b00" : "#aaa",
    fontWeight: isActive(path) ? "600" : "400",
    fontSize: "1rem",
    textDecoration: "none",
    borderBottom: "1px solid #1a1a1a",
    background: isActive(path) ? "rgba(255,107,0,0.06)" : "transparent",
  });

  const closeAll = () => { setMobileOpen(false); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nb-links  { display: flex; }
        .nb-auth   { display: flex; }
        .nb-burger { display: none; }
        @media (max-width: 768px) {
          .nb-links  { display: none !important; }
          .nb-auth   { display: none !important; }
          .nb-burger { display: flex !important; }
        }
      `}</style>

      <nav style={styles.nav}>
        {/* Logo */}
        <Link to="/" style={styles.logo} onClick={closeAll}>
          <span style={styles.logoAccent}>J</span>UNNAR
          <span style={styles.logoSub}> Guide</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nb-links" style={styles.links}>
          {NAV_LINKS.map(l => (
            <Link key={l.path} to={l.path} style={linkStyle(l.path)}>{l.label}</Link>
          ))}
          {user && (
            <Link to="/itineraries" style={linkStyle("/itineraries")}>My Trips</Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="nb-auth" style={styles.auth}>
          {user ? (
            <div style={styles.userMenu}>
              <button style={styles.userBtn} onClick={() => setMenuOpen(!menuOpen)}>
                <span style={styles.avatar}>{user.name?.[0]?.toUpperCase()}</span>
                <span style={styles.userName}>{user.name}</span>
                <span style={{ color: "#555" }}>▾</span>
              </button>
              {menuOpen && (
                <div style={styles.dropdown}>
                  <Link to="/profile"     style={styles.dropItem} onClick={closeAll}>Profile</Link>
                  <Link to="/itineraries" style={styles.dropItem} onClick={closeAll}> My Trips</Link>
                  {user.role === "ADMIN" && (
                    <Link to="/admin" style={styles.dropItem} onClick={closeAll}>🔑 Admin Dashboard</Link>
                  )}
                  <div style={styles.dropDivider} />
                  <button style={styles.dropLogout} onClick={() => { logout(); navigate("/"); closeAll(); }}>
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

        {/* Hamburger — mobile only */}
        <button className="nb-burger" style={styles.hamburger}
          onClick={() => { setMobileOpen(v => !v); setMenuOpen(false); }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="3" x2="17" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <line x1="17" y1="3" x2="3"  y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="2" y1="5"  x2="18" y2="5"  stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <line x1="2" y1="10" x2="18" y2="10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <line x1="2" y1="15" x2="18" y2="15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div style={styles.drawer}>
          {NAV_LINKS.map(l => (
            <Link key={l.path} to={l.path} style={mobileLinkStyle(l.path)} onClick={closeAll}>
              {l.label}
            </Link>
          ))}
          {user && (
            <Link to="/itineraries" style={mobileLinkStyle("/itineraries")} onClick={closeAll}>
              My Trips
            </Link>
          )}

          {/* Auth inside drawer */}
          <div style={styles.drawerAuth}>
            {user ? (
              <>
                <div style={styles.drawerUser}>
                  <span style={styles.avatar}>{user.name?.[0]?.toUpperCase()}</span>
                  <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{user.name}</span>
                </div>
                <Link to="/profile" style={styles.drawerItem} onClick={closeAll}>👤 Profile</Link>
                {user.role === "ADMIN" && (
                  <Link to="/admin" style={styles.drawerItem} onClick={closeAll}>🔑 Admin</Link>
                )}
                <button style={styles.drawerLogout}
                  onClick={() => { logout(); navigate("/"); closeAll(); }}>
                  🚪 Logout
                </button>
              </>
            ) : (
              <div style={styles.drawerAuthRow}>
                <Link to="/login"    style={styles.drawerOutline} onClick={closeAll}>Login</Link>
                <Link to="/register" style={styles.drawerAccent}  onClick={closeAll}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "0.85rem 1.5rem",
    background: "rgba(10,10,10,0.97)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid #1a1a1a",
    position: "sticky", top: 0, zIndex: 200,
    gap: "1rem",
  },
  logo: {
    fontFamily: "'Bebas Neue',sans-serif",
    fontSize: "1.5rem", letterSpacing: "0.1em",
    color: "#fff", textDecoration: "none", flexShrink: 0,
  },
  logoAccent: { color: "#ff6b00" },
  logoSub:    { fontSize: "0.68rem", color: "#888", fontFamily: "'DM Sans',sans-serif" },
links: { gap: "1.4rem", alignItems: "center", flex: 1, overflow: "hidden", justifyContent: "center" },  auth:       { gap: "0.7rem", alignItems: "center", flexShrink: 0 },
  outlineBtn: {
    padding: "0.4rem 1rem", borderRadius: "6px",
    border: "1px solid #2a2a2a", background: "transparent",
    color: "#666", fontSize: "0.85rem",
    textDecoration: "none", whiteSpace: "nowrap",
  },
  accentBtn: {
    padding: "0.4rem 1.1rem", borderRadius: "6px",
    background: "#ff6b00", color: "#fff",
    fontSize: "0.85rem", fontWeight: "700",
    textDecoration: "none", whiteSpace: "nowrap",
  },
  userMenu:   { position: "relative" },
  userBtn: {
    display: "flex", alignItems: "center", gap: "0.5rem",
    background: "#111", border: "1px solid #2a2a2a",
    borderRadius: "8px", padding: "0.4rem 0.8rem",
    cursor: "pointer", color: "#ccc",
  },
  avatar: {
    width: "26px", height: "26px", borderRadius: "50%",
    background: "#ff6b00", color: "#fff",
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    fontSize: "0.75rem", fontWeight: "700", flexShrink: 0,
  },
  userName:   { fontSize: "0.85rem", color: "#aaa" },
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
    textDecoration: "none", borderBottom: "1px solid #1a1a1a",
  },
  dropDivider: { height: "1px", background: "#1a1a1a" },
  dropLogout: {
    display: "block", width: "100%", padding: "0.7rem 1rem",
    background: "none", border: "none", color: "#666",
    fontSize: "0.85rem", textAlign: "left", cursor: "pointer",
  },
  hamburger: {
    background: "#111", border: "1px solid #2a2a2a",
    borderRadius: "8px", padding: "7px 9px",
    cursor: "pointer", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },

  // Mobile drawer
  drawer: {
    position: "fixed", top: "57px", left: 0, right: 0,
    background: "rgba(8,8,8,0.98)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid #1e1e1e",
    zIndex: 199,
    maxHeight: "calc(100vh - 57px)",
    overflowY: "auto",
  },
  drawerAuth:    { padding: "0.6rem 0", borderTop: "2px solid #1e1e1e", marginTop: "0.3rem" },
  drawerUser:    { display: "flex", alignItems: "center", gap: "0.8rem", padding: "0.85rem 1.4rem" },
  drawerItem:    { display: "block", padding: "0.75rem 1.4rem", color: "#888", fontSize: "0.95rem", textDecoration: "none" },
  drawerLogout:  { display: "block", width: "100%", padding: "0.75rem 1.4rem", background: "none", border: "none", color: "#ff4444", fontSize: "0.95rem", textAlign: "left", cursor: "pointer" },
  drawerAuthRow: { display: "flex", gap: "0.8rem", padding: "0.8rem 1.4rem" },
  drawerOutline: { flex: 1, textAlign: "center", padding: "0.65rem 1rem", border: "1px solid #444", borderRadius: "8px", color: "#bbb", fontSize: "0.9rem", textDecoration: "none" },
  drawerAccent:  { flex: 1, textAlign: "center", padding: "0.65rem 1rem", background: "#ff6b00", borderRadius: "8px", color: "#fff", fontSize: "0.9rem", fontWeight: "700", textDecoration: "none" },
};