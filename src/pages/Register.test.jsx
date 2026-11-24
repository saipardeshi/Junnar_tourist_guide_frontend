import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const register = vi.fn();
vi.mock("../context/AuthContext", () => ({ useAuth: () => ({ register }) }));

import Register from "./Register";

async function fillAndSubmit() {
  const user = userEvent.setup();
  render(<MemoryRouter><Register /></MemoryRouter>);
  await user.type(screen.getByPlaceholderText("Enter your full name"), "Abhi");
  await user.type(screen.getByPlaceholderText("you@gmail.com"), "a@gmail.com");
  await user.type(screen.getByPlaceholderText("Min 6 characters"), "secret1");
  await user.click(screen.getByRole("button", { name: /create account/i }));
  return user;
}

describe("Register page", () => {
  it("shows 'Creating account...' while waiting, then recovers if the request fails", async () => {
    let rejectRequest;
    register.mockReturnValueOnce(new Promise((_, reject) => { rejectRequest = reject; }));

    await fillAndSubmit();
    const pending = await screen.findByRole("button", { name: /creating account/i });
    expect(pending).toBeDisabled();

    rejectRequest({ response: { data: { error: "Email already registered" } } });

    expect(await screen.findByText("Email already registered")).toBeInTheDocument();
    // The "stuck" regression: the button must come back instead of spinning forever.
    await waitFor(() => expect(screen.getByRole("button", { name: /create account/i })).toBeEnabled());
  });

  it("explains an unreachable / sleeping server instead of a generic failure", async () => {
    register.mockRejectedValueOnce(Object.assign(new Error("timeout"), { code: "ECONNABORTED" }));

    await fillAndSubmit();

    expect(await screen.findByText(/waking up/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeEnabled();
  });

  it("sends exactly what was typed", async () => {
    register.mockResolvedValueOnce(undefined);
    await fillAndSubmit();
    expect(register).toHaveBeenLastCalledWith("Abhi", "a@gmail.com", "secret1");
  });
});
