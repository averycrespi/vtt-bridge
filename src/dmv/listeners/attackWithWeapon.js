import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to attack buttons.
 *
 * @param {Function} onClick
 */
export const addAttackWithWeaponListeners = (onClick) =>
  onElementLoad(".weapons .weapon .roll-button", () => ready(onClick));

const ready = (onClick) => {
  let count = 0;

  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Skip table header.
      continue;
    }

    const cells = row.querySelectorAll("td");
    const weapon = cells[0].innerText;
    const mod = cells[cells.length - 2].innerText;

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      onClick(commands.attackWith(weapon, mod, event));
    });
    button.classList.add(classes.attackWithWeapon);
    count++;
  }
  console.debug("Added listeners to " + count + " attack with weapon buttons");
};
