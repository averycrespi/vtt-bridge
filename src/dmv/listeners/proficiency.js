import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll proficiency buttons.
 *
 * @param {Function} onClick
 */
export const addRollProficiencyListeners = (onClick) =>
  onElementLoad(".details-columns table tr .roll-button", () => ready(onClick));

const ready = (onClick) => {
  let count = 0;

  const tables = document
    .querySelector(".details-columns")
    .querySelectorAll("table");
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    for (const row of rows) {
      if (row.querySelectorAll("th").length > 0) {
        // Skip table header.
        continue;
      }

      const cells = Array.from(row.querySelectorAll("td"));
      const name = cells[0].innerText;
      const bonus = cells.find((c) => c.innerText.match(/^[0-9+-]+/)).innerText;

      const button = row.querySelector(".roll-button");
      button.addEventListener("click", function (event) {
        onClick(commands.rollCheck(name, bonus, event));
      });
      button.classList.add(classes.rollProficiency);
      count++;
    }
  }

  console.debug("Added listeners to " + count + " roll proficiency buttons");
};
