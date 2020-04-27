import { addLeftMargin, createButton } from "./elements";
import { emote, roll } from "./commands";

import { onElementLoad } from "../common";

const hookSavingThrows = (onClick) => {
  // This table has no helpful selectors, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const stat = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;
    const button = createButton("roll", function () {
      onClick([emote("is rolling", stat, "save"), roll(mod)]);
    });
    addLeftMargin(button);
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " saving throws");
};

export default (onClick) =>
  onElementLoad(".saving-throw-name", () => hookSavingThrows(onClick));
