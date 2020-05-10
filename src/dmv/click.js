import * as classes from "./classes";

import { makeEmote, makeRoll, makeToast } from "./commands";

/**
 * Parse a click into a toast and commands.
 *
 * @param {Object} click
 * @returns {Object} Toast and commands
 */
export const parseClick = ({ className, event, data }) => {
  //TODO: add schema validation
  //TODO: add unit tests
  const { name, mod, description, damage } = data;
  switch (className) {
    case classes.attackWithSpell:
    case classes.attackWithWeapon:
      return {
        toast: makeToast("Attacked with " + name, event),
        commands: [
          makeEmote("attacks with " + name, event),
          makeRoll(mod, event),
        ],
      };
    case classes.rollAbilityScore:
    case classes.rollSkill:
      return {
        toast: makeToast("Rolled " + name + " check", event),
        commands: [
          makeEmote("rolls " + name + " check", event),
          makeRoll(mod, event),
        ],
      };
    case classes.rollInitiative:
    case classes.rollProficiency:
      return {
        toast: makeToast("Rolled " + name, event),
        commands: [makeEmote("rolls " + name, event), makeRoll(mod, event)],
      };
    case classes.rollSavingThrow:
      return {
        toast: makeToast("Rolled " + name + " save", event),
        commands: [
          makeEmote("rolls " + name + " save", event),
          makeRoll(mod, event),
        ],
      };
    case classes.rollWeaponDamage:
      return {
        toast: makeToast("Rolled " + name + " damage"),
        commands: [makeEmote("rolls " + name + " damage"), "/roll " + damage],
      };
    case classes.useFeature:
      return {
        toast: makeToast("Used " + name),
        commands: [makeEmote("uses " + name), description],
      };
    default:
      throw "Unknown class name: " + className;
  }
};
