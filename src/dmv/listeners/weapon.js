import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to attack and damage buttons.
 *
 * @param {Function} onClick
 */
export const addWeaponListeners = (onClick) =>
  onElementLoad(".weapons .weapon .roll-button", () => ready(onClick));

const ready = (onClick) => {
  let count = 0;

  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Skip table header.
      continue;
    }

    const cells = Array.from(row.querySelectorAll("td"));
    const weapon = cells[0].innerText;
    const details = cells.find((c) => c.innerText.includes("damage")).innerText;
    const damage = details.match(/[0-9d+-]+/)[0];
    const mod = cells.find((c) => c.innerText.match(/^[0-9+-]+/)).innerText;

    const [attackButton, damageButton] = row.querySelectorAll(".roll-button");

    attackButton.addEventListener("click", function (event) {
      onClick(commands.attackWithWeapon(weapon, mod, event));
    });
    attackButton.classList.add(classes.attackWithWeapon);
    count++;

    damageButton.addEventListener("click", function () {
      onClick(commands.rollWeaponDamage(weapon, damage));
    });
    damageButton.classList.add(classes.rollWeaponDamage);
    count++;
  }
  console.debug("Added listeners to " + count + " weapon buttons");
};
