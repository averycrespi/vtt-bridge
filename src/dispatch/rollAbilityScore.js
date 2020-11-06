import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";

import { isValidMod } from "../transform/validate";

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
    if (!isValidMod(mod)) {
      store.dispatch(STORE_ERROR, { name, property: "modifier", value: mod });
      continue;
    }

    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch(STORE_CLICK, { className, event, data: { name, mod } });
    });

    console.debug(`Added roll ability score listener: ${name}"`);
  }
};
