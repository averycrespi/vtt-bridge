import * as classes from "./classes";

import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote } from "./commands";

import { makeToast } from "./toasts";

export const parseClick = ({ className, event, data }, visible) => {
  const { name, mod, level, description, damage } = data;
  const options = {
    hasAdvantage: event && event.ctrlKey,
    hasDisadvantage: event && event.shiftKey,
    visible,
  };

  switch (className) {
    case classes.attackWithSpell:
    case classes.attackWithWeapon:
      return {
        toast: makeToast("Attacked with " + name, options),
        commands: [makeEmote("attacks with " + name, options), makeD20Roll(mod, options)],
      };
    case classes.castSpell:
      return {
        toast: makeToast("Cast " + name + " at level " + level, options),
        commands: [makeEmote("casts " + name + " at level " + level, options), makeDescription(description, options)],
      };
    case classes.rollAbilityScore:
    case classes.rollSkill:
      return {
        toast: makeToast("Rolled " + name + " check", options),
        commands: [makeEmote("rolls " + name + " check", options), makeD20Roll(mod, options)],
      };
    case classes.rollInitiative:
    case classes.rollProficiency:
      return {
        toast: makeToast("Rolled " + name, options),
        commands: [makeEmote("rolls " + name, options), makeD20Roll(mod, options)],
      };
    case classes.rollSavingThrow:
      return {
        toast: makeToast("Rolled " + name + " save", options),
        commands: [makeEmote("rolls " + name + " save", options), makeD20Roll(mod, options)],
      };
    case classes.rollWeaponDamage:
      return {
        toast: makeToast("Rolled " + name + " damage", options),
        commands: [makeEmote("rolls " + name + " damage", options), makeDamageRoll(damage, options)],
      };
    case classes.useFeature:
      return {
        toast: makeToast("Used " + name, options),
        commands: [makeEmote("uses " + name, options), makeDescription(description, options)],
      };
    default:
      throw "Unknown class name: " + className;
  }
};
