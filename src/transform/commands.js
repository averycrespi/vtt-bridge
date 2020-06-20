export const makeD20Roll = (mod, { hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  const suffix = mod === "0" ? "" : mod;
  let dice = "1d20";
  if (hasAdvantage) {
    dice = "2d20kh1";
  } else if (hasDisadvantage) {
    dice = "2d20kl1";
  }
  return prefix + dice + suffix;
};

export const makeDamageRoll = (damage, { visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  return prefix + damage;
};

export const makeDescription = (description, { visible }) => {
  const prefix = visible ? "" : "/w gm ";
  return prefix + description.replace(/\n/g, "\n" + prefix);
};

export const makeEmote = (text, { hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "/em : " : "/w gm ";
  let suffix = "";
  if (hasAdvantage) {
    suffix = " with advantage";
  } else if (hasDisadvantage) {
    suffix = " with disadvantage";
  }
  return prefix + text + suffix;
};
