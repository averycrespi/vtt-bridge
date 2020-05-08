import * as commands from "./commands";

test("attack with weapon", () =>
  expect(commands.attackWith("sword", "+2", {})).toEqual({
    toast: "Attacked with sword!",
    commands: ["/emote attacks with sword", "/roll 1d20+2"],
  }));

test("attack with weapon with empty modifier", () =>
  expect(commands.attackWith("sword", "0", {})).toEqual({
    toast: "Attacked with sword!",
    commands: ["/emote attacks with sword", "/roll 1d20"],
  }));

test("attack with weapon with advantage", () =>
  expect(commands.attackWith("sword", "+2", { ctrlKey: true })).toEqual({
    toast: "Attacked with sword!",
    commands: ["/emote attacks with sword with advantage", "/roll 2d20kh1+2"],
  }));

test("attack with weapon with disadvantage", () =>
  expect(commands.attackWith("sword", "+2", { shiftKey: true })).toEqual({
    toast: "Attacked with sword!",
    commands: [
      "/emote attacks with sword with disadvantage",
      "/roll 2d20kl1+2",
    ],
  }));

test("roll check", () =>
  expect(commands.rollCheck("CON", "+3", {})).toEqual({
    toast: "Rolled CON check!",
    commands: ["/emote rolls CON check", "/roll 1d20+3"],
  }));

test("roll damage", () =>
  expect(commands.rollDamage("dagger", "1d10+3")).toEqual({
    toast: "Rolled dagger damage!",
    commands: ["/emote rolls dagger damage", "/roll 1d10+3"],
  }));

test("roll initiative", () =>
  expect(commands.rollFor("initiative", "-5", {})).toEqual({
    toast: "Rolled initiative!",
    commands: ["/emote rolls initiative", "/roll 1d20-5"],
  }));

test("roll save", () =>
  expect(commands.rollSave("WIS", "-3", {})).toEqual({
    toast: "Rolled WIS save!",
    commands: ["/emote rolls WIS save", "/roll 1d20-3"],
  }));

test("use feature", () =>
  expect(commands.useFeature("extra attack", "You can attack again.")).toEqual({
    toast: "Used extra attack!",
    commands: ["/emote uses extra attack", "You can attack again."],
  }));
