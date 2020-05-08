// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event && event.ctrlKey;
const hasDisadvantage = (event) => event && event.shiftKey;

const emote = (text, event) => {
  if (!event) {
    return "/emote " + text;
  } else if (hasAdvantage(event)) {
    return "/emote " + text + " with advantage";
  } else if (hasDisadvantage(event)) {
    return "/emote " + text + " with disadvantage";
  } else {
    return "/emote " + text;
  }
};

const rollD20 = (mod, event = null) => {
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

export const attackWith = (name, mod, event) => ({
  toast: "Attacked with " + name + "!",
  commands: [emote("attacks with " + name, event), rollD20(mod, event)],
});

export const rollCheck = (name, mod, event) => ({
  toast: "Rolled " + name + " check!",
  commands: [emote("rolls " + name + " check", event), rollD20(mod, event)],
});

export const rollDamage = (name, damage) => ({
  toast: "Rolled " + name + " damage!",
  commands: [emote("rolls " + name + " damage"), "/roll " + damage],
});

export const rollFor = (name, mod, event) => ({
  toast: "Rolled " + name + "!",
  commands: [emote("rolls " + name, event), rollD20(mod, event)],
});

export const rollSave = (name, mod, event) => ({
  toast: "Rolled " + name + " save!",
  commands: [emote("rolls " + name + " save", event), rollD20(mod, event)],
});

export const useFeature = (name, description) => ({
  toast: "Used " + name + "!",
  commands: [emote("uses " + name), description],
});
