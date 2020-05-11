import * as classes from "./classes";

import { makeEmote, makeRoll, makeToast } from "./commands";

/**
 * Parse a click into a toast and commands.
 *
 * @param {Object} click
 * @returns {Object} Toast and commands
 */
export const parseClick = ({ className, event, data }) => {
  switch (className) {
    case classes.attackWithSpell:
    case classes.attackWithWeapon:
      if (!data.name || !data.mod) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Attacked with " + data.name, event),
        commands: [
          makeEmote("attacks with " + data.name, event),
          makeRoll(data.mod, event),
        ],
      };

    case classes.rollAbilityScore:
    case classes.rollSkill:
      if (!data.name || !data.mod) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Rolled " + data.name + " check", event),
        commands: [
          makeEmote("rolls " + data.name + " check", event),
          makeRoll(data.mod, event),
        ],
      };

    case classes.rollInitiative:
    case classes.rollProficiency:
      if (!data.name || !data.mod) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Rolled " + data.name, event),
        commands: [
          makeEmote("rolls " + data.name, event),
          makeRoll(data.mod, event),
        ],
      };

    case classes.rollSavingThrow:
      if (!data.name || !data.mod) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Rolled " + data.name + " save", event),
        commands: [
          makeEmote("rolls " + data.name + " save", event),
          makeRoll(data.mod, event),
        ],
      };
    case classes.rollWeaponDamage:
      if (!data.name || !data.damage) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Rolled " + data.name + " damage", event),
        commands: [
          makeEmote("rolls " + data.name + " damage", event),
          "/roll " + data.damage,
        ],
      };
    case classes.useFeature:
      if (!data.name || !data.description) {
        throw "Invalid data for: " + className + ": " + JSON.stringify(data);
      }
      return {
        toast: makeToast("Used " + data.name, event),
        commands: [makeEmote("uses " + data.name, event), data.description],
      };

    default:
      throw "Unknown class name: " + className;
  }
};
