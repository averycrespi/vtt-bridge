import { createButton, withLeftMargin } from "./elements";

import addTabListeners from "./addTabListeners";
import createAttackWithWeaponButtons from "./createAttackWithWeaponButtons";
import createRollAbilityScoreButtons from "./createRollAbilityScoreButtons";
import createRollInitiativeButton from "./createRollInitiativeButton";
import createRollSavingThrowButtons from "./createRollSavingThrowButtons";
import createRollSkillButtons from "./createRollSkillButtons";
import { onElementLoad } from "../common";

const ready = (onClick) => {
  const parent = document.querySelector(".character-summary");
  const button = createButton(
    "connect to roll20",
    function () {
      // Hide the connect button after it's clicked.
      button.remove();

      // Ability scores, skills, and saving throws are always visible.
      createRollAbilityScoreButtons(onClick);
      createRollSkillButtons(onClick);
      createRollSavingThrowButtons(onClick);

      // Initiative and weapons are loaded in the default tab.
      createRollInitiativeButton(onClick);
      createAttackWithWeaponButtons(onClick);

      addTabListeners(onClick);
    },
    [withLeftMargin(), "vtt-connect"]
  );
  parent.appendChild(button);
  console.debug("Created connect button");
};

export default (onClick) => onElementLoad(".class-name", () => ready(onClick));
