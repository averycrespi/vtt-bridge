import * as classes from "./classes";

import {
  makeD20Roll,
  makeDamageRoll,
  makeDescription,
  makeEmote,
  makeToast,
} from "./commands";

import { parseClick } from "./click";

test("parse an attack with spell click", () =>
  expect(
    parseClick({
      className: classes.attackWithWeapon,
      event: {},
      data: { name: "sword", mod: "+1" },
    })
  ).toStrictEqual({
    toast: makeToast("Attacked with sword"),
    commands: [makeEmote("attacks with sword"), makeD20Roll("+1")],
  }));

test("parse a roll weapon damage click", () =>
  expect(
    parseClick({
      className: classes.rollWeaponDamage,
      event: {},
      data: { name: "dagger", damage: "1d4+2" },
    })
  ).toStrictEqual({
    toast: makeToast("Rolled dagger damage"),
    commands: [makeEmote("rolls dagger damage"), makeDamageRoll("1d4+2")],
  }));
test("parse a use feature click", () =>
  expect(
    parseClick({
      className: classes.useFeature,
      event: {},
      data: { name: "extra attack", description: "Make an extra attack." },
    })
  ).toStrictEqual({
    toast: makeToast("Used extra attack"),
    commands: [
      makeEmote("uses extra attack"),
      makeDescription("Make an extra attack."),
    ],
  }));

test("parse an unknown class name", () =>
  expect(() => {
    parseClick({ className: "foo" });
  }).toThrow());

test("parse clicks without data", () => {
  for (const className in classes) {
    expect(() => parseClick({ className, event: {}, data: {} })).toThrow();
  }
});
