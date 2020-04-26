import * as types from "../types";

/**
 * Run a callback after an element loads.
 *
 * @param {String} selector
 * @param {Function} callback
 */
export const onElementLoad = (selector, callback) => {
  const interval = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(interval);
      callback();
    }
  }, 100);
};

// We need to wait for orcpub.js to finish before creating our hooks.
onElementLoad(".character-name", () => {
  console.log("Loaded dmv.js");
  hookTabs();
  hookAbilityScores();
  hookSkills();
  hookSavingThrows();
  hookInitiative();
  hookWeapons();
});

//TODO: implement
const dispatch = (type, payload) => console.log(type, payload);

/**
 * Create a roll button with an onclick handler.
 *
 * The button's style will match the rest of the page.
 *
 * @param {Function} onclick
 */
const createRollButton = (onclick) => {
  const button = document.createElement("button");
  button.innerText = "Roll";
  button.className = "form-button";
  button.onclick = onclick;
  return button;
};

// Global variable for tracking the active tab.
let activeTab = 0;

/**
 * Hook the section tabs.
 */
const hookTabs = () => {
  const tabs = document.querySelectorAll(".flex-grow-1.t-a-c");
  tabs[0].addEventListener("click", () => {
    console.log("Loaded combat tab");
    if (activeTab !== 0) {
      onElementLoad(".initiative", () => {
        hookInitiative();
        hookWeapons();
      });
      activeTab = 0;
    }
  });
  tabs[1].addEventListener("click", () => {
    console.log("Loaded proficiencies tab");
    activeTab = 1;
  });
  tabs[2].addEventListener("click", () => {
    console.log("Loaded spells tab");
    activeTab = 2;
  });
  tabs[3].addEventListener("click", () => {
    console.log("Loaded features tab");
    activeTab = 3;
  });
  tabs[4].addEventListener("click", () => {
    console.log("Loaded equipment tab");
    activeTab = 4;
  });
  console.log("Hooked tabs");
};

/**
 * Hook the ability score rolls.
 */
const hookAbilityScores = () => {
  const parent = document.querySelector(".ability-scores");
  for (const child of parent.children) {
    const button = createRollButton(function () {
      dispatch(types.ABILITY_SCORE, {
        name: child.querySelector(".ability-score-name").innerText,
        score: child.querySelector(".ability-score").innerText,
        modifier: child.querySelector(".ability-score-modifier").innerText,
      });
    });
    child.appendChild(button);
  }
  console.log("Hooked ability scores");
};

/**
 * Hook the skill rolls.
 */
const hookSkills = () => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createRollButton(function () {
      dispatch(types.SKILL, {
        name: row.querySelector(".skill-name").innerText,
        bonus: row.querySelector(".skillbonus").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked skills");
};

/**
 * Hook the saving throw rolls.
 */
const hookSavingThrows = () => {
  // This table has no class, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createRollButton(function () {
      dispatch(types.SAVING_THROW, {
        name: row.querySelector(".saving-throw-name").innerText,
        bonus: row.querySelector(".saving-throw-bonus").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked saving throws");
};

/**
 * Hook the initiative roll.
 */
const hookInitiative = () => {
  const elem = document.querySelector(".initiative");
  const button = createRollButton(function () {
    dispatch(types.INITIATIVE, {
      bonus: elem.innerText,
    });
  });
  elem.parentNode.appendChild(button);
  console.log("Hooked initiative");
};

/**
 * Hook the weapon rolls.
 */
const hookWeapons = () => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      continue;
    }
    const cell = document.createElement("td");
    const button = createRollButton(function (e) {
      // Don't expand the details when the button is clicked.
      event.stopPropagation();
      dispatch(types.WEAPON, {
        name: row.querySelector(".weapon").innerText,
        details: row.querySelector(".weapon-damage-modifier").innerText,
        attackModifier: row.querySelector(".attack-modifier").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked weapons");
};
