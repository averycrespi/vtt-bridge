import { createButton, withLeftMargin } from "../elements";

import { onElementLoad } from "../../common";
import { rollDice } from "../commands";

const ready = (onClick) => {
  // This table has no helpful selectors, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const stat = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;
    const button = createButton(
      "roll",
      function (event) {
        onClick(rollDice(stat + " save", mod, event));
      },
      [withLeftMargin(), "vtt-roll-saving-throw"]
    );
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Created " + rows.length + " roll saving throw buttons");
};

export default (onClick) =>
  onElementLoad(".saving-throw-name", () => ready(onClick));
