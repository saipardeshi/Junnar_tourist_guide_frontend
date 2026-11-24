import { beforeEach, describe, expect, it } from "vitest";
import { API, getWeather, register } from "./api";

// Replace the network with an adapter that just records the outgoing request.
let sent;
beforeEach(() => {
  sent = undefined;
  API.defaults.adapter = (config) => {
    sent = config;
    return Promise.resolve({ data: {}, status: 200, statusText: "OK", headers: {}, config });
  };
});

describe("api client", () => {
  it("has a request timeout so a sleeping server can't hang the UI forever", () => {
    expect(API.defaults.timeout).toBeGreaterThan(0);
  });

  it("sends the saved JWT as a Bearer token", async () => {
    localStorage.setItem("token", "abc.def.ghi");
    await register({ name: "A", email: "a@b.co", password: "secret1" });
    expect(sent.headers.Authorization).toBe("Bearer abc.def.ghi");
    expect(sent.url).toBe("/auth/register");
  });

  it("sends no Authorization header when logged out", async () => {
    await register({ name: "A", email: "a@b.co", password: "secret1" });
    expect(sent.headers.Authorization).toBeUndefined();
  });

  it("fetches weather through our own backend, not directly with an API key", async () => {
    await getWeather();
    expect(sent.url).toBe("/weather");
    expect(`${sent.baseURL}${sent.url}`).not.toMatch(/openweathermap|appid/i);
  });
});
