import * as classes from "../classes";
import * as commands from "../commands";

import { createButton } from "../elements";
import { onElementLoad } from "../../common";

/**
 * Add roll buttons for proficiencies.
 *
 * @param {Function} onClick
 */
export const addRollProficiencyButtons = (onClick) =>
  onElementLoad(".details-columns table tr", () => ready(onClick));

const ready = (onClick) => {
  const tables = document
    .querySelector(".details-columns")
    .querySelectorAll("table");
  let buttonCount = 0;
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    for (const row of rows) {
      if (row.querySelectorAll("th").length > 0) {
        // Don't add a button to the table header.
        continue;
      }
      const cells = row.querySelectorAll("td");
      const name = cells[0].innerText;
      const bonus = cells[cells.length - 1].innerText;
      const button = createButton(
        "roll",
        function (event) {
          onClick(commands.rollDice(name, bonus, event));
        },
        [classes.rollProficiency]
      );
      const cell = document.createElement("td");
      cell.appendChild(button);
      row.appendChild(cell);
      buttonCount += 1;
    }
  }
  console.debug("Created " + buttonCount + " roll proficiency buttons");
};
