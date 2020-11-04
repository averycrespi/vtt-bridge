import { classes, onElementLoad } from "../common";

export const addRollAbilityScoreListeners = (store) => onElementLoad(".ability-scores", () => ready(store));

const ready = (store) => {
  const className = classes.rollAbilityScore;
  const buttons = document.querySelectorAll(".ability-scores .roll-button");

  // Brittle: manually set ability score names.
  const names = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
  for (let i = 0; i < names.length; i++) {
    const button = buttons[i];
    const name = names[i];
    const mod = button.innerText;
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    });
  }

  console.debug("Added roll ability score listener: " + name);
};
