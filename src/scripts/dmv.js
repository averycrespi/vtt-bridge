import hookAbilityScores from "../hooks/hookAbilityScores";
import hookActions from "../hooks/hookActions";
import hookFeatures from "../hooks/hookFeatures";
import hookInitiative from "../hooks/hookInitiative";
import hookSavingThrows from "../hooks/hookSavingThrows";
import hookSkills from "../hooks/hookSkills";
import hookWeapons from "../hooks/hookWeapons";
import { onElementLoad } from "../dom";

const dispatch = (action) => console.log(action);

// We need to wait for orcpub.js to finish before creating our hooks.
onElementLoad(".character-name", () => {
  console.log("Loaded dmv.js");

  handleTabs();

  hookAbilityScores(dispatch);
  hookSkills(dispatch);
  hookSavingThrows(dispatch);
  hookInitiative(dispatch);
  hookWeapons(dispatch);
});

// Global variable for tracking the active tab.
let activeTab = 0;

const handleTabs = () => {
  const tabs = document.querySelectorAll(".flex-grow-1.t-a-c");
  let [combat, proficiencies, spells, features, equipment] = tabs;
  combat.addEventListener("click", () => {
    console.log("Loaded combat tab");
    if (activeTab !== 0) {
      onElementLoad(".initiative", () => {
        hookInitiative(dispatch);
      });
      onElementLoad(".weapons", () => {
        hookWeapons(dispatch);
      });
      activeTab = 0;
    }
  });
  proficiencies.addEventListener("click", () => {
    console.log("Loaded proficiencies tab");
    activeTab = 1;
  });
  spells.addEventListener("click", () => {
    console.log("Loaded spells tab");
    activeTab = 2;
  });
  features.addEventListener("click", () => {
    console.log("Loaded features tab");
    if (activeTab !== 3) {
      onElementLoad(".actions", () => {
        hookActions(dispatch);
      });
      onElementLoad(".features\\,Traits\\,AndFeats", () => {
        hookFeatures(dispatch);
      });
    }
    activeTab = 3;
  });
  equipment.addEventListener("click", () => {
    console.log("Loaded equipment tab");
    activeTab = 4;
  });
};
