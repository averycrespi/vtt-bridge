import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to attack and damage buttons.
 *
 * @param {Function} store
 */
export const addWeaponListeners = (store) =>
  onElementLoad(".weapons .weapon .roll-button", () => ready(store));

const ready = (store) => {
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
    const damage = details.match(/([0-9d+-]+) damage/)[1]; // Match first capture group.
    const mod = cells.find((c) => c.innerText.match(/^[0-9+-]+/)).innerText;

    const [attackButton, damageButton] = row.querySelectorAll(".roll-button");

    attackButton.addEventListener("click", function (event) {
      store.dispatch("click", {
        className: classes.attackWithWeapon,
        event,
        data: { name: weapon, mod },
      });
    });
    attackButton.classList.add(classes.attackWithWeapon);
    count++;

    damageButton.addEventListener("click", function () {
      store.dispatch("click", {
        className: classes.rollWeaponDamage,
        event,
        data: { name: weapon, damage },
      });
    });
    damageButton.classList.add(classes.rollWeaponDamage);
    count++;
  }
  console.debug("Added listeners to " + count + " weapon buttons");
};
