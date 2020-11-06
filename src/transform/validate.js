const isNonEmptyString = (s) => typeof s === "string" && s.length > 0;

export const isValidAttack = (attack) => isNonEmptyString(attack) && /^[0-9]+d[0-9]+([+|-][0-9]+)?$/.test(attack);
export const isValidDamage = (damage) => isValidAttack(damage);
export const isValidDescription = (description) => isNonEmptyString(description);
export const isValidMod = (mod) => isNonEmptyString(mod) && /^[+|-]?[0-9]+$/.test(mod);
export const isValidName = (name) => isNonEmptyString(name);
