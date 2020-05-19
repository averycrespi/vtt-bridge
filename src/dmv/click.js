import * as classes from "./classes";
import * as schema from "./schema";

import { makeD20Roll, makeDamageRoll, makeEmote, makeToast } from "./commands";

import { validate } from "jsonschema";

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
      validate(data, schema.attackWithData, { throwError: true });
      return {
        toast: makeToast("Attacked with " + data.name, event),
        commands: [
          makeEmote("attacks with " + data.name, event),
          makeD20Roll(data.mod, event),
        ],
      };

    case classes.castSpell:
      validate(data, schema.castData, { throwError: true });
      return {
        toast: makeToast(
          "Cast " + data.name + " at level " + data.level,
          event
        ),
        commands: [
          makeEmote("casts " + data.name + " at level " + data.level, event),
          data.description,
        ],
      };

    case classes.rollAbilityScore:
    case classes.rollSkill:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " check", event),
        commands: [
          makeEmote("rolls " + data.name + " check", event),
          makeD20Roll(data.mod, event),
        ],
      };

    case classes.rollInitiative:
    case classes.rollProficiency:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name, event),
        commands: [
          makeEmote("rolls " + data.name, event),
          makeD20Roll(data.mod, event),
        ],
      };

    case classes.rollSavingThrow:
      validate(data, schema.rollData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " save", event),
        commands: [
          makeEmote("rolls " + data.name + " save", event),
          makeD20Roll(data.mod, event),
        ],
      };

    case classes.rollWeaponDamage:
      validate(data, schema.rollDamageData, { throwError: true });
      return {
        toast: makeToast("Rolled " + data.name + " damage", event),
        commands: [
          makeEmote("rolls " + data.name + " damage", event),
          makeDamageRoll(data.damage, event),
        ],
      };

    case classes.useFeature:
      validate(data, schema.useData, { throwError: true });
      return {
        toast: makeToast("Used " + data.name, event),
        commands: [makeEmote("uses " + data.name, event), data.description],
      };

    default:
      throw "Unknown class name: " + className;
  }
};
