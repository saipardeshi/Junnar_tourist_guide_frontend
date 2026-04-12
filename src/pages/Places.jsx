import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPlaces, getPlacesByCategory, searchPlaces } from "../services/api";
import ImageSwiper from "../components/ImageSwiper";
import { getImagesForPlace } from "../data/placeImages";

// ── Category filter tabs ──────────────────────────────────────────────────────
// "Heritage" places (Habashi Mahal, Shiv Shrusti) have no filter tab — they
// always appear under "All". The filter tabs match the DB category values exactly.
const CATEGORIES = ["All", "Fort", "Temple", "Cave", "Nature", "Dam"];

// ── Badge colours per category ────────────────────────────────────────────────
const BADGE_COLORS = {
  Fort:     { bg: "rgba(255,107,0,0.92)",   text: "#fff" },
  Temple:   { bg: "rgba(251,191,36,0.92)",  text: "#111" },
  Cave:     { bg: "rgba(139,92,246,0.92)",  text: "#fff" },
  Nature:   { bg: "rgba(16,185,129,0.92)",  text: "#fff" },
  Dam:      { bg: "rgba(59,130,246,0.92)",  text: "#fff" },
  Heritage: { bg: "rgba(236,72,153,0.92)",  text: "#fff" },
};

// ── Category icons ────────────────────────────────────────────────────────────
const CATEGORY_ICONS = {
  All:     "🗺️",
  Fort:    "🏔️",
  Temple:  "🛕",
  Cave:    "🪨",
  Nature:  "🌿",
  Dam:     "💧",
};

export default function Places() {
  const [places, setPlaces]                 = useState([]);
  const [loading, setLoading]               = useState(true);
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    setLoading(true);
    try {
      let res;
      if (search.trim())                 res = await searchPlaces(search);
      else if (activeCategory !== "All") res = await getPlacesByCategory(activeCategory);
      else                               res = await getAllPlaces();
      setPlaces(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPlaces(); }, [activeCategory]);

  const handleSearch = (e) => { e.preventDefault(); fetchPlaces(); };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>EXPLORE <span style={{ color: "#ff6b00" }}>JUNNAR</span></h1>
        <p style={styles.subtitle}>{places.length} incredible destinations</p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} style={styles.searchForm}>
        <div style={styles.searchBox}>
          <span style={{ padding: "0 1rem" }}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search places..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
        </div>
      </form>

      {/* Category Filters */}
      <div style={styles.filters}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSearch(""); }}
            style={{
              ...styles.filterBtn,
              ...(activeCategory === cat ? styles.filterBtnActive : {}),
            }}
          >
            <span>{CATEGORY_ICONS[cat]}</span>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div style={styles.skeletonGrid}>
          {[...Array(6)].map((_, i) => <div key={i} style={styles.skeleton} />)}
        </div>
      ) : places.length === 0 ? (
        <div style={styles.empty}>
          <div style={{ fontSize: "3rem" }}>🔍</div>
          <p>No places found.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {places.map((place) => {
            const images = getImagesForPlace(place.name);
            return (
              <PlaceCard
                key={place.id}
                place={place}
                images={images}
                onClick={() => navigate(`/places/${place.id}`)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function PlaceCard({ place, images, onClick }) {
  const [hovered, setHovered] = useState(false);

  // Badge colour — fallback to orange if category not in map
  const badgeColor = BADGE_COLORS[place.category] || BADGE_COLORS["Fort"];

  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHovered : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Swipeable image */}
      <div style={styles.cardImgWrap}>
        <ImageSwiper images={images} height="210px" name={place.name} />

        {/* Category badge — coloured by type */}
        <span style={{
          ...styles.categoryBadge,
          background: badgeColor.bg,
          color: badgeColor.text,
        }}>
          {place.category}
        </span>
      </div>

      {/* Card body */}
      <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{place.name}</h3>
        <p style={styles.cardLocation}>📍 {place.location}</p>
        <p style={styles.cardDesc}>
          {place.description?.slice(0, 80)}{place.description?.length > 80 ? "..." : ""}
        </p>

        <div style={styles.cardFooter}>
          <span style={styles.rating}>⭐ {place.rating || "N/A"}</span>
          <span style={styles.feeTag}>
            {place.entryFee === "Free" || place.entryFee === "0" ? "🆓 Free" : `🎫 ${place.entryFee}`}
          </span>
        </div>

        <button style={styles.detailBtn} onClick={onClick}>
          View Details & Gallery →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page:         { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" },
  header:       { textAlign: "center", marginBottom: "2.5rem" },
  title:        { fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.5rem", letterSpacing: "0.05em" },
  subtitle:     { color: "#555", marginTop: "0.4rem" },
  searchForm:   { marginBottom: "1.8rem" },
  searchBox:    { display: "flex", alignItems: "center", background: "#111", border: "1px solid #2a2a2a", borderRadius: "10px", overflow: "hidden", maxWidth: "480px", margin: "0 auto" },
  searchInput:  { flex: 1, padding: "0.85rem 0.5rem", background: "transparent", border: "none", color: "#fff", fontSize: "0.95rem" },
  searchBtn:    { padding: "0.85rem 1.4rem", background: "#ff6b00", border: "none", color: "#fff", fontWeight: "700", fontSize: "0.9rem", cursor: "pointer" },
  filters:      { display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "center", marginBottom: "2.5rem" },
  filterBtn:    { display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 1rem", borderRadius: "20px", border: "1px solid #2a2a2a", background: "#111", color: "#888", fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" },
  filterBtnActive: { border: "1px solid #ff6b00", background: "rgba(255,107,0,0.12)", color: "#ff6b00" },
  skeletonGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.2rem" },
  skeleton:     { height: "400px", background: "#111", borderRadius: "14px", border: "1px solid #1e1e1e" },
  empty:        { textAlign: "center", color: "#555", padding: "5rem 0", fontSize: "1.1rem" },
  grid:         { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1.2rem" },
  card:         { background: "#111", border: "1px solid #1e1e1e", borderRadius: "14px", overflow: "hidden", transition: "all 0.3s ease" },
  cardHovered:  { border: "1px solid rgba(255,107,0,0.35)", transform: "translateY(-4px)", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" },
  cardImgWrap:  { position: "relative" },
  categoryBadge: { position: "absolute", top: "10px", left: "10px", zIndex: 3, padding: "0.2rem 0.65rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" },
  cardBody:     { padding: "1.2rem" },
  cardTitle:    { color: "#fff", fontSize: "1.05rem", fontWeight: "700", marginBottom: "0.25rem" },
  cardLocation: { color: "#555", fontSize: "0.8rem", marginBottom: "0.6rem" },
  cardDesc:     { color: "#777", fontSize: "0.86rem", lineHeight: "1.5", marginBottom: "1rem" },
  cardFooter:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  rating:       { color: "#ff6b00", fontWeight: "700", fontSize: "0.85rem" },
  feeTag:       { color: "#555", fontSize: "0.8rem" },
  detailBtn:    { width: "100%", padding: "0.65rem", background: "transparent", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#888", fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s", textAlign: "center" },
};