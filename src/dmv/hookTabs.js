import createAttackWithWeaponButtons from "./createAttackWithWeaponButtons";
import createRollInitiativeButton from "./createRollInitiativeButton";
import createUseActionButtons from "./createUseActionButtons";
import createUseFeatureButtons from "./createUseFeatureButtons";
import { onElementLoad } from "../common";

// Global variable for tracking the active tab.
let activeTab = 0;

const ready = (onClick) => {
  const [
    combatTab,
    proficienciesTab,
    spellsTab,
    featuresTab,
    equipmentTab,
  ] = document.querySelectorAll(".flex-grow-1.t-a-c");

  combatTab.addEventListener("click", () => {
    if (activeTab !== 0) {
      console.debug("Switched to combat tab");
      createRollInitiativeButton(onClick);
      createAttackWithWeaponButtons(onClick);
    }
    activeTab = 0;
  });

  proficienciesTab.addEventListener("click", () => {
    if (activeTab !== 1) {
      console.debug("Switched to proficiencies tab");
    }
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    if (activeTab !== 2) {
      console.debug("Switched to spells tab");
      //TODO: hook cantrips and spells
    }
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    if (activeTab !== 3) {
      console.debug("Switched to features tab");
      createUseActionButtons(onClick);
      createUseFeatureButtons(onClick);
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    if (activeTab !== 4) {
      console.debug("Switched to equipment tab");
      createAttackWithWeaponButtons(onClick);
    }
    activeTab = 4;
  });
};

export default (onClick) => onElementLoad(".initiative", () => ready(onClick));
