import { useState, useEffect, useRef } from "react";

const HIGHLIGHTS = [
  { label: "Shivneri Fort",  sub: "Junnar · Maharashtra",   img: "/img/Shivneri_1.jpg" },
  { label: "Ozar Ganpati",   sub: "Junnar · Ashtavinayaka", img: "/img/ozar_1.jpeg" },
  { label: "Bhimashankar",   sub: "Sahyadri · Wildlife",    img: "/img/bhimashankar-shiva-temple_4.jpg" },
  { label: "Malshej Ghat",   sub: "Junnar · Monsoon",       img: "/img/malshej_1.webp" },
];

const N = HIGHLIGHTS.length;
function mod(n, m) { return ((n % m) + m) % m; }

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setActive(i => mod(i + dir, N));
    setTimeout(() => setAnimating(false), 520);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 3800);
    return () => clearInterval(timerRef.current);
  }, [animating]);

  const getSlot = (i) => mod(i - active, N);

  const slotStyle = (slot) => {
    if (slot === 0) return {
      transform: "translateX(0) translateZ(0px) rotateY(0deg) scale(1)",
      zIndex: 10, opacity: 1, filter: "none",
    };
    if (slot === 1) return {
      transform: "translateX(52%) translateZ(-100px) rotateY(-16deg) scale(0.80)",
      zIndex: 6, opacity: 0.7, filter: "blur(1px) brightness(0.65)",
    };
    if (slot === N - 1) return {
      transform: "translateX(-52%) translateZ(-100px) rotateY(16deg) scale(0.80)",
      zIndex: 6, opacity: 0.7, filter: "blur(1px) brightness(0.65)",
    };
    return {
      transform: "translateX(0) translateZ(-300px) scale(0.5)",
      zIndex: 1, opacity: 0, filter: "blur(4px)",
    };
  };

  return (
    <>
      <style>{`
        .hc-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 340px;
          perspective: 1100px;
          perspective-origin: 50% 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hc-stage {
          position: relative;
          width: 220px;
          height: 320px;
          transform-style: preserve-3d;
          flex-shrink: 0;
        }
        .hc-card {
          position: absolute;
          left: 0; top: 0;
          width: 220px;
          height: 320px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.34,1.2,0.64,1),
                      opacity 0.5s ease, filter 0.5s ease, box-shadow 0.5s ease;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }
        .hc-card-active {
          box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 0 1.5px rgba(232,82,10,0.5);
        }
        .hc-card img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.4s ease;
        }
        .hc-card:hover img { transform: scale(1.04); }
        .hc-glass {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.88) 100%);
        }
        .hc-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 24px 16px 16px;
        }
        .hc-sub {
          font-size: 9px; letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 4px;
          font-family: 'DM Sans', sans-serif;
        }
        .hc-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px; color: #fff;
          letter-spacing: 1px; line-height: 1.1;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }
        .hc-card-active::before {
          content: '';
          position: absolute; inset: 0;
          border-radius: 18px; padding: 1.5px;
          background: linear-gradient(135deg, rgba(232,82,10,0.8), rgba(255,160,60,0.4), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none; z-index: 2;
        }
        .hc-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; font-size: 16px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 20;
          transition: background 0.2s, transform 0.2s;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }
        .hc-arrow:hover { background: rgba(232,82,10,0.5); transform: translateY(-50%) scale(1.1); }
        .hc-arrow-l { left: 0; }
        .hc-arrow-r { right: 0; }
        .hc-dots {
          position: absolute;
          bottom: -28px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px;
        }
        .hc-dot {
          height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .hc-dot-on { background: #E8520A; }

        @media (min-width: 901px) {
          .hc-stage { width: 260px; height: 380px; }
          .hc-card  { width: 260px; height: 380px; }
          .hc-name  { font-size: 22px; }
          .hc-arrow-l { left: -44px; }
          .hc-arrow-r { right: -44px; }
        }
        @media (max-width: 900px) {
          .hc-stage { width: 200px; height: 300px; }
          .hc-card  { width: 200px; height: 300px; }
          .hc-arrow-l { left: -40px; }
          .hc-arrow-r { right: -40px; }
        }
        @media (max-width: 480px) {
          .hc-stage { width: 170px; height: 260px; }
          .hc-card  { width: 170px; height: 260px; }
          .hc-name  { font-size: 17px; }
          .hc-arrow-l { left: -36px; }
          .hc-arrow-r { right: -36px; }
        }
      `}</style>

      <div className="hc-wrap">
        <div className="hc-stage">
          {HIGHLIGHTS.map((h, i) => {
            const slot = getSlot(i);
            const isActive = slot === 0;
            return (
              <div
                key={h.label}
                className={`hc-card${isActive ? " hc-card-active" : ""}`}
                style={slotStyle(slot)}
                onClick={() => !isActive && setActive(i)}
              >
                <img src={h.img} alt={h.label} loading="lazy" />
                <div className="hc-glass" />
                <div className="hc-label">
                  <div className="hc-sub">{h.sub}</div>
                  <div className="hc-name">{h.label}</div>
                </div>
              </div>
            );
          })}
          <button className="hc-arrow hc-arrow-l" onClick={() => go(-1)}>‹</button>
          <button className="hc-arrow hc-arrow-r" onClick={() => go(1)}>›</button>
          <div className="hc-dots">
            {HIGHLIGHTS.map((_, i) => (
              <div
                key={i}
                className={`hc-dot${active === i ? " hc-dot-on" : ""}`}
                style={{ width: active === i ? 20 : 6 }}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}