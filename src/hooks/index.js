import { createButton, onElementLoad } from "../common/dom";

import { LEFT_MARGIN } from "../common/classes";
import hookAbilityScores from "./hookAbilityScores";
import hookActions from "./hookActions";
import hookFeatures from "./hookFeatures";
import hookInitiative from "./hookInitiative";
import hookSavingThrows from "./hookSavingThrows";
import hookSkills from "./hookSkills";
import hookWeapons from "./hookWeapons";

export const createHooks = (onClick) => {
  onElementLoad(".class-name", () => {
    const parent = document.querySelector(".character-summary");
    const button = createButton(
      "connect to roll20",
      function () {
        parent.removeChild(button);
        // Ability scores, skills, and saving throws are always visible.
        hookAbilityScores(onClick);
        hookSkills(onClick);
        hookSavingThrows(onClick);
        // Initiative and weapons are loaded in the default tab.
        hookInitiative(onClick);
        hookWeapons(onClick);
        // Tabs require additional logic to recreate hooks on switch.
        createTabHooks(onClick);
      },
      [LEFT_MARGIN, "vtt-connect-button"]
    );
    parent.appendChild(button);
  });
};

// Global variable for tracking the active tab.
let activeTab = 0;

const createTabHooks = (onClick) => {
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
      hookInitiative(onClick);
      hookWeapons(onClick);
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
      hookActions(onClick);
      hookFeatures(onClick);
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    if (activeTab !== 4) {
      console.debug("Switched to equipment tab");
      hookWeapons(onClick);
    }
    activeTab = 4;
  });
};
