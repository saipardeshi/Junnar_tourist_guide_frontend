import { useState } from "react";

export default function ImageSwiper({ images = [], height = "220px", name = "" }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div style={{ ...styles.placeholder, height }}>
        <span style={styles.placeholderIcon}>🏔️</span>
      </div>
    );
  }

  const prev = (e) => {
    e?.stopPropagation();
    setCurrent(i => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e?.stopPropagation();
    setCurrent(i => (i + 1) % images.length);
  };

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd   = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  return (
    <div
      style={{ ...styles.swiper, height }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image */}
      <img
        key={current}
        src={images[current]}
        alt={`${name} ${current + 1}`}
        style={styles.img}
        onError={e => { e.target.style.display = "none"; }}
      />

      {/* Gradient overlay */}
      <div style={styles.gradient} />

      {/* Arrows — only if multiple */}
      {images.length > 1 && (
        <>
          <button style={{ ...styles.arrow, left: "8px" }} onClick={prev}>‹</button>
          <button style={{ ...styles.arrow, right: "8px" }} onClick={next}>›</button>
        </>
      )}

      {/* Counter badge */}
      {images.length > 1 && (
        <div style={styles.counter}>
          {current + 1} / {images.length}
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div style={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              style={{ ...styles.dot, ...(i === current ? styles.dotActive : {}) }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  swiper: {
    position: "relative", overflow: "hidden",
    background: "#161616", borderRadius: "0",
    userSelect: "none",
  },
  img: {
    width: "100%", height: "100%", objectFit: "cover",
    display: "block",
    animation: "fadeIn 0.3s ease",
  },
  gradient: {
    position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
    pointerEvents: "none",
  },
  arrow: {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.6)", color: "#fff", border: "none",
    borderRadius: "50%", width: "28px", height: "28px",
    fontSize: "1.2rem", cursor: "pointer", display: "flex",
    alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(4px)", zIndex: 2, lineHeight: 1,
  },
  counter: {
    position: "absolute", top: "8px", right: "8px",
    background: "rgba(0,0,0,0.6)", color: "#fff",
    padding: "2px 8px", borderRadius: "10px",
    fontSize: "0.7rem", backdropFilter: "blur(4px)",
  },
  dots: {
    position: "absolute", bottom: "8px", left: "50%",
    transform: "translateX(-50%)",
    display: "flex", gap: "5px", zIndex: 2,
  },
  dot: {
    width: "6px", height: "6px", borderRadius: "50%",
    background: "rgba(255,255,255,0.35)", border: "none", cursor: "pointer",
    padding: 0, transition: "all 0.2s",
  },
  dotActive: {
    background: "#ff6b00", width: "18px", borderRadius: "3px",
  },
  placeholder: {
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "#161616",
  },
  placeholderIcon: { fontSize: "3rem" },
};