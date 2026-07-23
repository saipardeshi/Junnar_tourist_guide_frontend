import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getImagesForPlace } from "../data/placeImages";

// ── Featured places data ──────────────────────────────────────────────────────
const POPULAR_PLACES = [
  {
    id: 1,
    name: "Shivneri Fort",
    location: "Junnar",
    rating: 4.8,
    reviews: 230,
    duration: "2-3 Hrs",
    image: "/img/Shivneri_1.jpg",
  },
  {
    id: 12,
    name: "Lenyadri Caves",
    location: "Lenyadri",
    rating: 4.7,
    reviews: 180,
    duration: "1-2 Hrs",
    image: "/img/Lenyadri_1.jpg",
  },
  {
    id: 11,
    name: "Ozar Ganpati",
    location: "Ozar",
    rating: 4.9,
    reviews: 210,
    duration: "1-2 Hrs",
    image: "/img/ozar_1.jpeg",
  },
  {
    id: 5,
    name: "Naneghat Pass",
    location: "Naneghat",
    rating: 4.6,
    reviews: 160,
    duration: "2-4 Hrs",
    image: "/img/naneghat_1.avif",
  },
  {
    id: 6,
    name: "Malshej Ghat",
    location: "Malshej",
    rating: 4.7,
    reviews: 195,
    duration: "3-5 Hrs",
    image: "/img/malshej_1.webp",
  },
  {
    id: 2,
    name: "Jivdhan Fort",
    location: "Ghatghar",
    rating: 4.5,
    reviews: 140,
    duration: "5-6 Hrs",
    image: "/img/jivdhan_1.jpeg",
  },
  {
    id: 13,
    name: "Bhimashankar",
    location: "Bhimashankar",
    rating: 4.8,
    reviews: 250,
    duration: "2-3 Hrs",
    image: "/img/bhimashankar-shiva-temple_1.jpg",
  },
  {
    id: 8,
    name: "Manikdoh Dam",
    location: "Manikdoh",
    rating: 4.4,
    reviews: 120,
    duration: "1-2 Hrs",
    image: "/img/manikdoh_1.png",
  },
];

export default function PopularDestinations() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 300 + 20; // card width + gap
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .pd-section {
          position: relative;
          padding: 64px 64px 72px;
          background: #0a0a0a;
          overflow: hidden;
        }
        .pd-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }
        .pd-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pd-tag {
          font-size: 11px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #E8520A;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          margin-bottom: 8px;
        }
        .pd-title {
          font-family: 'Bebas Neue', 'Outfit', sans-serif;
          font-size: clamp(28px, 4.5vw, 42px);
          letter-spacing: 1px;
          font-weight: 400;
          color: #fff;
          line-height: 1.1;
          margin: 0;
        }
        .pd-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: transparent;
          color: #E8520A;
          border: 1px solid rgba(232, 82, 10, 0.4);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .pd-view-all:hover {
          background: rgba(232, 82, 10, 0.1);
          border-color: #E8520A;
          transform: translateY(-1px);
        }
        .pd-carousel-wrap {
          position: relative;
        }
        .pd-carousel {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding: 4px 4px 16px;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .pd-carousel::-webkit-scrollbar { display: none; }

        .pd-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        .pd-arrow:hover {
          background: rgba(232, 82, 10, 0.85);
          border-color: rgba(232, 82, 10, 0.6);
          transform: translateY(-50%) scale(1.08);
        }
        .pd-arrow.hidden { opacity: 0; pointer-events: none; }
        .pd-arrow-left { left: -22px; }
        .pd-arrow-right { right: -22px; }

        .pd-card {
          flex: 0 0 300px;
          scroll-snap-align: start;
          border-radius: 16px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        .pd-card:hover {
          border-color: rgba(232, 82, 10, 0.35);
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(232, 82, 10, 0.15);
        }
        .pd-card-img {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }
        .pd-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .pd-card:hover .pd-card-img img {
          transform: scale(1.08);
        }
        .pd-card-img::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, #111, transparent);
          pointer-events: none;
        }
        .pd-location-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 10px;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 20px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.85);
          font-family: 'DM Sans', sans-serif;
          z-index: 2;
        }
        .pd-location-pin {
          color: #E8520A;
          font-size: 12px;
        }
        .pd-card-body {
          padding: 16px 18px 20px;
        }
        .pd-card-name {
          font-family: 'Outfit', 'DM Sans', sans-serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
          line-height: 1.3;
        }
        .pd-card-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.45);
          font-family: 'DM Sans', sans-serif;
        }
        .pd-card-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #E8520A;
          font-weight: 600;
        }
        .pd-card-rating-star {
          font-size: 13px;
        }
        .pd-card-rating-count {
          color: rgba(255, 255, 255, 0.35);
          font-weight: 400;
        }
        .pd-card-duration {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .pd-card-duration-icon {
          font-size: 13px;
          opacity: 0.5;
        }
        .pd-divider {
          display: inline-block;
          width: 1px;
          height: 12px;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 900px) {
          .pd-section { padding: 56px 40px 64px; }
          .pd-arrow-left { left: -8px; }
          .pd-arrow-right { right: -8px; }
        }
        @media (max-width: 640px) {
          .pd-section { padding: 44px 18px 52px; }
          .pd-card { flex: 0 0 260px; }
          .pd-card-img { height: 170px; }
          .pd-arrow { width: 36px; height: 36px; font-size: 15px; }
          .pd-arrow-left { left: -4px; }
          .pd-arrow-right { right: -4px; }
          .pd-title { font-size: clamp(20px, 5vw, 26px); }
        }
        @media (max-width: 400px) {
          .pd-section { padding: 36px 14px 44px; }
          .pd-card { flex: 0 0 240px; }
          .pd-card-img { height: 150px; }
        }
      `}</style>

      <section className="pd-section">
        <div className="pd-container">
          <div className="pd-header">
            <div>
              <div className="pd-tag">Popular Destinations</div>
              <h2 className="pd-title">Must Visit Places in Junnar</h2>
            </div>
            <button className="pd-view-all" onClick={() => navigate("/places")}>
              View All Places &nbsp;→
            </button>
          </div>

          <div className="pd-carousel-wrap">
            <button
              className={`pd-arrow pd-arrow-left${!canScrollLeft ? " hidden" : ""}`}
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              ‹
            </button>

            <div className="pd-carousel" ref={scrollRef}>
              {POPULAR_PLACES.map((place) => (
                <div
                  key={place.id}
                  className="pd-card"
                  onClick={() => navigate(`/places/${place.id}`)}
                >
                  <div className="pd-card-img">
                    <img src={place.image} alt={place.name} loading="lazy" />
                    <span className="pd-location-badge">
                      <span className="pd-location-pin">📍</span>
                      {place.location}
                    </span>
                  </div>
                  <div className="pd-card-body">
                    <div className="pd-card-name">{place.name}</div>
                    <div className="pd-card-meta">
                      <span className="pd-card-rating">
                        <span className="pd-card-rating-star">★</span>
                        {place.rating}
                        <span className="pd-card-rating-count">({place.reviews})</span>
                      </span>
                      <span className="pd-divider" />
                      <span className="pd-card-duration">
                        <span className="pd-card-duration-icon">🕐</span>
                        {place.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`pd-arrow pd-arrow-right${!canScrollRight ? " hidden" : ""}`}
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
