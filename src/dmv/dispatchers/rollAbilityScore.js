import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addRollAbilityScoreListeners = (store) =>
  onElementLoad(".ability-scores .ability-score-name", () => ready(store));

const ready = (store) => {
  const children = document.querySelector(".ability-scores").children;

  for (const child of children) {
    const className = classes.rollAbilityScore;
    const name = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;

    const button = document.createElement("button");
    button.innerText = "roll";
    button.classList.add("roll-button", "m-t-10", className);
    button.onclick = function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    };
    child.appendChild(button);
  }

  console.debug("Create roll ability score buttons");
  console.debug("Added roll ability score listeners");
};
