export const makeD20Roll = (mod, character, name, { hasAdvantage, hasDisadvantage, visible }) => {
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

  return prefix + "&{template:simple} {{charname=" + character + "}} {{rname=" + name + "}} {{mod=" + mod + "}} {{r1=[[1d20" + mod + "]]}} {{" + rollType + "=1}} {{r2=[[1d20" + mod + "]]}}"
};

export const makeDamageRoll = (damage, { visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  return prefix + damage;
};

export const makeDescription = (description, character, spellName, spellItems, { visible }) => {
  const prefix = visible ? "" : "/w gm ";
  const descriptionBlock = spellItems[4];
  let components = "";
  let materials = "";

  //Split out the casting components and material components of spell description
  //As of writing this there are NO spells with only material components, RAW requires an open hand to handle material components, so will always be at least S,M, so didn't write logic to handle only material componets

  if (descriptionBlock.length > 15) { //If the spell card contains material components
    components = descriptionBlock.substr(11, descriptionBlock.length).split(",")
    const materialsArray = components[components.length - 1].split(" ");
    components.splice(-1);
    components.push(materialsArray[1])
    materialsArray.splice(1, 1);
    materials = materialsArray.join(" ").slice(2,-1); //The slice is to remove the first and last bracket since roll20 template adds them in
  } else if (descriptionBlock.length > 12) { // Is just V,S
    components = descriptionBlock.substr(11, 15)
  } else { //Only V or S
    components = descriptionBlock.substr(11, 12)
  }

  //Work out if the spell as VSM for template 
  const verbal = (components.includes("V") || components.includes(" V")) ? "1" : "0";
  const somatic = (components.includes("S") || components.includes(" S") ) ? "1" : "0";
  const material = (components.includes("M") || components.includes(" M")) ? "1" : "0";


  return prefix + "&{template:spell} {{charname=" + character + "}} {{name=" + spellName + "}} {{castingtime=" + spellItems[1].substr(13, spellItems[1].length) + "}} {{range=" + spellItems[2] + "}} {{duration=" + spellItems[3] + "}} {{level=" + spellItems[0] + "}} {{v="+verbal+ "}} {{s="+somatic+ "}} {{m="+material+ "}} {{material=" + materials + "}} {{description=" + description.replace(/\n/g, "\n") + "}}"
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

  return prefix + "&{template:atkdmg} {{charname=" + character + "}} {{rname=" + wepName + "}} {{mod=+" + diceRoll[1] + "}} {{r1=[[1d20 +" + diceRoll[1] + "]]}} {{attack=1}} {{damage=1}} {{dmg1flag=1}} {{dmg1=[[" + damage + "]]}} {{dmg1type=Piercing}} {{crit1=Crit: [[1d4]]}} {{" + rollType + "=1}} {{r2=[[1d20 +" + diceRoll[1] + "]]}}";
};

export const makeSpellAttack = (attack, { hasAdvantage, hasDisadvantage, visible }) => {
  const prefix = visible ? "/roll " : "/gmroll ";
  if (hasAdvantage || hasDisadvantage) {
    return prefix + attack + "\n" + prefix + attack;
  } else {
    return prefix + attack;
  }
};
