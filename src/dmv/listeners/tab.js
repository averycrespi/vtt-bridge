import { addRollInitiativeListener } from "./initiative";
import { addRollProficiencyListeners } from "./proficiency";
import { addRollSpellListeners } from "./spell";
import { addUseFeatureButtons } from "../buttons/feature";
import { addWeaponListeners } from "./weapon";
import { onElementLoad } from "../../common";

/**
 * Which tab is currently selected?
 *
 * @global
 */
let activeTab = -1;

/**
 * Add listeners to tabs.
 *
 * @param {Function} onClick
 */
export const addTabListeners = (onClick) =>
  onElementLoad(".flex-grow-1.t-a-c", () => ready(onClick));

const ready = (onClick) => {
  const [
    combatTab,
    proficienciesTab,
    spellsTab,
    featuresTab,
    equipmentTab,
  ] = document.querySelectorAll(".flex-grow-1.t-a-c");

  combatTab.addEventListener("click", () => {
    console.debug("Selected combat tab");
    if (activeTab !== 0) {
      addRollInitiativeListener(onClick);
      addWeaponListeners(onClick);
    }
    activeTab = 0;
  });

  // Load combat tab by default.
  combatTab.click();

  proficienciesTab.addEventListener("click", () => {
    console.debug("Selected proficiencies tab");
    if (activeTab !== 1) {
      addRollProficiencyListeners(onClick);
    }
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    console.debug("Selected spells tab");
    if (activeTab !== 2) {
      addRollSpellListeners(onClick);
    }
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    console.debug("Selected features tab");
    if (activeTab !== 3) {
      addUseFeatureButtons(onClick);
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    console.debug("Selected equipment tab");
    if (activeTab !== 4) {
      addWeaponListeners(onClick);
    }
    activeTab = 4;
  });

  console.debug("Added listeners to tabs");
};