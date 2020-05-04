import * as classes from "../classes";
import * as commands from "../commands";

import { createButton, withLeftMargin } from "../elements";

import { addAttackWithWeaponButtons } from "./attackWithWeapon";
import { addCastCantripButtons } from "./castCantrip";
import { addRollAbilityScoreButtons } from "./rollAbilityScore";
import { addRollInitiativeButton } from "./rollInitiative";
import { addRollProficiencyButtons } from "./rollProficiency";
import { addRollSavingThrowButtons } from "./rollSavingThrow";
import { addRollSkillButtons } from "./rollSkill";
import { addUseAbilityButtons } from "./useAbility";
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
let isConnected = false;

/**
 * Which functions need to be called when a tab is selected?
 *
 * Each function should accept a single onClick parameter.
 *
 * @global
 */
const onTabSelect = {
  0: [addRollInitiativeButton, addAttackWithWeaponButtons],
  1: [addRollProficiencyButtons],
  2: [], // Cantrips and spells are handled differently.
  3: [addUseAbilityButtons],
  4: [addAttackWithWeaponButtons],
};

/**
 * Add a connect to Roll20 button.
 *
 * @param {Function} onClick
 */
export const addConnectToRoll20Button = (onClick) =>
  onElementLoad(".character-summary .class-name", () => ready(onClick));

const ready = (onClick) => {
  const parent = document.querySelector(".character-summary");
  const button = createButton(
    "connect to roll20",
    function () {
      // Hide the connect button after it's clicked.
      isConnected = true;
      button.remove();

      // Create buttons that are always visible.
      addRollAbilityScoreButtons(onClick);
      addRollSkillButtons(onClick);
      addRollSavingThrowButtons(onClick);

      // Handle the active tab.
      //TODO: handle spells tab
      onTabSelect[activeTab].map((f) => f(onClick));
    },
    [withLeftMargin(), classes.connectToRoll20]
  );
  parent.appendChild(button);
  console.debug("Created connect to Roll20 button");

  // We need to add tab listeners BEFORE the connect button is clicked.
  // This ensures that activeTab is accurate during the connect button's onClick function.
  addTabListeners(onClick);
  console.debug("Added tab listeners");
};

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
    if (activeTab !== 0 && isConnected) {
      onTabSelect[0].map((f) => f(onClick));
    }
    activeTab = 0;
  });

  proficienciesTab.addEventListener("click", () => {
    console.debug("Selected proficiencies tab");
    if (activeTab !== 1 && isConnected) {
      onTabSelect[1].map((f) => f(onClick));
    }
    activeTab = 1;
  });

  spellsTab.addEventListener("click", () => {
    console.debug("Selected spells tab");
    if (activeTab !== 2 && isConnected) {
      console.debug("Looking for spells");
      const interval = setInterval(() => {
        if (activeTab == 2) {
          addCastCantripButtons(onClick);
          addSpellListeners(onClick);
        } else {
          console.debug("Stopped looking for active spells");
          clearInterval(interval);
        }
      }, 500);
    }
    activeTab = 2;
  });

  featuresTab.addEventListener("click", () => {
    console.debug("Selected features tab");
    if (activeTab !== 3 && isConnected) {
      onTabSelect[3].map((f) => f(onClick));
    }
    activeTab = 3;
  });

  equipmentTab.addEventListener("click", () => {
    console.debug("Selected equipment tab");
    if (activeTab !== 4 && isConnected) {
      onTabSelect[4].map((f) => f(onClick));
    }
    activeTab = 4;
  });
};

const addSpellListeners = (onClick) =>
  onElementLoad(".spells .form-button", () => {
    const buttons = document
      .querySelector(".spells")
      .querySelectorAll(".form-button");
    for (const button of buttons) {
      if (button.innerText.toLowerCase() == "cast spell") {
        button.innerText = "cast spell on roll20";
        button.classList.add(classes.castSpell);

        // These selectors are quite brittle, but we can't do much better.
        const row = button.closest("tr");
        const cell = button.closest("td");
        const spell = row.previousSibling.querySelector("td").innerText;
        const details = cell.querySelector("p").parentElement.innerText;

        button.addEventListener("click", function () {
          onClick(commands.castSpell(spell, details));
        });
        console.debug("Added listener to cast spell button");
      }
    }
  });
