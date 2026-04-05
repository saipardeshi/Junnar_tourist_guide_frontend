import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlaceById, toggleFavourite, getFavourites } from "../services/api";
import { getImagesForPlace } from "../data/placeImages";
import ReviewSection from "../components/ReviewSection";
import { useAuth } from "../context/AuthContext";

// ─── Full-screen lightbox ─────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div style={lb.overlay} onClick={onClose}>
      <div style={lb.box} onClick={e => e.stopPropagation()}>
        <button style={lb.close} onClick={onClose}>✕</button>
        <img src={images[idx]} alt="" style={lb.img} />
        <div style={lb.bottom}>
          <button style={lb.arrow} onClick={prev}>‹</button>
          <span style={lb.counter}>{idx + 1} / {images.length}</span>
          <button style={lb.arrow} onClick={next}>›</button>
        </div>
        {/* Thumbnails */}
        <div style={lb.thumbRow}>
          {images.map((img, i) => (
            <img key={i} src={img} alt=""
              style={{ ...lb.thumb, ...(i === idx ? lb.thumbActive : {}) }}
              onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

const lb = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  box: { position: "relative", maxWidth: "900px", width: "95%", textAlign: "center" },
  close: { position: "absolute", top: "-40px", right: 0, background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" },
  img: { width: "100%", maxHeight: "65vh", objectFit: "contain", borderRadius: "12px" },
  bottom: { display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1rem" },
  arrow: { background: "rgba(255,107,0,0.2)", border: "1px solid rgba(255,107,0,0.4)", color: "#ff6b00", width: "40px", height: "40px", borderRadius: "50%", fontSize: "1.4rem", cursor: "pointer" },
  counter: { color: "#888", fontSize: "0.9rem" },
  thumbRow: { display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem", flexWrap: "wrap" },
  thumb: { width: "56px", height: "42px", objectFit: "cover", borderRadius: "6px", cursor: "pointer", opacity: 0.5, border: "2px solid transparent", transition: "all 0.2s" },
  thumbActive: { opacity: 1, border: "2px solid #ff6b00" },
};

// ─── Accordion info item ──────────────────────────────────────────────────────
function AccordionItem({ icon, title, content, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={acc.wrapper}>
      <button style={acc.header} onClick={() => setOpen(!open)}>
        <span style={acc.icon}>{icon}</span>
        <span style={acc.title}>{title}</span>
        <span style={{ ...acc.chevron, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
      </button>
      {open && <div style={acc.body}>{content}</div>}
    </div>
  );
}

const acc = {
  wrapper: { border: "1px solid #1e1e1e", borderRadius: "10px", overflow: "hidden", marginBottom: "0.6rem", background: "#111" },
  header: { width: "100%", display: "flex", alignItems: "center", gap: "0.8rem", padding: "1rem 1.2rem", background: "none", border: "none", cursor: "pointer", textAlign: "left" },
  icon: { fontSize: "1.2rem" },
  title: { flex: 1, color: "#ccc", fontWeight: "600", fontSize: "0.92rem" },
  chevron: { color: "#ff6b00", fontSize: "1rem", transition: "transform 0.25s" },
  body: { padding: "0 1.2rem 1rem 1.2rem", color: "#888", fontSize: "0.88rem", lineHeight: "1.8", borderTop: "1px solid #1a1a1a" },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [place, setPlace]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [lightbox, setLightbox]   = useState(null);   // index or null
  const [heroIdx, setHeroIdx]     = useState(0);
  const [isFav, setIsFav]         = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    getPlaceById(id)
      .then(res => setPlace(res.data))
      .catch(() => navigate("/places"))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user && place) {
      getFavourites().then(res => {
        setIsFav((res.data.favourites || []).includes(place.id));
      });
    }
  }, [user, place]);

  const handleFav = async () => {
    if (!user) { navigate("/login"); return; }
    setFavLoading(true);
    const res = await toggleFavourite(place.id);
    setIsFav((res.data.favourites || []).includes(place.id));
    setFavLoading(false);
  };

  if (loading) return (
    <div style={styles.loading}>
      <div style={styles.spinner} />
    </div>
  );
  if (!place) return null;

  const images = getImagesForPlace(place.name);
  const hasImages = images.length > 0;

  return (
    <div style={styles.page}>
      {lightbox !== null && (
        <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}

      <button onClick={() => navigate("/places")} style={styles.backBtn}>← Back to Places</button>

      {/* ── HERO with big swiper ── */}
      <div style={styles.heroWrap}>
        {hasImages ? (
          <>
            {/* Main big image */}
            <div style={styles.heroMain} onClick={() => setLightbox(heroIdx)}>
              <img src={images[heroIdx]} alt={place.name} style={styles.heroImg} />
              <div style={styles.heroOverlay}>
                <div style={styles.heroMeta}>
                  <span style={styles.heroBadge}>{place.category}</span>
                  <h1 style={styles.heroTitle}>{place.name}</h1>
                  <p style={styles.heroLocation}>📍 {place.location}</p>
                </div>
                <div style={styles.heroActions}>
                  <span style={styles.expandHint}>🔍 Click to expand</span>
                  <button
                    style={{ ...styles.favBtn, color: isFav ? "#ff6b00" : "#aaa" }}
                    onClick={e => { e.stopPropagation(); handleFav(); }}
                    disabled={favLoading}
                  >
                    {isFav ? "❤️" : "🤍"} {isFav ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div style={styles.thumbStrip}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    style={{ ...styles.thumb, ...(i === heroIdx ? styles.thumbActive : {}) }}
                    onClick={() => setHeroIdx(i)}
                  >
                    <img src={img} alt="" style={styles.thumbImg} />
                    {i === heroIdx && <div style={styles.thumbOverlay} />}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div style={styles.noImgHero}>
            <span style={{ fontSize: "5rem" }}>🏔️</span>
            <div>
              <span style={styles.heroBadge}>{place.category}</span>
              <h1 style={styles.heroTitle}>{place.name}</h1>
              <p style={styles.heroLocation}>📍 {place.location}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Two-column layout ── */}
      <div style={styles.twoCol}>

        {/* LEFT — Info accordion */}
        <div>
          {/* Quick stats row */}
          <div style={styles.quickStats}>
            {[
              { label: "Rating", value: `⭐ ${place.rating || "N/A"}` },
              { label: "Entry", value: place.entryFee || "Free" },
              { label: "Timings", value: place.timings || "—" },
            ].map(s => (
              <div key={s.label} style={styles.statPill}>
                <div style={styles.statVal}>{s.value}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Accordion — click to expand each section */}
          <h3 style={styles.infoHeading}>ℹ️ More Information</h3>
          <p style={styles.infoHint}>Click each section to expand details</p>

          <AccordionItem defaultOpen
            icon="📖" title="About This Place"
            content={<p style={{ margin: 0 }}>{place.description}</p>}
          />
          <AccordionItem
            icon="🗓️" title="Best Time to Visit"
            content={
              <div>
                <p style={{ margin: 0 }}>{place.bestTimeToVisit || "October to February (Winter season recommended)"}</p>
                <div style={styles.seasonTags}>
                  {place.bestTimeToVisit?.includes("Oct") || place.bestTimeToVisit?.includes("Winter")
                    ? <span style={styles.seasonTag}>❄️ Winter Best</span>
                    : place.bestTimeToVisit?.includes("Jun") || place.bestTimeToVisit?.includes("Monsoon")
                    ? <span style={{ ...styles.seasonTag, background: "rgba(14,165,233,0.15)", color: "#0ea5e9" }}>🌧️ Monsoon Best</span>
                    : <span style={{ ...styles.seasonTag, background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>☀️ Summer</span>
                  }
                </div>
              </div>
            }
          />
          <AccordionItem
            icon="🎫" title="Entry Fee & Timings"
            content={
              <div style={styles.feeGrid}>
                <div><strong style={{ color: "#ccc" }}>Entry Fee</strong><br />{place.entryFee || "Free"}</div>
                <div><strong style={{ color: "#ccc" }}>Timings</strong><br />{place.timings || "Sunrise to Sunset"}</div>
              </div>
            }
          />
          <AccordionItem
            icon="🚗" title="How to Reach"
            content={
              <ul style={{ margin: 0, paddingLeft: "1rem", lineHeight: "2" }}>
                <li>From <strong style={{ color: "#ccc" }}>Pune</strong>: 85 km via Chakan–Rajgurunagar road (2.5 hrs)</li>
                <li>From <strong style={{ color: "#ccc" }}>Mumbai</strong>: 160 km via Nashik highway (4 hrs)</li>
                <li><strong style={{ color: "#ccc" }}>ST Bus</strong>: Available from Pune Shivajinagar stand</li>
                <li><strong style={{ color: "#ccc" }}>Nearest Railway</strong>: Pune Junction (85 km)</li>
              </ul>
            }
          />
          {place.tags?.length > 0 && (
            <AccordionItem
              icon="🏷️" title="Tags & Activities"
              content={
                <div style={styles.tagWrap}>
                  {place.tags.map(tag => (
                    <span key={tag} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              }
            />
          )}
          <AccordionItem
            icon="💡" title="Travel Tips"
            content={
              <ul style={{ margin: 0, paddingLeft: "1rem", lineHeight: "2" }}>
                <li>Carry water & snacks — shops may not be available</li>
                <li>Wear comfortable trekking shoes</li>
                <li>Start early morning (6 AM) to avoid heat & crowds</li>
                <li>Carry cash — ATMs are scarce near the spot</li>
                <li>Download offline maps before leaving Junnar town</li>
              </ul>
            }
          />
        </div>

        {/* RIGHT — Add to trip + Reviews */}
        <div>
          <div style={styles.actionCard}>
            <h3 style={styles.actionTitle}>Plan Your Visit</h3>
            <button style={styles.planBtn} onClick={() => navigate("/ai-planner")}>
              ✨ Generate AI Itinerary
            </button>
            <button style={styles.costBtn} onClick={() => navigate("/cost")}>
              🧮 Estimate Trip Cost
            </button>
            <button style={styles.tripBtn} onClick={() => navigate("/itineraries")}>
              🗺️ Add to My Trip
            </button>
          </div>

          {/* Reviews */}
          <ReviewSection placeId={place.id} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "2rem", maxWidth: "1200px", margin: "0 auto" },
  loading: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" },
  spinner: { width: "40px", height: "40px", border: "3px solid #1e1e1e", borderTop: "3px solid #ff6b00", borderRadius: "50%" },
  backBtn: { background: "transparent", border: "1px solid #2a2a2a", color: "#666", padding: "0.5rem 1.2rem", borderRadius: "6px", cursor: "pointer", marginBottom: "1.5rem", fontSize: "0.88rem" },

  // Hero
  heroWrap: { borderRadius: "16px", overflow: "hidden", marginBottom: "2rem", border: "1px solid #1e1e1e" },
  heroMain: { position: "relative", height: "460px", cursor: "zoom-in", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" },
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(transparent 30%, rgba(0,0,0,0.85) 100%)",
    display: "flex", flexDirection: "column", justifyContent: "flex-end",
    padding: "2rem",
  },
  heroMeta: {},
  heroBadge: { background: "#ff6b00", color: "#fff", padding: "0.25rem 0.8rem", borderRadius: "4px", fontSize: "0.72rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" },
  heroTitle: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: "#fff", marginTop: "0.5rem", letterSpacing: "0.05em", lineHeight: 1 },
  heroLocation: { color: "#aaa", fontSize: "0.9rem", marginTop: "0.3rem" },
  heroActions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.8rem" },
  expandHint: { color: "#666", fontSize: "0.78rem" },
  favBtn: { background: "rgba(0,0,0,0.5)", border: "1px solid #333", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: "600" },

  // Thumbnail strip
  thumbStrip: { display: "flex", gap: "4px", padding: "4px", background: "#0a0a0a", overflowX: "auto" },
  thumb: { width: "80px", height: "56px", flexShrink: 0, borderRadius: "6px", overflow: "hidden", cursor: "pointer", border: "2px solid transparent", transition: "all 0.2s", position: "relative" },
  thumbActive: { border: "2px solid #ff6b00" },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover" },
  thumbOverlay: { position: "absolute", inset: 0, background: "rgba(255,107,0,0.15)" },
  noImgHero: { display: "flex", alignItems: "center", gap: "2rem", padding: "3rem", background: "#111", minHeight: "220px" },

  // Two column
  twoCol: { display: "grid", gridTemplateColumns: "1fr 360px", gap: "1.5rem" },

  // Quick stats
  quickStats: { display: "flex", gap: "0.8rem", marginBottom: "1.5rem", flexWrap: "wrap" },
  statPill: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "0.8rem 1.2rem", textAlign: "center", flex: 1 },
  statVal: { color: "#ff6b00", fontWeight: "700", fontSize: "0.92rem" },
  statLabel: { color: "#444", fontSize: "0.72rem", marginTop: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" },

  // Info
  infoHeading: { color: "#fff", fontWeight: "700", fontSize: "1rem", marginBottom: "0.3rem" },
  infoHint: { color: "#444", fontSize: "0.78rem", marginBottom: "1rem" },
  feeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  seasonTags: { marginTop: "0.8rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  seasonTag: { background: "rgba(255,107,0,0.12)", color: "#ff6b00", border: "1px solid rgba(255,107,0,0.2)", padding: "0.25rem 0.7rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600" },
  tagWrap: { display: "flex", flexWrap: "wrap", gap: "0.5rem" },
  tag: { background: "rgba(255,107,0,0.1)", color: "#ff6b00", border: "1px solid rgba(255,107,0,0.2)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem" },

  // Action card
  actionCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem", marginBottom: "1rem" },
  actionTitle: { color: "#ff6b00", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" },
  planBtn: { width: "100%", padding: "0.8rem", background: "linear-gradient(135deg,#ff6b00,#ff8533)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "0.92rem", cursor: "pointer", marginBottom: "0.6rem" },
  costBtn: { width: "100%", padding: "0.75rem", background: "transparent", border: "1px solid #2a2a2a", color: "#888", borderRadius: "8px", cursor: "pointer", marginBottom: "0.6rem", fontSize: "0.88rem" },
  tripBtn: { width: "100%", padding: "0.75rem", background: "transparent", border: "1px solid #2a2a2a", color: "#888", borderRadius: "8px", cursor: "pointer", fontSize: "0.88rem" },
};