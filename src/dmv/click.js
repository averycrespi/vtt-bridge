import * as classes from "./classes";
import * as schema from "./schema";

import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote, makeToast } from "./commands";

import { validate } from "jsonschema";

/**
 * Parse a click into a toast and commands.
 *
 * @param {Object} click
 * @param {Boolean} hidden
 * @returns {Object} Toast and commands
 */
export const parseClick = ({ className, event, data }, hidden) => {
  switch (className) {
    case classes.attackWithSpell:
    case classes.attackWithWeapon:
      validate(data, schema.attackWithData, { throwError: true });
      return {
        toast: makeToast("Attacked with " + data.name, event, hidden),
        commands: [makeEmote("attacks with " + data.name, event, hidden), makeD20Roll(data.mod, event, hidden)],
      };

    case classes.castSpell:
      validate(data, schema.castData, { throwError: true });
      return {
        toast: makeToast("Cast " + data.name + " at level " + data.level, event, hidden),
        commands: [
          makeEmote("casts " + data.name + " at level " + data.level, event, hidden),
          makeDescription(data.description, event, hidden),
        ],
      };

    case classes.rollAbilityScore:
    case classes.rollSkill:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " check", event, hidden),
        commands: [makeEmote("rolls " + data.name + " check", event, hidden), makeD20Roll(data.mod, event, hidden)],
      };

    case classes.rollInitiative:
    case classes.rollProficiency:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name, event, hidden),
        commands: [makeEmote("rolls " + data.name, event, hidden), makeD20Roll(data.mod, event, hidden)],
      };

    case classes.rollSavingThrow:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " save", event, hidden),
        commands: [makeEmote("rolls " + data.name + " save", event, hidden), makeD20Roll(data.mod, event, hidden)],
      };

    case classes.rollWeaponDamage:
      validate(data, schema.rollDamageData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " damage", event, hidden),
        commands: [
          makeEmote("rolls " + data.name + " damage", event, hidden),
          makeDamageRoll(data.damage, event, hidden),
        ],
      };

    case classes.useFeature:
      validate(data, schema.useData, { throwError: true });
      return {
        toast: makeToast("Used " + data.name, event, hidden),
        commands: [makeEmote("uses " + data.name, event, hidden), makeDescription(data.description, event, hidden)],
      };

    default:
      throw "Unknown class name: " + className;
  }
};
