// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event && event.ctrlKey;
const hasDisadvantage = (event) => event && event.shiftKey;

/**
 * Create a toast message.
 *
 * @param {String} text
 * @param {Object} event
 * @param {Boolean} hidden
 * @returns {String} Toast message
 */
export const makeToast = (text, event = null, hidden = false) => {
  let suffix = "!";
  if (hasAdvantage(event)) {
    suffix = " with advantage!";
  } else if (hasDisadvantage(event)) {
    suffix = " with disadvantage!";
  }
  if (hidden) {
    suffix += " (hidden)";
  }
  return text + suffix;
};

/**
 * Create a description.
 *
 * @param {String} description
 * @param {String} text
 * @param {Object} event
 * @returns {String} Description
 */
export const makeDescription = (description, event = null, hidden = false) => {
  const prefix = hidden ? "/w gm " : "";
  return prefix + description;
};

/**
 * Create an emote command.
 *
 * @param {String} text
 * @param {Object} event
 * @param {Boolean} hidden
 * @returns {String} Emote command
 */
export const makeEmote = (text, event = null, hidden = false) => {
  const prefix = hidden ? "/w gm " : "/em ";
  let suffix = "";
  if (hasAdvantage(event)) {
    suffix = " with advantage";
  } else if (hasDisadvantage(event)) {
    suffix = " with disadvantage";
  }
  return prefix + text + suffix;
};

/**
 * Create a roll D20 command.
 *
 * @param {String} mod
 * @param {Object} event
 * @param {Boolean} hidden
 * @returns {String} Roll command
 */
export const makeD20Roll = (mod, event = null, hidden = false) => {
  const prefix = hidden ? "/gmroll " : "/roll ";
  const suffix = mod === "0" ? "" : mod;
  let dice = "1d20";
  if (hasAdvantage(event)) {
    dice = "2d20kh1";
  } else if (hasDisadvantage(event)) {
    dice = "2d20kl1";
  }
  return prefix + dice + suffix;
};

/** Create a roll command for damage.
 *
 * @param {String} damage
 * @param {Object} event
 * @param {Boolean} hidden
 * @returns {String} Roll command
 */
export const makeDamageRoll = (damage, event = null, hidden = false) => {
  const prefix = hidden ? "/gmroll " : "/roll ";
  return prefix + damage;
};
