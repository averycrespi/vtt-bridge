import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addRollSpellListeners = (store) => onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".details-columns").querySelectorAll("tr.spell");

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td"));

    const className = classes.attackWithSpell;
    const name = cells[0].innerText;
    const mod = cells[4].innerText; //TODO: use better selector

    const button = row.querySelector(".roll-button");
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    });

    console.debug("Added roll spell listener: " + name);
  }
};
