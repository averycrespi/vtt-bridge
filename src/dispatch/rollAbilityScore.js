import { classes, onElementLoad } from "../common";

export const addRollAbilityScoreListeners = (store) => onElementLoad(".ability-scores", () => ready(store));

const ready = (store) => {
  const children = document.querySelector(".ability-scores").children;

  for (const child of children) {
    const className = classes.rollAbilityScore;

    const name = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;

    // These buttons don't normally exist, so we need to create them.
    const button = document.createElement("button");
    button.innerText = "roll";
    button.classList.add("roll-button", "m-t-10", className);
    button.onclick = function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    };
    child.appendChild(button);

    console.debug("Added roll ability score listener: " + name);
  }
};
