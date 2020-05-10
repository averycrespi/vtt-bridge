import * as classes from "../classes";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll saving throw buttons.
 *
 * @param {Function} store
 */
export const addRollSavingThrowListeners = (store) =>
  onElementLoad("table tr .saving-throw-name", () => ready(store));

const ready = (store) => {
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const stat = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      store.dispatch("click", {
        className: classes.rollSavingThrow,
        event,
        data: { name: stat, mod },
      });
    });
    button.classList.add(classes.rollSavingThrow);
  }

  console.debug(
    "Added listeners to " + rows.length + " roll saving throw buttons"
  );
};
