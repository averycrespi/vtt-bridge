import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote, makeWeaponAttack } from "./commands";

describe("make a D20 roll", () => {
  test("unmodified", () => expect(makeD20Roll("0", { visible: true })).toBe("/roll 1d20"));
  test("+1", () => expect(makeD20Roll("+1", { visible: true })).toBe("/roll 1d20+1"));
  test("-1", () => expect(makeD20Roll("-1", { visible: true })).toBe("/roll 1d20-1"));
  test("with advantage", () =>
    expect(makeD20Roll("+1", { hasAdvantage: true, visible: true })).toBe("/roll 2d20kh1+1"));
  test("with disadvantage", () =>
    expect(makeD20Roll("+1", { hasDisadvantage: true, visible: true })).toBe("/roll 2d20kl1+1"));
  test("hidden", () => expect(makeD20Roll("+1", { visible: false })).toBe("/gmroll 1d20+1"));
  test("hidden with advantage", () =>
    expect(makeD20Roll("+1", { hasAdvantage: true, visible: false })).toBe("/gmroll 2d20kh1+1"));
  test("hidden with disadvantage", () =>
    expect(makeD20Roll("+1", { hasDisadvantage: true, visible: false })).toBe("/gmroll 2d20kl1+1"));
});

describe("make a damage roll", () => {
  test("unmodified", () => expect(makeDamageRoll("1d4", { visible: true })).toBe("/roll 1d4"));
  test("modified", () => expect(makeDamageRoll("1d4+2", { visible: true })).toBe("/roll 1d4+2"));
  test("hidden", () => expect(makeDamageRoll("1d4+2", { visible: false })).toBe("/gmroll 1d4+2"));
});

describe("make a description", () => {
  test("neutral", () => expect(makeDescription("Say hello!", { visible: true })).toBe("Say hello!"));
  test("hidden", () => expect(makeDescription("Say hello!", { visible: false })).toBe("/w gm Say hello!"));
});

describe("make an emote", () => {
  test("unmodified", () => expect(makeEmote("rolls", { visible: true })).toBe("/em : rolls"));
  test("with advantage", () =>
    expect(makeEmote("rolls", { hasAdvantage: true, visible: true })).toBe("/em : rolls with advantage"));
  test("with disadvantage", () =>
    expect(makeEmote("rolls", { hasDisadvantage: true, visible: true })).toBe("/em : rolls with disadvantage"));
  test("hidden", () => expect(makeEmote("rolls", { visible: false })).toBe("/w gm rolls"));
  test("hidden with advantage", () =>
    expect(makeEmote("rolls", { hasAdvantage: true, visible: false })).toBe("/w gm rolls with advantage"));
  test("hidden with disadvantage", () =>
    expect(makeEmote("rolls", { hasDisadvantage: true, visible: false })).toBe("/w gm rolls with disadvantage"));
});

describe("make a weapon attack", () => {
  test("unmodified", () => expect(makeWeaponAttack("1d4", { visible: true })).toBe("/roll 1d4"));
  test("modified", () => expect(makeWeaponAttack("1d4+2", { visible: true })).toBe("/roll 1d4+2"));
  test("with advantage", () =>
    expect(makeWeaponAttack("1d4+2", { visible: true, hasAdvantage: true })).toBe("/roll 1d4+2\n/roll 1d4+2"));
  test("with disadvantage", () =>
    expect(makeWeaponAttack("1d4+2", { visible: true, hasDisadvantage: true })).toBe("/roll 1d4+2\n/roll 1d4+2"));
  test("hidden", () => expect(makeWeaponAttack("1d4+2", { visible: false })).toBe("/gmroll 1d4+2"));
  test("hidden with advantage", () =>
    expect(makeWeaponAttack("1d4+2", { visible: false, hasAdvantage: true })).toBe("/gmroll 1d4+2\n/gmroll 1d4+2"));
  test("hidden with disadvantage", () =>
    expect(makeWeaponAttack("1d4+2", { visible: false, hasDisadvantage: true })).toBe("/gmroll 1d4+2\n/gmroll 1d4+2"));
});
