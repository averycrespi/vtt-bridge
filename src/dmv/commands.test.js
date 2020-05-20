import {
  makeD20Roll,
  makeDamageRoll,
  makeDescription,
  makeEmote,
  makeToast,
} from "./commands";

const neutral = {};
const advantage = { ctrlKey: true };
const disadvantage = { shiftKey: true };

describe("make a D20 roll", () => {
  test("unmodified", () => expect(makeD20Roll("0")).toBe("/roll 1d20"));
  test("+1", () => expect(makeD20Roll("+1")).toBe("/roll 1d20+1"));
  test("-1", () => expect(makeD20Roll("-1")).toBe("/roll 1d20-1"));
  test("with advantage", () =>
    expect(makeD20Roll("+1", advantage)).toBe("/roll 2d20kh1+1"));
  test("with disadvantage", () =>
    expect(makeD20Roll("+1", disadvantage)).toBe("/roll 2d20kl1+1"));
  test("hidden", () =>
    expect(makeD20Roll("+1", neutral, true)).toBe("/gmroll 1d20+1"));
  test("hidden with advantage", () =>
    expect(makeD20Roll("+1", advantage, true)).toBe("/gmroll 2d20kh1+1"));
  test("hidden with disadvantage", () =>
    expect(makeD20Roll("+1", disadvantage, true)).toBe("/gmroll 2d20kl1+1"));
});

describe("make a damage roll", () => {
  test("unmodified", () => expect(makeDamageRoll("1d4")).toBe("/roll 1d4"));
  test("modified", () => expect(makeDamageRoll("1d4+2")).toBe("/roll 1d4+2"));
  test("hidden", () =>
    expect(makeDamageRoll("1d4+2", neutral, true)).toBe("/gmroll 1d4+2"));
});

describe("make a description", () => {
  test("neutral", () =>
    expect(makeDescription("Say hello!")).toBe("Say hello!"));
  test("hidden", () =>
    expect(makeDescription("Say hello!", neutral, true)).toBe(
      "/w gm Say hello!"
    ));
});

describe("make an emote", () => {
  test("unmodified", () => expect(makeEmote("rolls")).toBe("/em rolls"));
  test("with advantage", () =>
    expect(makeEmote("rolls", advantage)).toBe("/em rolls with advantage"));
  test("with disadvantage", () =>
    expect(makeEmote("rolls", disadvantage)).toBe(
      "/em rolls with disadvantage"
    ));
  test("hidden", () =>
    expect(makeEmote("rolls", neutral, true)).toBe("/w gm rolls"));
  test("hidden with advantage", () =>
    expect(makeEmote("rolls", advantage, true)).toBe(
      "/w gm rolls with advantage"
    ));
  test("hidden with disadvantage", () =>
    expect(makeEmote("rolls", disadvantage, true)).toBe(
      "/w gm rolls with disadvantage"
    ));
});

describe("make a toast", () => {
  test("neutral", () => expect(makeToast("hello")).toBe("hello!"));
  test("with advantage", () =>
    expect(makeToast("hello", advantage)).toBe("hello with advantage!"));
  test("with disadvantage", () =>
    expect(makeToast("hello", disadvantage)).toBe("hello with disadvantage!"));
  test("hidden", () =>
    expect(makeToast("hello", neutral, true)).toBe("hello! (hidden)"));
  test("hidden with advantage", () =>
    expect(makeToast("hello", advantage, true)).toBe(
      "hello with advantage! (hidden)"
    ));
  test("hidden with disadvantage", () =>
    expect(makeToast("hello", disadvantage, true)).toBe(
      "hello with disadvantage! (hidden)"
    ));
});
