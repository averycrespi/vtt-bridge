import { classes, onElementLoad } from "../common";

// Brittle: wait for any roll button to load.
export const addWeaponListeners = (store) => onElementLoad(".weapons .weapon .roll-button", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      continue; // Skip table header.
    }

    const cells = Array.from(row.querySelectorAll("td"));
    const details = cells.find((c) => c.innerText.includes("damage")).innerText;

    const name = cells[0].innerText;
    // Brittle: search the details with a damage regex.
    const damage = details.match(/([0-9d+-]+) damage/)[1];
    // Brittle: find the first cell that matches a mod regex.
    const mod = cells.find((c) => c.innerText.match(/^[0-9+-]+/)).innerText;

    const [attackButton, damageButton] = row.querySelectorAll(".roll-button");

    attackButton.classList.add(classes.attackWithWeapon);
    attackButton.addEventListener("click", function (event) {
      store.dispatch("click", { className: classes.attackWithWeapon, event, data: { name, mod } });
    });

    damageButton.classList.add(classes.rollWeaponDamage);
    damageButton.addEventListener("click", function () {
      store.dispatch("click", { className: classes.rollWeaponDamage, event, data: { name, damage } });
    });

    console.debug("Added attack with weapon and roll weapon damage listeners: " + name);
  }
};
