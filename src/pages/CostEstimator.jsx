import { useState } from "react";

const COSTS = {
  transport: { bus: 300, car: 800, bike: 200 },
  stay: { camping: 0, budget: 600, hotel: 1500 },
  food: { budget: 200, moderate: 400, comfort: 700 },
  entryFees: {
    "Shivneri Fort": 0, "Lenyadri Caves": 0, "Bhimashankar Wildlife": 50,
    "Malshej Ghat": 0, "Ozar Ganpati Temple": 0, "Naneghat Pass": 0,
  }
};

const PLACES = Object.keys(COSTS.entryFees);

export default function CostEstimator() {
  const [form, setForm] = useState({
    people: 2, days: 2,
    transport: "bus", stay: "budget", food: "moderate",
    places: []
  });
  const [result, setResult] = useState(null);

  const togglePlace = (p) => setForm(prev => ({
    ...prev,
    places: prev.places.includes(p) ? prev.places.filter(x => x !== p) : [...prev.places, p]
  }));

  const calculate = () => {
    const transportCost = COSTS.transport[form.transport] * form.days;
    const stayCost      = COSTS.stay[form.stay] * form.days * Math.ceil(form.people / 2);
    const foodCost      = COSTS.food[form.food] * form.days * form.people;
    const entryCost     = form.places.reduce((sum, p) => sum + (COSTS.entryFees[p] || 0), 0) * form.people;
    const total         = transportCost + stayCost + foodCost + entryCost;
    setResult({ transportCost, stayCost, foodCost, entryCost, total });
  };

  const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>TRIP COST <span style={{ color: "#ff6b00" }}>ESTIMATOR</span></h1>
        <p style={styles.subtitle}>Plan your Junnar budget before you travel</p>
      </div>

      <div style={styles.grid}>
        {/* Form */}
        <div style={styles.formCard}>
          <h3 style={styles.sectionLabel}>Trip Details</h3>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>People</label>
              <input type="number" min="1" max="20" style={styles.input}
                value={form.people} onChange={e => setForm({ ...form, people: +e.target.value })} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Days</label>
              <input type="number" min="1" max="7" style={styles.input}
                value={form.days} onChange={e => setForm({ ...form, days: +e.target.value })} />
            </div>
          </div>

          <label style={styles.label}>Transport</label>
          <div style={styles.options}>
            {[["bus"," ST Bus","₹300/day"],["car"," Cab","₹800/day"],["bike"," Bike","₹200/day"]].map(([val,label,cost]) => (
              <div key={val} onClick={() => setForm({ ...form, transport: val })}
                style={{ ...styles.option, ...(form.transport === val ? styles.optionActive : {}) }}>
                <div>{label}</div><div style={styles.optionCost}>{cost}</div>
              </div>
            ))}
          </div>

          <label style={styles.label}>Accommodation</label>
          <div style={styles.options}>
            {[["camping"," Camping","Free"],["budget"," Budget Stay","₹600/night"],["hotel"," Hotel","₹1500/night"]].map(([val,label,cost]) => (
              <div key={val} onClick={() => setForm({ ...form, stay: val })}
                style={{ ...styles.option, ...(form.stay === val ? styles.optionActive : {}) }}>
                <div>{label}</div><div style={styles.optionCost}>{cost}</div>
              </div>
            ))}
          </div>

          <label style={styles.label}>Food Budget</label>
          <div style={styles.options}>
            {[["budget"," Budget","₹200/day"],["moderate","Moderate","₹400/day"],["comfort"," Comfort","₹700/day"]].map(([val,label,cost]) => (
              <div key={val} onClick={() => setForm({ ...form, food: val })}
                style={{ ...styles.option, ...(form.food === val ? styles.optionActive : {}) }}>
                <div>{label}</div><div style={styles.optionCost}>{cost}</div>
              </div>
            ))}
          </div>

          <label style={styles.label}>Places to Visit</label>
          <div style={styles.placeGrid}>
            {PLACES.map(p => (
              <label key={p} style={{ ...styles.placeChip, ...(form.places.includes(p) ? styles.placeChipActive : {}) }}>
                <input type="checkbox" style={{ display: "none" }}
                  checked={form.places.includes(p)} onChange={() => togglePlace(p)} />
                {p}
                {COSTS.entryFees[p] > 0 && <span style={styles.fee}> ₹{COSTS.entryFees[p]}</span>}
              </label>
            ))}
          </div>

          <button style={styles.calcBtn} onClick={calculate}>Calculate Budget →</button>
        </div>

        {/* Result */}
        <div>
          {result ? (
            <div style={styles.resultCard}>
              <h3 style={styles.resultTitle}>Estimated Budget</h3>
              <div style={styles.totalBox}>
                <div style={styles.totalLabel}>Total for {form.people} person{form.people > 1 ? "s" : ""}, {form.days} day{form.days > 1 ? "s" : ""}</div>
                <div style={styles.totalAmount}>{fmt(result.total)}</div>
                <div style={styles.perPerson}>≈ {fmt(Math.round(result.total / form.people))} per person</div>
              </div>
              <div style={styles.breakdown}>
                {[
                  ["", "Transport", result.transportCost],
                  ["", "Stay", result.stayCost],
                  ["", "Food", result.foodCost],
                  ["", "Entry Fees", result.entryCost],
                ].map(([icon, label, val]) => (
                  <div key={label} style={styles.breakdownRow}>
                    <span>{icon} {label}</span>
                    <span style={{ color: val > 0 ? "#ccc" : "#444" }}>{fmt(val)}</span>
                  </div>
                ))}
              </div>
              <div style={styles.tip}>
                 Carry extra ₹{fmt(Math.round(result.total * 0.15))} as contingency (15%)
              </div>
            </div>
          ) : (
            <div style={styles.emptyResult}>
              <div style={{ fontSize: "3rem" }}></div>
              <p>Fill in your trip details and click <strong style={{ color: "#ff6b00" }}>Calculate Budget</strong> to see the estimate</p>
            </div>
          )}

          {/* Quick Tips */}
          <div style={styles.tipsCard}>
            <h4 style={styles.tipsTitle}>💡 Money Saving Tips</h4>
            <ul style={styles.tipsList}>
              <li>Book ST Bus from Pune — cheapest option</li>
              <li>Most places in Junnar have free entry</li>
              <li>Stay in Junnar town — cheaper than resorts</li>
              <li>Local dhabas serve great food for ₹100-150</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { background: "#0a0a0a", minHeight: "100vh", padding: "3rem 2rem", maxWidth: "1100px", margin: "0 auto" },
  header: { textAlign: "center", marginBottom: "3rem" },
  title: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", letterSpacing: "0.05em" },
  subtitle: { color: "#555", marginTop: "0.5rem" },
  grid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.5rem" },
  formCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "2rem" },
  sectionLabel: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  field: {},
  label: { display: "block", color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", marginTop: "1.2rem" },
  input: { width: "100%", padding: "0.7rem 1rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "8px", color: "#fff", fontSize: "0.95rem", boxSizing: "border-box" },
  options: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem" },
  option: { background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "0.7rem", cursor: "pointer", fontSize: "0.82rem", color: "#666", textAlign: "center", transition: "all 0.2s" },
  optionActive: { border: "1px solid rgba(255,107,0,0.5)", background: "rgba(255,107,0,0.08)", color: "#ff6b00" },
  optionCost: { color: "#444", fontSize: "0.72rem", marginTop: "0.2rem" },
  placeGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: "0.5rem", marginTop: "0.5rem" },
  placeChip: { padding: "0.5rem 0.8rem", background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: "6px", cursor: "pointer", fontSize: "0.82rem", color: "#666", transition: "all 0.2s" },
  placeChipActive: { border: "1px solid rgba(255,107,0,0.5)", background: "rgba(255,107,0,0.08)", color: "#ff6b00" },
  fee: { color: "#ef4444", fontSize: "0.72rem" },
  calcBtn: { width: "100%", marginTop: "1.5rem", padding: "0.9rem", background: "#ff6b00", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "1rem" },
  resultCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "1.8rem", marginBottom: "1rem" },
  resultTitle: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" },
  totalBox: { textAlign: "center", padding: "1.5rem", background: "rgba(255,107,0,0.08)", border: "1px solid rgba(255,107,0,0.2)", borderRadius: "12px", marginBottom: "1.5rem" },
  totalLabel: { color: "#666", fontSize: "0.82rem", marginBottom: "0.5rem" },
  totalAmount: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "3rem", color: "#ff6b00", letterSpacing: "0.05em" },
  perPerson: { color: "#555", fontSize: "0.82rem", marginTop: "0.3rem" },
  breakdown: { display: "flex", flexDirection: "column", gap: "0.6rem" },
  breakdownRow: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #1a1a1a", fontSize: "0.88rem", color: "#888" },
  tip: { marginTop: "1rem", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "8px", padding: "0.8rem", color: "#10b981", fontSize: "0.82rem" },
  emptyResult: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "16px", padding: "3rem", textAlign: "center", color: "#555", marginBottom: "1rem" },
  tipsCard: { background: "#111", border: "1px solid #1e1e1e", borderRadius: "12px", padding: "1.2rem" },
  tipsTitle: { color: "#ff6b00", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem" },
  tipsList: { paddingLeft: "1.2rem", color: "#666", fontSize: "0.85rem", lineHeight: "2" },
};