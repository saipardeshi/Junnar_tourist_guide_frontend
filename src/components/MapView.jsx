import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const PLACES = [
  { name: "Shivneri Fort",               lat: 19.2167, lng: 73.8833, emoji: "🏯", desc: "Birthplace of Chhatrapati Shivaji Maharaj" },
  { name: "Naneghat",                    lat: 19.3000, lng: 73.6833, emoji: "🏯", desc: "Ancient Satavahana trade route pass" },
  { name: "Jivdhan Fort",                lat: 19.2500, lng: 73.7500, emoji: "🏯", desc: "Rugged hill fort with panoramic views" },
  { name: "Chavand Fort",                lat: 19.2600, lng: 73.8100, emoji: "🏯", desc: "Nizamshahi dynasty fort near Junnar" },
  { name: "Sindola Fort (Khireshwar)",   lat: 19.1800, lng: 73.7200, emoji: "🏯", desc: "Hidden gem trek in Ambegaon taluka" },
  { name: "Nimgiri & Hanumantgad",       lat: 19.2300, lng: 73.7800, emoji: "🏯", desc: "Twin hill forts in the Sahyadri range" },
  { name: "Hadsar Fort",                 lat: 19.2700, lng: 73.7300, emoji: "🏯", desc: "Challenging Sahyadri trek with great views" },
  { name: "Habashi Mahal",               lat: 19.2050, lng: 73.8700, emoji: "🏰", desc: "Historic Habashi palace near Junnar" },
  { name: "Ozar Ganpati Temple",         lat: 19.2800, lng: 73.8500, emoji: "🛕", desc: "Sacred Ashtavinayaka shrine at Ozar" },
  { name: "Kukdeshvar Temple",           lat: 19.2200, lng: 73.8800, emoji: "🛕", desc: "Ancient Shiva temple near Junnar" },
  { name: "Kulswami Khandoba Mandir",    lat: 19.2100, lng: 73.8750, emoji: "🛕", desc: "Revered Khandoba temple at Vadaj" },
  { name: "Lenyadri Caves",              lat: 19.2333, lng: 73.8667, emoji: "🪨", desc: "Ancient Buddhist rock-cut caves & Ashtavinayaka" },
  { name: "Amba Ambika Caves",           lat: 19.2100, lng: 73.8600, emoji: "🪨", desc: "Rock-cut caves near Junnar" },
  { name: "The Tulja Caves (Tulja Lena)",lat: 19.2050, lng: 73.8550, emoji: "🪨", desc: "Ancient Buddhist caves in the Junnar complex" },
  { name: "Bhimashankar Wildlife",       lat: 19.0725, lng: 73.5353, emoji: "🌿", desc: "Home of the Indian Giant Squirrel" },
  { name: "Malshej Ghat",                lat: 19.3667, lng: 73.6667, emoji: "⛰️", desc: "Scenic mountain pass & monsoon waterfalls" },
  { name: "Daryaghat",                   lat: 19.2000, lng: 73.8650, emoji: "🌊", desc: "Riverside ghat on the Kukdi River" },
  { name: "Manikdoh Dam",                lat: 19.2600, lng: 73.9000, emoji: "💧", desc: "Major gravity dam on Kukadi River" },
  { name: "Wadaj Dam",                   lat: 19.1500, lng: 73.7000, emoji: "💧", desc: "Earthfill dam on the Meena River" },
  { name: "Pimpalgaon Joge Dam",         lat: 19.3200, lng: 73.8200, emoji: "💧", desc: "Large capacity dam on Kukadi River" },
  { name: "Yedgaon Dam",                 lat: 19.2900, lng: 73.9200, emoji: "💧", desc: "Scenic dam near Junnar" },
  { name: "Dimbhe Dam",                  lat: 19.1200, lng: 73.7500, emoji: "💧", desc: "Major dam in Ambegaon with Sahyadri views" },
  { name: "Chilewadi Dam",               lat: 19.1800, lng: 73.8000, emoji: "💧", desc: "Smaller dam in the Junnar-Ambegaon region" },
  { name: "Shiv Shrusti",                lat: 19.2080, lng: 73.8780, emoji: "🎭", desc: "Immersive Chhatrapati Shivaji Maharaj theme park in Junnar" },
];

const MARKER_COLOR = "#ff6b00";

function makeIcon() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
    <circle cx="15" cy="15" r="12" fill="${MARKER_COLOR}" stroke="#fff" stroke-width="2.5"/>
  </svg>`;
  return L.divIcon({
    html: svg, className: "",
    iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18],
  });
}

export default function MapView() {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);
  const markersRef  = useRef([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    mapInstance.current = L.map(mapRef.current, { center: [19.22, 73.78], zoom: 10 });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapInstance.current);

    PLACES.forEach(place => {
      const marker = L.marker([place.lat, place.lng], { icon: makeIcon() })
        .addTo(mapInstance.current);

      marker.bindPopup(`
        <div style="font-family:sans-serif;min-width:160px;padding:4px;">
          <div style="font-size:1.3rem;margin-bottom:4px;">${place.emoji}</div>
          <strong style="font-size:0.92rem;">${place.name}</strong>
          <div style="color:#555;font-size:0.78rem;margin-top:4px;">${place.desc}</div>
        </div>
      `);
      marker.on("click", () => setSelected(place));
      markersRef.current.push(marker);
    });

    return () => { mapInstance.current.remove(); mapInstance.current = null; };
  }, []);

  return (
    <div style={styles.wrapper}>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>PLACES ON <span style={{ color: "#ff6b00" }}>MAP</span></h2>
        <p style={styles.subtitle}>{PLACES.length} places to explore</p>
      </div>

      {/* Map */}
      <div ref={mapRef} style={styles.map} />

      {/* Selected Card */}
      {selected && (
        <div style={styles.selectedCard}>
          <div style={styles.selectedLeft}>
            <span style={{ fontSize: "2rem" }}>{selected.emoji}</span>
            <h3 style={styles.selectedName}>{selected.name}</h3>
          </div>
          <p style={styles.selectedDesc}>{selected.desc}</p>
          <button style={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
        </div>
      )}

      {/* Place Grid */}
      <div style={styles.placeGrid}>
        {PLACES.map(p => (
          <div key={p.name} style={styles.placePin} onClick={() => {
            setSelected(p);
            mapInstance.current?.flyTo([p.lat, p.lng], 13, { duration: 1 });
          }}>
            <span style={{ fontSize: "1.4rem" }}>{p.emoji}</span>
            <div style={{ color: "#ccc", fontSize: "0.82rem", fontWeight: 600 }}>{p.name}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  wrapper:      { padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto", background: "#0a0a0a", minHeight: "100vh" },
  header:       { textAlign: "center", marginBottom: "1.5rem" },
  title:        { fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", letterSpacing: "0.05em", color: "#fff" },
  subtitle:     { color: "#555", marginTop: "0.3rem", fontSize: "0.85rem" },
  map:          { height: "520px", borderRadius: "16px", overflow: "hidden", border: "1px solid #1e1e1e", zIndex: 0 },
  selectedCard: { position: "relative", marginTop: "1rem", background: "#111", border: "1px solid rgba(255,107,0,0.3)", borderRadius: "12px", padding: "1.2rem 3rem 1.2rem 1.2rem", display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" },
  selectedLeft: { display: "flex", gap: "0.8rem", alignItems: "center" },
  selectedName: { color: "#fff", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" },
  selectedDesc: { color: "#666", fontSize: "0.85rem", flex: 1 },
  closeBtn:     { position: "absolute", top: "0.8rem", right: "0.8rem", background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "0.9rem" },
  placeGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "0.7rem", marginTop: "1.5rem" },
  placePin:     { display: "flex", gap: "0.8rem", alignItems: "center", background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "0.75rem 1rem", cursor: "pointer", transition: "border-color 0.2s" },
};