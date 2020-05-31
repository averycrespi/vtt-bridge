import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addRollInitiativeListeners = (store) => onElementLoad(".initiative", () => ready(store));

const ready = (store) => {
  const parent = document.querySelector(".initiative");

  const className = classes.rollInitiative;
  const name = "initiative";
  const mod = parent.innerText;

  const button = parent.closest("div.flex-wrap").querySelector(".roll-button");
  button.classList.add(className);
  button.addEventListener("click", function (event) {
    store.dispatch("click", { className, event, data: { name, mod } });
  });

  console.debug("Added roll initiative listener");
};
