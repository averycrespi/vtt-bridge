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

    //TODO: make cell indices more reliable
    const cells = row.querySelectorAll("td");
    const weapon = cells[0].innerText;
    const damage = cells[cells.length - 5].innerText
      .replace("melee,", "")
      .replace("damage", "")
      .trim();
    const mod = cells[cells.length - 4].innerText;

    const [attackButton, damageButton] = row.querySelectorAll(".roll-button");

    attackButton.addEventListener("click", function (event) {
      onClick(commands.attackWith(weapon, mod, event));
    });
    attackButton.classList.add(classes.attackWithWeapon);
    count++;

    damageButton.addEventListener("click", function () {
      onClick(commands.rollDamage(weapon, damage));
    });
    damageButton.classList.add(classes.rollWeaponDamage);
    count++;
  }
  console.debug("Added listeners to " + count + " weapon buttons");
};
