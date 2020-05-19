import {
  makeD20Roll,
  makeDamageRoll,
  makeDescription,
  makeEmote,
  makeToast,
} from "./commands";

const eventWithAdvantage = { ctrlKey: true };
const eventWithDisadvantage = { shiftKey: true };

test("make an emote", () =>
  expect(makeEmote("says hello")).toBe("/em says hello"));

test("make an emote with advantage", () =>
  expect(makeEmote("attacks", eventWithAdvantage)).toBe(
    "/em attacks with advantage"
  ));

test("make an emote with disadvantage", () =>
  expect(makeEmote("rolls", eventWithDisadvantage)).toBe(
    "/em rolls with disadvantage"
  ));

test("make a hidden emote", () =>
  expect(makeEmote("says hello", {}, true)).toBe("/w gm says hello"));

test("make a D20 roll", () => expect(makeD20Roll("+1")).toBe("/roll 1d20+1"));

test("make an unmodified D20 roll", () =>
  expect(makeD20Roll("0")).toBe("/roll 1d20"));

test("make a D20 roll with advantage", () =>
  expect(makeD20Roll("-3", eventWithAdvantage)).toBe("/roll 2d20kh1-3"));

test("make a D20 roll with disadvantage", () =>
  expect(makeD20Roll("+2", eventWithDisadvantage)).toBe("/roll 2d20kl1+2"));

test("make a hidden D20 roll", () =>
  expect(makeD20Roll("+1", {}, true)).toBe("/gmroll 1d20+1"));

test("make a damage roll", () =>
  expect(makeDamageRoll("1d4+2")).toBe("/roll 1d4+2"));

test("make a hidden damage roll", () =>
  expect(makeDamageRoll("1d4+2", {}, true)).toBe("/gmroll 1d4+2"));

test("make a toast", () => expect(makeToast("hello")).toBe("hello!"));

test("make a toast with advantage", () =>
  expect(makeToast("attacked", eventWithAdvantage)).toBe(
    "attacked with advantage!"
  ));

test("make a toast with disadvantage", () =>
  expect(makeToast("rolled", eventWithDisadvantage)).toBe(
    "rolled with disadvantage!"
  ));

test("make a hidden toast", () =>
  expect(makeToast("hello", {}, true)).toBe("hello! (hidden)"));

test("make a description", () =>
  expect(makeDescription("Say hello!")).toBe("Say hello!"));

test("make a hidden description", () =>
  expect(makeDescription("Say hello!", {}, true)).toBe("/w gm Say hello!"));
