import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const TYPE_FILTERS = ["All", "Hotel", "Lodge", "Resort", "Homestay"];

const TYPE_COLORS = {
  Hotel:    { bg: "rgba(232,82,10,0.9)",   text: "#fff" },
  Lodge:    { bg: "rgba(139,92,246,0.9)",  text: "#fff" },
  Resort:   { bg: "rgba(16,185,129,0.9)",  text: "#fff" },
  Homestay: { bg: "rgba(245,158,11,0.9)",  text: "#111" },
};

const TYPE_ICONS = {
  All:      "",
  Hotel:    "",
  Lodge:    "",
  Resort:   "",
  Homestay: "",
};

const MEAL_ICONS = {
  breakfast: "",
  lunch:     "",
  dinner:    "",
};

export default function Hotels() {
  const [hotels, setHotels]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeType, setActiveType]   = useState("All");
  const [expanded, setExpanded]       = useState(null); // hotel id expanded
  const [mealTab, setMealTab]         = useState({});   // {hotelId: "breakfast"|"lunch"|"dinner"}

  useEffect(() => {
    setLoading(true);
    const url = activeType === "All"
      ? `${API}/hotels`
      : `${API}/hotels/type/${activeType}`;
    axios.get(url)
      .then(res => setHotels(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [activeType]);

  const toggleExpand = (id) => setExpanded(prev => prev === id ? null : id);
  const getMealTab   = (id) => mealTab[id] || "breakfast";
  const setHotelMealTab = (id, tab) => setMealTab(prev => ({ ...prev, [id]: tab }));

  const filtered = hotels;

  return (
    <div style={s.page}>

      {/* ── Header ── */}
      <div style={s.header}>
        <p style={s.headerTag}>STAY IN JUNNAR</p>
        <h1 style={s.title}>
          HOTELS & <span style={{ color: "#E8520A" }}>LODGES</span>
        </h1>
        <p style={s.subtitle}>
          {hotels.length} places to stay · Rooms, meals & booking info
        </p>
      </div>

      {/* ── Type Filter ── */}
      <div style={s.filters}>
        {TYPE_FILTERS.map(t => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            style={{ ...s.filterBtn, ...(activeType === t ? s.filterBtnActive : {}) }}
          >
            {TYPE_ICONS[t]} {t}
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div style={s.skeletonGrid}>
          {[...Array(4)].map((_, i) => <div key={i} style={s.skeleton} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div style={s.empty}>
          <div style={{ fontSize: "3rem" }}></div>
          <p>No hotels found.</p>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map(hotel => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isExpanded={expanded === hotel.id}
              onToggle={() => toggleExpand(hotel.id)}
              mealTab={getMealTab(hotel.id)}
              onMealTab={tab => setHotelMealTab(hotel.id, tab)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Hotel Card ────────────────────────────────────────────────────────────────
function HotelCard({ hotel, isExpanded, onToggle, mealTab, onMealTab }) {
  const [hovered, setHovered]   = useState(false);
  const [imgIdx, setImgIdx]     = useState(0);
  const badgeColor = TYPE_COLORS[hotel.type] || TYPE_COLORS["Hotel"];
  const meals = hotel.meals || {};

  const activeMealContent = {
    breakfast: meals.breakfastAvailable ? meals.breakfastMenu : null,
    lunch:     meals.lunchAvailable     ? meals.lunchMenu     : null,
    dinner:    meals.dinnerAvailable    ? meals.dinnerMenu     : null,
  };

  return (
    <div
      style={{ ...s.card, ...(hovered ? s.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div style={s.imgWrap}>
        {hotel.images && hotel.images.length > 0 ? (
          <>
            <img src={hotel.images[imgIdx]} alt={hotel.name} style={s.img} />
            {hotel.images.length > 1 && (
              <>
                <button style={{ ...s.imgArrow, left: 8 }}
                  onClick={e => { e.stopPropagation(); setImgIdx(i => (i - 1 + hotel.images.length) % hotel.images.length); }}>‹</button>
                <button style={{ ...s.imgArrow, right: 8 }}
                  onClick={e => { e.stopPropagation(); setImgIdx(i => (i + 1) % hotel.images.length); }}>›</button>
              </>
            )}
          </>
        ) : (
          <div style={s.imgPlaceholder}>
            <span style={{ fontSize: "4rem" }}>{TYPE_ICONS[hotel.type] || ""}</span>
          </div>
        )}

        {/* Type badge */}
        <span style={{ ...s.badge, background: badgeColor.bg, color: badgeColor.text }}>
          {hotel.type}
        </span>

        {/* Rating */}
        <span style={s.ratingBadge}>{hotel.rating}</span>
      </div>

      {/* ── Card Body ── */}
      <div style={s.body}>
        <h3 style={s.name}>{hotel.name}</h3>
        <p style={s.address}> {hotel.address}</p>

        {/* Price */}
        <div style={s.priceRow}>
          <span style={s.price}>{hotel.priceRange}</span>
        </div>

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div style={s.amenities}>
            {hotel.amenities.slice(0, 4).map(a => (
              <span key={a} style={s.amenityTag}>✓ {a}</span>
            ))}
            {hotel.amenities.length > 4 && (
              <span style={{ ...s.amenityTag, color: "#E8520A", borderColor: "rgba(232,82,10,0.3)" }}>
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Meal availability pills */}
        <div style={s.mealPills}>
          {["breakfast", "lunch", "dinner"].map(m => {
            const available = m === "breakfast" ? meals.breakfastAvailable
                            : m === "lunch"     ? meals.lunchAvailable
                            :                    meals.dinnerAvailable;
            return (
              <span key={m} style={{
                ...s.mealPill,
                ...(available ? s.mealPillOn : s.mealPillOff),
              }}>
                {MEAL_ICONS[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
              </span>
            );
          })}
        </div>

        {/* Expand / Collapse */}
        <button style={s.expandBtn} onClick={onToggle}>
          {isExpanded ? "Hide Details ▲" : "View Rooms & Meals ▼"}
        </button>

        {/* ── Expanded Details ── */}
        {isExpanded && (
          <div style={s.expanded}>

            {/* Room Types */}
            {hotel.roomTypes && hotel.roomTypes.length > 0 && (
              <div style={s.section}>
                <h4 style={s.sectionTitle}>🛏️ Room Types</h4>
                <div style={s.roomGrid}>
                  {hotel.roomTypes.map((room, i) => (
                    <div key={i} style={s.roomCard}>
                      <div style={s.roomName}>{room.name}</div>
                      <div style={s.roomPrice}>{room.price}</div>
                      <div style={s.roomCapacity}>👥 {room.capacity}</div>
                      <div style={s.roomFeatures}>
                        {room.features?.map(f => (
                          <span key={f} style={s.roomFeature}>{f}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meal Details */}
            {meals && (
              <div style={s.section}>
                <h4 style={s.sectionTitle}>Food & Meals</h4>

                {/* Cuisine & price */}
                <div style={s.mealMeta}>
                  <span style={s.mealMetaItem}> {meals.cuisineType}</span>
                  <span style={s.mealMetaItem}> {meals.mealPriceRange}</span>
                </div>

                {/* Meal tab switcher */}
                <div style={s.mealTabs}>
                  {["breakfast", "lunch", "dinner"].map(m => {
                    const avail = m === "breakfast" ? meals.breakfastAvailable
                                : m === "lunch"     ? meals.lunchAvailable
                                :                    meals.dinnerAvailable;
                    if (!avail) return null;
                    return (
                      <button
                        key={m}
                        onClick={() => onMealTab(m)}
                        style={{ ...s.mealTab, ...(mealTab === m ? s.mealTabActive : {}) }}
                      >
                        {MEAL_ICONS[m]} {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    );
                  })}
                </div>

                {/* Meal content */}
                {activeMealContent[mealTab] && (
                  <div style={s.mealContent}>
                    {activeMealContent[mealTab]}
                  </div>
                )}
              </div>
            )}

            {/* Contact & Booking */}
            <div style={s.section}>
              <h4 style={s.sectionTitle}> Contact & Booking</h4>
              <div style={s.contactGrid}>
                {hotel.phone && (
                  <a href={`tel:${hotel.phone}`} style={s.contactBtn}>
                     {hotel.phone}
                  </a>
                )}
                {hotel.email && (
                  <a href={`mailto:${hotel.email}`} style={s.contactBtn}>
                     {hotel.email}
                  </a>
                )}
                {hotel.website && (
                  <a href={hotel.website} target="_blank" rel="noopener noreferrer" style={s.contactBtn}>
                     Visit Website
                  </a>
                )}
                {hotel.googleMapsUrl && (
                  <a href={hotel.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                    style={{ ...s.contactBtn, ...s.mapsBtn }}>
                     Open in Maps
                  </a>
                )}
              </div>

              {/* Book Now CTA */}
              <a
                href={hotel.phone ? `tel:${hotel.phone}` : (hotel.email ? `mailto:${hotel.email}` : "#")}
                style={s.bookBtn}
              >
                 Book Now — Call Hotel
              </a>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const s = {
  page:       { background: "#0A0A0A", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" },
  header:     { textAlign: "center", marginBottom: "2.5rem" },
  headerTag:  { fontSize: "10px", letterSpacing: "4px", color: "#E8520A", textTransform: "uppercase", marginBottom: "10px" },
  title:      { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4rem)", letterSpacing: "0.05em", color: "#fff", margin: 0 },
  subtitle:   { color: "#555", marginTop: "0.5rem", fontSize: "0.9rem" },

  filters:    { display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem" },
  filterBtn:  { display: "flex", alignItems: "center", gap: "6px", padding: "0.45rem 1.1rem", borderRadius: "20px", border: "1px solid #2a2a2a", background: "#111", color: "#888", fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" },
  filterBtnActive: { border: "1px solid #E8520A", background: "rgba(232,82,10,0.12)", color: "#E8520A" },

  skeletonGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.2rem" },
  skeleton:   { height: "460px", background: "#111", borderRadius: "16px", border: "1px solid #1e1e1e" },
  empty:      { textAlign: "center", color: "#555", padding: "5rem 0", fontSize: "1.1rem" },
  grid:       { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.2rem" },

  card:       { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", overflow: "hidden", transition: "all 0.3s" },
  cardHover:  { border: "1px solid rgba(232,82,10,0.35)", transform: "translateY(-4px)", boxShadow: "0 16px 40px rgba(0,0,0,0.5)" },

  imgWrap:    { position: "relative", height: "220px", overflow: "hidden", background: "#0d0d0d" },
  img:        { width: "100%", height: "100%", objectFit: "cover" },
  imgPlaceholder: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#161616" },
  imgArrow:   { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.55)", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 },
  badge:      { position: "absolute", top: "10px", left: "10px", padding: "0.2rem 0.7rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" },
  ratingBadge:{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.7)", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "700" },

  body:       { padding: "1.2rem" },
  name:       { color: "#fff", fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.3rem" },
  address:    { color: "#555", fontSize: "0.8rem", marginBottom: "0.8rem" },
  priceRow:   { marginBottom: "0.8rem" },
  price:      { color: "#E8520A", fontWeight: "700", fontSize: "0.9rem" },

  amenities:  { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.9rem" },
  amenityTag: { fontSize: "0.72rem", color: "#666", border: "1px solid #2a2a2a", borderRadius: "4px", padding: "2px 8px" },

  mealPills:  { display: "flex", gap: "6px", marginBottom: "1rem", flexWrap: "wrap" },
  mealPill:   { fontSize: "0.72rem", padding: "3px 10px", borderRadius: "20px", fontWeight: "600" },
  mealPillOn: { background: "rgba(16,185,129,0.12)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" },
  mealPillOff:{ background: "rgba(255,255,255,0.03)", color: "#333", border: "1px solid #1e1e1e" },

  expandBtn:  { width: "100%", padding: "0.65rem", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#888", fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s", textAlign: "center" },

  expanded:   { marginTop: "1rem", borderTop: "1px solid #1e1e1e", paddingTop: "1rem" },
  section:    { marginBottom: "1.2rem" },
  sectionTitle:{ color: "#fff", fontSize: "0.88rem", fontWeight: "700", marginBottom: "0.75rem" },

  roomGrid:   { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: "0.6rem" },
  roomCard:   { background: "#161616", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "0.75rem" },
  roomName:   { color: "#ccc", fontSize: "0.82rem", fontWeight: "600", marginBottom: "4px" },
  roomPrice:  { color: "#E8520A", fontSize: "0.85rem", fontWeight: "700", marginBottom: "4px" },
  roomCapacity:{ color: "#555", fontSize: "0.75rem", marginBottom: "6px" },
  roomFeatures:{ display: "flex", flexWrap: "wrap", gap: "4px" },
  roomFeature:{ fontSize: "0.68rem", color: "#555", background: "#1e1e1e", padding: "2px 6px", borderRadius: "4px" },

  mealMeta:   { display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" },
  mealMetaItem:{ fontSize: "0.8rem", color: "#666" },
  mealTabs:   { display: "flex", gap: "6px", marginBottom: "0.75rem" },
  mealTab:    { padding: "0.35rem 0.9rem", border: "1px solid #2a2a2a", borderRadius: "20px", background: "transparent", color: "#666", fontSize: "0.78rem", cursor: "pointer", transition: "all 0.2s" },
  mealTabActive:{ border: "1px solid #E8520A", background: "rgba(232,82,10,0.1)", color: "#E8520A" },
  mealContent:{ background: "#161616", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "0.85rem 1rem", color: "#888", fontSize: "0.84rem", lineHeight: "1.7" },

  contactGrid:{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" },
  contactBtn: { display: "flex", alignItems: "center", gap: "6px", padding: "0.55rem 0.8rem", background: "#161616", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#888", fontSize: "0.78rem", textDecoration: "none", transition: "all 0.2s", justifyContent: "center" },
  mapsBtn:    { gridColumn: "span 2" },
  bookBtn:    { display: "block", width: "100%", padding: "0.85rem", background: "linear-gradient(135deg,#E8520A,#ff6b1a)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", fontSize: "0.92rem", cursor: "pointer", textAlign: "center", textDecoration: "none", transition: "all 0.2s", boxSizing: "border-box" },
};