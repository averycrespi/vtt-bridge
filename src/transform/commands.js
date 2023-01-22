export const makeD20Roll = (mod, character, name,{ hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "" : "/w gm ";
  const suffix = mod === "0" ? "" : mod;
  let rollType = ""
  if (hasAdvantage) {
    rollType = "advantage";
  } else if (hasDisadvantage) {
    rollType = "disadvantage"
  } else {
    rollType = "always"
  }

  return prefix + "&{template:simple} {{charname="+ character+"}} {{rname="+name+"}} {{mod="+mod+"}} {{r1=[[1d20"+mod+"]]}} {{"+rollType+"=1}} {{r2=[[1d20"+mod+"]]}}"
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

export const makeWeaponAttack = (attack, character, wepName, damage, { hasAdvantage, hasDisadvantage, visible }) => {
  let rollType = ""
  const prefix = visible ? "" : "/w gm ";
  const diceRoll = attack.split("+") //1d20 : mod
  if (hasAdvantage) {
    rollType = "advantage";
    //return prefix + "2d20kh1+" + diceRoll[1];
  } else if (hasDisadvantage) {
    rollType = "disadvantage"
    //return prefix + "2d20kl1+" + diceRoll[1];
  } else {
    rollType = "always"
  }

  return prefix + "&{template:atkdmg} {{charname="+character+"}} {{rname="+wepName+"}} {{mod=+"+diceRoll[1]+"}} {{r1=[[1d20 +"+diceRoll[1]+"]]}} {{attack=1}} {{damage=1}} {{dmg1flag=1}} {{dmg1=[["+damage+"]]}} {{dmg1type=Piercing}} {{crit1=Crit: [[1d4]]}} {{"+rollType+"=1}} {{r2=[[1d20 +"+diceRoll[1]+"]]}}";
};
