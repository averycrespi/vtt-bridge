import { addRollAbilityScoreListeners } from "./rollAbilityScore";
import { addRollSavingThrowListeners } from "./rollSavingThrow";
import { addRollSkillListeners } from "./rollSkill";
import { addSelectTabListeners } from "./selectTab";
import { addToggleVisibilityListeners } from "./toggleVisibility";
import { onElementLoad } from "../common";
import { setCharacter } from "./setCharacter";

export const addDispatchers = (store, callback) =>
  // Brittle: use class names as a proxy for the app loading.
  onElementLoad(".class-name", () => {
    setCharacter(store);
    addToggleVisibilityListeners(store);

    // The right panel contains tabs, which need to be handled specially.
    addSelectTabListeners(store);

    // These buttons are always loaded in the left panel.
    addRollAbilityScoreListeners(store);
    addRollSkillListeners(store);
    addRollSavingThrowListeners(store);

    callback();
  });
