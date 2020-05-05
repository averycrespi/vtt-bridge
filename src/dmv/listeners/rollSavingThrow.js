import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll saving throw buttons.
 *
 * @param {Function} onClick
 */
export const addRollSavingThrowListeners = (onClick) =>
  onElementLoad("table tr .saving-throw-name", () => ready(onClick));

const ready = (onClick) => {
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const stat = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      onClick(commands.rollDice(stat + " save", mod, event));
    });
    button.classList.add(classes.rollSavingThrow);
  }

  console.debug(
    "Added listeners to " + rows.length + " roll saving throw buttons"
  );
};
