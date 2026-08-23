import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlaces } from "../services/api";

const TRAVEL_STYLES = [
  { id: "adventure", label: "Adventure & Trekking", icon: "🧗", desc: "Forts, treks & nature trails" },
  { id: "spiritual", label: "Spiritual & Temples", icon: "🕌", desc: "Pilgrimage sites & caves" },
  { id: "nature",    label: "Nature & Wildlife",   icon: "🌿", desc: "Ghats, dams & scenic spots" },
  { id: "heritage",  label: "Heritage & History",  icon: "🏛️", desc: "Forts, ruins & culture" },
  { id: "relaxed",   label: "Relaxed Sightseeing", icon: "🌅", desc: "Easy-paced mixed tour" },
];

const STYLE_CATEGORY_MAP = {
  adventure: ["Fort", "Nature"],
  spiritual: ["Temple", "Cave"],
  nature:    ["Nature", "Dam"],
  heritage:  ["Fort", "Heritage", "Cave"],
  relaxed:   ["Temple", "Nature", "Fort", "Dam", "Cave", "Heritage"],
};

const DAY_TIMINGS = [
  { slot: "Morning",   icon: "🌅", time: "7:00 AM – 11:00 AM" },
  { slot: "Afternoon", icon: "☀️", time: "12:00 PM – 4:00 PM" },
  { slot: "Evening",   icon: "🌆", time: "5:00 PM – 7:30 PM" },
];

const TIPS_PER_CATEGORY = {
  Fort:     "Wear trekking shoes. Carry 2L water.",
  Temple:   "Remove footwear before entry. Dress modestly.",
  Cave:     "Carry a torch. Avoid monsoon slippery paths.",
  Nature:   "Best visited at sunrise. No littering.",
  Dam:      "Do not swim. Perfect for photography.",
  Heritage: "Hire a local guide for context.",
};

// Build itinerary from places and travel style
function generateItinerary(places, days, style) {
  const cats = STYLE_CATEGORY_MAP[style] || [];
  // Filter & sort preferred categories first
  const preferred = places.filter(p => cats.includes(p.category));
  const others    = places.filter(p => !cats.includes(p.category));
  const pool = [...preferred, ...others];

  // Spread places across days, max 3 slots per day
  const itinerary = [];
  let idx = 0;
  for (let d = 0; d < days; d++) {
    const dayPlaces = [];
    for (let s = 0; s < 3 && idx < pool.length; s++, idx++) {
      dayPlaces.push({ place: pool[idx], slot: DAY_TIMINGS[s] });
    }
    if (dayPlaces.length > 0) itinerary.push({ day: d + 1, visits: dayPlaces });
  }
  return itinerary;
}

// ── Step indicator ────────────────────────────────────────────────────────────
function StepDot({ n, active, done }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      fontWeight: 700, fontSize: "0.85rem", flexShrink: 0,
      background: done ? "#ff6b00" : active ? "rgba(255,107,0,0.2)" : "#111",
      border: `2px solid ${done || active ? "#ff6b00" : "#2a2a2a"}`,
      color: done ? "#fff" : active ? "#ff6b00" : "#444",
      transition: "all 0.3s",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

export default function AiPlanner() {
  const navigate = useNavigate();
  const [step, setStep]         = useState(1); // 1=style, 2=days, 3=places, 4=result
  const [allPlaces, setAllPlaces] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [style, setStyle]       = useState("");
  const [days, setDays]         = useState(2);
  const [selectedIds, setSelectedIds] = useState([]);
  const [itinerary, setItinerary]     = useState([]);
  const [generating, setGenerating]   = useState(false);
  const [revealed, setRevealed]       = useState(false);

  useEffect(() => {
    getAllPlaces()
      .then(res => setAllPlaces(res.data))
      .finally(() => setLoading(false));
  }, []);

  const togglePlace = (id) => setSelectedIds(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const handleGenerate = () => {
    setGenerating(true);
    const chosen = selectedIds.length > 0
      ? allPlaces.filter(p => selectedIds.includes(p.id))
      : allPlaces;
    setTimeout(() => {
      setItinerary(generateItinerary(chosen, days, style));
      setGenerating(false);
      setStep(4);
      setTimeout(() => setRevealed(true), 80);
    }, 1500);
  };

  const reset = () => {
    setStep(1); setStyle(""); setDays(2); setSelectedIds([]);
    setItinerary([]); setRevealed(false);
  };

  // ── Preferred places based on style
  const preferredCats = STYLE_CATEGORY_MAP[style] || [];
  const sortedPlaces  = [...allPlaces].sort((a, b) => {
    const aP = preferredCats.includes(a.category) ? 0 : 1;
    const bP = preferredCats.includes(b.category) ? 0 : 1;
    return aP - bP;
  });

  return (
    <div style={S.page}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ai-card { background:#111; border:1px solid #1e1e1e; border-radius:16px; padding:2rem; }
        .ai-style-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); gap:0.8rem; }
        .ai-places-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:0.6rem; }
        .ai-day-card { background:#111; border:1px solid #1e1e1e; border-radius:14px; padding:1.5rem; margin-bottom:1rem; }
        .ai-visit { display:flex; gap:1rem; background:#0d0d0d; border:1px solid #1a1a1a; border-radius:10px; padding:1rem; margin-top:0.7rem; }
        @media(max-width:600px) { .ai-card{padding:1.25rem;} }
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <p style={S.tag}>AI-POWERED</p>
        <h1 style={S.title}>ITINERARY <span style={{ color: "#ff6b00" }}>PLANNER</span></h1>
        <p style={S.sub}>Get a day-by-day Junnar trip plan personalised to your travel style</p>
      </div>

      {/* Step bar */}
      {step < 4 && (
        <div style={S.stepBar}>
          {[
            { n: 1, label: "Travel Style" },
            { n: 2, label: "Duration" },
            { n: 3, label: "Places" },
          ].map(({ n, label }, i) => (
            <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <StepDot n={n} active={step === n} done={step > n} />
              <span style={{ color: step >= n ? "#ccc" : "#444", fontSize: "0.82rem", whiteSpace: "nowrap" }}>{label}</span>
              {i < 2 && <div style={{ flex: 1, height: 1, background: step > n ? "#ff6b00" : "#2a2a2a", minWidth: 24 }} />}
            </div>
          ))}
        </div>
      )}

      {/* ── STEP 1: Travel Style ── */}
      {step === 1 && (
        <div className="ai-card" style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={S.stepTitle}>What's your travel style?</h2>
          <p style={S.stepHint}>This helps us prioritise the right places for you</p>
          <div className="ai-style-grid" style={{ marginTop: "1.5rem" }}>
            {TRAVEL_STYLES.map(ts => (
              <button
                key={ts.id}
                onClick={() => setStyle(ts.id)}
                style={{
                  ...S.styleCard,
                  ...(style === ts.id ? S.styleCardActive : {}),
                }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>{ts.icon}</div>
                <div style={{ color: style === ts.id ? "#ff6b00" : "#ccc", fontWeight: 600, fontSize: "0.9rem" }}>{ts.label}</div>
                <div style={{ color: "#555", fontSize: "0.75rem", marginTop: "0.3rem" }}>{ts.desc}</div>
              </button>
            ))}
          </div>
          <div style={S.btnRow}>
            <button style={S.secondaryBtn} onClick={() => navigate(-1)}>← Back</button>
            <button style={{ ...S.primaryBtn, opacity: style ? 1 : 0.4 }}
              disabled={!style} onClick={() => setStep(2)}>Next: Duration →</button>
          </div>
        </div>
      )}

      {/* ── STEP 2: Days ── */}
      {step === 2 && (
        <div className="ai-card" style={{ animation: "fadeUp 0.4s ease" }}>
          <h2 style={S.stepTitle}>How many days?</h2>
          <p style={S.stepHint}>We'll plan your activities across each day</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem", marginTop: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <button style={S.countBtn} onClick={() => setDays(d => Math.max(1, d - 1))}>−</button>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "5rem", color: "#ff6b00", lineHeight: 1 }}>{days}</div>
                <div style={{ color: "#555", fontSize: "0.88rem", marginTop: "0.3rem" }}>Day{days > 1 ? "s" : ""}</div>
              </div>
              <button style={S.countBtn} onClick={() => setDays(d => Math.min(7, d + 1))}>+</button>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
              {[1, 2, 3, 4, 5, 7].map(d => (
                <button key={d} onClick={() => setDays(d)}
                  style={{ ...S.quickDay, ...(days === d ? S.quickDayActive : {}) }}>
                  {d}D
                </button>
              ))}
            </div>
          </div>
          <div style={S.btnRow}>
            <button style={S.secondaryBtn} onClick={() => setStep(1)}>← Back</button>
            <button style={S.primaryBtn} onClick={() => setStep(3)}>Next: Select Places →</button>
          </div>
        </div>
      )}

      {/* ── STEP 3: Places ── */}
      {step === 3 && (
        <div className="ai-card" style={{ animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <div>
              <h2 style={{ ...S.stepTitle, marginBottom: "0.2rem" }}>Pick your places</h2>
              <p style={S.stepHint}>Leave all unselected to include every place automatically</p>
            </div>
            {selectedIds.length > 0 && (
              <span style={{ background: "rgba(255,107,0,0.1)", color: "#ff6b00", border: "1px solid rgba(255,107,0,0.25)", padding: "0.3rem 0.8rem", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 600 }}>
                {selectedIds.length} selected
              </span>
            )}
          </div>
          {loading ? (
            <div style={{ color: "#555", textAlign: "center", padding: "2rem" }}>Loading places...</div>
          ) : (
            <div className="ai-places-grid">
              {sortedPlaces.map(place => {
                const isSelected = selectedIds.includes(place.id);
                const isPref     = preferredCats.includes(place.category);
                return (
                  <button key={place.id} onClick={() => togglePlace(place.id)}
                    style={{ ...S.placeChip, ...(isSelected ? S.placeChipActive : {}), ...(isPref && !isSelected ? { borderColor: "rgba(255,107,0,0.25)" } : {}) }}>
                    <span style={{ color: isSelected ? "#ff6b00" : isPref ? "#a87050" : "#666", fontWeight: 600, fontSize: "0.85rem" }}>
                      {place.name}
                    </span>
                    <span style={{ fontSize: "0.68rem", color: isSelected ? "rgba(255,107,0,0.7)" : "#444" }}>
                      {place.category}
                    </span>
                    {isPref && !isSelected && (
                      <span style={{ fontSize: "0.65rem", color: "#a87050", background: "rgba(255,107,0,0.06)", padding: "1px 5px", borderRadius: 3 }}>★ Match</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
          <div style={S.btnRow}>
            <button style={S.secondaryBtn} onClick={() => setStep(2)}>← Back</button>
            <button style={S.primaryBtn} onClick={handleGenerate} disabled={generating}>
              {generating ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ animation: "pulse 1s infinite" }}>✨</span> Generating...
                </span>
              ) : "✨ Generate Itinerary"}
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Result ── */}
      {step === 4 && (
        <div style={{ opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(20px)", transition: "all 0.5s ease" }}>
          {/* Result header */}
          <div style={{ ...S.resultBanner, animation: "fadeUp 0.5s ease" }}>
            <div>
              <p style={{ color: "#ff6b00", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>Your Personalised Plan</p>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.2rem", letterSpacing: "0.05em", color: "#fff" }}>
                {days}-DAY JUNNAR ADVENTURE
              </h2>
              <p style={{ color: "#555", fontSize: "0.88rem", marginTop: "0.3rem" }}>
                {TRAVEL_STYLES.find(t => t.id === style)?.icon} {TRAVEL_STYLES.find(t => t.id === style)?.label} · {itinerary.reduce((s, d) => s + d.visits.length, 0)} places to visit
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap" }}>
              <button style={S.primaryBtn} onClick={() => navigate("/itineraries")}>💾 Save Trip</button>
              <button style={S.secondaryBtn} onClick={reset}>🔄 Regenerate</button>
            </div>
          </div>

          {/* Day-by-day */}
          {itinerary.map((day, di) => (
            <div key={day.day} className="ai-day-card"
              style={{ animation: `fadeUp 0.4s ease ${di * 0.1}s both` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                <div style={{ background: "#ff6b00", color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", padding: "0.2rem 0.8rem", borderRadius: "6px", letterSpacing: "0.05em" }}>
                  DAY {day.day}
                </div>
                <div style={{ color: "#444", fontSize: "0.8rem" }}>
                  {day.visits.length} {day.visits.length === 1 ? "place" : "places"} planned
                </div>
              </div>

              {day.visits.map(({ place, slot }, vi) => (
                <div key={vi} className="ai-visit">
                  <div style={{ flexShrink: 0, textAlign: "center", minWidth: 70 }}>
                    <div style={{ fontSize: "1.4rem" }}>{slot.icon}</div>
                    <div style={{ color: "#ff6b00", fontSize: "0.72rem", fontWeight: 600, marginTop: "0.2rem" }}>{slot.slot}</div>
                    <div style={{ color: "#444", fontSize: "0.65rem" }}>{slot.time}</div>
                  </div>
                  <div style={{ flex: 1, borderLeft: "1px solid #2a2a2a", paddingLeft: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{place.name}</span>
                      <span style={{ background: "rgba(255,107,0,0.1)", color: "#ff6b00", fontSize: "0.65rem", padding: "1px 6px", borderRadius: 3, fontWeight: 700 }}>{place.category}</span>
                    </div>
                    <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "0.5rem" }}>
                      {place.description?.slice(0, 90)}{place.description?.length > 90 ? "..." : ""}
                    </p>
                    {TIPS_PER_CATEGORY[place.category] && (
                      <div style={{ display: "flex", gap: "0.4rem", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "0.75rem" }}>💡</span>
                        <span style={{ color: "#555", fontSize: "0.75rem" }}>{TIPS_PER_CATEGORY[place.category]}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                      {place.entryFee && (
                        <span style={{ color: "#444", fontSize: "0.72rem" }}>
                          🎟 {place.entryFee === "Free" || place.entryFee === "0" ? "Free Entry" : place.entryFee}
                        </span>
                      )}
                      {place.rating && <span style={{ color: "#444", fontSize: "0.72rem" }}>⭐ {place.rating}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/places/${place.id}`)}
                    style={{ flexShrink: 0, background: "none", border: "1px solid #2a2a2a", color: "#555", padding: "0.4rem 0.7rem", borderRadius: 6, cursor: "pointer", fontSize: "0.75rem", whiteSpace: "nowrap", alignSelf: "flex-start" }}>
                    View →
                  </button>
                </div>
              ))}
            </div>
          ))}

          {/* General tips */}
          <div style={{ background: "#0d0d0d", border: "1px solid #1e1e1e", borderRadius: 12, padding: "1.5rem", marginTop: "0.5rem" }}>
            <h3 style={{ color: "#ff6b00", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
              📌 General Travel Tips for Junnar
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "0.6rem" }}>
              {[
                "Start early — most forts are best by 7 AM",
                "Carry 2–3L water per person for each fort trek",
                "Download Google Maps offline before you leave",
                "Carry cash — ATMs are scarce in remote areas",
                "Best months: October to February",
                "Nearest railhead: Pune Junction (90 km)",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "0.6rem", color: "#666", fontSize: "0.82rem" }}>
                  <span>✓</span><span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const S = {
  page:    { background: "#0a0a0a", minHeight: "100vh", padding: "clamp(1.5rem,4vw,3rem) clamp(1rem,3vw,2rem)", maxWidth: "900px", margin: "0 auto" },
  header:  { textAlign: "center", marginBottom: "2.5rem" },
  tag:     { fontSize: "10px", letterSpacing: "4px", color: "#ff6b00", textTransform: "uppercase", marginBottom: "8px", fontWeight: 700 },
  title:   { fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.2rem,7vw,3.5rem)", letterSpacing: "0.05em", margin: 0 },
  sub:     { color: "#555", marginTop: "0.5rem", fontSize: "0.9rem" },

  stepBar:  { display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", marginBottom: "2rem", flexWrap: "wrap" },
  stepTitle:{ color: "#fff", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "0.04em", marginBottom: "0.4rem" },
  stepHint: { color: "#555", fontSize: "0.85rem" },

  styleCard: { background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "1.5rem 1rem", cursor: "pointer", textAlign: "center", transition: "all 0.25s", display: "flex", flexDirection: "column", alignItems: "center" },
  styleCardActive: { background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.5)" },

  countBtn:  { width: 48, height: 48, borderRadius: "50%", background: "#111", border: "1px solid #2a2a2a", color: "#888", fontSize: "1.5rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" },
  quickDay:  { padding: "0.4rem 0.9rem", background: "#111", border: "1px solid #2a2a2a", borderRadius: 6, color: "#666", cursor: "pointer", fontSize: "0.85rem", transition: "all 0.2s" },
  quickDayActive: { border: "1px solid #ff6b00", background: "rgba(255,107,0,0.1)", color: "#ff6b00" },

  placeChip: { display: "flex", flexDirection: "column", gap: "0.25rem", textAlign: "left", padding: "0.8rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 10, cursor: "pointer", transition: "all 0.2s" },
  placeChipActive: { background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.5)" },

  btnRow:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", gap: "0.8rem", flexWrap: "wrap" },
  primaryBtn:   { background: "linear-gradient(135deg,#ff6b00,#ff8533)", color: "#fff", border: "none", padding: "0.85rem 2rem", borderRadius: 8, fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", transition: "all 0.2s" },
  secondaryBtn: { background: "transparent", color: "#666", border: "1px solid #2a2a2a", padding: "0.85rem 1.5rem", borderRadius: 8, cursor: "pointer", fontSize: "0.9rem" },

  resultBanner: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", background: "#111", border: "1px solid #1e1e1e", borderRadius: 16, padding: "1.8rem 2rem", marginBottom: "1.5rem" },
};
