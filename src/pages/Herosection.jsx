import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";

const statueImages = [
  "/img/shivaji-maharaj-world-first-golden-temple-in-junnar.avif",
  "/img/mla_shard_sonawane_announcing.png",
];

const expData = [
  {
    id: "trekking",
    icon: "",
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
    icon: "",
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
  { era: "250 BC – 250 AD", dynasty: "Satavahana Dynasty", title: "Naneghat — The Royal Mountain Gateway", body: "Queen Naganika of the Satavahana dynasty commissioned the Naneghat inscription — one of the earliest examples of Brahmi script in Western India. The pass served as a critical toll-gate and trade corridor linking the fertile Deccan plateau to the Konkan coast. Coins, pottery, and inscriptions unearthed at the site reveal a thriving economy 2,300 years ago.", icon: "" },
  { era: "1st – 3rd Century AD", dynasty: "Buddhist Period", title: "Lenyadri — Rock-Cut Monasteries in the Hills", body: "Buddhist monks carved 30 rock-cut caves into the Lenyadri hills, creating viharas (residences) and chaityas (prayer halls) for a thriving monastic community. Cave 7 was later consecrated as the Girijatmaj Ganesh shrine, blending Buddhist and Hindu traditions in a rare act of spiritual continuity.", icon: "" },
  { era: "1627 AD", dynasty: "Maratha Empire", title: "Birth of Chhatrapati Shivaji Maharaj at Shivneri Fort", body: "In the fortified citadel of Shivneri Fort, Jijabai gave birth to Shivaji on 19 February 1627. Raised on stories of valor and guided by his devoted mother, Shivaji established the Hindavi Swarajya — a sovereign kingdom built on justice, religious tolerance, and military brilliance.", icon: "" },
  { era: "17th–18th Century", dynasty: "Maratha Expansion", title: "Forts of Junnar — Guardians of the Deccan", body: "During the height of Maratha power, forts like Jivdhan, Hadsar, Chavand, and Sindola formed a defensive arc protecting passes into the Deccan. The region witnessed battles, sieges, and treaties that shaped the fate of the Maratha Empire.", icon: "" },
  { era: "Present Day", dynasty: "Maharashtra's Heritage", title: "Maharashtra's First Tourist Taluka", body: "Junnar has been formally designated as Maharashtra's first Tourist Taluka — a recognition of its extraordinary concentration of heritage, nature, and pilgrimage destinations. Ongoing conservation efforts protect the Buddhist caves, Maratha forts, and Sahyadri biodiversity.", icon: "" },
];

const gmrtStats = [
  { num: "30", lbl: "Parabolic dish antennas" },
  { num: "45m", lbl: "Diameter of each dish" },
  { num: "25km", lbl: "Maximum baseline (Y-array)" },
  { num: "40+", lbl: "Countries using telescope time" },
  { num: "1995", lbl: "Year commissioned · Khodaj" },
];

export default function Herosection() {
  const [activeExp, setActiveExp] = useState(0);
  const [statueImg, setStatueImg] = useState(0);
  const [showFullNews, setShowFullNews] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [touchStartX, setTouchStartX] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);
  useEffect(() => { const t = setInterval(() => setStatueImg(i => (i + 1) % statueImages.length), 3500); return () => clearInterval(t); }, []);

  const attachObserver = () => {
    if (!observerRef.current) return;
    document.querySelectorAll("[data-reveal]").forEach(el => observerRef.current.observe(el));
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisibleItems(prev => new Set([...prev, e.target.dataset.reveal])); }),
      { threshold: 0.08 }
    );
    const t = setTimeout(attachObserver, 120);
    return () => { clearTimeout(t); observerRef.current?.disconnect(); };
  }, []);

  useEffect(() => { const t = setTimeout(attachObserver, 60); return () => clearTimeout(t); }, [activeExp]);

  const exp = expData[activeExp];
  const handleTouchStart = e => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = e => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) setStatueImg(i => diff > 0 ? (i + 1) % statueImages.length : (i - 1 + statueImages.length) % statueImages.length);
    setTouchStartX(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&family=Bebas+Neue&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --org: #E8520A; --gold: #C9930C; --bg: transparent; --bg2: #0A0A0Af7;
          --text: #ffffff; --muted: #ffffff; --border: #000000; --org-b: rgba(232,82,10,0.2);
        }
        .hs-page { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; -webkit-text-size-adjust: 100%; }

        /* ── HERO ── */
        .dj-hero {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 100px 64px 80px;
          overflow: visible;
        }
        .dj-glow1 { position: absolute; top: -120px; right: -120px; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(232,82,10,0.13) 0%, transparent 65%); pointer-events: none; animation: dj-pulse 6s ease-in-out infinite; }
        .dj-glow2 { position: absolute; bottom: -100px; left: -100px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(201,147,12,0.07) 0%, transparent 65%); pointer-events: none; animation: dj-pulse 8s ease-in-out infinite reverse; }
        .dj-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(232,82,10,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,82,10,0.04) 1px, transparent 1px); background-size: 80px 80px; pointer-events: none; }
        .dj-diag { position: absolute; top: 0; right: 200px; width: 1px; height: 100%; background: linear-gradient(to bottom, transparent, rgba(232,82,10,0.18) 30%, rgba(232,82,10,0.18) 70%, transparent); pointer-events: none; transform: rotate(8deg) scaleY(1.3); transform-origin: top center; }
        @keyframes dj-pulse { 0%, 100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }

        /* ── INNER GRID: 50/50 ── */
        .dj-inner {
          position: relative; z-index: 2;
          max-width: 1200px; width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        /* ── LEFT ── */
        .dj-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid rgba(232,82,10,0.35); border-radius: 20px; background: rgba(232,82,10,0.08); color: var(--org); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 24px; opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s; }
        .dj-badge.vis { opacity: 1; transform: translateY(0); }
        .dj-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--org); animation: dj-blink 2s ease-in-out infinite; }
        @keyframes dj-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .dj-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px, 8vw, 110px); line-height: 0.92; letter-spacing: 0.04em; color: #fff; margin-bottom: 8px; opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s; }
        .dj-title.vis { opacity: 1; transform: translateY(0); }
        .dj-title-accent { display: block; color: var(--org); -webkit-text-stroke: 2px var(--org); }
        .dj-title-ghost { display: block; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.12); }

        .dj-sub { font-size: 14px; color: rgba(255,255,255,0.5); line-height: 1.8; max-width: 480px; margin-top: 18px; margin-bottom: 28px; font-weight: 300; opacity: 0; transform: translateY(18px); transition: opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s; }
        .dj-sub.vis { opacity: 1; transform: translateY(0); }

        .dj-btns { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 36px; opacity: 0; transform: translateY(18px); transition: opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s; }
        .dj-btns.vis { opacity: 1; transform: translateY(0); }

        .dj-btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; background: var(--org); color: #fff; border: none; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; cursor: pointer; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
        .dj-btn-primary:hover { background: #ff6b1a; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,82,10,0.35); }
        .dj-btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
        .dj-btn-secondary:hover { border-color: rgba(232,82,10,0.5); color: #fff; background: rgba(232,82,10,0.07); }
        .dj-btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 12px 18px; background: transparent; color: var(--org); border: 1px solid rgba(232,82,10,0.4); border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 13px; cursor: pointer; transition: background 0.2s, border-color 0.2s; white-space: nowrap; -webkit-tap-highlight-color: transparent; }
        .dj-btn-outline:hover { background: rgba(232,82,10,0.1); border-color: var(--org); }

        .dj-stats { display: flex; gap: 24px; flex-wrap: wrap; opacity: 0; transform: translateY(14px); transition: opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s; }
        .dj-stats.vis { opacity: 1; transform: translateY(0); }
        .dj-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--org); line-height: 1; letter-spacing: 1px; }
        .dj-stat-lbl { font-size: 9px; color: rgba(255,255,255,0.3); letter-spacing: 2px; text-transform: uppercase; margin-top: 3px; }
        .dj-stat-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.08); align-self: center; }

        /* ── RIGHT ── */
        .dj-right { opacity: 0; transform: translateX(24px); transition: opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s; }
        .dj-right.vis { opacity: 1; transform: translateX(0); }
        .dj-carousel-box {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 24px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.35) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: inset 0 0 60px rgba(0,0,0,0.4), 0 8px 40px rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          padding: 0 50px;
        }

        /* ── SCROLL ── */
        .dj-scroll { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; color: rgba(255,255,255,0.2); font-size: 10px; letter-spacing: 3px; text-transform: uppercase; opacity: 0; animation: dj-scrollfade 1s ease 1.2s forwards; }
        @keyframes dj-scrollfade { to { opacity: 1; } }
        .dj-scroll-line { width: 1px; height: 32px; background: linear-gradient(to bottom, rgba(232,82,10,0.6), transparent); animation: dj-scrollline 1.6s ease-in-out infinite; }
        @keyframes dj-scrollline { 0% { transform: scaleY(0); transform-origin: top; } 50% { transform: scaleY(1); transform-origin: top; } 51% { transform: scaleY(1); transform-origin: bottom; } 100% { transform: scaleY(0); transform-origin: bottom; } }

        /* ── DIVIDER ── */
        .dj-divider { height: 1px; background: linear-gradient(to right, transparent, rgba(232,82,10,0.25) 30%, rgba(232,82,10,0.25) 70%, transparent); margin: 0 64px; }

        /* ── SECTIONS ── */
        .rv { opacity: 0; transform: translateY(22px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .rv.on { opacity: 1; transform: translateY(0); }
        .sec { padding: 80px 64px; }
        .sec-alt { background: var(--bg2); }
        .stag { display: block; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; color: var(--org); margin-bottom: 14px; }
        .stitle { font-family: 'Playfair Display', serif; font-size: clamp(28px, 5vw, 52px); font-weight: 700; line-height: 1.15; color: var(--text); }
        .stitle em { font-style: italic; color: rgba(240,235,224,0.38); }
        .slead { font-size: 14px; color: var(--muted); line-height: 1.85; max-width: 620px; margin-top: 14px; font-weight: 300; }

        /* ── NEWS ── */
        .news-wrap { padding: 60px 64px; }
        .news-head { text-align: center; margin-bottom: 36px; }
        .ncard { background: rgba(240,235,224,0.03); border: 1px solid var(--org-b); border-radius: 20px; overflow: hidden; max-width: 860px; margin: 0 auto; display: grid; grid-template-columns: 300px 1fr; }
        .nimg { position: relative; overflow: hidden; min-height: 280px; background: #0d0d0d; user-select: none; touch-action: pan-y; }
        .nimg img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.7s ease; }
        .nimg img.off { opacity: 0; pointer-events: none; } .nimg img.on { opacity: 1; }
        .narr { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.55); border: none; color: #fff; width: 32px; height: 32px; border-radius: 50%; font-size: 16px; cursor: pointer; z-index: 5; display: flex; align-items: center; justify-content: center; transition: background 0.2s; -webkit-tap-highlight-color: transparent; }
        .narr:hover { background: rgba(232,82,10,0.75); } .narr-l { left: 10px; } .narr-r { right: 10px; }
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

        /* ── TIMELINE ── */
        .tl { position: relative; margin-top: 60px; padding-left: 30px; }
        .tl::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, var(--org) 8%, var(--org) 92%, transparent); }
        .ti { position: relative; padding: 0 0 48px 38px; } .ti:last-child { padding-bottom: 0; }
        .tdot { position: absolute; left: -6px; top: 8px; width: 12px; height: 12px; border-radius: 50%; background: var(--org); border: 2px solid #0a0a0a; box-shadow: 0 0 0 4px rgba(232,82,10,0.15); }
        .ticon { font-size: 24px; margin-bottom: 10px; } .tera { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--org); margin-bottom: 4px; }
        .tdyn { font-size: 10px; color: rgba(240,235,224,0.28); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }
        .ttitle { font-family: 'Playfair Display', serif; font-size: clamp(16px, 2.8vw, 21px); color: var(--text); font-weight: 700; margin-bottom: 10px; line-height: 1.3; }
        .tbody { font-size: 13px; color: var(--muted); line-height: 1.85; font-weight: 300; max-width: 600px; }

        /* ── GMRT ── */
        .gmrt-card { margin-top: 48px; border-radius: 20px; overflow: hidden; background: linear-gradient(135deg, rgba(232,82,10,0.07), rgba(201,147,12,0.04)); border: 1px solid var(--org-b); display: grid; grid-template-columns: 1fr 1fr; }
        .gl { padding: 40px 34px; } .gr { padding: 40px 34px; background: rgba(0,0,0,0.25); border-left: 1px solid rgba(232,82,10,0.1); }
        .gtag { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
        .gtitle { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 25px); font-weight: 700; color: var(--text); margin-bottom: 14px; line-height: 1.3; }
        .gsub { font-size: 13px; color: var(--muted); line-height: 1.8; }
        .gstats { display: flex; flex-direction: column; gap: 18px; }
        .gstat { border-left: 2px solid rgba(232,82,10,0.4); padding-left: 14px; }
        .gnum { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--text); line-height: 1; letter-spacing: 1px; }
        .glbl { font-size: 11px; color: var(--muted); letter-spacing: 1px; margin-top: 2px; }

        /* ── EXPERIENCES ── */
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

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .dj-hero { padding: 100px 40px 80px; }
          .dj-carousel-box { height: 420px; padding: 0 40px; }
        }
        @media (max-width: 900px) {
          .dj-hero { padding: 90px 32px 70px; min-height: auto; }
          .dj-inner { grid-template-columns: 1fr; gap: 40px; }
          .dj-right { width: 100%; }
          .dj-carousel-box { height: 380px; padding: 0 40px; }
          .dj-scroll { display: none; }
          .sec { padding: 70px 40px; }
          .news-wrap { padding: 50px 40px; }
          .dj-divider { margin: 0 40px; }
          .gmrt-card { grid-template-columns: 1fr; }
          .gl { padding: 30px 26px 20px; }
          .gr { padding: 20px 26px 30px; border-left: none; border-top: 1px solid rgba(232,82,10,0.1); }
          .gstats { flex-direction: row; flex-wrap: wrap; gap: 14px; }
          .gstat { min-width: 110px; }
        }
        @media (max-width: 640px) {
          .dj-hero { padding: 80px 18px 60px; }
          .dj-title { font-size: clamp(50px, 15vw, 72px); }
          .dj-btns { gap: 8px; }
          .dj-btn-primary, .dj-btn-secondary, .dj-btn-outline { padding: 10px 14px; font-size: 12px; }
          .dj-stats { gap: 16px; }
          .dj-stat-num { font-size: 24px; }
          .dj-carousel-box { height: 340px; padding: 0 32px; }
          .sec { padding: 56px 18px; }
          .news-wrap { padding: 44px 18px; }
          .dj-divider { margin: 0 18px; }
          .ncard { grid-template-columns: 1fr; }
          .nimg { min-height: 210px; }
          .nbody { padding: 20px 16px; gap: 12px; }
          .nhead { font-size: 16px; }
          .ntext { font-size: 12px; }
          .nmore { font-size: 10px; padding: 8px 14px; }
          .tl { padding-left: 20px; }
          .ti { padding: 0 0 38px 26px; }
          .tdot { left: -5px; width: 10px; height: 10px; }
          .gmrt-card { grid-template-columns: 1fr; }
          .gstats { flex-direction: row; flex-wrap: wrap; gap: 12px; }
          .gstat { min-width: 100px; }
          .gnum { font-size: 26px; }
          .etabs { flex-wrap: nowrap; overflow-x: auto; padding-bottom: 6px; scrollbar-width: none; }
          .etabs::-webkit-scrollbar { display: none; }
          .etab { flex-shrink: 0; font-size: 12px; padding: 9px 13px; }
          .ebody { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 480px) {
          .dj-stat-divider { display: none; }
          .dj-stat-num { font-size: 20px; }
          .dj-stat-lbl { font-size: 9px; }
          .dj-carousel-box { height: 300px; padding: 0 24px; }
          .dj-btns { flex-direction: row; }
        }
        @media (max-width: 400px) {
          .sec { padding: 44px 14px; }
          .news-wrap { padding: 36px 14px; }
          .stitle { font-size: clamp(24px, 8vw, 32px); }
          .dj-carousel-box { height: 280px; padding: 0 20px; }
        }
      `}</style>

      <div className="hs-page">
        <section className="dj-hero">
          <div className="dj-glow1" /><div className="dj-glow2" /><div className="dj-grid" /><div className="dj-diag" />

          <div className="dj-inner">
            {/* LEFT */}
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
                Where forts touch the sky, caves echo with history, and the Sahyadri wilderness stretches to the horizon — 100 km from Pune, a world apart.
              </p>
              <div className={`dj-btns${heroVisible ? " vis" : ""}`}>
                <button className="dj-btn-primary" onClick={() => navigate("/places")}>Explore Places →</button>
                <button className="dj-btn-secondary" onClick={() => navigate("/map")}> View Map</button>
                <button className="dj-btn-outline" onClick={() => navigate("/tips")}>Plan Your Trip</button>
              </div>
              <div className={`dj-stats${heroVisible ? " vis" : ""}`}>
                <div className="dj-stat-item"><div className="dj-stat-num">20+</div><div className="dj-stat-lbl">Tourist Places</div></div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item"><div className="dj-stat-num">2</div><div className="dj-stat-lbl">Ashtavinayaka Temples</div></div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item"><div className="dj-stat-num">2000+</div><div className="dj-stat-lbl">Years of History</div></div>
                <div className="dj-stat-divider" />
                <div className="dj-stat-item"><div className="dj-stat-num">1st</div><div className="dj-stat-lbl">Tourist Taluka MH</div></div>
              </div>
            </div>

            {/* RIGHT */}
            <div className={`dj-right${heroVisible ? " vis" : ""}`}>
              <div className="dj-carousel-box">
                <HeroCarousel />
              </div>
            </div>
          </div>

          <div className="dj-scroll"><div className="dj-scroll-line" />scroll</div>
        </section>

        <div className="dj-divider" />

        {/* STATUE */}
        <div className="news-wrap">
          <div className="news-head">
            <span className="stag" style={{ display: "inline-block" }}>Latest Announcement</span>
            <h2 className="stitle">World's Tallest Shivaji Maharaj<br /><em>Statue Coming to Junnar</em></h2>
          </div>
          <div className="ncard">
            <div className="nimg" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {statueImages.map((src, i) => (<img key={i} src={src} alt={`Shivaji statue ${i + 1}`} className={statueImg === i ? "on" : "off"} />))}
              <button className="narr narr-l" onClick={() => setStatueImg(i => (i - 1 + statueImages.length) % statueImages.length)}>‹</button>
              <button className="narr narr-r" onClick={() => setStatueImg(i => (i + 1) % statueImages.length)}>›</button>
              <div className="ndots">{statueImages.map((_, i) => (<div key={i} className={`ndot${statueImg === i ? " on" : ""}`} onClick={() => setStatueImg(i)} />))}</div>
            </div>
            <div className="nbody">
              <div>
                <div className="nlabel"> Junnar · Heritage Announcement</div>
                <div className="nhead">Tallest Chhatrapati Shivaji Maharaj Statue to Rise at Junnar — the Land of His Birth</div>
                <div className={`ntext${showFullNews ? "" : " clamp"}`}>
                  Former MLA and Shiv Sena District Chief Sharad Sonawane announced at a Pune press conference that the world's tallest statue of Chhatrapati Shivaji Maharaj will be erected at Junnar — the sacred Shivjanmabhoomi of the great Maratha king who gave Hindavi Swarajya to Maharashtra and all of India.
                  {showFullNews && (<>{" "}Inspired by the Statue of Unity on the banks of the Narmada in Gujarat, this statue will be equally grand and monumental. Twenty-five acres of land in Junnar taluka have been identified and purchased for the project.<br /><br />The statue will depict Shivaji Maharaj holding a sword, cast in bronze, and sculpted by a senior sculptor with experience at the prestigious J.J. School of Arts, Mumbai.</>)}
                </div>
              </div>
              <button className="nmore" onClick={() => setShowFullNews(v => !v)}>{showFullNews ? "Show Less ↑" : "Read More →"}</button>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <section className="sec sec-alt" id="history">
          <span className="stag">Through the Ages</span>
          <h2 className="stitle">2,000 Years of<br /><em>Living History</em></h2>
          <p className="slead">From Satavahana trade routes to Buddhist monasteries, from Maratha battlefields to modern heritage tourism — Junnar has witnessed some of India's most consequential chapters.</p>
          <div className="tl">
            {timeline.map((item, i) => (
              <div key={i} className={`ti rv${visibleItems.has(`t${i}`) ? " on" : ""}`} data-reveal={`t${i}`}>
                <div className="tdot" /><div className="ticon">{item.icon}</div>
                <div className="tera">{item.era}</div><div className="tdyn">{item.dynasty}</div>
                <div className="ttitle">{item.title}</div><div className="tbody">{item.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* GMRT */}
        <section className="sec" id="gmrt">
          <span className="stag">Science Meets Sahyadri</span>
          <h2 className="stitle">GMRT Khodaj —<br /><em>Ears to the Universe</em></h2>
          <p className="slead">Hidden in the quiet hills of Junnar taluka, one of the world's most powerful radio telescope arrays listens to the faintest whispers from across the cosmos.</p>
          <div className={`gmrt-card rv${visibleItems.has("gmrt") ? " on" : ""}`} data-reveal="gmrt">
            <div className="gl">
              <div className="gtag"> World-Class Research Facility</div>
              <div className="gtitle">Giant Metrewave Radio Telescope</div>
              <div className="gsub">The Giant Metrewave Radio Telescope (GMRT) — operated by the National Centre for Radio Astrophysics (NCRA–TIFR) — is located near the village of Khodaj, just outside Junnar. It is one of the most sensitive radio telescope arrays in the world at metre wavelengths.<br /><br />Spread across a Y-shaped baseline of 25 km, GMRT's 30 fully steerable parabolic dishes (each 45 m in diameter) peer into deep space to study pulsars, galaxies, hydrogen in the early universe, and gravitational waves. Scientists from over 40 countries use GMRT telescope time each year.</div>
            </div>
            <div className="gr">
              <div className="gstats">{gmrtStats.map((s, i) => (<div className="gstat" key={i}><div className="gnum">{s.num}</div><div className="glbl">{s.lbl}</div></div>))}</div>
            </div>
          </div>
        </section>

        {/* ADVENTURES */}
        <section className="sec sec-alt" id="adventures">
          <span className="stag">Outdoor Adventures</span>
          <h2 className="stitle">Trekking, Hiking<br /><em>& Camping</em></h2>
          <p className="slead">The Sahyadri ranges around Junnar offer outdoor experiences for every level — from sunrise fort trails to star-lit riverside camping.</p>
          <div className="etabs">
            {expData.map((e, i) => (<div key={e.id} className={`etab${activeExp === i ? " on" : ""}`} onClick={() => setActiveExp(i)}><span style={{ fontSize: 16 }}>{e.icon}</span>{e.label}</div>))}
          </div>
          <div className="ebody">
            <div><div className="etitle">{exp.title}</div><div className="etext">{exp.body}</div></div>
            <div className="ecards">
              {exp.details.map((d, i) => (
                <div key={`${exp.id}-${i}`} className={`ecard rv${visibleItems.has(`exp${activeExp}${i}`) ? " on" : ""}`} data-reveal={`exp${activeExp}${i}`}>
                  <div className="etop"><div className="ename">{d.name}</div><div className="elevel">{d.level}</div></div>
                  <div className="etime">⏱ {d.time}</div><div className="etip">{d.tip}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
