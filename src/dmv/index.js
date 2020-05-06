import { addRollAbilityScoreButtons } from "./buttons/abilityScore";
import { addRollSavingThrowListeners } from "./listeners/savingThrow";
import { addRollSkillListeners } from "./listeners/skill";
import { addTabListeners } from "./listeners/tab";
import { onElementLoad } from "../common";

/**
 * Connect DMV to Roll20.
 *
 * @param {Function} onClick
 */
export const connectToRoll20 = (onClick) =>
  onElementLoad(".character-summary .class-name", () => ready(onClick));

const ready = (onClick) => {
  addRollAbilityScoreButtons(onClick);
  addRollSkillListeners(onClick);
  addRollSavingThrowListeners(onClick);
  addTabListeners(onClick);
  console.debug("Connected to Roll20");
};
