import { addExpandSpellListeners } from "./expandSpell";
import { addRollInitiativeListeners } from "./rollInitiative";
import { addRollProficiencyListeners } from "./rollProficiency";
import { addRollSpellListeners } from "./rollSpell";
import { addUseFeatureListeners } from "./useFeature";
import { addWeaponListeners } from "./weapon";
import { onElementLoad } from "../../callbacks";

// Which tab is currently selected?
let activeTab = -1;

export const addSelectTabListeners = (store) => onElementLoad(".flex-grow-1.t-a-c", () => ready(store));

const ready = (store) => {
  const [combatTab, proficienciesTab, spellsTab, featuresTab, equipmentTab] = document.querySelectorAll(
    ".flex-grow-1.t-a-c",
  );

  combatTab.addEventListener("click", () => {
    console.debug("Selected combat tab");
    if (activeTab !== 0) {
      addRollInitiativeListeners(store);
      addWeaponListeners(store);
    }
    activeTab = 0;
  });

  // Load combat tab by default.
  combatTab.click();

  proficienciesTab.addEventListener("click", () => {
    console.debug("Selected proficiencies tab");
    if (activeTab !== 1) {
      addRollProficiencyListeners(store);
    }
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    console.debug("Selected spells tab");
    if (activeTab !== 2) {
      addRollSpellListeners(store);
      addExpandSpellListeners(store);
    }
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    console.debug("Selected features tab");
    if (activeTab !== 3) {
      addUseFeatureListeners(store);
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    console.debug("Selected equipment tab");
    if (activeTab !== 4) {
      addWeaponListeners(store);
    }
    activeTab = 4;
  });

  console.debug("Added select tab listeners");
};
