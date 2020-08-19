export const makeD20Roll = (mod, { hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  const suffix = mod === "0" ? "" : mod;
  if (hasAdvantage) {
    return prefix + "2d20kh1" + suffix;
  } else if (hasDisadvantage) {
    return prefix + "2d20kl1" + suffix;
  } else {
    return prefix + "1d20" + suffix;
  }
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
  if (hasAdvantage) {
    return prefix + text + " with advantage";
  } else if (hasDisadvantage) {
    return prefix + text + " with disadvantage";
  } else {
    return prefix + text;
  }
};

export const makeWeaponAttack = (attack, { hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  if (hasAdvantage || hasDisadvantage) {
    return prefix + attack + "\n" + prefix + attack;
  } else {
    return prefix + attack;
  }
};
