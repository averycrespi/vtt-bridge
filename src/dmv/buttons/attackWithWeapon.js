import * as classes from "../classes";
import * as commands from "../commands";

import { createButton } from "../elements";
import { onElementLoad } from "../../common";

/**
 * Add attack buttons for weapons.
 *
 * @param {Function} onClick
 */
export const addAttackWithWeaponButtons = (onClick) =>
  onElementLoad(".weapons tr .weapon", () => ready(onClick));

const ready = (onClick) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  let buttonCount = 0;
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      continue;
    }
    const weapon = row.querySelector(".weapon").innerText;
    const mod = row.querySelector(".attack-modifier").innerText;
    const button = createButton(
      "attack",
      function (event) {
        // Don't expand the weapon details when the button is clicked.
        event.stopPropagation();
        onClick(commands.attackWith(weapon, mod, event));
      },
      [classes.attackWithWeapon]
    );
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
    buttonCount += 1;
  }
  console.debug("Created " + buttonCount + " attack with weapon buttons");
};
