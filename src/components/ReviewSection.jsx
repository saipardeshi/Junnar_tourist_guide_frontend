import { useEffect, useState } from "react";
import { getReviewsForPlace, addReview, deleteReview } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ReviewSection({ placeId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getReviewsForPlace(placeId)
      .then(res => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [placeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await addReview({ placeId, ...form });
      setReviews([res.data, ...reviews]);
      setForm({ rating: 5, comment: "" });
    } catch { alert("Login required to submit a review."); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    await deleteReview(id);
    setReviews(reviews.filter(r => r.id !== id));
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const StarPicker = ({ value, onChange }) => (
    <div style={{ display: "flex", gap: "0.3rem" }}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{ fontSize: "1.4rem", cursor: "pointer", color: star <= value ? "#ff6b00" : "#333" }}
        >★</span>
      ))}
    </div>
  );

  return (
    <div style={styles.section}>
      <div style={styles.header}>
        <h3 style={styles.title}>Reviews</h3>
        {avgRating && (
          <div style={styles.avgRating}>
            <span style={styles.avgNum}>{avgRating}</span>
            <span style={styles.avgStar}>★</span>
            <span style={styles.avgCount}>({reviews.length})</span>
          </div>
        )}
      </div>

      {/* Write Review */}
      {user ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <p style={styles.formLabel}>Your Rating</p>
          <StarPicker value={form.rating} onChange={r => setForm({ ...form, rating: r })} />
          <textarea
            style={styles.textarea}
            placeholder="Share your experience at this place..."
            value={form.comment}
            onChange={e => setForm({ ...form, comment: e.target.value })}
            required
            rows={3}
          />
          <button type="submit" style={styles.submitBtn} disabled={submitting}>
            {submitting ? "Submitting..." : "Post Review"}
          </button>
        </form>
      ) : (
        <div style={styles.loginPrompt}>
          <span>🔐</span> <span style={{ color: "#555" }}>Login to write a review</span>
        </div>
      )}

      {/* Review List */}
      {loading ? (
        <p style={{ color: "#555", fontSize: "0.88rem" }}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p style={{ color: "#444", fontSize: "0.88rem" }}>No reviews yet. Be the first!</p>
      ) : (
        <div style={styles.reviewList}>
          {reviews.map(r => (
            <div key={r.id} style={styles.reviewCard}>
              <div style={styles.reviewTop}>
                <div style={styles.reviewUser}>
                  <div style={styles.avatar}>{r.userName?.[0]?.toUpperCase()}</div>
                  <div>
                    <div style={styles.userName}>{r.userName}</div>
                    <div style={styles.reviewDate}>{new Date(r.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                  </div>
                </div>
                <div style={styles.stars}>
                  {"★".repeat(r.rating)}<span style={{ color: "#333" }}>{"★".repeat(5 - r.rating)}</span>
                </div>
              </div>
              <p style={styles.comment}>{r.comment}</p>
              {user && (
                <button onClick={() => handleDelete(r.id)} style={styles.deleteBtn}>Delete</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  section: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.5rem", marginTop: "1rem" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" },
  title: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" },
  avgRating: { display: "flex", alignItems: "center", gap: "0.3rem" },
  avgNum: { color: "#ff6b00", fontWeight: "700", fontSize: "1.2rem" },
  avgStar: { color: "#ff6b00", fontSize: "1rem" },
  avgCount: { color: "#555", fontSize: "0.8rem" },
  form: { background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: "10px", padding: "1.2rem", marginBottom: "1.5rem" },
  formLabel: { color: "#555", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" },
  textarea: { width: "100%", marginTop: "0.8rem", padding: "0.75rem", background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff", fontSize: "0.9rem", resize: "vertical", boxSizing: "border-box" },
  submitBtn: { marginTop: "0.8rem", background: "#ff6b00", color: "#fff", border: "none", padding: "0.6rem 1.5rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.88rem" },
  loginPrompt: { display: "flex", gap: "0.5rem", alignItems: "center", padding: "0.8rem", background: "#0a0a0a", borderRadius: "8px", marginBottom: "1.5rem", fontSize: "0.88rem" },
  reviewList: { display: "flex", flexDirection: "column", gap: "0.8rem" },
  reviewCard: { background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "10px", padding: "1rem" },
  reviewTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" },
  reviewUser: { display: "flex", gap: "0.7rem", alignItems: "center" },
  avatar: { width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,107,0,0.2)", color: "#ff6b00", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "700" },
  userName: { color: "#ccc", fontSize: "0.88rem", fontWeight: "600" },
  reviewDate: { color: "#444", fontSize: "0.75rem" },
  stars: { color: "#ff6b00", fontSize: "0.9rem", letterSpacing: "0.05em" },
  comment: { color: "#888", fontSize: "0.88rem", lineHeight: "1.6" },
  deleteBtn: { background: "none", border: "none", color: "#444", fontSize: "0.75rem", cursor: "pointer", marginTop: "0.4rem" },
};