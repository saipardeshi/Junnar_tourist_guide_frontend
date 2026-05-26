import Herosection from "./Herosection";

export default function Home() {
  return (
    <div style={{ position: "relative", background: "#0a0a0a" }}>

      <style>{`
  .ft { position: relative; margin-top: 0; }
  .ft-body { background: #080808; border-top: 1px solid rgba(232,82,10,0.15); padding: 48px 64px 28px; }
  .ft-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
  .ft-brand-name { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: #fff; letter-spacing: 3px; }
  .ft-brand-name span { color: #E8520A; }
  .ft-brand-sub { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 6px; line-height: 1.7; max-width: 240px; }
  .ft-col-title { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #E8520A; margin-bottom: 16px; font-weight: 600; }
  .ft-links { display: flex; flex-direction: column; gap: 10px; }
  .ft-link { font-size: 13px; color: rgba(255,255,255,0.4); cursor: pointer; transition: color 0.2s; text-decoration: none; }
  .ft-link:hover { color: #fff; }
  .ft-bottom { max-width: 1100px; margin: 0 auto; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
  .ft-copy { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 1px; }
  .ft-copy span { color: #E8520A; }
  .ft-bottom-links { display: flex; gap: 20px; }
  .ft-bottom-link { font-size: 11px; color: rgba(255,255,255,0.2); cursor: pointer; transition: color 0.2s; }
  .ft-bottom-link:hover { color: rgba(255,255,255,0.5); }
  @media (max-width: 900px) { .ft-grid { grid-template-columns: 1fr 1fr; } .ft-body { padding: 40px 40px 24px; } }
  @media (max-width: 640px) { .ft-grid { grid-template-columns: 1fr; gap: 28px; } .ft-body { padding: 32px 18px 20px; } .ft-bottom { flex-direction: column; align-items: flex-start; } }
`}</style>
      {/* ── Hero background image fading into black ── */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}>
        <img
          src="/img/malshej_1.webp"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* fade to black at bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 40%, rgba(10,10,10,0.88) 75%, #0a0a0a 100%)",
        }} />
      </div>

      {/* Herosection sits on top */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Herosection />
      </div>

      {/* ── Pre-footer image section ── */}
      <div style={{
        position: "relative",
        height: "420px",
        overflow: "hidden",
        marginTop: "-2px",
      }}>
        <img
          src="/img/malshej_2.webp"
          alt="Malshej Ghat"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
            display: "block",
          }}
        />
        {/* fade in from black at top, fade to black at bottom */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 25%, transparent 65%, #0a0a0a 100%)",
        }} />
        {/* overlay text */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "0 1rem",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#ff6b00",
            fontWeight: 700,
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Sahyadri Awaits
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 6vw, 4rem)",
            letterSpacing: "0.06em",
            color: "#fff",
            margin: 0,
            lineHeight: 1,
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
          }}>
            PLAN YOUR <span style={{ color: "#ff6b00" }}>JOURNEY</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: "480px",
            lineHeight: 1.7,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}>
            Forts, caves, temples, dams and monsoon magic — 100 km from Pune.
          </p>
        </div>
      </div>
{/* ── FOOTER ── */}
        <footer className="ft">
          <div className="ft-mountain">
            <svg viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,180 L0,120 L60,80 L120,100 L200,50 L280,90 L340,30 L420,75 L500,20 L580,70 L640,15 L720,60 L800,25 L880,70 L940,35 L1020,75 L1080,40 L1160,80 L1220,35 L1300,70 L1360,45 L1440,75 L1440,180 Z" fill="#2a3a4a" opacity="0.6"/>
              <path d="M0,180 L0,135 L80,100 L150,120 L220,85 L300,115 L360,75 L440,110 L520,80 L600,115 L660,70 L740,105 L820,85 L900,120 L960,90 L1040,118 L1110,88 L1180,115 L1250,85 L1330,112 L1440,95 L1440,180 Z" fill="#1a2a3a" opacity="0.8"/>
              <path d="M0,180 L0,155 L30,155 L30,145 L35,135 L40,145 L40,155 L60,155 L60,148 L65,138 L68,130 L71,138 L74,148 L80,148 L80,155 L110,155 L120,140 L130,155 L160,155 L160,148 L165,135 L168,125 L171,135 L174,148 L180,148 L180,155 L220,155 L230,142 L240,155 L270,155 L270,150 L274,140 L277,132 L280,140 L283,150 L290,150 L290,155 L340,155 L340,148 L345,135 L350,125 L355,135 L360,148 L370,148 L370,155 L420,155 L430,143 L440,155 L480,155 L480,150 L484,140 L487,130 L490,140 L493,150 L500,150 L500,155 L560,155 L570,142 L580,155 L620,155 L620,148 L625,136 L628,126 L631,136 L634,148 L640,148 L640,155 L700,155 L710,143 L720,155 L760,155 L760,149 L764,139 L767,129 L770,139 L773,149 L780,149 L780,155 L840,155 L850,142 L860,155 L900,155 L900,148 L905,135 L908,124 L911,135 L914,148 L920,148 L920,155 L980,155 L990,143 L1000,155 L1040,155 L1040,149 L1044,138 L1047,128 L1050,138 L1053,149 L1060,149 L1060,155 L1120,155 L1130,142 L1140,155 L1180,155 L1180,148 L1185,136 L1188,126 L1191,136 L1194,148 L1200,148 L1200,155 L1260,155 L1270,143 L1280,155 L1320,155 L1320,149 L1324,139 L1327,129 L1330,139 L1333,149 L1340,149 L1340,155 L1440,155 L1440,180 Z" fill="#0f1a24"/>
            </svg>
          </div>
          <div className="ft-body">
            <div className="ft-grid">
              <div>
                <div className="ft-brand-name">JUNNAR <span>Guide</span></div>
                <div className="ft-brand-sub">Maharashtra's First Tourist Taluka — 100 km from Pune, a world of forts, caves, temples and wild Sahyadri landscapes.</div>
              </div>
              <div>
                <div className="ft-col-title">Explore</div>
                <div className="ft-links">
                  <a className="ft-link" href="/places">Places</a>
                  <a className="ft-link" href="/map">Map</a>
                  <a className="ft-link" href="/events">Events</a>
                  <a className="ft-link" href="/tips">Travel Tips</a>
                </div>
              </div>
              <div>
                <div className="ft-col-title">Plan</div>
                <div className="ft-links">
                  <a className="ft-link" href="/budget">Budget Planner</a>
                  <a className="ft-link" href="/tips">Best Time to Visit</a>
                  <a className="ft-link" href="/map">How to Reach</a>
                </div>
              </div>
              <div>
                <div className="ft-col-title">Account</div>
                <div className="ft-links">
                  <a className="ft-link" href="/login">Login</a>
                  <a className="ft-link" href="/register">Register</a>
                  <a className="ft-link" href="/profile">My Trips</a>
                </div>
              </div>
            </div>
            <div className="ft-bottom">
              <div className="ft-copy">© 2026 <span>Junnar Tourist Guide</span> · Maharashtra, India</div>
              <div className="ft-bottom-links">
                <span className="ft-bottom-link">Privacy Policy</span>
                <span className="ft-bottom-link">Terms</span>
                <span className="ft-bottom-link">Contact</span>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}