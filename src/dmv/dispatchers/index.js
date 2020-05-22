import { addRollAbilityScoreListeners } from "./rollAbilityScore";
import { addRollSavingThrowListeners } from "./rollSavingThrow";
import { addRollSkillListeners } from "./rollSkill";
import { addSelectTabListeners } from "./selectTab";
import { addToggleVisibilityListeners } from "./toggleVisibility";
import { onElementLoad } from "../../common";

export const addDispatchers = (store) =>
  onElementLoad(".character-summary .class-name", () => {
    addToggleVisibilityListeners(store);
    addSelectTabListeners(store);
    addRollAbilityScoreListeners(store);
    addRollSkillListeners(store);
    addRollSavingThrowListeners(store);
  });
