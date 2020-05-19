// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event && event.ctrlKey;
const hasDisadvantage = (event) => event && event.shiftKey;

/**
 * Create a toast message.
 *
 * @param {String} text
 * @param {Object} event
 * @returns {String} Toast message
 */
export const makeToast = (text, event = null) => {
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

/**
 * Create an emote command.
 *
 * @param {String} text
 * @param {Object} event
 * @returns {String} Emote command
 */
export const makeEmote = (text, event = null) => {
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

/**
 * Create a roll D20 command.
 *
 * @param {String} mod
 * @param {Object} event
 * @returns {String} Roll command
 */
export const makeD20Roll = (mod, event = null) => {
  // If mod is zero, prevent "1d200" bug.
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

/** Create a roll command for damage. */
export const makeDamageRoll = (damage, event = null) => {
  return "/roll " + damage;
};
