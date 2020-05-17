import { makeEmote, makeRoll, makeToast } from "./commands";

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

test("make a roll", () => expect(makeRoll("+1")).toBe("/roll 1d20+1"));

test("make an unmodified roll", () => expect(makeRoll("0")).toBe("/roll 1d20"));

test("make a roll with advantage", () =>
  expect(makeRoll("-3", eventWithAdvantage)).toBe("/roll 2d20kh1-3"));

test("make a roll with disadvantage", () =>
  expect(makeRoll("+2", eventWithDisadvantage)).toBe("/roll 2d20kl1+2"));

test("make a toast", () => expect(makeToast("hello")).toBe("hello!"));

test("make a toast with advantage", () =>
  expect(makeToast("attacked", eventWithAdvantage)).toBe(
    "attacked with advantage!"
  ));

test("make a toast with disadvantage", () =>
  expect(makeToast("rolled", eventWithDisadvantage)).toBe(
    "rolled with disadvantage!"
  ));
