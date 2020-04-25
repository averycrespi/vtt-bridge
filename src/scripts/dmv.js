import {
  ABILITY_SCORE,
  INITIATIVE,
  SAVING_THROW,
  SKILL,
  WEAPON,
} from "../actionTypes";

// Wait for the page to finish loading.
const interval = setInterval(() => {
  if (document.getElementsByClassName("character-name").length > 0) {
    clearInterval(interval);
    onLoad();
  }
}, 100);

const onLoad = () => {
  console.log("Loaded dmv.js");
  hookAbilityScores();
  hookSkills();
  hookSavingThrows();
  hookInitiative();
  hookWeapons();
};

const dispatch = (type, payload) => alert(JSON.stringify(payload));

const createRollButton = (onclick) => {
  const button = document.createElement("button");
  button.innerText = "Roll";
  button.className = "form-button";
  button.onclick = onclick;
  return button;
};

const hookAbilityScores = () => {
  const parent = document.querySelector(".ability-scores");
  for (const child of parent.children) {
    const button = createRollButton(function () {
      dispatch(ABILITY_SCORE, {
        name: child.querySelector(".ability-score-name").innerText,
        score: child.querySelector(".ability-score").innerText,
        modifier: child.querySelector(".ability-score-modifier").innerText,
      });
    });
    child.appendChild(button);
  }
  console.log("Hooked ability scores");
};

const hookSkills = () => {
  const table = document.querySelector(".skills");
  const rows = table.querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createRollButton(function () {
      dispatch(SKILL, {
        name: row.querySelector(".skill-name").innerText,
        bonus: row.querySelector(".skillbonus").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked skills");
};

const hookSavingThrows = () => {
  // This table has no class, so we need to search upwards.
  const table = document.querySelector(".saving-throw-name").closest("table");
  const rows = table.querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createRollButton(function () {
      dispatch(SAVING_THROW, {
        name: row.querySelector(".saving-throw-name").innerText,
        bonus: row.querySelector(".saving-throw-bonus").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked saving throws");
};

const hookInitiative = () => {
  const elem = document.querySelector(".initiative");
  const button = createRollButton(function () {
    dispatch(INITIATIVE, {
      bonus: elem.innerText,
    });
  });
  elem.parentNode.appendChild(button);
  console.log("Hooked initiative");
};

const hookWeapons = () => {
  const table = document.querySelector(".weapons");
  const rows = table.querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the header.
      continue;
    }
    const cell = document.createElement("td");
    const button = createRollButton(function (e) {
      // Don't expand the section when the button is clicked.
      event.stopPropagation();
      dispatch(WEAPON, {
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
