const describe = (text) => text;
const emote = (...text) => "/em " + text.join(" ");

const rollNeutral = (mod) => "/r 1d20" + (mod !== "0" ? mod : "");
const rollAdvantage = (mod) => "/r 2d20kh1" + (mod !== "0" ? mod : "");
const rollDisadvantage = (mod) => "/r 2d20kl1" + (mod !== "0" ? mod : "");

const roll = (mod, event) => {
  if (event.ctrlKey) {
    return rollAdvantage(mod);
  } else if (event.shiftKey) {
    return rollDisadvantage(mod);
  } else {
    return rollNeutral(mod);
  }
};

/**l
 * Attack with a weapon.
 *
 * @param {String} weapon
 * @param {String} mod
 * @param {Object} event
 * @returns {Array} Commands
 */
export const attackWith = (weapon, mod, event) => [
  emote("attacks with", weapon),
  roll(mod, event),
];

/**
 * Cast a spell or cantrip.
 *
 * @param {String} spell
 * @param {String} details
 * @returns {Array} Commands
 */
export const castSpell = (spell, details) => [
  emote("casts", spell),
  describe(details),
];

/**
 * Roll dice.
 *
 * @param {String} label
 * @param {String} mod
 * @param {Object} event
 * @returns {Array} Commands
 */
export const rollDice = (label, mod, event) => [
  emote("rolls", label),
  roll(mod, event),
];

/**
 * Use an ability.
 *
 * @param {String} ability
 * @param {String} details
 * @returns {Array} Commands
 */
export const useAbility = (ability, details) => [
  emote("uses", ability),
  describe(details),
];
