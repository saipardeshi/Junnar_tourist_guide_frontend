import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CATEGORIES = {
  all:     { label: "All",     color: "#ff6b00" },
  fort:    { label: "Forts",   color: "#e05252" },
  temple:  { label: "Temples", color: "#f5a623" },
  cave:    { label: "Caves",   color: "#9b59b6" },
  nature:  { label: "Nature",  color: "#27ae60" },
  dam:     { label: "Dams",    color: "#2980b9" },
  other:   { label: "Other",   color: "#ff6b00" },
};

const PLACES = [
  { name: "Shivneri Fort",             lat: 19.2167, lng: 73.8833, emoji: "🏯", category: "fort",   desc: "Birthplace of Chhatrapati Shivaji Maharaj" },
  { name: "Naneghat",                  lat: 19.3000, lng: 73.6833, emoji: "🏯", category: "fort",   desc: "Ancient Satavahana trade route pass" },
  { name: "Jivdhan Fort",              lat: 19.2500, lng: 73.7500, emoji: "🏯", category: "fort",   desc: "Rugged hill fort with panoramic views" },
  { name: "Chavand Fort",              lat: 19.2600, lng: 73.8100, emoji: "🏯", category: "fort",   desc: "Nizamshahi dynasty fort near Junnar" },
  { name: "Sindola Fort (Khireshwar)", lat: 19.1800, lng: 73.7200, emoji: "🏯", category: "fort",   desc: "Hidden gem trek in Ambegaon taluka" },
  { name: "Nimgiri & Hanumantgad",     lat: 19.2300, lng: 73.7800, emoji: "🏯", category: "fort",   desc: "Twin hill forts in the Sahyadri range" },
  { name: "Hadsar Fort",               lat: 19.2700, lng: 73.7300, emoji: "🏯", category: "fort",   desc: "Challenging Sahyadri trek with great views" },
  { name: "Habashi Mahal",             lat: 19.2050, lng: 73.8700, emoji: "🏰", category: "fort",   desc: "Historic Habashi palace near Junnar" },
  { name: "Ozar Ganpati Temple",       lat: 19.2800, lng: 73.8500, emoji: "🛕", category: "temple", desc: "Sacred Ashtavinayaka shrine at Ozar" },
  { name: "Kukdeshvar Temple",         lat: 19.2200, lng: 73.8800, emoji: "🛕", category: "temple", desc: "Ancient Shiva temple near Junnar" },
  { name: "Kulswami Khandoba Mandir",  lat: 19.2100, lng: 73.8750, emoji: "🛕", category: "temple", desc: "Revered Khandoba temple at Vadaj" },
  { name: "Lenyadri Caves",            lat: 19.2333, lng: 73.8667, emoji: "🪨", category: "cave",   desc: "Ancient Buddhist rock-cut caves & Ashtavinayaka" },
  { name: "Amba Ambika Caves",         lat: 19.2100, lng: 73.8600, emoji: "🪨", category: "cave",   desc: "Rock-cut caves near Junnar" },
  { name: "The Tulja Caves",           lat: 19.2050, lng: 73.8550, emoji: "🪨", category: "cave",   desc: "Ancient Buddhist caves in the Junnar complex" },
  { name: "Bhimashankar Wildlife",     lat: 19.0725, lng: 73.5353, emoji: "🌿", category: "nature", desc: "Home of the Indian Giant Squirrel" },
  { name: "Malshej Ghat",              lat: 19.3667, lng: 73.6667, emoji: "⛰️", category: "nature", desc: "Scenic mountain pass & monsoon waterfalls" },
  { name: "Daryaghat",                 lat: 19.2000, lng: 73.8650, emoji: "🌊", category: "nature", desc: "Riverside ghat on the Kukdi River" },
  { name: "Manikdoh Dam",              lat: 19.2600, lng: 73.9000, emoji: "💧", category: "dam",    desc: "Major gravity dam on Kukadi River" },
  { name: "Wadaj Dam",                 lat: 19.1500, lng: 73.7000, emoji: "💧", category: "dam",    desc: "Earthfill dam on the Meena River" },
  { name: "Pimpalgaon Joge Dam",       lat: 19.3200, lng: 73.8200, emoji: "💧", category: "dam",    desc: "Large capacity dam on Kukadi River" },
  { name: "Yedgaon Dam",               lat: 19.2900, lng: 73.9200, emoji: "💧", category: "dam",    desc: "Scenic dam near Junnar" },
  { name: "Dimbhe Dam",                lat: 19.1200, lng: 73.7500, emoji: "💧", category: "dam",    desc: "Major dam in Ambegaon with Sahyadri views" },
  { name: "Chilewadi Dam",             lat: 19.1800, lng: 73.8000, emoji: "💧", category: "dam",    desc: "Smaller dam in the Junnar-Ambegaon region" },
  { name: "Shiv Shrusti",              lat: 19.2080, lng: 73.8780, emoji: "🎭", category: "other",  desc: "Immersive Chhatrapati Shivaji Maharaj theme park" },
];

// ── Haversine distance in km ──────────────────────────────────────────────────
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDist(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

// ── Custom marker icons ───────────────────────────────────────────────────────
function makeEmojiIcon(emoji, color, isSelected) {
  const size = isSelected ? 44 : 36;
  return L.divIcon({
    html: `<div style="
      display:flex;align-items:center;justify-content:center;
      width:${size}px;height:${size}px;
      background:${isSelected ? color : "#111"};
      border:2px solid ${color};
      border-radius:50%;
      font-size:${isSelected ? 20 : 16}px;
      box-shadow:0 2px 16px ${color}55;
      cursor:pointer;
    ">${emoji}</div>`,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

function makeUserIcon() {
  return L.divIcon({
    html: `<div style="
      width:18px;height:18px;
      background:#4a9eff;
      border:3px solid #fff;
      border-radius:50%;
      box-shadow:0 0 0 6px rgba(74,158,255,0.25), 0 2px 12px rgba(74,158,255,0.5);
      animation: userPulse 2s ease-in-out infinite;
    "></div>`,
    className: "",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MapView() {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const markersRef  = useRef({});
  const userMarkerRef = useRef(null);
  const watchIdRef    = useRef(null);

  const [selected, setSelected]             = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mobileTab, setMobileTab]           = useState("map");

  // Geolocation state
  const [userPos, setUserPos]               = useState(null); // {lat, lng}
  const [geoActive, setGeoActive]           = useState(false);
  const [geoLoading, setGeoLoading]         = useState(false);
  const [geoError, setGeoError]             = useState(null);
  const [proximityAlert, setProximityAlert] = useState(null); // {name, dist}
  const alertTimeoutRef = useRef(null);

  // ── Sorted + filtered places ──────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? PLACES : PLACES.filter(p => p.category === activeCategory);
    if (userPos) {
      list = list
        .map(p => ({ ...p, dist: haversine(userPos.lat, userPos.lng, p.lat, p.lng) }))
        .sort((a, b) => a.dist - b.dist);
    }
    return list;
  }, [activeCategory, userPos]);

  // ── Check for nearby places and fire alert ────────────────────────────────
  const checkProximity = useCallback((pos) => {
    const THRESHOLD_KM = 1.0;
    const nearby = PLACES
      .map(p => ({ ...p, dist: haversine(pos.lat, pos.lng, p.lat, p.lng) }))
      .filter(p => p.dist <= THRESHOLD_KM)
      .sort((a, b) => a.dist - b.dist)[0];

    if (nearby) {
      setProximityAlert({ name: nearby.name, dist: nearby.dist, emoji: nearby.emoji });
      clearTimeout(alertTimeoutRef.current);
      alertTimeoutRef.current = setTimeout(() => setProximityAlert(null), 6000);
    }
  }, []);

  // ── Toggle geolocation ────────────────────────────────────────────────────
  const toggleGeo = () => {
    if (geoActive) {
      // Stop tracking
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      setGeoActive(false);
      setUserPos(null);
      setProximityAlert(null);
      return;
    }

    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserPos(pos);
        setGeoLoading(false);
        setGeoActive(true);
        setGeoError(null);

        // Update or create user marker
        if (mapInstance.current) {
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([pos.lat, pos.lng]);
          } else {
            userMarkerRef.current = L.marker([pos.lat, pos.lng], { icon: makeUserIcon(), zIndexOffset: 1000 })
              .addTo(mapInstance.current)
              .bindTooltip("📍 You are here", { permanent: false, direction: "top", offset: [0, -14], className: "mv-tooltip" });
            // Fly to user on first location
            mapInstance.current.flyTo([pos.lat, pos.lng], 13, { duration: 1.5 });
          }
        }

        checkProximity(pos);
      },
      (err) => {
        setGeoLoading(false);
        setGeoActive(false);
        if (err.code === 1) setGeoError("Location permission denied. Please allow access.");
        else if (err.code === 2) setGeoError("Location unavailable. Try again.");
        else setGeoError("Could not get your location.");
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
  };

  // ── Map init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current, {
      center: [19.22, 73.78], zoom: 10, zoomControl: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);
    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      attribution: '© <a href="https://stadiamaps.com">Stadia Maps</a> © <a href="https://openmaptiles.org">OpenMapTiles</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 20,
    }).addTo(mapInstance.current);

    PLACES.forEach(place => {
      const color  = CATEGORIES[place.category]?.color || "#ff6b00";
      const marker = L.marker([place.lat, place.lng], { icon: makeEmojiIcon(place.emoji, color, false) })
        .addTo(mapInstance.current);

      marker.bindTooltip(`<strong>${place.name}</strong>`, {
        direction: "top", offset: [0, -10], className: "mv-tooltip",
      });

      marker.on("click", () => {
        setSelected(place);
        setMobileTab("map");
        scrollToCard(place.name);
      });

      markersRef.current[place.name] = { marker, place };
    });

    return () => {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      mapInstance.current?.remove();
      mapInstance.current = null;
    };
  }, []);

  // ── Update marker icons when selection changes ────────────────────────────
  useEffect(() => {
    Object.values(markersRef.current).forEach(({ marker, place }) => {
      const color = CATEGORIES[place.category]?.color || "#ff6b00";
      marker.setIcon(makeEmojiIcon(place.emoji, color, selected?.name === place.name));
    });
  }, [selected]);

  // ── Invalidate map size on mobile tab switch ──────────────────────────────
  useEffect(() => {
    if (mobileTab === "map") {
      setTimeout(() => mapInstance.current?.invalidateSize(), 50);
    }
  }, [mobileTab]);

  const flyToPlace = (place) => {
    setSelected(place);
    setMobileTab("map");
    mapInstance.current?.flyTo([place.lat, place.lng], 14, { duration: 1.2 });
    scrollToCard(place.name);
  };

  const scrollToCard = (name) => {
    setTimeout(() => {
      document.getElementById(`card-${name.replace(/\s+/g, "-")}`)
        ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 150);
  };

  return (
    <>
      <style>{`
        @keyframes userPulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(74,158,255,0.25), 0 2px 12px rgba(74,158,255,0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(74,158,255,0.1), 0 2px 20px rgba(74,158,255,0.7); }
        }
        @keyframes alertSlideIn {
          from { opacity:0; transform: translateY(-20px) scale(0.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes alertGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,0,0.3), 0 8px 32px rgba(0,0,0,0.5); }
          50%       { box-shadow: 0 0 35px rgba(255,107,0,0.5), 0 8px 32px rgba(0,0,0,0.5); }
        }
        .mv-tooltip {
          background: #111 !important; border: 1px solid #333 !important;
          color: #fff !important; border-radius: 6px !important;
          padding: 4px 8px !important; font-size: 0.76rem !important;
          font-family: 'DM Sans', sans-serif !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        }
        .mv-tooltip::before { display:none !important; }
        .leaflet-popup-content-wrapper {
          background:#111 !important; border:1px solid #2a2a2a !important;
          border-radius:12px !important; color:#fff !important;
          box-shadow:0 8px 24px rgba(0,0,0,0.6) !important;
        }
        .leaflet-popup-tip { background:#111 !important; }

        .mv-card { transition: background 0.18s, border-color 0.18s, box-shadow 0.18s; }
        .mv-card:hover { background: #161616 !important; }
        .mv-filter { transition: all 0.18s; }
        .mv-filter:hover { opacity: 0.85; }

        .mv-geo-btn { transition: all 0.2s; }
        .mv-geo-btn:hover { transform: translateY(-1px); }

        @keyframes mvSlide {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .mv-selected-bar { animation: mvSlide 0.22s ease; }

        /* Scrollbar */
        .mv-cards-col { scrollbar-width: thin; scrollbar-color: #222 transparent; }
        .mv-cards-col::-webkit-scrollbar { width: 4px; }
        .mv-cards-col::-webkit-scrollbar-thumb { background: #222; border-radius: 4px; }
        .leaflet-control-attribution { display: none !important; }

        /* Mobile tab bar */
        @media (max-width: 768px) {
          .mv-desktop-split { display: none !important; }
          .mv-mobile        { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mv-desktop-split { display: flex !important; }
          .mv-mobile        { display: none !important; }
        }
      `}</style>

      <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

        {/* ── Proximity Alert Banner ── */}
        {proximityAlert && (
          <div style={{
            position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)",
            zIndex: 9999, animation: "alertSlideIn 0.35s ease, alertGlow 2s ease infinite",
            background: "rgba(12,12,12,0.92)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,107,0,0.5)", borderRadius: "14px",
            padding: "0.85rem 1.4rem", display: "flex", alignItems: "center", gap: "0.85rem",
            boxShadow: "0 0 20px rgba(255,107,0,0.3), 0 8px 32px rgba(0,0,0,0.5)",
            maxWidth: "calc(100vw - 2rem)", width: "max-content",
          }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0,
            }}>
              {proximityAlert.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#ff6b00", fontWeight: 700, textTransform: "uppercase", marginBottom: "1px" }}>
                📍 You're Nearby!
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {proximityAlert.name}
              </div>
              <div style={{ color: "#888", fontSize: "0.75rem" }}>
                Only {formatDist(proximityAlert.dist)} from your location
              </div>
            </div>
            <button
              onClick={() => setProximityAlert(null)}
              style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1rem", padding: "0 2px", flexShrink: 0 }}
            >✕</button>
          </div>
        )}

        {/* ── Header ── */}
        <div style={{ padding: "2rem 1.5rem 1rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "#ff6b00", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase" }}>
            Explore Junnar
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", letterSpacing: "0.06em", color: "#fff", margin: 0 }}>
            PLACES ON <span style={{ color: "#ff6b00" }}>MAP</span>
          </h1>
          <p style={{ color: "#444", marginTop: "0.4rem", fontSize: "0.8rem" }}>
            {filtered.length} of {PLACES.length} places · click to explore
          </p>

          {/* Geolocation Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "0.9rem", flexWrap: "wrap" }}>
            <button
              className="mv-geo-btn"
              onClick={toggleGeo}
              disabled={geoLoading}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 1.1rem", borderRadius: "999px",
                border: `1.5px solid ${geoActive ? "#4a9eff" : "#2a2a2a"}`,
                background: geoActive ? "rgba(74,158,255,0.12)" : "#111",
                color: geoActive ? "#4a9eff" : "#666",
                fontSize: "0.82rem", fontWeight: geoActive ? 700 : 400,
                cursor: geoLoading ? "wait" : "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {geoLoading ? (
                <>
                  <span style={{ width: "12px", height: "12px", border: "2px solid #4a9eff44", borderTop: "2px solid #4a9eff", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Locating…
                </>
              ) : geoActive ? (
                <> <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4a9eff", boxShadow: "0 0 6px #4a9eff", display: "inline-block", animation: "userPulse 2s ease-in-out infinite" }} /> Live Location ON </>
              ) : (
                <> 📍 Use My Location </>
              )}
            </button>
            {userPos && (
              <div style={{ fontSize: "0.75rem", color: "#444" }}>
                Proximity alerts within 1 km · sorted by distance
              </div>
            )}
          </div>
          {geoError && (
            <div style={{ marginTop: "0.6rem", color: "#e05252", fontSize: "0.78rem", background: "rgba(224,82,82,0.08)", border: "1px solid rgba(224,82,82,0.2)", borderRadius: "8px", padding: "0.4rem 1rem", display: "inline-block" }}>
              ⚠️ {geoError}
            </div>
          )}
        </div>

        {/* ── Category Filters ── */}
        <div style={{ display: "flex", gap: "0.4rem", padding: "0 1.5rem 1.2rem", overflowX: "auto", scrollbarWidth: "none", justifyContent: "center", flexWrap: "wrap" }}>
          {Object.entries(CATEGORIES).map(([key, { label, color }]) => {
            const isActive = activeCategory === key;
            const count    = key === "all" ? PLACES.length : PLACES.filter(p => p.category === key).length;
            return (
              <button key={key} className="mv-filter" onClick={() => setActiveCategory(key)} style={{
                padding: "0.4rem 0.9rem", borderRadius: "999px",
                border: `1.5px solid ${isActive ? color : "#222"}`,
                background: isActive ? `${color}22` : "#111",
                color: isActive ? color : "#555",
                fontSize: "0.78rem", fontWeight: isActive ? 700 : 400,
                cursor: "pointer", whiteSpace: "nowrap",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {label} <span style={{ opacity: 0.55, fontSize: "0.7rem" }}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ══════════ DESKTOP SPLIT ══════════ */}
        <div className="mv-desktop-split" style={{ gap: 0, height: "calc(100vh - 260px)", minHeight: "500px", padding: "0 1.5rem 1.5rem", alignItems: "stretch" }}>

          {/* Map */}
          <div style={{ flex: "1 1 0%", position: "relative", borderRadius: "16px 0 0 16px", overflow: "hidden", border: "1px solid #1e1e1e", borderRight: "none" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
            <SelectedBar selected={selected} userPos={userPos} onClose={() => setSelected(null)} />
          </div>

          {/* Cards */}
          <div className="mv-cards-col" style={{ flex: "0 0 290px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.5rem", border: "1px solid #1e1e1e", borderRadius: "0 16px 16px 0", background: "#0d0d0d", padding: "1rem", height: "100%" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "#333", fontWeight: 700, textTransform: "uppercase", paddingBottom: "0.5rem", borderBottom: "1px solid #1a1a1a", marginBottom: "0.2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{filtered.length} places</span>
              {userPos && <span style={{ color: "#4a9eff", fontSize: "0.62rem" }}>📍 Sorted by distance</span>}
            </div>
            {filtered.map((place, i) => (
              <PlaceCard key={place.name} place={place} selected={selected} index={i} onClick={flyToPlace} userPos={userPos} />
            ))}
          </div>
        </div>

        {/* ══════════ MOBILE LAYOUT ══════════ */}
        <div className="mv-mobile" style={{ flexDirection: "column", padding: "0 0 1.5rem" }}>

          {/* Tab switcher */}
          <div style={{ display: "flex", margin: "0 1rem 1rem", borderRadius: "12px", overflow: "hidden", border: "1px solid #1e1e1e", background: "#0d0d0d" }}>
            {["map", "list"].map(tab => (
              <button key={tab} onClick={() => setMobileTab(tab)} style={{
                flex: 1, padding: "0.65rem", background: mobileTab === tab ? "#ff6b00" : "transparent",
                border: "none", color: mobileTab === tab ? "#fff" : "#555",
                fontWeight: mobileTab === tab ? 700 : 400, fontSize: "0.85rem",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                textTransform: "capitalize",
              }}>
                {tab === "map" ? "🗺 Map" : "📋 List"}
              </button>
            ))}
          </div>

          {/* Mobile Map */}
          {mobileTab === "map" && (
            <div style={{ position: "relative", margin: "0 1rem", borderRadius: "14px", overflow: "hidden", border: "1px solid #1e1e1e", height: "65vw", minHeight: "280px", maxHeight: "420px" }}>
              <MobileMap
                places={PLACES}
                selected={selected}
                userPos={userPos}
                onSelect={(place) => { setSelected(place); }}
              />
              <SelectedBar selected={selected} userPos={userPos} onClose={() => setSelected(null)} />
            </div>
          )}

          {/* Mobile List */}
          {mobileTab === "list" && (
            <div style={{ padding: "0 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {userPos && <div style={{ fontSize: "0.72rem", color: "#4a9eff", marginBottom: "0.2rem" }}>📍 Sorted by distance from you</div>}
              {filtered.map((place, i) => (
                <PlaceCard key={place.name} place={place} selected={selected} index={i}
                  onClick={(p) => { flyToPlace(p); }}
                  userPos={userPos}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

/* ── Separate mobile map so it mounts independently ── */
function MobileMap({ places, selected, userPos, onSelect }) {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const markersRef  = useRef({});
  const userMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current, {
      center: [19.22, 73.78], zoom: 10, zoomControl: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);
    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
      attribution: "© Stadia Maps © OpenMapTiles © OpenStreetMap", maxZoom: 20,
    }).addTo(mapInstance.current);

    places.forEach(place => {
      const color  = CATEGORIES[place.category]?.color || "#ff6b00";
      const marker = L.marker([place.lat, place.lng], { icon: makeEmojiIcon(place.emoji, color, false) })
        .addTo(mapInstance.current);
      marker.on("click", () => onSelect(place));
      markersRef.current[place.name] = { marker, place };
    });

    return () => { mapInstance.current?.remove(); mapInstance.current = null; };
  }, []);

  // Update user marker on mobile map when userPos changes
  useEffect(() => {
    if (!mapInstance.current) return;
    if (userPos) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userPos.lat, userPos.lng]);
      } else {
        userMarkerRef.current = L.marker([userPos.lat, userPos.lng], { icon: makeUserIcon(), zIndexOffset: 1000 })
          .addTo(mapInstance.current);
      }
    } else {
      if (userMarkerRef.current) { userMarkerRef.current.remove(); userMarkerRef.current = null; }
    }
  }, [userPos]);

  useEffect(() => {
    Object.values(markersRef.current).forEach(({ marker, place }) => {
      const color = CATEGORIES[place.category]?.color || "#ff6b00";
      marker.setIcon(makeEmojiIcon(place.emoji, color, selected?.name === place.name));
    });
    if (selected) {
      mapInstance.current?.flyTo([selected.lat, selected.lng], 14, { duration: 1 });
    }
  }, [selected]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

/* ── Shared: selected place bar ── */
function SelectedBar({ selected, userPos, onClose }) {
  if (!selected) return null;
  const color = CATEGORIES[selected.category]?.color || "#ff6b00";
  const dist  = userPos ? haversine(userPos.lat, userPos.lng, selected.lat, selected.lng) : null;

  return (
    <div className="mv-selected-bar" style={{
      position: "absolute", bottom: "1rem", left: "1rem", right: "1rem",
      background: "rgba(10,10,10,0.93)", backdropFilter: "blur(12px)",
      border: `1px solid ${color}44`, borderRadius: "12px",
      padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem",
      zIndex: 1000,
    }}>
      <span style={{ fontSize: "1.6rem" }}>{selected.emoji}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{selected.name}</div>
        <div style={{ color: "#555", fontSize: "0.74rem", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{selected.desc}</div>
        {dist !== null && (
          <div style={{ color: "#4a9eff", fontSize: "0.72rem", marginTop: "2px", fontWeight: 600 }}>
            📍 {formatDist(dist)} from you
          </div>
        )}
      </div>
      <span style={{ padding: "0.18rem 0.55rem", borderRadius: "999px", fontSize: "0.65rem", fontWeight: 700, background: `${color}22`, color, border: `1px solid ${color}44`, textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>
        {CATEGORIES[selected.category]?.label}
      </span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "0.9rem", padding: "0 2px", flexShrink: 0 }}>✕</button>
    </div>
  );
}

/* ── Shared: place card ── */
function PlaceCard({ place, selected, index, onClick, userPos }) {
  const color      = CATEGORIES[place.category]?.color || "#ff6b00";
  const isSelected = selected?.name === place.name;
  const dist       = userPos ? haversine(userPos.lat, userPos.lng, place.lat, place.lng) : null;

  return (
    <div
      id={`card-${place.name.replace(/\s+/g, "-")}`}
      className="mv-card"
      onClick={() => onClick(place)}
      style={{
        display: "flex", gap: "0.7rem", alignItems: "flex-start",
        padding: "0.75rem", borderRadius: "10px",
        background: isSelected ? "#161616" : "#111",
        border: `1px solid ${isSelected ? color : "#1e1e1e"}`,
        cursor: "pointer",
        boxShadow: isSelected ? `0 0 14px ${color}22` : "none",
        animationDelay: `${index * 0.025}s`,
      }}
    >
      <div style={{
        width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
        background: isSelected ? `${color}22` : "#161616",
        border: `1px solid ${isSelected ? color : "#2a2a2a"}`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
      }}>
        {place.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: isSelected ? "#fff" : "#ccc", fontWeight: 600, fontSize: "0.83rem", lineHeight: 1.3 }}>
          {place.name}
        </div>
        <div style={{ color: "#444", fontSize: "0.72rem", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {place.desc}
        </div>
        {dist !== null && (
          <div style={{ color: dist < 1 ? "#27ae60" : "#4a9eff", fontSize: "0.7rem", marginTop: "2px", fontWeight: 600 }}>
            {dist < 1 ? "🟢" : "📍"} {formatDist(dist)} away
          </div>
        )}
      </div>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "5px" }} />
    </div>
  );
}