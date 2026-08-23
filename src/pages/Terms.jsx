export default function Terms() {
  return (
    <div style={S.page}>
      <div style={S.header}>
        <p style={S.tag}>LEGAL</p>
        <h1 style={S.title}>TERMS OF <span style={{ color: "#ff6b00" }}>SERVICE</span></h1>
        <p style={S.sub}>Last updated: August 2026</p>
      </div>

      <div style={S.card}>
        {SECTIONS.map(({ heading, body }) => (
          <section key={heading} style={S.section}>
            <h2 style={S.sectionTitle}>{heading}</h2>
            <p style={S.body}>{body}</p>
          </section>
        ))}
      </div>

      <p style={S.footer}>
        Questions? Email us at <span style={{ color: "#ff6b00" }}>legal@junnarguide.in</span>
      </p>
    </div>
  );
}

const SECTIONS = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing or using Junnar Tourist Guide ('the Service'), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.",
  },
  {
    heading: "2. Use of Service",
    body: "Junnar Tourist Guide is a travel information platform for the Junnar region of Maharashtra, India. You may use it for personal, non-commercial purposes. You may not use it for any unlawful purpose or in any way that could harm the Service or its users.",
  },
  {
    heading: "3. User Accounts",
    body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised use of your account. We reserve the right to terminate accounts that violate these terms.",
  },
  {
    heading: "4. User Content",
    body: "By submitting reviews or itineraries, you grant Junnar Tourist Guide a non-exclusive, royalty-free licence to use, display, and distribute your content on the platform. You retain ownership of your content. Do not post false, misleading, or harmful content.",
  },
  {
    heading: "5. Accuracy of Information",
    body: "We strive to keep place information, timings, and entry fees accurate, but we cannot guarantee completeness or currency. Always verify critical travel information with local authorities before your visit.",
  },
  {
    heading: "6. Intellectual Property",
    body: "All content on this platform — including text, design, and code — is the property of Junnar Tourist Guide unless otherwise noted. You may not reproduce or distribute our content without permission.",
  },
  {
    heading: "7. Limitation of Liability",
    body: "Junnar Tourist Guide is provided 'as is'. We are not liable for any direct, indirect, or consequential loss arising from your use of the Service, including travel decisions made based on information on this platform.",
  },
  {
    heading: "8. Changes to Terms",
    body: "We may update these Terms of Service at any time. Continued use of the Service after changes are posted constitutes your acceptance of the new terms.",
  },
];

const S = {
  page:    { background: "#0a0a0a", minHeight: "100vh", padding: "clamp(1.5rem,4vw,3rem) clamp(1rem,3vw,2rem)", maxWidth: "800px", margin: "0 auto" },
  header:  { textAlign: "center", marginBottom: "2.5rem" },
  tag:     { fontSize: "10px", letterSpacing: "4px", color: "#ff6b00", textTransform: "uppercase", marginBottom: "8px", fontWeight: 700 },
  title:   { fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,7vw,3rem)", letterSpacing: "0.05em", margin: 0 },
  sub:     { color: "#444", marginTop: "0.5rem", fontSize: "0.82rem" },
  card:    { background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "clamp(1.5rem,4vw,2.5rem)", marginBottom: "2rem" },
  section: { marginBottom: "1.8rem", paddingBottom: "1.8rem", borderBottom: "1px solid #1a1a1a" },
  sectionTitle: { color: "#ff6b00", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem", fontWeight: 700 },
  body:    { color: "#888", fontSize: "0.92rem", lineHeight: 1.8 },
  footer:  { color: "#444", textAlign: "center", fontSize: "0.85rem" },
};
