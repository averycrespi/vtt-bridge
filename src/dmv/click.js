import * as classes from "./classes";

import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote, makeToast } from "./commands";

/**
 * Parse a click into a toast and commands.
 *
 * @param {Object} click
 * @param {Boolean} hidden
 * @returns {Object} Toast and commands
 */
export const parseClick = ({ className, event, data }, hidden) => {
  //TODO: validate
  const { name, mod, level, description, damage } = data;
  switch (className) {
    case classes.attackWithSpell:
    case classes.attackWithWeapon:
      return {
        toast: makeToast("Attacked with " + name, event, hidden),
        commands: [makeEmote("attacks with " + name, event, hidden), makeD20Roll(mod, event, hidden)],
      };

    case classes.castSpell:
      return {
        toast: makeToast("Cast " + name + " at level " + level, event, hidden),
        commands: [
          makeEmote("casts " + name + " at level " + level, event, hidden),
          makeDescription(description, event, hidden),
        ],
      };

    case classes.rollAbilityScore:
    case classes.rollSkill:
      return {
        toast: makeToast("Rolled " + name + " check", event, hidden),
        commands: [makeEmote("rolls " + name + " check", event, hidden), makeD20Roll(mod, event, hidden)],
      };

    case classes.rollInitiative:
    case classes.rollProficiency:
      return {
        toast: makeToast("Rolled " + name, event, hidden),
        commands: [makeEmote("rolls " + name, event, hidden), makeD20Roll(mod, event, hidden)],
      };

    case classes.rollSavingThrow:
      return {
        toast: makeToast("Rolled " + name + " save", event, hidden),
        commands: [makeEmote("rolls " + name + " save", event, hidden), makeD20Roll(mod, event, hidden)],
      };

    case classes.rollWeaponDamage:
      return {
        toast: makeToast("Rolled " + name + " damage", event, hidden),
        commands: [makeEmote("rolls " + name + " damage", event, hidden), makeDamageRoll(damage, event, hidden)],
      };

    case classes.useFeature:
      return {
        toast: makeToast("Used " + name, event, hidden),
        commands: [makeEmote("uses " + name, event, hidden), makeDescription(description, event, hidden)],
      };

    default:
      throw "Unknown class name: " + className;
  }
};
