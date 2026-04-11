import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const statueImages = [
  "/img/shivaji-maharaj-world-first-golden-temple-in-junnar.avif",
  "/img/mla_shard_sonawane_announcing.png",
];

const expData = [
  {
    id: "trekking",
    icon: "🥾",
    label: "Trekking & Hiking",
    title: "Conquer the Sahyadri Peaks",
    body: `Junnar is Maharashtra's trekking heartland. From the historically charged ascent of Shivneri Fort — where Chhatrapati Shivaji Maharaj was born — to the twin-summited challenge of Jivdhan and the sheer walls of Hadsar, every trail here carries centuries of Maratha spirit. The Naneghat trail through the ancient Satavahana trade pass offers remarkable valley panoramas, while Nimgiri and Sindola provide shorter but equally rewarding climbs through dense Sahyadri forest. Most treks are best tackled between October and February when trails are dry and skies are clear.`,
    details: [
      { name: "Shivneri Fort", level: "Easy–Moderate", time: "2–3 hrs", tip: "Start at dawn for the best light and cooler air" },
      { name: "Jivdhan Fort", level: "Difficult", time: "5–6 hrs", tip: "Expert trek with rock patches — carry ropes in monsoon" },
      { name: "Hadsar Fort", level: "Moderate", time: "3–4 hrs", tip: "Superb ridge views over Naneghat valley" },
      { name: "Naneghat Pass", level: "Easy", time: "1.5 hrs", tip: "Read the 2,300-year-old Satavahana inscriptions" },
      { name: "Nimgiri Fort", level: "Moderate", time: "3 hrs", tip: "Less crowded — early birds have it all to themselves" },
    ],
  },
  {
    id: "camping",
    icon: "🏕️",
    label: "Camping",
    title: "Sleep Under Sahyadri Stars",
    body: `Few experiences match waking up to mist rolling over silent Sahyadri ridges after a night beneath a sky blazing with stars. Junnar offers exceptional camping — from the calm backwaters of Dimbhe Dam where the Ghod river widens into a lake surrounded by hills, to the dramatic monsoon cliffs of Malshej Ghat. Several organised campsites near Manikdoh Dam and Pimpalgaon Joge offer tent stays, bonfires, and local dinners. Wild camping is possible for experienced groups — Naneghat plateau and the plateau below Hadsar Fort are popular overnight spots.`,
    details: [
      { name: "Dimbhe Dam", level: "Organised", time: "Overnight", tip: "Book in advance during October–January; boating available" },
      { name: "Malshej Ghat", level: "Organised / Wild", time: "Overnight", tip: "Monsoon season is magical — mist at 5am is unforgettable" },
      { name: "Manikdoh Lake", level: "Organised", time: "Overnight", tip: "Calm waters, great for kayaking and early-morning birdwatching" },
      { name: "Naneghat Plateau", level: "Wild", time: "Overnight", tip: "Carry all supplies — no facilities on the plateau" },
      { name: "Pimpalgaon Joge", level: "Organised", time: "Overnight", tip: "Flamingo sightings in winter; serene dam views at sunrise" },
    ],
  },
];

const timeline = [
  {
    era: "250 BC – 250 AD",
    dynasty: "Satavahana Dynasty",
    title: "Naneghat — The Royal Mountain Gateway",
    body: "Queen Naganika of the Satavahana dynasty commissioned the Naneghat inscription — one of the earliest examples of Brahmi script in Western India. The pass served as a critical toll-gate and trade corridor linking the fertile Deccan plateau to the Konkan coast. Coins, pottery, and inscriptions unearthed at the site reveal a thriving economy 2,300 years ago.",
    icon: "⛩️",
  },
  {
    era: "1st – 3rd Century AD",
    dynasty: "Buddhist Period",
    title: "Lenyadri — Rock-Cut Monasteries in the Hills",
    body: "Buddhist monks carved 30 rock-cut caves into the Lenyadri hills, creating viharas (residences) and chaityas (prayer halls) for a thriving monastic community. Cave 7 was later consecrated as the Girijatmaj Ganesh shrine, blending Buddhist and Hindu traditions in a rare act of spiritual continuity.",
    icon: "🪨",
  },
  {
    era: "1627 AD",
    dynasty: "Maratha Empire",
    title: "Birth of Chhatrapati Shivaji Maharaj at Shivneri Fort",
    body: "In the fortified citadel of Shivneri Fort, Jijabai gave birth to Shivaji on 19 February 1627. Raised on stories of valor and guided by his devoted mother, Shivaji established the Hindavi Swarajya — a sovereign kingdom built on justice, religious tolerance, and military brilliance.",
    icon: "⚔️",
  },
  {
    era: "17th–18th Century",
    dynasty: "Maratha Expansion",
    title: "Forts of Junnar — Guardians of the Deccan",
    body: "During the height of Maratha power, forts like Jivdhan, Hadsar, Chavand, and Sindola formed a defensive arc protecting passes into the Deccan. The region witnessed battles, sieges, and treaties that shaped the fate of the Maratha Empire.",
    icon: "🏰",
  },
  {
    era: "Present Day",
    dynasty: "Maharashtra's Heritage",
    title: "Maharashtra's First Tourist Taluka",
    body: "Junnar has been formally designated as Maharashtra's first Tourist Taluka — a recognition of its extraordinary concentration of heritage, nature, and pilgrimage destinations. Ongoing conservation efforts protect the Buddhist caves, Maratha forts, and Sahyadri biodiversity.",
    icon: "🏅",
  },
];

const gmrtStats = [
  { num: "30", lbl: "Parabolic dish antennas" },
  { num: "45m", lbl: "Diameter of each dish" },
  { num: "25km", lbl: "Maximum baseline (Y-array)" },
  { num: "40+", lbl: "Countries using telescope time" },
  { num: "1995", lbl: "Year commissioned · Khodaj" },
];

const HERO_HIGHLIGHTS = [
  { label: "Shivneri Fort",  sub: "Junnar · Maharashtra",   img: "/img/Shivneri_1.jpg" },
  { label: "Ozar Ganpati",   sub: "Junnar · Ashtavinayaka", img: "/img/ozar_1.jpeg" },
  { label: "Bhimashankar",   sub: "Sahyadri · Wildlife",    img: "/img/bhimashankar-shiva-temple_4.jpg" },
  { label: "Malshej Ghat",   sub: "Junnar · Monsoon",       img: "/img/malshej_1.webp" },
];

const CARD_OFFSETS = [
  { x: 0,  y: 0,   r: 0,   z: 40, scale: 1    },
  { x: 18, y: -12, r: 6,   z: 30, scale: 0.93 },
  { x: 30, y: -22, r: 10,  z: 20, scale: 0.87 },
  { x: 40, y: -30, r: 14,  z: 10, scale: 0.81 },
];

export default function Herosection() {
  const [activeExp, setActiveExp] = useState(0);
  const [statueImg, setStatueImg] = useState(0);
  const [showFullNews, setShowFullNews] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [touchStartX, setTouchStartX] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const navigate = useNavigate();
  const observerRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Statue image carousel
  useEffect(() => {
    const t = setInterval(() => setStatueImg(i => (i + 1) % statueImages.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Stacked card auto-advance
  useEffect(() => {
    const t = setInterval(() => setActiveCard(i => (i + 1) % HERO_HIGHLIGHTS.length), 3000);
    return () => clearInterval(t);
  }, []);

  const attachObserver = () => {
    if (!observerRef.current) return;
    document.querySelectorAll("[data-reveal]").forEach(el => observerRef.current.observe(el));
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisibleItems(prev => new Set([...prev, e.target.dataset.reveal]));
      }),
      { threshold: 0.08 }
    );
    const t = setTimeout(attachObserver, 120);
    return () => { clearTimeout(t); observerRef.current?.disconnect(); };
  }, []);

  useEffect(() => {
    const t = setTimeout(attachObserver, 60);
    return () => clearTimeout(t);
  }, [activeExp]);

  const exp = expData[activeExp];

  const handleTouchStart = e => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = e => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setStatueImg(i => diff > 0
        ? (i + 1) % statueImages.length
        : (i - 1 + statueImages.length) % statueImages.length
      );
    }
    setTouchStartX(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --org: #E8520A;
          --gold: #C9930C;
          --bg: #0A0A0Af7;
          --bg2: #0A0A0Af7;
          --text: #ffffff;
          --muted: #ffffff;
          --border: #000000;
          --org-b: rgba(232,82,10,0.2);
        }

        .hs-page {
          background: var(--bg);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          -webkit-text-size-adjust: 100%;
        }

        .dj-hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 64px 80px;
          overflow: hidden;
        }

        .dj-glow1 {
          position: absolute;
          top: -120px; right: -120px;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,82,10,0.13) 0%, transparent 65%);
          pointer-events: none;
          animation: dj-pulse 6s ease-in-out infinite;
        }
        .dj-glow2 {
          position: absolute;
          bottom: -100px; left: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,147,12,0.07) 0%, transparent 65%);
          pointer-events: none;
          animation: dj-pulse 8s ease-in-out infinite reverse;
        }
        .dj-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(232,82,10,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,82,10,0.04) 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }
        .dj-diag {
          position: absolute;
          top: 0; right: 200px;
          width: 1px; height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(232,82,10,0.18) 30%, rgba(232,82,10,0.18) 70%, transparent);
          pointer-events: none;
          transform: rotate(8deg) scaleY(1.3);
          transform-origin: top center;
        }

        @keyframes dj-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }

        .dj-inner {
          position: relative; z-index: 2;
          max-width: 1100px; width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }

        .dj-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(232,82,10,0.35);
          border-radius: 20px;
          background: rgba(232,82,10,0.08);
          color: var(--org);
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s;
        }
        .dj-badge.vis { opacity: 1; transform: translateY(0); }
        .dj-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--org);
          animation: dj-blink 2s ease-in-out infinite;
        }
        @keyframes dj-blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .dj-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(68px, 10vw, 120px);
          line-height: 0.92;
          letter-spacing: 0.04em;
          color: #fff;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
        }
        .dj-title.vis { opacity: 1; transform: translateY(0); }
        .dj-title-accent { display: block; color: var(--org); -webkit-text-stroke: 2px var(--org); }
        .dj-title-ghost { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.12); }

        .dj-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.5);
          line-height: 1.8;
          max-width: 520px;
          margin-top: 22px;
          margin-bottom: 38px;
          font-weight: 300;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s;
        }
        .dj-sub.vis { opacity: 1; transform: translateY(0); }

        .dj-btns {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 52px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s;
        }
        .dj-btns.vis { opacity: 1; transform: translateY(0); }

        .dj-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; background: var(--org); color: #fff;
          border: none; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
          letter-spacing: 0.5px; cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .dj-btn-primary:hover { background: #ff6b1a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,82,10,0.35); }

        .dj-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; background: transparent;
          color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.15);
          border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 14px;
          cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .dj-btn-secondary:hover { border-color: rgba(232,82,10,0.5); color: #fff; background: rgba(232,82,10,0.07); }

        .dj-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 24px; background: transparent; color: var(--org);
          border: 1px solid rgba(232,82,10,0.4); border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          cursor: pointer; transition: background 0.2s, border-color 0.2s;
          -webkit-tap-highlight-color: transparent;
        }
        .dj-btn-outline:hover { background: rgba(232,82,10,0.1); border-color: var(--org); }

        .dj-stats {
          display: flex; gap: 32px; flex-wrap: wrap;
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s;
        }
        .dj-stats.vis { opacity: 1; transform: translateY(0); }
        .dj-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--org); line-height: 1; letter-spacing: 1px; }
        .dj-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 2px; text-transform: uppercase; margin-top: 3px; }
        .dj-stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.08); align-self: center; }

        /* ── STACKED CARD RIGHT PANEL ── */
        .dj-right {
          position: relative;
          width: 420px;
          height: 500px;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(24px);
          transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s;
        }
        .dj-right.vis { opacity: 1; transform: translateX(0); }

        .dj-place-card {
  position: absolute;
  width: 320px;
  height: 370px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, filter 0.4s ease, opacity 0.4s ease;
  -webkit-tap-highlight-color: transparent;
  padding: 2px;
  background: conic-gradient(from 0deg, #E8520A, #ffA03C, #fff5e0, #E8520A, #ff6b1a, #ffA03C, #E8520A);}
.dj-place-card-inner {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
}
        .dj-place-card img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .dj-place-card-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 40px 14px 14px;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%);
        }
        .dj-place-card-sub {
          font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase;
          color: rgba(255,255,255,0.45); margin-bottom: 4px;
        }
        .dj-place-card-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; color: #fff; letter-spacing: 1px; line-height: 1.15;
        }

        .dj-card-dots {
          position: absolute;
          bottom: -28px; left: 0; right: 0;
          display: flex; justify-content: center; gap: 6px;
        }
        .dj-card-dot {
          height: 5px; border-radius: 3px;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
          -webkit-tap-highlight-color: transparent;
        }
        .dj-card-dot.on { background: #E8520A; }

        .dj-scroll {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: rgba(255,255,255,0.2); font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase;
          opacity: 0; animation: dj-scrollfade 1s ease 1.2s forwards;
        }
        @keyframes dj-scrollfade { to { opacity: 1; } }
        .dj-scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, rgba(232,82,10,0.6), transparent);
          animation: dj-scrollline 1.6s ease-in-out infinite;
        }
        @keyframes dj-scrollline {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        @media (max-width: 900px) {
          .dj-hero { padding: 80px 40px 70px; min-height: auto; }
          .dj-inner { grid-template-columns: 1fr; gap: 48px; }
          .dj-right { margin: 0 auto; }
          .dj-scroll { display: none; }
        }
        @media (max-width: 640px) {
          .dj-hero { padding: 70px 18px 56px; }
          .dj-title { font-size: clamp(56px, 16vw, 80px); }
          .dj-btns { gap: 10px; }
          .dj-btn-primary, .dj-btn-secondary, .dj-btn-outline { padding: 11px 18px; font-size: 13px; }
          .dj-stats { gap: 20px; }
          .dj-stat-num { font-size: 26px; }
        }

        .dj-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(232,82,10,0.25) 30%, rgba(232,82,10,0.25) 70%, transparent);
          margin: 0 64px;
        }
        @media (max-width: 640px) { .dj-divider { margin: 0 18px; } }

        .rv { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .rv.on { opacity: 1; transform: translateY(0); }

        .sec { padding: 80px 64px; }
        .sec-alt { background: var(--bg2); }

        .stag { display: block; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--org); margin-bottom: 14px; }
        .stitle { font-family: 'Playfair Display', serif; font-size: clamp(28px, 5vw, 52px); font-weight: 700; line-height: 1.15; color: var(--text); }
        .stitle em { font-style: italic; color: rgba(240,235,224,0.38); }
        .slead { font-size: 14px; color: var(--muted); line-height: 1.85; max-width: 620px; margin-top: 14px; font-weight: 300; }

        .news-wrap { padding: 60px 64px; }
        .news-head { text-align: center; margin-bottom: 36px; }

        .ncard {
          background: rgba(240,235,224,0.03); border: 1px solid var(--org-b);
          border-radius: 20px; overflow: hidden;
          max-width: 860px; margin: 0 auto;
          display: grid; grid-template-columns: 300px 1fr;
        }
        .nimg { position: relative; overflow: hidden; min-height: 280px; background: #0d0d0d; user-select: none; touch-action: pan-y; }
        .nimg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.7s ease; }
        .nimg img.off { opacity: 0; pointer-events: none; }
        .nimg img.on  { opacity: 1; }
        .narr { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.55); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 16px; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; transition: background 0.2s; -webkit-tap-highlight-color: transparent; }
        .narr:hover { background: rgba(232,82,10,0.75); }
        .narr-l { left: 10px; }
        .narr-r { right: 10px; }
        .ndots { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 5; }
        .ndot { height: 6px; width: 6px; border-radius: 3px; background: rgba(255,255,255,0.3); cursor: pointer; transition: background 0.3s, width 0.3s; -webkit-tap-highlight-color: transparent; }
        .ndot.on { background: var(--org); width: 18px; }
        .nbody { padding: 26px 24px; display: flex; flex-direction: column; justify-content: space-between; gap: 14px; }
        .nlabel { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--org); margin-bottom: 8px; }
        .nhead { font-family: 'Playfair Display', serif; font-size: clamp(15px, 2.2vw, 20px); font-weight: 700; line-height: 1.4; color: var(--text); margin-bottom: 10px; }
        .ntext { font-size: 13px; color: var(--muted); line-height: 1.8; }
        .ntext.clamp { display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
        .nmore { background: none; border: 1px solid rgba(232,82,10,0.4); color: var(--org); padding: 9px 18px; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; width: fit-content; transition: all 0.2s; -webkit-tap-highlight-color: transparent; flex-shrink: 0; }
        .nmore:hover { background: rgba(232,82,10,0.1); border-color: var(--org); }

        .tl { position: relative; margin-top: 60px; padding-left: 30px; }
        .tl::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, var(--org) 8%, var(--org) 92%, transparent); }
        .ti { position: relative; padding: 0 0 48px 38px; }
        .ti:last-child { padding-bottom: 0; }
        .tdot { position: absolute; left: -6px; top: 8px; width: 12px; height: 12px; border-radius: 50%; background: var(--org); border: 2px solid var(--bg); box-shadow: 0 0 0 4px rgba(232,82,10,0.15); }
        .ticon { font-size: 24px; margin-bottom: 10px; }
        .tera { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--org); margin-bottom: 4px; }
        .tdyn { font-size: 10px; color: rgba(240,235,224,0.28); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .ttitle { font-family: 'Playfair Display', serif; font-size: clamp(16px, 2.8vw, 21px); color: var(--text); font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
        .tbody { font-size: 13px; color: var(--muted); line-height: 1.85; font-weight: 300; max-width: 600px; }

        .gmrt-card { margin-top: 48px; border-radius: 20px; overflow: hidden; background: linear-gradient(135deg, rgba(232,82,10,0.07), rgba(201,147,12,0.04)); border: 1px solid var(--org-b); display: grid; grid-template-columns: 1fr 1fr; }
        .gl { padding: 40px 34px; }
        .gr { padding: 40px 34px; background: rgba(0,0,0,0.25); border-left: 1px solid rgba(232,82,10,0.1); }
        .gtag { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
        .gtitle { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 25px); font-weight: 700; color: var(--text); margin-bottom: 14px; line-height: 1.3; }
        .gsub { font-size: 13px; color: var(--muted); line-height: 1.8; }
        .gstats { display: flex; flex-direction: column; gap: 18px; }
        .gstat { border-left: 2px solid rgba(232,82,10,0.4); padding-left: 14px; }
        .gnum { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--text); line-height: 1; letter-spacing: 1px; }
        .glbl { font-size: 11px; color: var(--muted); letter-spacing: 1px; margin-top: 2px; }

        .etabs { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 38px; }
        .etab { background: rgba(240,235,224,0.04); border: 1px solid rgba(240,235,224,0.1); padding: 11px 16px; border-radius: 8px; font-size: 13px; color: var(--muted); cursor: pointer; transition: all 0.25s; display: flex; align-items: center; gap: 8px; -webkit-tap-highlight-color: transparent; }
        .etab:hover { background: rgba(232,82,10,0.08); border-color: rgba(232,82,10,0.3); color: var(--text); }
        .etab.on { background: rgba(232,82,10,0.14); border-color: rgba(232,82,10,0.5); color: var(--text); }
        .ebody { margin-top: 34px; display: grid; grid-template-columns: 1fr 1.1fr; gap: 44px; align-items: start; }
        .etitle { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 24px); font-weight: 700; color: var(--text); margin-bottom: 14px; }
        .etext { font-size: 14px; color: var(--muted); line-height: 1.85; font-weight: 300; }
        .ecards { display: flex; flex-direction: column; gap: 12px; }
        .ecard { background: rgba(240,235,224,0.03); border: 1px solid rgba(240,235,224,0.07); border-radius: 12px; padding: 15px 16px; transition: border-color 0.25s, background 0.25s; }
        .ecard:hover { border-color: rgba(232,82,10,0.3); background: rgba(232,82,10,0.05); }
        .etop { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 5px; flex-wrap: wrap; }
        .ename { font-size: 14px; font-weight: 500; color: var(--text); }
        .elevel { font-size: 10px; letter-spacing: 1px; color: var(--org); background: rgba(232,82,10,0.12); padding: 3px 9px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
        .etime { font-size: 11px; color: rgba(240,235,224,0.3); margin-bottom: 5px; letter-spacing: 1px; }
        .etip { font-size: 12px; color: var(--muted); line-height: 1.6; font-style: italic; }

        @media (max-width: 900px) {
          .sec { padding: 70px 40px; }
          .news-wrap { padding: 50px 40px; }
          .gmrt-card { grid-template-columns: 1fr; }
          .gl { padding: 30px 26px 20px; }
          .gr { padding: 20px 26px 30px; border-left: none; border-top: 1px solid rgba(232,82,10,0.1); }
          .gstats { flex-direction: row; flex-wrap: wrap; gap: 14px; }
          .gstat { min-width: 110px; }
        }
        @media (max-width: 640px) {
          .sec { padding: 56px 18px; }
          .news-wrap { padding: 44px 18px; }
          .ncard { grid-template-columns: 1fr; }
          .nimg { min-height: 210px; }
          .nbody { padding: 20px 16px; gap: 12px; }
          .nhead { font-size: 16px; }
          .ntext { font-size: 12px; }
          .nmore { font-size: 10px; padding: 8px 14px; }
          .tl { padding-left: 20px; }
          .ti { padding: 0 0 38px 26px; }
          .tdot { left: -5px; width: 10px; height: 10px; }
          .ticon { font-size: 20px; }
          .ttitle { font-size: 16px; }
          .tbody { font-size: 13px; }
          .gmrt-card { grid-template-columns: 1fr; }
          .gstats { flex-direction: row; flex-wrap: wrap; gap: 12px; }
          .gstat { min-width: 100px; }
          .gnum { font-size: 26px; }
          .etabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .etabs::-webkit-scrollbar { display: none; }
          .etab { flex-shrink: 0; font-size: 12px; padding: 9px 13px; }
          .ebody { grid-template-columns: 1fr; gap: 24px; }
          .etext { font-size: 13px; }
          .ecard { padding: 13px 14px; }
          .ename { font-size: 13px; }
        }
        @media (max-width: 400px) {
          .sec { padding: 44px 14px; }
          .news-wrap { padding: 36px 14px; }
          .stitle { font-size: clamp(24px, 8vw, 32px); }
          .slead { font-size: 13px; }
          .nimg { min-height: 190px; }
          .nhead { font-size: 15px; }
          .ttitle { font-size: 15px; }
          .tbody { font-size: 12px; }
          .gnum { font-size: 24px; }
          .gstat { min-width: 88px; }
          .etitle { font-size: 18px; }
        }
          /* ── FOOTER ── */
.ft { position: relative; margin-top: 0; }
.ft-img {
  width: 100%; height: 280px; object-fit: cover; object-position: center 40%;
  display: block; filter: brightness(0.7);
}
.ft-img-wrap {
  position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
}
.ft-body {
  background: #080808;
  border-top: 1px solid rgba(232,82,10,0.15);
  padding: 48px 64px 28px;
}
.ft-grid {
  max-width: 1100px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px; margin-bottom: 40px;
}
.ft-brand-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px; color: #fff; letter-spacing: 3px;
}
.ft-brand-name span { color: #E8520A; }
.ft-brand-sub { font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 6px; line-height: 1.7; max-width: 240px; }
.ft-col-title { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #E8520A; margin-bottom: 16px; font-weight: 600; }
.ft-links { display: flex; flex-direction: column; gap: 10px; }
.ft-link { font-size: 13px; color: rgba(255,255,255,0.4); cursor: pointer; transition: color 0.2s; text-decoration: none; }
.ft-link:hover { color: #fff; }
.ft-bottom {
  max-width: 1100px; margin: 0 auto;
  border-top: 1px solid rgba(255,255,255,0.06);
  padding-top: 20px;
  display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
}
.ft-copy { font-size: 11px; color: rgba(255,255,255,0.2); letter-spacing: 1px; }
.ft-copy span { color: #E8520A; }
.ft-bottom-links { display: flex; gap: 20px; }
.ft-bottom-link { font-size: 11px; color: rgba(255,255,255,0.2); cursor: pointer; transition: color 0.2s; }
.ft-bottom-link:hover { color: rgba(255,255,255,0.5); }
@media (max-width: 900px) {
  .ft-grid { grid-template-columns: 1fr 1fr; }
  .ft-body { padding: 40px 40px 24px; }
}
@media (max-width: 640px) {
  .ft-grid { grid-template-columns: 1fr; gap: 28px; }
  .ft-body { padding: 32px 18px 20px; }
  .ft-img { height: 200px; }
  .ft-bottom { flex-direction: column; align-items: flex-start; }
}
      `}</style>

      <div className="hs-page">

        <section className="dj-hero">
          <div className="dj-glow1" />
          <div className="dj-glow2" />
          <div className="dj-grid" />
          <div className="dj-diag" />

          <div className="dj-inner">
            {/* Left: Title + Buttons + Stats */}
            <div className="dj-left">
              <div className={`dj-badge${heroVisible ? " vis" : ""}`}>
                <span className="dj-badge-dot" />
                Maharashtra's First Tourist Taluka
              </div>

              <div className={`dj-title${heroVisible ? " vis" : ""}`}>
                <span>DISCOVER</span>
                <span className="dj-title-accent">JUNNAR</span>
                <span className="dj-title-ghost">SAHYADRI</span>
              </div>

              <p className={`dj-sub${heroVisible ? " vis" : ""}`}>
                Where forts touch the sky, caves echo with history, and the Sahyadri
                wilderness stretches to the horizon — 100 km from Pune, a world apart.
              </p>

              <div className={`dj-btns${heroVisible ? " vis" : ""}`}>
                <button className="dj-btn-primary" onClick={() => navigate("/places")}>
                  Explore Places →
                </button>
                <button className="dj-btn-secondary" onClick={() => navigate("/map")}>
                  🗺️ View Map
                </button>
                <button className="dj-btn-outline" onClick={() => navigate("/tips")}>
                  Plan Your Trip
                </button>
              </div>

              <div className={`dj-stats${heroVisible ? " vis" : ""}`}>
                <div className="dj-stat-item">
                  <div className="dj-stat-num">20+</div>
                  <div className="dj-stat-lbl">Tourist Places</div>
                </div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item">
                  <div className="dj-stat-num">2</div>
                  <div className="dj-stat-lbl">Ashtavinayaka Temples</div>
                </div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item">
                  <div className="dj-stat-num">2000+</div>
                  <div className="dj-stat-lbl">Years of History</div>
                </div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item">
                  <div className="dj-stat-num">1st</div>
                  <div className="dj-stat-lbl">Tourist Taluka in MH</div>
                </div>
              </div>
            </div>

            {/* Right: Stacked image cards */}
            <div className={`dj-right${heroVisible ? " vis" : ""}`}>
              {HERO_HIGHLIGHTS.map((h, i) => {
                const pos = (i - activeCard + HERO_HIGHLIGHTS.length) % HERO_HIGHLIGHTS.length;
                const slot = CARD_OFFSETS[pos] ?? { x: 50, y: -38, r: 18, z: 0, scale: 0.76 };
                return (
  <div
    key={h.label}
    className="dj-place-card"
    style={{
      transform: `translateX(${slot.x}px) translateY(${slot.y}px) rotate(${slot.r}deg) scale(${slot.scale})`,
      zIndex: slot.z,
      opacity: pos === 0 ? 1 : 0,
      pointerEvents: pos === 0 ? 'auto' : 'none',
      background: pos === 0
        ? 'linear-gradient(135deg, #E8520A, #ffA03C, rgba(232,82,10,0.3))'
        : 'linear-gradient(135deg, rgba(232,82,10,0.3), rgba(255,160,60,0.15))',
    }}
    onClick={() => setActiveCard(i)}
  >
    <div className="dj-place-card-inner">
      <img src={h.img} alt={h.label} />
      <div className="dj-place-card-label">
        <div className="dj-place-card-sub">{h.sub}</div>
        <div className="dj-place-card-name">{h.label}</div>
      </div>
    
    </div>
  </div>
);
              })}

              {/* Dots */}
              <div className="dj-card-dots">
                {HERO_HIGHLIGHTS.map((_, i) => (
                  <div
                    key={i}
                    className={`dj-card-dot${activeCard === i ? " on" : ""}`}
                    style={{ width: activeCard === i ? 18 : 5 }}
                    onClick={() => setActiveCard(i)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="dj-scroll">
            <div className="dj-scroll-line" />
            scroll
          </div>
        </section>
        

        <div className="dj-divider" />

        {/* ── STATUE ANNOUNCEMENT ── */}
        <div className="news-wrap">
          <div className="news-head">
            <span className="stag" style={{ display: "inline-block" }}>Latest Announcement</span>
            <h2 className="stitle">
              World's Tallest Shivaji Maharaj<br /><em>Statue Coming to Junnar</em>
            </h2>
          </div>

          <div className="ncard">
            <div className="nimg" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {statueImages.map((src, i) => (
                <img key={i} src={src} alt={`Shivaji statue rendering ${i + 1}`} className={statueImg === i ? "on" : "off"} />
              ))}
              <button className="narr narr-l" onClick={() => setStatueImg(i => (i - 1 + statueImages.length) % statueImages.length)} aria-label="Previous">‹</button>
              <button className="narr narr-r" onClick={() => setStatueImg(i => (i + 1) % statueImages.length)} aria-label="Next">›</button>
              <div className="ndots">
                {statueImages.map((_, i) => (
                  <div key={i} className={`ndot${statueImg === i ? " on" : ""}`} onClick={() => setStatueImg(i)} />
                ))}
              </div>
            </div>

            <div className="nbody">
              <div>
                <div className="nlabel">🏛 Junnar · Heritage Announcement</div>
                <div className="nhead">
                  Tallest Chhatrapati Shivaji Maharaj Statue to Rise at Junnar — the Land of His Birth
                </div>
                <div className={`ntext${showFullNews ? "" : " clamp"}`}>
                  Former MLA and Shiv Sena District Chief Sharad Sonawane announced at a Pune press
                  conference that the world's tallest statue of Chhatrapati Shivaji Maharaj will be
                  erected at Junnar — the sacred Shivjanmabhoomi of the great Maratha king who gave
                  Hindavi Swarajya to Maharashtra and all of India.
                  {showFullNews && (
                    <>
                      {" "}Inspired by the Statue of Unity on the banks of the Narmada in Gujarat,
                      this statue will be equally grand and monumental. Twenty-five acres of land in
                      Junnar taluka have been identified and purchased for the project.
                      <br /><br />
                      The statue will depict Shivaji Maharaj holding a sword, cast in bronze, and
                      sculpted by a senior sculptor with experience at the prestigious J.J. School of
                      Arts, Mumbai. Sonawane stated that this statue will command the attention of the
                      entire world. He also announced that three more proud declarations — of which
                      the nation and state will feel immense pride — will be made on 29th September.
                    </>
                  )}
                </div>
              </div>
              <button className="nmore" onClick={() => setShowFullNews(v => !v)}>
                {showFullNews ? "Show Less ↑" : "Read More →"}
              </button>
            </div>
          </div>
        </div>

        {/* ── HISTORY TIMELINE ── */}
        <section className="sec sec-alt" id="history">
          <span className="stag">Through the Ages</span>
          <h2 className="stitle">2,000 Years of<br /><em>Living History</em></h2>
          <p className="slead">
            From Satavahana trade routes to Buddhist monasteries, from Maratha battlefields to
            modern heritage tourism — Junnar has witnessed some of India's most consequential chapters.
          </p>
          <div className="tl">
            {timeline.map((item, i) => (
              <div key={i} className={`ti rv${visibleItems.has(`t${i}`) ? " on" : ""}`} data-reveal={`t${i}`}>
                <div className="tdot" />
                <div className="ticon">{item.icon}</div>
                <div className="tera">{item.era}</div>
                <div className="tdyn">{item.dynasty}</div>
                <div className="ttitle">{item.title}</div>
                <div className="tbody">{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GMRT KHODAJ ── */}
        <section className="sec" id="gmrt">
          <span className="stag">Science Meets Sahyadri</span>
          <h2 className="stitle">GMRT Khodaj —<br /><em>Ears to the Universe</em></h2>
          <p className="slead">
            Hidden in the quiet hills of Junnar taluka, one of the world's most powerful radio
            telescope arrays listens to the faintest whispers from across the cosmos.
          </p>
          <div className={`gmrt-card rv${visibleItems.has("gmrt") ? " on" : ""}`} data-reveal="gmrt">
            <div className="gl">
              <div className="gtag">📡 World-Class Research Facility</div>
              <div className="gtitle">Giant Metrewave Radio Telescope</div>
              <div className="gsub">
                The Giant Metrewave Radio Telescope (GMRT) — operated by the National Centre for
                Radio Astrophysics (NCRA–TIFR) — is located near the village of Khodaj, just outside
                Junnar. It is one of the most sensitive radio telescope arrays in the world at metre
                wavelengths.
                <br /><br />
                Spread across a Y-shaped baseline of 25 km, GMRT's 30 fully steerable parabolic
                dishes (each 45 m in diameter) peer into deep space to study pulsars, galaxies,
                hydrogen in the early universe, and gravitational waves. Scientists from over 40
                countries use GMRT telescope time each year.
                <br /><br />
                Visitors can observe the array from the access road near Khodaj village. Guided
                educational visits for schools and colleges are arranged by NCRA–TIFR on request.
              </div>
            </div>
            <div className="gr">
              <div className="gstats">
                {gmrtStats.map((s, i) => (
                  <div className="gstat" key={i}>
                    <div className="gnum">{s.num}</div>
                    <div className="glbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TREKKING & CAMPING ── */}
        <section className="sec sec-alt" id="adventures">
          <span className="stag">Outdoor Adventures</span>
          <h2 className="stitle">Trekking, Hiking<br /><em>& Camping</em></h2>
          <p className="slead">
            The Sahyadri ranges around Junnar offer outdoor experiences for every level — from
            sunrise fort trails to star-lit riverside camping.
          </p>
          <div className="etabs">
            {expData.map((e, i) => (
              <div key={e.id} className={`etab${activeExp === i ? " on" : ""}`} onClick={() => setActiveExp(i)}>
                <span style={{ fontSize: 16 }}>{e.icon}</span>{e.label}
              </div>
            ))}
          </div>
          <div className="ebody">
            <div>
              <div className="etitle">{exp.title}</div>
              <div className="etext">{exp.body}</div>
            </div>
            <div className="ecards">
              {exp.details.map((d, i) => (
                <div
                  key={`${exp.id}-${i}`}
                  className={`ecard rv${visibleItems.has(`exp${activeExp}${i}`) ? " on" : ""}`}
                  data-reveal={`exp${activeExp}${i}`}
                >
                  <div className="etop">
                    <div className="ename">{d.name}</div>
                    <div className="elevel">{d.level}</div>
                  </div>
                  <div className="etime">⏱ {d.time}</div>
                  <div className="etip">💡 {d.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      {/* ── FOOTER ── */}
<footer className="ft">
<div className="ft-mountain">
  <svg viewBox="0 0 1440 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    {/* Background mountains - light grey */}
    <path d="M0,180 L0,120 L60,80 L120,100 L200,50 L280,90 L340,30 L420,75 L500,20 L580,70 L640,15 L720,60 L800,25 L880,70 L940,35 L1020,75 L1080,40 L1160,80 L1220,35 L1300,70 L1360,45 L1440,75 L1440,180 Z" fill="#2a3a4a" opacity="0.6"/>
    {/* Mid mountains - medium */}
    <path d="M0,180 L0,135 L80,100 L150,120 L220,85 L300,115 L360,75 L440,110 L520,80 L600,115 L660,70 L740,105 L820,85 L900,120 L960,90 L1040,118 L1110,88 L1180,115 L1250,85 L1330,112 L1440,95 L1440,180 Z" fill="#1a2a3a" opacity="0.8"/>
    {/* Dark foreground silhouette with trees */}
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
    </>
  );
}