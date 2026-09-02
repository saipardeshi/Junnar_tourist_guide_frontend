import { useState, useEffect, useRef } from "react";

// ── Curated local experiences data ────────────────────────────────────────────
const EXPERIENCES = [
  {
    id: 1,
    title: "Naneghat Night Trek & Sunrise Camp",
    category: "Trekking",
    emoji: "🏔️",
    difficulty: "Moderate",
    duration: "12 hrs (Overnight)",
    groupSize: "Max 15 pax",
    price: "₹999",
    priceNote: "per person",
    guide: "Suresh Thakare",
    guideExp: "12 yrs exp.",
    phone: "+91 9876543210",
    whatsapp: "919876543210",
    description:
      "Experience the ancient Satavahana trade route under the stars. Trek through dense Sahyadri forest, camp at the iconic Naneghat pass, and wake up to a breathtaking sunrise over the Konkan coast. All camping gear, dinner & breakfast included.",
    highlights: ["Overnight camp", "Sunrise view", "Historical inscriptions", "Stargazing"],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    badge: "Most Popular",
    badgeColor: "#ff6b00",
    tags: ["Trek", "Camping", "Heritage"],
  },
  {
    id: 2,
    title: "Shivneri Fort Guided Heritage Walk",
    category: "Trekking",
    emoji: "🏯",
    difficulty: "Easy",
    duration: "4 hrs",
    groupSize: "Max 20 pax",
    price: "₹399",
    priceNote: "per person",
    guide: "Rajendra Mane",
    guideExp: "8 yrs exp.",
    phone: "+91 9765432109",
    whatsapp: "919765432109",
    description:
      "A certified historian-guide walks you through the birthplace of Chhatrapati Shivaji Maharaj. Explore the Shivai temple, Ambarai gate, deep rock cisterns, and hidden passages of this remarkable fort overlooking Junnar valley.",
    highlights: ["Heritage expert guide", "Historical storytelling", "Fort architecture", "360° valley views"],
    image: "https://images.unsplash.com/photo-1599408093570-ea7c0cf4bf46?w=800&q=80",
    badge: "Expert Guide",
    badgeColor: "#9b59b6",
    tags: ["Heritage", "History", "Walk"],
  },
  {
    id: 3,
    title: "Junnar Agritourism Farm Day",
    category: "Agritourism",
    emoji: "🌾",
    difficulty: "Easy",
    duration: "Full Day (8 hrs)",
    groupSize: "Max 10 pax",
    price: "₹799",
    priceNote: "per person",
    guide: "Vilas Kale (Farmer Host)",
    guideExp: "25 yrs farming",
    phone: "+91 9654321098",
    whatsapp: "919654321098",
    description:
      "Live like a Junnar farmer for a day. Participate in pomegranate harvesting, learn about organic drip irrigation, plough fields with bullocks, and enjoy an authentic village thali cooked on a wood fire in the farmer's home.",
    highlights: ["Pomegranate harvest", "Bullock ploughing", "Wood-fire village thali", "Organic farm tour"],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    badge: "Authentic",
    badgeColor: "#27ae60",
    tags: ["Farm", "Organic", "Cultural"],
  },
  {
    id: 4,
    title: "Bhimashankar Wildlife Safari",
    category: "Trekking",
    emoji: "🌿",
    difficulty: "Moderate",
    duration: "6 hrs",
    groupSize: "Max 8 pax",
    price: "₹1,299",
    priceNote: "per person",
    guide: "Prakash Jadhav",
    guideExp: "Forest ranger, 10 yrs",
    phone: "+91 9543210987",
    whatsapp: "919543210987",
    description:
      "A nature walk through Bhimashankar Wildlife Sanctuary with a certified forest ranger. Spot the endangered Indian Giant Squirrel in its natural habitat, observe rare Malabar birds, and explore diverse orchids and mushrooms along pristine forest trails.",
    highlights: ["Indian Giant Squirrel sighting", "Malabar bird species", "Rare orchids", "Forest ranger expertise"],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    badge: "Wildlife",
    badgeColor: "#27ae60",
    tags: ["Wildlife", "Forest", "Photography"],
  },
  {
    id: 5,
    title: "Village Homestay — Narayangaon",
    category: "Village Stay",
    emoji: "🏡",
    difficulty: "Leisure",
    duration: "1–3 nights",
    groupSize: "Max 6 pax",
    price: "₹1,800",
    priceNote: "per night (couple)",
    guide: "Shalini Pawar (Host)",
    guideExp: "Homestay since 2018",
    phone: "+91 9432109876",
    whatsapp: "919432109876",
    description:
      "Stay in a beautifully restored wada-style village home in Narayangaon. Wake up to roosters at dawn, drink fresh sugarcane juice straight from the press, help with morning puja rituals, and fall asleep under a canopy of stars with zero light pollution.",
    highlights: ["Traditional wada architecture", "Home-cooked Maharashtrian food", "Sugarcane juice", "Zero light pollution stargazing"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    badge: "Peaceful",
    badgeColor: "#f5a623",
    tags: ["Homestay", "Village", "Relaxation"],
  },
  {
    id: 6,
    title: "Traditional Maharashtrian Cooking Class",
    category: "Culinary",
    emoji: "🍲",
    difficulty: "Easy",
    duration: "3 hrs",
    groupSize: "Max 8 pax",
    price: "₹599",
    priceNote: "per person (includes meal)",
    guide: "Tai Deshmukh",
    guideExp: "Master cook, 30 yrs",
    phone: "+91 9321098765",
    whatsapp: "919321098765",
    description:
      "Learn the authentic secrets of Junnar's regional cuisine from Tai Deshmukh, a celebrated home cook. Master the art of varan-bhat, zunka-bhakar, pithla, and the famous Narayangaon onion chutney. End with a full sit-down meal you cooked yourself.",
    highlights: ["Varan-bhat & zunka-bhakar", "Spice grinding on stone", "Narayangaon onion specialties", "Full thali lunch"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    badge: "Hands-On",
    badgeColor: "#e05252",
    tags: ["Cooking", "Food", "Culture"],
  },
  {
    id: 7,
    title: "Lenyadri Caves Photography Tour",
    category: "Photography",
    emoji: "📸",
    difficulty: "Easy-Moderate",
    duration: "5 hrs",
    groupSize: "Max 6 pax",
    price: "₹849",
    priceNote: "per person",
    guide: "Amit Kulkarni",
    guideExp: "Landscape photographer, 7 yrs",
    phone: "+91 9210987654",
    whatsapp: "919210987654",
    description:
      "Explore the ancient Buddhist rock-cut cave complex at Lenyadri with a professional photographer as your guide. Learn cave photography with mobile and DSLR, shoot the dramatic monsoon mist across the valley, and capture the sacred Ganesh shrine in golden-hour light.",
    highlights: ["Cave photography techniques", "Mobile & DSLR tips", "Golden hour shoot", "Historical cave carvings"],
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80",
    badge: "Creative",
    badgeColor: "#2980b9",
    tags: ["Photography", "Caves", "Heritage"],
  },
  {
    id: 8,
    title: "Malshej Ghat Monsoon Waterfall Trek",
    category: "Trekking",
    emoji: "⛰️",
    difficulty: "Moderate-Hard",
    duration: "8 hrs",
    groupSize: "Max 12 pax",
    price: "₹1,099",
    priceNote: "per person",
    guide: "Deepak Bhosale",
    guideExp: "15 yrs Sahyadri trekking",
    phone: "+91 9109876543",
    whatsapp: "919109876543",
    description:
      "Chase the waterfalls of Malshej Ghat during the peak monsoon season (July–September). Navigate through misty trails with seasonal waterfalls cascading on all sides. Spot flamingos at the lake viewpoint and experience the raw, green fury of the Western Ghats.",
    highlights: ["Monsoon waterfalls", "Flamingo sightings", "Misty valley views", "Expert Sahyadri guide"],
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    badge: "Monsoon Special",
    badgeColor: "#2980b9",
    tags: ["Waterfall", "Monsoon", "Adventure"],
  },
  {
    id: 9,
    title: "Dairy & Cheese Farm Experience",
    category: "Agritourism",
    emoji: "🐄",
    difficulty: "Easy",
    duration: "3 hrs",
    groupSize: "Max 15 pax",
    price: "₹499",
    priceNote: "per person",
    guide: "Rajan Shinde (Farm Owner)",
    guideExp: "20 yrs dairy farming",
    phone: "+91 9098765432",
    whatsapp: "919098765432",
    description:
      "Visit a working dairy farm on the outskirts of Narayangaon. Learn how to milk a cow, churn butter the traditional way, and make fresh paneer and shrikhand from scratch. Take home your own homemade ghee as a souvenir.",
    highlights: ["Cow milking experience", "Traditional butter churning", "Fresh paneer making", "Take-home ghee"],
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d2d2d?w=800&q=80",
    badge: "Family Friendly",
    badgeColor: "#27ae60",
    tags: ["Dairy", "Farm", "Family"],
  },
];

const CATEGORIES = ["All", "Trekking", "Agritourism", "Village Stay", "Culinary", "Photography"];

const CAT_COLORS = {
  Trekking: "#e05252",
  Agritourism: "#27ae60",
  "Village Stay": "#f5a623",
  Culinary: "#ff6b00",
  Photography: "#2980b9",
};

const DIFF_COLORS = {
  Easy: "#27ae60",
  Leisure: "#27ae60",
  Moderate: "#f5a623",
  "Moderate-Hard": "#e05252",
  "Easy-Moderate": "#f5a623",
  Hard: "#e05252",
};

// ── Enquiry Modal ─────────────────────────────────────────────────────────────
function EnquiryModal({ exp, onClose }) {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent]   = useState(false);

  const handleWhatsApp = () => {
    if (!name.trim()) return;
    const message = encodeURIComponent(
      `Hi! I'm interested in the experience: *${exp.title}*.\n\nName: ${name}\nPhone: ${phone || "Will provide later"}\n\nPlease share availability and booking details. Thank you!`
    );
    window.open(`https://wa.me/${exp.whatsapp}?text=${message}`, "_blank");
    setSent(true);
    setTimeout(onClose, 2000);
  };

  const handleCall = () => {
    window.open(`tel:${exp.phone}`, "_self");
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111", border: "1px solid #2a2a2a", borderRadius: "20px",
          padding: "2rem", width: "100%", maxWidth: "460px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          animation: "expModalIn 0.3s ease",
        }}
      >
        {sent ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3 style={{ color: "#fff", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Enquiry Sent!</h3>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>Redirecting you to WhatsApp…</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
                background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem",
              }}>
                {exp.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.2rem" }}>
                  {exp.title}
                </h3>
                <div style={{ color: "#555", fontSize: "0.8rem" }}>
                  Guide: {exp.guide} · {exp.guideExp}
                </div>
              </div>
              <button onClick={onClose} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1.1rem", padding: 0, flexShrink: 0 }}>✕</button>
            </div>

            {/* Price reminder */}
            <div style={{
              background: "rgba(255,107,0,0.06)", border: "1px solid rgba(255,107,0,0.15)",
              borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.5rem",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: "#888", fontSize: "0.82rem" }}>{exp.duration} · {exp.groupSize}</span>
              <span style={{ color: "#ff6b00", fontWeight: 700, fontSize: "1rem" }}>{exp.price} <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#666" }}>{exp.priceNote}</span></span>
            </div>

            {/* Form */}
            <div style={{ marginBottom: "0.9rem" }}>
              <label style={{ display: "block", color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                Your Name *
              </label>
              <input
                id="enquiry-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Deshmukh"
                style={{
                  width: "100%", padding: "0.7rem 1rem",
                  background: "#0a0a0a", border: "1px solid #2a2a2a",
                  borderRadius: "8px", color: "#fff", fontSize: "0.92rem",
                  boxSizing: "border-box", outline: "none",
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.4rem" }}>
                Your Phone (optional)
              </label>
              <input
                id="enquiry-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                style={{
                  width: "100%", padding: "0.7rem 1rem",
                  background: "#0a0a0a", border: "1px solid #2a2a2a",
                  borderRadius: "8px", color: "#fff", fontSize: "0.92rem",
                  boxSizing: "border-box", outline: "none",
                }}
              />
            </div>

            {/* CTAs */}
            <button
              id="enquiry-whatsapp-btn"
              onClick={handleWhatsApp}
              disabled={!name.trim()}
              style={{
                width: "100%", padding: "0.9rem", marginBottom: "0.6rem",
                background: name.trim() ? "linear-gradient(135deg,#25d366,#128c5e)" : "#1a1a1a",
                border: "none", borderRadius: "10px",
                color: name.trim() ? "#fff" : "#333", fontWeight: 700, fontSize: "0.95rem",
                cursor: name.trim() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                transition: "all 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire on WhatsApp
            </button>
            <button
              id="enquiry-call-btn"
              onClick={handleCall}
              style={{
                width: "100%", padding: "0.75rem",
                background: "transparent", border: "1px solid #2a2a2a",
                borderRadius: "10px", color: "#888", fontWeight: 600, fontSize: "0.9rem",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              }}
            >
              📞 Call Guide Directly ({exp.phone})
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Experience Card ───────────────────────────────────────────────────────────
function ExperienceCard({ exp, index, onEnquire }) {
  const [hovered, setHovered] = useState(false);
  const catColor = CAT_COLORS[exp.category] || "#ff6b00";
  const diffColor = DIFF_COLORS[exp.difficulty] || "#888";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#111", border: `1px solid ${hovered ? catColor + "44" : "#1e1e1e"}`,
        borderRadius: "18px", overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${catColor}22` : "0 4px 20px rgba(0,0,0,0.3)",
        animation: `expCardIn 0.4s ease ${index * 0.06}s both`,
        display: "flex", flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "210px", overflow: "hidden", background: "#0d0d0d" }}>
        <img
          src={exp.image}
          alt={exp.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
        }} />
        {/* Badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          background: exp.badgeColor, color: "#fff",
          padding: "0.2rem 0.7rem", borderRadius: "999px",
          fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em",
        }}>
          {exp.badge}
        </div>
        {/* Category */}
        <div style={{
          position: "absolute", top: "12px", right: "12px",
          background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
          border: `1px solid ${catColor}44`,
          color: catColor, padding: "0.2rem 0.7rem", borderRadius: "999px",
          fontSize: "0.68rem", fontWeight: 700,
        }}>
          {exp.category}
        </div>
        {/* Emoji */}
        <div style={{
          position: "absolute", bottom: "12px", left: "12px",
          fontSize: "2rem", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))",
        }}>
          {exp.emoji}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, lineHeight: 1.35, marginBottom: "0.6rem" }}>
          {exp.title}
        </h3>

        {/* Meta pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.9rem" }}>
          <span style={{ ...metaPill, color: diffColor, borderColor: diffColor + "44", background: diffColor + "11" }}>
            ⚡ {exp.difficulty}
          </span>
          <span style={{ ...metaPill }}>⏱ {exp.duration}</span>
          <span style={{ ...metaPill }}>👥 {exp.groupSize}</span>
        </div>

        <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: "1.65", marginBottom: "1rem", flex: 1 }}>
          {exp.description}
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
          {exp.highlights.map(h => (
            <span key={h} style={{
              fontSize: "0.7rem", color: "#555", background: "#161616",
              border: "1px solid #2a2a2a", borderRadius: "4px", padding: "2px 8px",
            }}>
              ✓ {h}
            </span>
          ))}
        </div>

        {/* Guide info */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.65rem",
          padding: "0.7rem 0.9rem", background: "#0d0d0d",
          border: "1px solid #1e1e1e", borderRadius: "10px", marginBottom: "1rem",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%", flexShrink: 0,
            background: `${catColor}22`, border: `1px solid ${catColor}44`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
          }}>
            🧭
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#ccc", fontSize: "0.82rem", fontWeight: 600 }}>{exp.guide}</div>
            <div style={{ color: "#444", fontSize: "0.72rem" }}>{exp.guideExp}</div>
          </div>
          <div style={{ color: "#ff6b00", fontWeight: 700, fontSize: "1.05rem", textAlign: "right", flexShrink: 0 }}>
            {exp.price}
            <div style={{ color: "#555", fontSize: "0.68rem", fontWeight: 400 }}>{exp.priceNote}</div>
          </div>
        </div>

        {/* CTA */}
        <button
          id={`enquire-btn-${exp.id}`}
          onClick={() => onEnquire(exp)}
          style={{
            width: "100%", padding: "0.85rem",
            background: hovered
              ? `linear-gradient(135deg, ${catColor}, ${catColor}cc)`
              : "transparent",
            border: `1.5px solid ${hovered ? catColor : "#2a2a2a"}`,
            borderRadius: "10px",
            color: hovered ? "#fff" : "#888",
            fontWeight: 700, fontSize: "0.9rem", cursor: "pointer",
            transition: "all 0.25s ease",
          }}
        >
          Enquire Now →
        </button>
      </div>
    </div>
  );
}

const metaPill = {
  fontSize: "0.7rem", padding: "0.2rem 0.65rem",
  borderRadius: "999px", border: "1px solid #2a2a2a",
  background: "#161616", color: "#666",
};

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Experiences() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalExp, setModalExp]             = useState(null);
  const [search, setSearch]                 = useState("");

  const filtered = EXPERIENCES.filter(exp => {
    const matchCat    = activeCategory === "All" || exp.category === activeCategory;
    const matchSearch = !search || exp.title.toLowerCase().includes(search.toLowerCase()) ||
                        exp.description.toLowerCase().includes(search.toLowerCase()) ||
                        exp.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes expCardIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes expModalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        .exp-search:focus { border-color: rgba(255,107,0,0.5) !important; outline: none; }
        .exp-cat-btn { transition: all 0.2s; }
        .exp-cat-btn:hover { opacity: 0.85; transform: translateY(-1px); }
      `}</style>

      {/* ── Hero ── */}
      <div style={{
        textAlign: "center", padding: "4rem 1.5rem 3rem",
        borderBottom: "1px solid #1a1a1a",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,107,0,0.06) 0%, transparent 70%)",
      }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem", animation: "heroFloat 4s ease-in-out infinite" }}>🏕️</div>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "#ff6b00", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Authentic Junnar
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)", letterSpacing: "0.06em", color: "#fff", margin: "0 0 0.75rem", lineHeight: 1 }}>
          LOCAL <span style={{ color: "#ff6b00" }}>EXPERIENCES</span>
        </h1>
        <p style={{ color: "#555", maxWidth: "520px", margin: "0 auto 2rem", fontSize: "0.9rem", lineHeight: "1.7" }}>
          Beyond monuments — connect with Junnar's living culture. Trek with expert guides, stay in village homes, cook authentic Maharashtrian food, and photograph hidden landscapes.
        </p>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "380px", margin: "0 auto" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#444", fontSize: "1rem" }}>🔍</span>
          <input
            className="exp-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiences…"
            style={{
              width: "100%", padding: "0.75rem 1rem 0.75rem 2.6rem",
              background: "#111", border: "1px solid #2a2a2a",
              borderRadius: "999px", color: "#fff", fontSize: "0.88rem",
              boxSizing: "border-box", transition: "border-color 0.2s",
            }}
          />
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {[
            { val: EXPERIENCES.length, label: "Experiences" },
            { val: "100%", label: "Local Guides" },
            { val: "5", label: "Categories" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: "#ff6b00", fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.05em" }}>{s.val}</div>
              <div style={{ color: "#444", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category Filters ── */}
      <div style={{ padding: "1.5rem 1.5rem 0", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat;
          const color    = CAT_COLORS[cat] || "#ff6b00";
          const count    = cat === "All" ? EXPERIENCES.length : EXPERIENCES.filter(e => e.category === cat).length;
          return (
            <button
              key={cat}
              className="exp-cat-btn"
              id={`cat-filter-${cat.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.1rem", borderRadius: "999px",
                border: `1.5px solid ${isActive ? color : "#222"}`,
                background: isActive ? `${color}1a` : "#111",
                color: isActive ? color : "#555",
                fontSize: "0.82rem", fontWeight: isActive ? 700 : 400,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {cat} <span style={{ opacity: 0.5, fontSize: "0.72rem" }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ── */}
      <div style={{ padding: "1.5rem 1.5rem 4rem", maxWidth: "1300px", margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "#333" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <div style={{ color: "#555", fontSize: "1rem" }}>No experiences found. Try a different search.</div>
          </div>
        ) : (
          <>
            <div style={{ color: "#333", fontSize: "0.75rem", marginBottom: "1.2rem" }}>
              {filtered.length} experience{filtered.length !== 1 ? "s" : ""} found
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.2rem",
            }}>
              {filtered.map((exp, i) => (
                <ExperienceCard key={exp.id} exp={exp} index={i} onEnquire={setModalExp} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div style={{
        margin: "0 1.5rem 4rem", maxWidth: "1300px", marginLeft: "auto", marginRight: "auto",
        background: "linear-gradient(135deg, rgba(255,107,0,0.1) 0%, rgba(255,107,0,0.04) 100%)",
        border: "1px solid rgba(255,107,0,0.2)", borderRadius: "20px",
        padding: "2.5rem 2rem", textAlign: "center",
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🤝</div>
        <h2 style={{ color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "0.06em", marginBottom: "0.6rem" }}>
          WANT A CUSTOM EXPERIENCE?
        </h2>
        <p style={{ color: "#555", fontSize: "0.88rem", marginBottom: "1.5rem", maxWidth: "400px", margin: "0 auto 1.5rem" }}>
          Can't find exactly what you're looking for? Contact us to design a bespoke Junnar itinerary.
        </p>
        <a
          href="/contact"
          style={{
            display: "inline-block", padding: "0.85rem 2.5rem",
            background: "linear-gradient(135deg, #ff6b00, #ff8533)",
            borderRadius: "10px", color: "#fff", fontWeight: 700, fontSize: "0.95rem",
            textDecoration: "none", transition: "all 0.2s",
          }}
        >
          Contact Us →
        </a>
      </div>

      {/* ── Modal ── */}
      {modalExp && <EnquiryModal exp={modalExp} onClose={() => setModalExp(null)} />}
    </div>
  );
}
