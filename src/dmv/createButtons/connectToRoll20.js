import { createButton, withLeftMargin } from "../elements";

import createAttackWithWeaponButtons from "./attackWithWeapon";
import createRollAbilityScoreButtons from "./rollAbilityScore";
import createRollInitiativeButton from "./rollInitiative";
import createRollProficiencyButtons from "./rollProficiency";
import createRollSavingThrowButtons from "./rollSavingThrow";
import createRollSkillButtons from "./rollSkill";
import createUseAbilityButtons from "./useAbility";
import { lookForSpells } from "../spells";
import { onElementLoad } from "../../common";

/**
 * Which tab is currently selected?
 *
 * @global
 */
let activeTab = 0;

/**
 * Has the connect button been clicked?
 *
 * @global
 */
let connected = false;

/**
 * Which functions need to be called when a tab is selected?
 *
 * @global
 */
const onTabSelect = {
  0: [createRollInitiativeButton, createAttackWithWeaponButtons],
  1: [createRollProficiencyButtons],
  2: [], // Cantrips and spells are handled differently.
  3: [createUseAbilityButtons],
  4: [createAttackWithWeaponButtons],
};

const ready = (onClick) => {
  const parent = document.querySelector(".character-summary");
  const button = createButton(
    "connect to roll20",
    function () {
      // Hide the connect button after it's clicked.
      connected = true;
      button.remove();

      // Create buttons that are always visible.
      createRollAbilityScoreButtons(onClick);
      createRollSkillButtons(onClick);
      createRollSavingThrowButtons(onClick);

      // Create buttons for the selected tab.
      onTabSelect[activeTab].map((f) => f(onClick));
    },
    [withLeftMargin(), "vtt-connect"]
  );
  parent.appendChild(button);
  console.debug("Created connect button");

  // We need to add tab listeners BEFORE the connect button is clicked.
  // This ensures that activeTab is accurate during the connect button's onClick function.
  addTabListeners(onClick);
  console.debug("Added tab listeners");
};

export default (onClick) =>
  onElementLoad(".character-summary .class-name", () => ready(onClick));

const addTabListeners = (onClick) => {
  const [
    combatTab,
    proficienciesTab,
    spellsTab,
    featuresTab,
    equipmentTab,
  ] = document.querySelectorAll(".flex-grow-1.t-a-c");

  combatTab.addEventListener("click", () => {
    console.debug("Selected combat tab");
    if (activeTab !== 0 && connected) {
      onTabSelect[0].map((f) => f(onClick));
    }
    activeTab = 0;
  });

  proficienciesTab.addEventListener("click", () => {
    console.debug("Selected proficiencies tab");
    if (activeTab !== 1 && connected) {
      onTabSelect[1].map((f) => f(onClick));
    }
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    console.debug("Selected spells tab");
    if (activeTab !== 2 && connected) {
      lookForSpells(onClick, function () {
        return activeTab == 2;
      });
    }
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    console.debug("Selected features tab");
    if (activeTab !== 3 && connected) {
      onTabSelect[3].map((f) => f(onClick));
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    console.debug("Selected equipment tab");
    if (activeTab !== 4 && connected) {
      onTabSelect[4].map((f) => f(onClick));
    }
    activeTab = 4;
  });
};
