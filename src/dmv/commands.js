// Does the roll have advantage or disadvantage?
const hasAdvantage = (event) => event.ctrlKey;
const hasDisadvantage = (event) => event.shiftKey;

const eventToRoll = (event) => {
  if (hasAdvantage(event)) {
    return "/roll 2d20kh1";
  } else if (hasDisadvantage(event)) {
    return "/roll 2d20kl1";
  } else {
    return "/roll 1d20";
  }
};

const rollD20 = (mod, event) => eventToRoll(event) + (mod === "0" ? "" : mod);

export const attackWith = (name, mod, event) => ({
  toast: "Attacked with " + name + "!",
  commands: ["/em attacks with " + name, rollD20(mod, event)],
});

export const rollCheck = (name, mod, event) => ({
  toast: "Rolled " + name + " check!",
  commands: ["/em rolls " + name + " check", rollD20(mod, event)],
});

export const rollDamage = (name, damage) => ({
  toast: "Rolled " + name + " damage!",
  commands: ["/em rolls " + name + " damage", "/roll " + damage],
});

export const rollFor = (name, mod, event) => ({
  toast: "Rolled " + name + "!",
  commands: ["/em rolls " + name, rollD20(mod, event)],
});

export const rollSave = (name, mod, event) => ({
  toast: "Rolled " + name + " save!",
  commands: ["/em rolls " + name + " save", rollD20(mod, event)],
});

export const useFeature = (name, description) => ({
  toast: "Used " + name + "!",
  commands: ["/em uses " + name, description],
});
