import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftBg} />
        <div style={styles.leftContent}>
          <h1 style={styles.leftTitle}>JUNNAR</h1>
          <p style={styles.leftSub}>Maharashtra's First Tourist Taluka</p>
          <div style={styles.leftStats}>
            {["🏯 Shivneri Fort", "🦁 Bhimashankar", "🕌 Lenyadri Caves", "🌊 Malshej Ghat"].map(item => (
              <div key={item} style={styles.leftStat}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Welcome Back</h2>
          <p style={styles.formSub}>Login to plan your Junnar trip</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email" required style={styles.input}
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password" required style={styles.input}
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <p style={styles.footer}>
            No account? <Link to="/register" style={styles.link}>Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  left: {
    flex: 1, position: "relative", display: "flex", alignItems: "center",
    justifyContent: "center", overflow: "hidden",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a0800 100%)",
  },
  leftBg: {
    position: "absolute", top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px", height: "600px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)",
  },
  leftContent: { position: "relative", zIndex: 1, padding: "2rem", textAlign: "center" },
  leftTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "5rem", color: "#ff6b00", letterSpacing: "0.1em", lineHeight: 1,
  },
  leftSub: { color: "#666", fontSize: "0.95rem", marginBottom: "2rem" },
  leftStats: { display: "flex", flexDirection: "column", gap: "0.6rem", alignItems: "center" },
  leftStat: {
    background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.15)",
    padding: "0.5rem 1.2rem", borderRadius: "6px", color: "#888", fontSize: "0.88rem",
  },
  right: {
    width: "480px", display: "flex", alignItems: "center",
    justifyContent: "center", padding: "2rem",
    borderLeft: "1px solid #1a1a1a",
  },
  formCard: { width: "100%", maxWidth: "380px" },
  formTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: "#fff", letterSpacing: "0.05em" },
  formSub: { color: "#555", fontSize: "0.9rem", marginBottom: "2rem", marginTop: "0.3rem" },
  error: {
    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171", padding: "0.75rem 1rem", borderRadius: "8px",
    marginBottom: "1.2rem", fontSize: "0.88rem",
  },
  label: { display: "block", color: "#555", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem", marginTop: "1.2rem" },
  input: {
    width: "100%", padding: "0.8rem 1rem", background: "#111",
    border: "1px solid #2a2a2a", borderRadius: "8px",
    color: "#fff", fontSize: "0.95rem", boxSizing: "border-box",
  },
  btn: {
    width: "100%", padding: "0.9rem", background: "#ff6b00",
    border: "none", borderRadius: "8px", color: "#fff",
    fontWeight: "700", fontSize: "1rem", cursor: "pointer", marginTop: "1.8rem",
  },
  footer: { textAlign: "center", marginTop: "1.5rem", color: "#444", fontSize: "0.88rem" },
  link: { color: "#ff6b00", fontWeight: "600" },
};