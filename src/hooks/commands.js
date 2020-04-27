/**
 * Create an emote command.
 *
 * @param {Array} parts
 * @returns {String}
 */
export const emote = (...parts) => "/em " + parts.join(" ");

/**
 * Create a roll command.
 *
 * @param {String} mod
 * @returns {String}
 */
export const roll = (mod) => "/roll 1d20" + (mod !== "0" ? mod : "");

/**
 * Create a say command.
 *
 * @param {String} text
 * @returns {String}
 */
export const say = (text) => text;
