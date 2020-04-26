import { createButton, onElementLoad } from "./common";

import { WEAPON } from "../types";

const hookWeapons = (onClick) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  let headerCount = 0;
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      headerCount += 1;
      continue;
    }
    const cell = document.createElement("td");
    const button = createButton("attack", function () {
      // Don't expand the details when the button is clicked.
      event.stopPropagation();
      onClick({
        type: WEAPON,
        name: row.querySelector(".weapon").innerText,
        details: row.querySelector(".weapon-damage-modifier").innerText,
        attackModifier: row.querySelector(".attack-modifier").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + (rows.length - headerCount) + " weapons");
};

// Not a typo: wait for first weapon instead of table.
export default (onClick) =>
  onElementLoad(".weapon", () => hookWeapons(onClick));
