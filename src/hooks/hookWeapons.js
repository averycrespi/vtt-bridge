import { WEAPON } from "../types";
import { createButton } from "../dom";

export default (onClick) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      continue;
    }
    const cell = document.createElement("td");
    const button = createButton("roll", function () {
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
  console.log("Hooked weapons");
};
