import { addRollAbilityScoreListeners } from "./rollAbilityScore";
import { addRollSavingThrowListeners } from "./rollSavingThrow";
import { addRollSkillListeners } from "./rollSkill";
import { addSelectTabListeners } from "./selectTab";
import { addToggleVisibilityListeners } from "./toggleVisibility";
import { onElementLoad } from "../common";
import { setCharacter } from "./setCharacter";

export const addDispatchers = (store, callback) =>
  onElementLoad(".character-summary .class-name", () => {
    setCharacter(store);
    addToggleVisibilityListeners(store);
    addSelectTabListeners(store);
    addRollAbilityScoreListeners(store);
    addRollSkillListeners(store);
    addRollSavingThrowListeners(store);
    callback();
  });
