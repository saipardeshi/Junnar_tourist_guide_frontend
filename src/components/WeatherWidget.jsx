import { useEffect, useState } from "react";
import { getWeather } from "../services/api";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather()
      .then(res => setWeather(res.data))
      .catch(() => setWeather(null))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (main) => {
    const icons = { Clear: "☀️", Clouds: "☁️", Rain: "🌧️", Drizzle: "🌦️", Thunderstorm: "⛈️", Snow: "❄️", Mist: "🌫️", Haze: "🌫️" };
    return icons[main] || "🌤️";
  };

  const getTrekAdvice = (temp, desc) => {
    if (desc?.includes("rain") || desc?.includes("thunder")) return { text: "Not ideal for trekking today", color: "#ef4444" };
    if (temp > 35) return { text: "Trek early morning only", color: "#f59e0b" };
    return { text: "Great day for a trek!", color: "#10b981" };
  };

  if (loading) return (
    <div style={styles.widget}>
      <div style={{ color: "#555", fontSize: "0.85rem" }}>Loading weather...</div>
    </div>
  );

  if (!weather) return (
    <div style={styles.widget}>
      <div style={{ color: "#555", fontSize: "0.82rem" }}>🌤️ Junnar, Maharashtra</div>
    </div>
  );

  const advice = getTrekAdvice(weather.main.temp, weather.weather[0].description);

  return (
    <div style={styles.widget}>
      <div style={styles.top}>
        <span style={styles.icon}>{getIcon(weather.weather[0].main)}</span>
        <div>
          <div style={styles.temp}>{Math.round(weather.main.temp)}°C</div>
          <div style={styles.desc}>{weather.weather[0].description}</div>
        </div>
        <div style={styles.right}>
          <div style={styles.location}>📍 Junnar</div>
          <div style={styles.humidity}>💧 {weather.main.humidity}%</div>
        </div>
      </div>
      <div style={{ ...styles.advice, color: advice.color }}>
        {advice.text}
      </div>
    </div>
  );
}

const styles = {
  widget: {
    background: "#111", border: "1px solid #1e1e1e", borderRadius: "10px",
    padding: "1rem 1.2rem", margin: "0 2rem 1.5rem",
  },
  top: { display: "flex", alignItems: "center", gap: "1rem" },
  icon: { fontSize: "2rem" },
  temp: { color: "#fff", fontWeight: "700", fontSize: "1.3rem" },
  desc: { color: "#555", fontSize: "0.78rem", textTransform: "capitalize" },
  right: { marginLeft: "auto", textAlign: "right" },
  location: { color: "#ff6b00", fontSize: "0.8rem", fontWeight: "600" },
  humidity: { color: "#555", fontSize: "0.75rem" },
  advice: { fontSize: "0.78rem", fontWeight: "600", marginTop: "0.6rem", paddingTop: "0.6rem", borderTop: "1px solid #1a1a1a" },
};