const say = (text) => text;
const emote = (text) => "/em " + text;
const roll = (dice) => "/r " + dice;

const smartRoll = (mod, event) => {
  if (mod === "0") {
    mod = "";
  }
  if (event.ctrlKey) {
    return "/roll 2d20kh1" + mod;
  } else if (event.shiftKey) {
    return "/roll 2d20kl1" + mod;
  } else {
    return "/roll 1d20" + mod;
  }
};

export const attackWithWeapon = (weapon, mod, event) => [
  emote("attacks with " + weapon),
  smartRoll(mod, event),
];

export const castSpell = (spell) => [emote("casts " + spell)];

export const rollAbilityScoreCheck = (stat, mod, event) => [
  emote("rolls " + stat + " check"),
  smartRoll(mod, event),
];

export const rollInitiative = (mod, event) => [
  emote("rolls initiative"),
  smartRoll(mod, event),
];

export const rollProficiency = (name, mod, event) => [
  emote("rolls " + name),
  smartRoll(mod, event),
];

export const rollSavingThrow = (stat, mod, event) => [
  emote("rolls " + stat + " save"),
  smartRoll(mod, event),
];

export const rollSkillCheck = (skill, mod, event) => [
  emote("rolls " + skill + " check"),
  smartRoll(mod, event),
];

export const rollWeaponDamage = (weapon, damage) => [
  emote("rolls " + weapon + " damage"),
  roll(damage),
];

export const useFeature = (name, description) => [
  emote("uses " + name),
  say(description),
];
