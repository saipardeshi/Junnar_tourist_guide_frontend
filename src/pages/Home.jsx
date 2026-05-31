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
            color: "rgb(255, 255, 255)",
            fontSize: "clamp(0.8rem, 2vw, 1rem)",
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: "480px",
            lineHeight: 1.7,
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}>
           <b>Forts, caves, temples, dams and monsoon magic — 100 km from Pune.</b>
          </p>
        </div>
      </div>
{/* ── FOOTER ── */}
        <footer className="ft">
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