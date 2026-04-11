import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.leftBg} />
        <div style={styles.leftContent}>
          <h1 style={styles.leftTitle}>JOIN US</h1>
          <p style={styles.leftSub}>Start planning your Junnar adventure</p>
          <div style={styles.perks}>
            {[
              { icon: "🗺️", text: "Save custom itineraries" },
              { icon: "⭐", text: "Rate & review places" },
              { icon: "📅", text: "Get event reminders" },
              { icon: "💡", text: "Personalized trip tips" },
            ].map((p) => (
              <div key={p.text} style={styles.perk}>
                <span>{p.icon}</span>
                <span style={{ color: "#888", fontSize: "0.88rem" }}>
                  {p.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Account</h2>
          <p style={styles.formSub}>Free forever — no credit card needed</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              required
              style={styles.input}
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              required
              style={styles.input}
              placeholder="you@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label style={styles.label}>Password</label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                style={{ ...styles.input, paddingRight: "2.5rem" }}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button type="submit" style={styles.btn} disabled={loading}>
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <p style={styles.footer}>
            Already registered?{" "}
            <Link to="/login" style={styles.link}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "100vh", background: "#0a0a0a" },
  left: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0a0a0a 0%, #1a0800 100%)",
  },
  leftBg: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)",
  },
  leftContent: {
    position: "relative",
    zIndex: 1,
    padding: "2rem",
    textAlign: "center",
  },
  leftTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "4rem",
    color: "#ff6b00",
    letterSpacing: "0.1em",
  },
  leftSub: { color: "#555", fontSize: "0.95rem", marginBottom: "2.5rem" },
  perks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    alignItems: "flex-start",
  },
  perk: {
    display: "flex",
    gap: "0.8rem",
    alignItems: "center",
    background: "rgba(255,107,0,0.06)",
    border: "1px solid rgba(255,107,0,0.1)",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    width: "100%",
  },
  right: {
    width: "480px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    borderLeft: "1px solid #1a1a1a",
  },
  formCard: { width: "100%", maxWidth: "380px" },
  formTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.2rem",
    color: "#fff",
    letterSpacing: "0.05em",
  },
  formSub: {
    color: "#555",
    fontSize: "0.88rem",
    marginBottom: "2rem",
    marginTop: "0.3rem",
  },
  error: {
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.3)",
    color: "#f87171",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    marginBottom: "1.2rem",
    fontSize: "0.88rem",
  },
  label: {
    display: "block",
    color: "#555",
    fontSize: "0.78rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "0.4rem",
    marginTop: "1.2rem",
  },
  input: {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "#111",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "0.95rem",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "0.9rem",
    background: "#ff6b00",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1.8rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#444",
    fontSize: "0.88rem",
  },
  link: { color: "#ff6b00", fontWeight: "600" },
};
