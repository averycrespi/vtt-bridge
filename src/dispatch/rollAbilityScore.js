import { classes, onElementLoad } from "../common";

export const addRollAbilityScoreListeners = (store) => onElementLoad(".ability-scores", () => ready(store));

const ready = (store) => {
  const className = classes.rollAbilityScore;
  const children = document.querySelector(".ability-scores").children;

  for (const child of children) {
    const name = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;

    const tooltipDiv = document.createElement("div");
    tooltipDiv.classList.add("tooltip");
    child.appendChild(tooltipDiv);

    const button = document.createElement("button");
    button.innerText = mod;
    button.classList.add("roll-button", "m-t-10", className);
    button.onclick = function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    };
    tooltipDiv.appendChild(button);

    const tooltipText = document.createElement("span");
    tooltipText.classList.add("tooltiptext");
    tooltipText.innerText = "ctrl+click for advantage shift+click for disadvantage";
    tooltipDiv.appendChild(tooltipText);

    // Remove the existing modifier text.
    child.querySelector(".ability-score-modifier").remove();

    console.debug("Added roll ability score listener: " + name);
  }
};
