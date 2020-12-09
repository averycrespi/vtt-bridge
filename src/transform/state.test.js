import { classes } from "../common";
import { parseState } from "./state";

describe("parse state", () => {
  test("Player rolls STR check with advantage", () => {
    const state = {
      click: { className: classes.rollAbilityScore, event: { ctrlKey: true }, data: { name: "STR", mod: "+1" } },
      visible: true,
      character: "Player",
    };
    const { toast, commands } = parseState(state);
    expect(toast).toBe("Player rolled STR check with advantage!");
    expect(commands).toStrictEqual(["/em : Player rolls STR check with advantage", "/roll 2d20kh1+1"]);
  });

  test("Wizard rolls initiative with disadvantage", () => {
    const state = {
      click: { className: classes.rollInitiative, event: { shiftKey: true }, data: { mod: "0", name: "initiative" } },
      visible: true,
      character: "Wizard",
    };
    const { toast, commands } = parseState(state);
    expect(toast).toBe("Wizard rolled initiative with disadvantage!");
    expect(commands).toStrictEqual(["/em : Wizard rolls initiative with disadvantage", "/roll 2d20kl1 &{tracker}"]);
  });

  test("Fighter rolls Club damage (hidden)", () => {
    const state = {
      click: { className: classes.rollWeaponDamage, event: {}, data: { name: "Club", damage: "1d8" } },
      visible: false,
      character: "Fighter",
    };
    const { toast, commands } = parseState(state);
    expect(toast).toBe("Fighter rolled Club damage! (hidden)");
    expect(commands).toStrictEqual(["/w gm Fighter rolls Club damage", "/gmroll 1d8"]);
  });
});
