import { makeD20Roll, makeDamageRoll, makeDescription, makeEmote, makeWeaponAttack, makeSpellAttack , makeTrait} from "./commands";

import { classes } from "../common";
import { makeToast } from "./toasts";

export const parseState = (state) => {
  const { click, visible, character } = state;
  const { className, event, data } = click;
  const { name, mod, description, attack, damage, spellItems } = data;
  const options = {
    hasAdvantage: event && event.ctrlKey,
    hasDisadvantage: event && event.shiftKey,
    visible,
  };

  switch (className) {
   
    case classes.attackWithWeapon:
      return {
        toast: makeToast(`${character} attacked with ${name}`, options),
        commands: [makeEmote(`${character} attacks with ${name}`, options), makeWeaponAttack(attack, character, name, damage, options)],
      };
      case classes.attackWithSpell:
      return {
          toast: makeToast(`${character} attacked with ${name}`, options),
          commands: [makeEmote(`${character} attacks with ${name}`, options), makeSpellAttack(attack, options)],
      };
    case classes.castSpell:
      return {
        toast: makeToast(`${character} cast ${name}`, options),
        commands: [makeEmote(`${character} casts ${name}`, options), makeDescription(description, character, name, spellItems, options)],

      };
    case classes.rollAbilityScore:
    case classes.rollSkill:
      return {
        toast: makeToast(`${character} rolled ${name} check`, options),
        commands: [makeEmote(`${character} rolls ${name} check`, options), makeD20Roll(mod, character, name, options)],
      };
    case classes.rollInitiative:
      return {
        toast: makeToast(`${character} rolled ${name}`, options),
        // Add turn tracker support to initiative rolls.
        commands: [makeEmote(`${character} rolls ${name}`, options), makeD20Roll(mod, character, name, options) + " &{tracker}"],
      };
    case classes.rollProficiency:
      return {
        toast: makeToast(`${character} rolled ${name}`, options),
        commands: [makeEmote(`${character} rolls ${name}`, options), makeD20Roll(mod, character, name, options)],
      };
    case classes.rollSavingThrow:
      return {
        toast: makeToast(`${character} rolled ${name} save`, options),
        commands: [makeEmote(`${character} rolls ${name} save`, options), makeD20Roll(mod, character, name, options)],
      };
    case classes.rollWeaponDamage:
      return {
        toast: makeToast(`${character} rolled ${name} damage`, options),
        commands: [makeEmote(`${character} rolls ${name} damage`, options), makeDamageRoll(damage, options)],
      };
    case classes.useFeature:
      return {
        toast: makeToast(`${character} used ${name}`, options),
        commands: [makeEmote(`${character} uses ${name}`, options), makeTrait(description, character, name, options)],
      };
    default:
      throw `Unknown class name: ${className}`;
  }
};
