import * as classes from "./classes";

import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote, makeToast } from "./commands";

import { parseClick } from "./click";

const neutral = {};
const advantage = { ctrlKey: true };
const disadvantage = { shiftKey: true };

const combinations = [
  [neutral, true],
  [neutral, false],
  [advantage, true],
  [advantage, false],
  [disadvantage, true],
  [disadvantage, false],
];

describe("attack", () => {
  const className = classes.attackWithWeapon;
  const data = { name: "sword", mod: "+1" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Attacked with " + data.name, event, hidden),
      commands: [makeEmote("attacks with " + data.name, event, hidden), makeD20Roll(data.mod, event, hidden)],
    });
  });
});

describe("cast spell", () => {
  const className = classes.castSpell;
  const data = { name: "fireball", level: "3", description: "Fire!" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Cast " + data.name + " at level " + data.level, event, hidden),
      commands: [
        makeEmote("casts " + data.name + " at level " + data.level, event, hidden),
        makeDescription(data.description, event, hidden),
      ],
    });
  });
});

describe("roll check", () => {
  const className = classes.rollAbilityScore;
  const data = { name: "STR", mod: "+1" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Rolled " + data.name + " check", event, hidden),
      commands: [makeEmote("rolls " + data.name + " check", event, hidden), makeD20Roll(data.mod, event, hidden)],
    });
  });
});

describe("roll", () => {
  const className = classes.rollInitiative;
  const data = { name: "initiative", mod: "+1" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Rolled " + data.name, event, hidden),
      commands: [makeEmote("rolls " + data.name, event, hidden), makeD20Roll(data.mod, event, hidden)],
    });
  });
});

describe("roll save", () => {
  const className = classes.rollSavingThrow;
  const data = { name: "CON", mod: "+1" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Rolled " + data.name + " save", event, hidden),
      commands: [makeEmote("rolls " + data.name + " save", event, hidden), makeD20Roll(data.mod, event, hidden)],
    });
  });
});

describe("roll damage", () => {
  const className = classes.rollWeaponDamage;
  const data = { name: "dagger", damage: "1d4+1" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Rolled " + data.name + " damage", event, hidden),
      commands: [
        makeEmote("rolls " + data.name + " damage", event, hidden),
        makeDamageRoll(data.damage, event, hidden),
      ],
    });
  });
});

describe("use feature", () => {
  const className = classes.useFeature;
  const data = { name: "jump", description: "Jump up!" };
  test.each(combinations)("", (event, hidden) => {
    expect(parseClick({ className, event, data }, hidden)).toStrictEqual({
      toast: makeToast("Used " + data.name, event, hidden),
      commands: [makeEmote("uses " + data.name, event, hidden), makeDescription(data.description, event, hidden)],
    });
  });
});

test("unknown class name", () => expect(() => parseClick({ className: "foo", event: neutral, data: {} })).toThrow());
