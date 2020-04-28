const describe = (text) => "*" + text + "*";
const emote = (...text) => "/em " + text.join(" ");
const roll = (mod) => "/r 1d20" + (mod !== "0" ? mod : "");

/**
 * Attack with a weapon.
 *
 * @param {String} weapon
 * @param {String} mod
 * @returns {Array} Commands
 */
export const attackWith = (weapon, mod) => [
  emote("attacks with", weapon),
  roll(mod),
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
 * @returns {Array} Commands
 */
export const rollDice = (label, mod) => [emote("rolls", label), roll(mod)];

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
