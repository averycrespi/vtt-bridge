import { attackWith } from "./commands";
import { createButton } from "./elements";
import { onElementLoad } from "../common";

const ready = (onClick) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  let headerCount = 0;
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      headerCount += 1;
      continue;
    }
    const weapon = row.querySelector(".weapon").innerText;
    const mod = row.querySelector(".attack-modifier").innerText;
    const button = createButton(
      "attack",
      function (event) {
        // Don't expand the weapon details when the button is clicked.
        event.stopPropagation();
        onClick(attackWith(weapon, mod, event));
      },
      ["vtt-attack-with-weapon"]
    );
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug(
    "Created " + (rows.length - headerCount) + " attack with weapon buttons"
  );
};

export default (onClick) => onElementLoad(".weapon", () => ready(onClick));
