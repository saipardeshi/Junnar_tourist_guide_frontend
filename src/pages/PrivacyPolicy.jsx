export default function PrivacyPolicy() {
  return (
    <div style={S.page}>
      <div style={S.header}>
        <p style={S.tag}>LEGAL</p>
        <h1 style={S.title}>PRIVACY <span style={{ color: "#ff6b00" }}>POLICY</span></h1>
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
        Questions? Email us at <span style={{ color: "#ff6b00" }}>privacy@junnarguide.in</span>
      </p>
    </div>
  );
}

const SECTIONS = [
  {
    heading: "1. Information We Collect",
    body: "We collect information you provide directly — such as your name and email address when you register an account. We also collect usage data (pages visited, search queries) to improve the service. We do not sell your personal data.",
  },
  {
    heading: "2. How We Use Your Information",
    body: "Your information is used to provide and improve the Junnar Tourist Guide service: personalised recommendations, saving favourite places, creating itineraries, and sending relevant updates. We will never share your data with third parties for marketing purposes.",
  },
  {
    heading: "3. Cookies",
    body: "We use cookies solely to maintain your login session. No tracking or advertising cookies are used. You may disable cookies in your browser settings, but this will prevent you from staying logged in.",
  },
  {
    heading: "4. Data Security",
    body: "Your password is stored as a bcrypt hash — we cannot read it. All API communication uses HTTPS. We follow industry best practices to protect your data, though no system can guarantee 100% security.",
  },
  {
    heading: "5. Data Retention",
    body: "We retain your account data for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting us.",
  },
  {
    heading: "6. Third-Party Services",
    body: "We use OpenWeatherMap for weather data and Google Maps for location embedding. These services have their own privacy policies. We do not share personal data with them.",
  },
  {
    heading: "7. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the service after changes constitutes acceptance.",
  },
  {
    heading: "8. Contact",
    body: "If you have questions or concerns about this Privacy Policy, please contact us at privacy@junnarguide.in or through our Contact page.",
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
