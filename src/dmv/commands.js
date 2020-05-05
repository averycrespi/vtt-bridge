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
  rollD20(mod, event),
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
 * Roll damage.
 *
 * @param {String} label
 * @param {String} damage
 * @returns {Array} Commands
 */
export const rollDamage = (label, damage) => [
  emote("rolls damage for", label),
  roll(damage),
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
  rollD20(mod, event),
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

const describe = (text) => text;
const emote = (...text) => "/emote " + text.join(" ");
const roll = (dice) => "/roll " + dice;

/**
 * Roll a D20 with optional advantage or disadvantage.
 *
 * @param {String} mod
 * @param {Object} event
 * @returns {String} Command
 */
const rollD20 = (mod, event) => {
  const safeMod = mod !== "0" ? mod : "";
  if (event.ctrlKey) {
    return "/roll 2d20kh1" + safeMod;
  } else if (event.shiftKey) {
    return "/roll 2d20kl1" + safeMod;
  } else {
    return roll("d20" + safeMod);
  }
};
