import { makeToast } from "./toasts";

describe("make a toast", () => {
  test("neutral", () => expect(makeToast("hello", { visible: true })).toBe("hello!"));
  test("with advantage", () =>
    expect(makeToast("hello", { hasAdvantage: true, visible: true })).toBe("hello with advantage!"));
  test("with disadvantage", () =>
    expect(makeToast("hello", { hasDisadvantage: true, visible: true })).toBe("hello with disadvantage!"));
  test("hidden", () => expect(makeToast("hello", { visible: false })).toBe("hello! (hidden)"));
  test("hidden with advantage", () =>
    expect(makeToast("hello", { hasAdvantage: true, visible: false })).toBe("hello with advantage! (hidden)"));
  test("hidden with disadvantage", () =>
    expect(makeToast("hello", { hasDisadvantage: true, visible: false })).toBe("hello with disadvantage! (hidden)"));
});
