import { addLeftMargin, createButton } from "./elements";

import hookAbilityScores from "./hookAbilityScores";
import hookInitiative from "./hookInitiative";
import hookSavingThrows from "./hookSavingThrows";
import hookSkills from "./hookSkills";
import hookTabs from "./hookTabs";
import hookWeapons from "./hookWeapons";
import { onElementLoad } from "../common";

export const createHooks = (onClick) => {
  onElementLoad(".class-name", () => {
    const parent = document.querySelector(".character-summary");
    const button = createButton("connect to roll20", function () {
      parent.removeChild(button);
      // Ability scores, skills, and saving throws are always visible.
      hookAbilityScores(onClick);
      hookSkills(onClick);
      hookSavingThrows(onClick);
      // Initiative and weapons are loaded in the default tab.
      hookInitiative(onClick);
      hookWeapons(onClick);
      // Recreate hooks on tab switch.
      hookTabs(onClick);
    });
    addLeftMargin(button);
    parent.appendChild(button);
  });
};
