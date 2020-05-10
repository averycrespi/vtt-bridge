import { addRollAbilityScoreListeners } from "./listeners/rollAbilityScore";
import { addRollSavingThrowListeners } from "./listeners/rollSavingThrow";
import { addRollSkillListeners } from "./listeners/rollSkill";
import { addSelectTabListeners } from "./listeners/selectTab";
import { onElementLoad } from "../common";

/**
 * Connect a DMV character sheet to Roll20.
 *
 * All necessary buttons and listeners will be created.
 *
 * @param {Object} store
 */
export const connectToRoll20 = (store) =>
  onElementLoad(".character-summary .class-name", () => ready(store));

const ready = (store) => {
  addSelectTabListeners(store);
  addRollAbilityScoreListeners(store);
  addRollSkillListeners(store);
  addRollSavingThrowListeners(store);
  console.debug("Connected to Roll20");
};
