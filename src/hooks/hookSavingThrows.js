import { createButton, onElementLoad } from "./common";

import { ROLL_SAVING_THROW } from "../messages";

const hookSavingThrows = (onClick) => {
  // This table has no helpful selectors, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createButton("roll", function () {
      onClick({
        type: ROLL_SAVING_THROW,
        stat: row.querySelector(".saving-throw-name").innerText,
        mod: row.querySelector(".saving-throw-bonus").innerText,
      });
    });
    button.classList.add("m-l-10");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " saving throws");
};

export default (onClick) =>
  onElementLoad(".saving-throw-name", () => hookSavingThrows(onClick));
