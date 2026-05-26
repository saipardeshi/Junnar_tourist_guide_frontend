import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Places from "./pages/Places";
import PlaceDetail from "./pages/PlaceDetail";
import Itineraries from "./pages/Itineraries";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TravelTips from "./pages/Traveltips";
import Events from "./pages/Events";
import CostEstimator from "./pages/CostEstimator";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import MapView from "./components/MapView";
import Background3D from "./components/Background3D";
import Hotels from "./pages/Hotels";
//import HeroSection from "./components/HeroSection";
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* 👇 3D Background FIRST */}
        <Background3D />

        {/* 👇 Your UI */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/places" element={<Places />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/itineraries" element={<Itineraries />} />
          <Route path="/tips" element={<TravelTips />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cost" element={<CostEstimator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
    
  );
}
