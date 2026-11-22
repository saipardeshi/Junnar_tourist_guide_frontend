# Junnar Tourist Guide — Frontend

Web app for exploring Junnar, Maharashtra: forts, caves, temples and nature spots, with trip planning, hotels, events and live weather. Built with React + Vite.

Live: https://junnar-tourist-guide-frontend.vercel.app · Backend: [Junnar_tourist_guide_backend](https://github.com/saipardeshi/Junnar_tourist_guide_backend)

## Tech Stack

- React 18, Vite 5, React Router v6
- Axios (JWT sent as Bearer token)
- Leaflet (maps)
- Three.js, React Three Fiber, Drei (3D background)
- OpenWeatherMap API (weather)
- Deployed on Vercel

## Getting Started

1. Install: `npm install`
2. Create a `.env` file in the project root:

   ```env
   VITE_API_URL=http://localhost:8080/api
   VITE_WEATHER_KEY=<your OpenWeatherMap key>
   ```

   `VITE_API_URL` must end with `/api`. `.env` should never be committed.
3. Start the [backend](https://github.com/saipardeshi/Junnar_tourist_guide_backend) on port 8080
4. Run: `npm run dev` — app at `http://localhost:5173`

| Command | Effect |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Generates `sitemap.xml`, then builds for production |
| `npm run preview` | Preview the production build |

## Features

- Places: browse, search, filter by category, detail page with reviews and ratings
- Interactive map of all spots
- Trip planner: builds a morning / afternoon / evening plan from your travel style (rule-based, no external AI)
- Saved itineraries and cost estimator
- Hotels, events, travel tips and experiences
- Live Junnar weather widget
- Register / login, profile and favourites
- Admin dashboard: stats, users, manage places / events / reviews
- SEO: generated sitemap and `robots.txt`

## Deployment

Deployed on Vercel. `vercel.json` rewrites all routes to `index.html` so React Router works on refresh. Set `VITE_API_URL` and `VITE_WEATHER_KEY` in the Vercel project settings.

## Known Gaps

- Contact form posts to `/api/contact`, which the backend does not implement yet
- No automated tests or CI pipeline
- Weather key is exposed in the browser (free-tier key; restrict it by domain)

## Author

Sai Pardeshi — [GitHub](https://github.com/saipardeshi) · [LinkedIn](https://linkedin.com/in/sai-pardeshi)
