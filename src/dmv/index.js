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
export const connectToRoll20 = (store) =>
  onElementLoad(".character-summary .class-name", () => ready(store));

const ready = (store) => {
  addRollAbilityScoreButtons(store);
  addRollSkillListeners(store);
  addRollSavingThrowListeners(store);
  addTabListeners(store);
  console.debug("Connected to Roll20");
};
