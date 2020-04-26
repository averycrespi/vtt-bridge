import hookAbilityScores from "./hookAbilityScores";
import hookActions from "./hookActions";
import hookFeatures from "./hookFeatures";
import hookInitiative from "./hookInitiative";
import hookSavingThrows from "./hookSavingThrows";
import hookSkills from "./hookSkills";
import hookWeapons from "./hookWeapons";
import { onElementLoad } from "./common";

// Global variable for tracking the active tab.
let activeTab = 0;

const createDefaultHooks = (onClick) => {
  hookAbilityScores(onClick);
  hookSkills(onClick);
  hookSavingThrows(onClick);
  hookInitiative(onClick);
  hookWeapons(onClick);
};

const createTabHooks = (onClick) => {
  const [
    combatTab,
    proficienciesTab,
    spellsTab,
    featuresTab,
    equipmentTab,
  ] = document.querySelectorAll(".flex-grow-1.t-a-c");

  combatTab.addEventListener("click", () => {
    console.log("Loaded combat tab");
    if (activeTab !== 0) {
      onElementLoad(".initiative", () => {
        hookInitiative(onClick);
        hookWeapons(onClick);
      });
      activeTab = 0;
    }
  });

  proficienciesTab.addEventListener("click", () => {
    console.log("Loaded proficiencies tab");
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    console.log("Loaded spells tab");
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    console.log("Loaded features tab");
    if (activeTab !== 3) {
      onElementLoad(".actions", () => {
        hookActions(onClick);
        hookFeatures(onClick);
      });
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    console.log("Loaded equipment tab");
    activeTab = 4;
  });
};

export const createHooks = (onClick) => {
  onElementLoad(".character-name", () => {
    createDefaultHooks(onClick);
    createTabHooks(onClick);
  });
};
