import { createButton, withLeftMargin } from "./elements";

import createAttackWithWeaponButtons from "./createAttackWithWeaponButtons";
import createRollAbilityScoreButtons from "./createRollAbilityScoreButtons";
import createRollInitiativeButton from "./createRollInitiativeButton";
import createRollSavingThrowButtons from "./createRollSavingThrowButtons";
import createRollSkillButtons from "./createRollSkillButtons";
import hookTabs from "./hookTabs";
import { onElementLoad } from "../common";

const ready = (onClick) => {
  const parent = document.querySelector(".character-summary");
  const button = createButton(
    "connect to roll20",
    function () {
      parent.removeChild(button);
      // Ability scores, skills, and saving throws are always visible.
      createRollAbilityScoreButtons(onClick);
      createRollSkillButtons(onClick);
      createRollSavingThrowButtons(onClick);
      // Initiative and weapons are loaded in the default tab.
      createRollInitiativeButton(onClick);
      createAttackWithWeaponButtons(onClick);
      // Recreate buttons on tab switch.
      hookTabs(onClick);
    },
    [withLeftMargin(), "vtt-connect"]
  );
  parent.appendChild(button);
  console.debug("Created connect to Roll20 button");
};

export default (onClick) => onElementLoad(".class-name", () => ready(onClick));
