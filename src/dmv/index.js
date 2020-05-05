import { addRollAbilityScoreButtons } from "./buttons/rollAbilityScore";
import { addRollSavingThrowListeners } from "./listeners/rollSavingThrow";
import { addRollSkillListeners } from "./listeners/rollSkill";
import { addTabListeners } from "./listeners/tab";
import { onElementLoad } from "../common";

/**
 * Connect DMV to Roll20.
 *
 * @param {Function} onClick
 */
export const connectToRoll20 = (onClick) =>
  onElementLoad(".character-summary", () => ready(onClick));

const ready = (onClick) => {
  addRollAbilityScoreButtons(onClick);
  addRollSkillListeners(onClick);
  addRollSavingThrowListeners(onClick);
  addTabListeners(onClick);
  console.debug("Connected to Roll20");
};
