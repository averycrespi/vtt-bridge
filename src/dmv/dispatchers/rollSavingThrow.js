import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addRollSavingThrowListeners = (store) => onElementLoad("table tr .saving-throw-name", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".saving-throw-name").closest("table").querySelectorAll("tr");

  for (const row of rows) {
    const className = classes.rollSavingThrow;
    const name = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;

    const button = row.querySelector(".roll-button");
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    });
  }

  console.debug("Added roll saving throw listeners");
};
