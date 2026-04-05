import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api"
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH
export const register = (data) => API.post("/auth/register", data);
export const login    = (data) => API.post("/auth/login", data);

// PLACES
export const getAllPlaces         = ()      => API.get("/places");
export const getPlaceById         = (id)    => API.get(`/places/${id}`);
export const getPlacesByCategory  = (cat)   => API.get(`/places/category/${cat}`);
export const searchPlaces         = (name)  => API.get(`/places/search?name=${name}`);

// REVIEWS
export const getReviewsForPlace   = (placeId) => API.get(`/reviews/place/${placeId}`);
export const getReviewStats       = (placeId) => API.get(`/reviews/stats/${placeId}`);
export const addReview            = (data)    => API.post("/reviews", data);
export const deleteReview         = (id)      => API.delete(`/reviews/${id}`);

// ITINERARIES
export const getMyItineraries  = ()     => API.get("/itineraries");
export const createItinerary   = (data) => API.post("/itineraries", data);
export const deleteItinerary   = (id)   => API.delete(`/itineraries/${id}`);

// USER PROFILE & FAVOURITES
export const getProfile        = ()         => API.get("/user/profile");
export const updateProfile     = (data)     => API.put("/user/profile", data);
export const toggleFavourite   = (placeId)  => API.post(`/user/favourites/${placeId}`);
export const getFavourites     = ()         => API.get("/user/favourites");

// ADMIN
export const getAdminStats     = ()      => API.get("/admin/stats");
export const getAdminUsers     = ()      => API.get("/admin/users");
export const adminAddPlace     = (data)  => API.post("/admin/places", data);
export const adminUpdatePlace  = (id, d) => API.put(`/admin/places/${id}`, d);
export const adminDeletePlace  = (id)    => API.delete(`/admin/places/${id}`);
export const adminDeleteReview = (id)    => API.delete(`/admin/reviews/${id}`);

// WEATHER (OpenWeatherMap free API)
export const getWeather = () =>
  axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Junnar,IN&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`
  );