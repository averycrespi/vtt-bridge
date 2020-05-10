import * as classes from "./classes";

export const buildCommands = ({ className, event, data }) => {
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
    case classes.rollInitiatve:
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
      console.error("Unrecognized class name: " + className);
      return [];
  }
};

// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event && event.ctrlKey;
const hasDisadvantage = (event) => event && event.shiftKey;

const makeToast = (text, event = null) => {
  if (!event) {
    return text + "!";
  } else if (hasAdvantage(event)) {
    return text + " with advantage!";
  } else if (hasDisadvantage(event)) {
    return text + " with disadvantage!";
  } else {
    return text + "!";
  }
};

const makeEmote = (text, event = null) => {
  if (!event) {
    return "/em " + text;
  } else if (hasAdvantage(event)) {
    return "/em " + text + " with advantage";
  } else if (hasDisadvantage(event)) {
    return "/em " + text + " with disadvantage";
  } else {
    return "/em " + text;
  }
};

const makeRoll = (mod, event = null) => {
  const safeMod = mod === "0" ? "" : mod;
  if (!event) {
    return "/roll 1d20" + safeMod;
  } else if (hasAdvantage(event)) {
    return "/roll 2d20kh1" + safeMod;
  } else if (hasDisadvantage(event)) {
    return "/roll 2d20kl1" + safeMod;
  } else {
    return "/roll 1d20" + safeMod;
  }
};
