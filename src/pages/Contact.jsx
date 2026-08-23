import { useState } from "react";

const CONTACTS = [
  { icon: "📍", label: "Location", value: "Junnar Taluka, Pune District, Maharashtra — 410502", href: null },
  { icon: "📞", label: "Tourist Helpline", value: "1800-200-5885 (Toll Free)", href: "tel:18002005885" },
  { icon: "📞", label: "Junnar Police", value: "02132-222233", href: "tel:0213222233" },
  { icon: "🏥", label: "Junnar Rural Hospital", value: "02132-222055", href: "tel:0213222205" },
  { icon: "✉️", label: "Email", value: "contact@junnarguide.in", href: "mailto:contact@junnarguide.in" },
];

const SOCIAL = [
  { label: "Instagram", icon: "📸", href: "#" },
  { label: "Facebook",  icon: "👥", href: "#" },
  { label: "Twitter/X", icon: "🐦", href: "#" },
  { label: "YouTube",   icon: "▶️", href: "#" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    // In a real app, POST to /api/contact. Here we simulate success.
    setSent(true);
  };



  return (
    <div style={S.page}>
      <style>{`
        .ct-grid { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; }
        @media(max-width:900px){ .ct-grid{ grid-template-columns:1fr !important; } }
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <p style={S.tag}>GET IN TOUCH</p>
        <h1 style={S.title}>CONTACT <span style={{ color: "#ff6b00" }}>US</span></h1>
        <p style={S.sub}>Have a question, suggestion, or want to report incorrect information?</p>
      </div>

      <div className="ct-grid">
        {/* ── Left: Form ── */}
        <div style={S.card}>
          {sent ? (
            <div style={S.successBox}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Message Sent!</h2>
              <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Thanks for reaching out. We'll get back to you within 2–3 business days.
              </p>
              <button style={S.primaryBtn} onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={S.cardTitle}>Send a Message</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <Field id="name" label="Your Name" required error={errors.name}>
                  <input id="name" style={{ ...S.input, ...(errors.name ? S.inputError : {}) }}
                    placeholder="e.g. Sai Pardeshi"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </Field>
                <Field id="email" label="Email Address" required error={errors.email}>
                  <input id="email" type="email" style={{ ...S.input, ...(errors.email ? S.inputError : {}) }}
                    placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </Field>
              </div>
              <Field id="subject" label="Subject" required error={errors.subject}>
                <select id="subject" style={S.input}
                  value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option value="">— Select a subject —</option>
                  <option>Report incorrect place info</option>
                  <option>Suggest a new place</option>
                  <option>Report a bug</option>
                  <option>Partnership / collaboration</option>
                  <option>General enquiry</option>
                </select>
                {errors.subject && <p style={S.errorMsg}>{errors.subject}</p>}
              </Field>
              <Field id="message" label="Message" required error={errors.message}>
                <textarea id="message" rows={5}
                  style={{ ...S.input, resize: "vertical", height: "120px", ...(errors.message ? S.inputError : {}) }}
                  placeholder="Tell us how we can help..."
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              </Field>
              <button type="submit" style={S.primaryBtn}>Send Message →</button>
            </form>
          )}
        </div>

        {/* ── Right: Contact info ── */}
        <div>
          <div style={S.card}>
            <h2 style={S.cardTitle}>Contact Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CONTACTS.map(c => (
                <div key={c.label} style={S.contactRow}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={S.contactLabel}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} style={S.contactValue}>{c.value}</a>
                      : <div style={S.contactValue}>{c.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...S.card, marginTop: "1.2rem" }}>
            <h2 style={S.cardTitle}>Follow Us</h2>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {SOCIAL.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={S.socialBtn}>
                  <span>{s.icon}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Map embed placeholder */}
          <div style={{ ...S.card, marginTop: "1.2rem", padding: 0, overflow: "hidden", height: 200 }}>
            <iframe
              title="Junnar Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60475.37!2d73.867!3d19.204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdc6e38bce7e32f%3A0x89f0b01c3a7c0e73!2sJunnar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="200" style={{ border: 0, display: "block" }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  page:       { background: "#0a0a0a", minHeight: "100vh", padding: "clamp(1.5rem,4vw,3rem) clamp(1rem,3vw,2rem)", maxWidth: "1100px", margin: "0 auto" },
  header:     { textAlign: "center", marginBottom: "2.5rem" },
  tag:        { fontSize: "10px", letterSpacing: "4px", color: "#ff6b00", textTransform: "uppercase", marginBottom: "8px", fontWeight: 700 },
  title:      { fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,7vw,3rem)", letterSpacing: "0.05em", margin: 0 },
  sub:        { color: "#555", marginTop: "0.5rem", fontSize: "0.9rem" },
  card:       { background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "1.8rem" },
  cardTitle:  { color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: "1.5rem" },
  label:      { display: "block", color: "#555", fontSize: "0.73rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", fontWeight: 600 },
  input:      { width: "100%", padding: "0.75rem 1rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#fff", fontSize: "0.9rem", boxSizing: "border-box", display: "block" },
  inputError: { borderColor: "rgba(239,68,68,0.5)" },
  errorMsg:   { color: "#f87171", fontSize: "0.72rem", marginTop: "0.3rem" },
  primaryBtn: { background: "linear-gradient(135deg,#ff6b00,#ff8533)", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", marginTop: "0.5rem", display: "inline-block" },
  successBox: { textAlign: "center", padding: "2rem 1rem" },
  contactRow: { display: "flex", gap: "1rem", alignItems: "flex-start" },
  contactLabel:{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.2rem" },
  contactValue:{ color: "#ccc", fontSize: "0.88rem", textDecoration: "none" },
  socialBtn:  { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 8, color: "#888", fontSize: "0.82rem", textDecoration: "none", transition: "all 0.2s" },
};

const Field = ({ id, label, required, error, children }) => (
  <div style={{ marginBottom: "1.2rem" }}>
    <label htmlFor={id} style={S.label}>{label}{required && " *"}</label>
    {children}
    {error && <p style={S.errorMsg}>{error}</p>}
  </div>
);
