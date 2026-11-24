import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const getWeather = vi.fn();
vi.mock("../services/api", () => ({ getWeather: (...args) => getWeather(...args) }));

import WeatherWidget from "./WeatherWidget";

describe("WeatherWidget", () => {
  it("shows temperature, humidity and trek advice from the backend payload", async () => {
    getWeather.mockResolvedValueOnce({
      data: { main: { temp: 28.4, humidity: 41 }, weather: [{ main: "Clear", description: "clear sky" }] },
    });
    render(<WeatherWidget />);

    expect(await screen.findByText("28°C")).toBeInTheDocument();
    expect(screen.getByText("clear sky")).toBeInTheDocument();
    expect(screen.getByText(/41%/)).toBeInTheDocument();
    expect(screen.getByText("Great day for a trek!")).toBeInTheDocument();
  });

  it("warns against trekking in the rain", async () => {
    getWeather.mockResolvedValueOnce({
      data: { main: { temp: 22, humidity: 90 }, weather: [{ main: "Rain", description: "light rain" }] },
    });
    render(<WeatherWidget />);
    expect(await screen.findByText("Not ideal for trekking today")).toBeInTheDocument();
  });

  it("falls back quietly when weather is unavailable (e.g. backend answers 503)", async () => {
    getWeather.mockRejectedValueOnce({ response: { status: 503 } });
    render(<WeatherWidget />);
    expect(await screen.findByText(/Junnar, Maharashtra/)).toBeInTheDocument();
    expect(screen.queryByText(/°C/)).not.toBeInTheDocument();
  });
});
