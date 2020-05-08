// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event && event.ctrlKey;
const hasDisadvantage = (event) => event && event.shiftKey;

const makeToast = (text, event = null) => {
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

const makeEmote = (text, event = null) => {
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

const makeRollD20 = (mod, event = null) => {
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
  toast: makeToast("Attacked with " + name, event),
  commands: [makeEmote("attacks with " + name, event), makeRoll(mod, event)],
});

export const rollCheck = (name, mod, event) => ({
  toast: makeToast("Rolled " + name + " check", event),
  commands: [
    makeEmote("rolls " + name + " check", event),
    makeRoll(mod, event),
  ],
});

export const rollDamage = (name, damage) => ({
  toast: makeToast("Rolled " + name + " damage"),
  commands: [makeEmote("rolls " + name + " damage"), "/roll " + damage],
});

export const rollFor = (name, mod, event) => ({
  toast: makeToast("Rolled " + name, event),
  commands: [makeEmote("rolls " + name, event), makeRoll(mod, event)],
});

export const rollSave = (name, mod, event) => ({
  toast: makeToast("Rolled " + name + " save", event),
  commands: [makeEmote("rolls " + name + " save", event), makeRoll(mod, event)],
});

export const useFeature = (name, description) => ({
  toast: makeToast("Used " + name),
  commands: [makeEmote("uses " + name), description],
});
