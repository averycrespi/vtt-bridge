import { addRollAbilityScoreListeners } from "./listeners/rollAbilityScore";
import { addRollSavingThrowListeners } from "./listeners/rollSavingThrow";
import { addRollSkillListeners } from "./listeners/rollSkill";
import { addSelectTabListeners } from "./listeners/selectTab";
import { onElementLoad } from "../common";

export const connectToRoll20 = (store) =>
  onElementLoad(".character-summary .class-name", () => ready(store));

const ready = (store) => {
  addSelectTabListeners(store);
  addRollAbilityScoreListeners(store);
  addRollSkillListeners(store);
  addRollSavingThrowListeners(store);
  console.debug("Connected to Roll20");
};
