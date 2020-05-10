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
export const connectToRoll20 = (onClick, store) =>
  onElementLoad(".character-summary .class-name", () => ready(onClick, store));

const ready = (onClick, store) => {
  addRollAbilityScoreButtons(store);
  addRollSkillListeners(onClick);
  addRollSavingThrowListeners(onClick);
  addTabListeners(onClick);
  console.debug("Connected to Roll20");
};
