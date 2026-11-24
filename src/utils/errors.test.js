import { describe, expect, it } from "vitest";
import { errorMessage } from "./errors";

describe("errorMessage", () => {
  it("shows the server's own message when it answered", () => {
    const err = { response: { status: 400, data: { error: "Email already registered" } } };
    expect(errorMessage(err, "fallback")).toBe("Email already registered");
  });

  it("uses the fallback when the server answered without a message", () => {
    expect(errorMessage({ response: { status: 500, data: {} } }, "fallback")).toBe("fallback");
    expect(errorMessage({ response: { status: 500 } }, "fallback")).toBe("fallback");
  });

  it("explains a timeout / unreachable server instead of showing the generic fallback", () => {
    const timeout = Object.assign(new Error("timeout of 60000ms exceeded"), { code: "ECONNABORTED" });
    expect(errorMessage(timeout, "Registration failed")).toMatch(/waking up/i);
    expect(errorMessage(new Error("Network Error"), "Registration failed")).toMatch(/waking up/i);
    expect(errorMessage(undefined, "x")).toMatch(/waking up/i);
  });
});
