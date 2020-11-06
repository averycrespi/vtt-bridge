import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";

import { isValidMod } from "../transform/validate";

export const addRollInitiativeListeners = (store) => onElementLoad(".initiative", () => ready(store));

const ready = (store) => {
  const className = classes.rollInitiative;
  const name = "initiative";

  const parent = document.querySelector(".initiative");
  const button = parent.querySelector(".roll-button");

  const mod = button.innerText;
  if (!isValidMod(mod)) {
    store.dispatch(STORE_ERROR, { name, property: "modifier", value: mod });
    return;
  }

  button.classList.add(className);
  button.addEventListener("click", function (event) {
    store.dispatch(STORE_CLICK, { className, event, data: { name, mod } });
  });

  console.debug("Added roll initiative listener");
};
