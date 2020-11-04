import { classes, onElementLoad } from "../common";

// Brittle: wait for any roll button to load.
export const addWeaponListeners = (store) => onElementLoad(".weapons .weapon .roll-button", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");

  for (const row of rows) {
    // Skip table headers.
    if (row.querySelectorAll("th").length > 0) {
      continue;
    }

    const cells = Array.from(row.querySelectorAll("td"));
    const name = cells[0].innerText;
    const [attackButton, damageButton] = row.querySelectorAll(".roll-button");
    const attack = attackButton.innerText;
    const damage = damageButton.innerText;

    attackButton.classList.add(classes.attackWithWeapon);
    attackButton.addEventListener("click", function (event) {
      store.dispatch("click", { className: classes.attackWithWeapon, event, data: { name, attack } });
    });

    damageButton.classList.add(classes.rollWeaponDamage);
    damageButton.addEventListener("click", function () {
      store.dispatch("click", { className: classes.rollWeaponDamage, event, data: { name, damage } });
    });

    console.debug("Added attack with weapon and roll weapon damage listeners: " + name);
  }
};
