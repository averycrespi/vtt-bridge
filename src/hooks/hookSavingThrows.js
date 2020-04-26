import { createButton, createElement, onElementLoad } from "../common/dom";

import { LEFT_MARGIN } from "../common/classes";
import { ROLL_SAVING_THROW } from "../common/messages";

const hookSavingThrows = (onClick) => {
  // This table has no helpful selectors, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const cell = createElement("td");
    const button = createButton(
      "roll",
      function () {
        onClick({
          type: ROLL_SAVING_THROW,
          stat: row.querySelector(".saving-throw-name").innerText,
          mod: row.querySelector(".saving-throw-bonus").innerText,
        });
      },
      [LEFT_MARGIN]
    );
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " saving throws");
};

export default (onClick) =>
  onElementLoad(".saving-throw-name", () => hookSavingThrows(onClick));
