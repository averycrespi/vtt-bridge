import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidAttack, isValidDamage, isValidName } from "../transform/validate";

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
    if (!isValidName(name)) {
      store.dispatch(STORE_ERROR, { name: "weapon", property: "name", value: name });
      continue;
    }

    const [attackButton, ...damageButtons] = row.querySelectorAll(".roll-button");

    const attack = attackButton.innerText;
    if (!isValidAttack(attack)) {
      store.dispatch(STORE_ERROR, { name, property: "attack", value: attack });
      continue;
    }

    attackButton.classList.add(classes.attackWithWeapon);
    attackButton.addEventListener("click", function (event) {
      store.dispatch(STORE_CLICK, { className: classes.attackWithWeapon, event, data: { name, attack } });
    });
    console.debug(`Added weapon attack listener: ${name}`);

    for (const damageButton of damageButtons) {
      let damage = damageButton.innerText;
      if (damage.charAt(0) === "v") {
        // Remove versatility indicator.
        damage = damage.slice("v ".length);
      }
      if (!isValidDamage(damage)) {
        store.dispach("error", { name, property: "damage", value: damage });
        continue;
      }

      damageButton.classList.add(classes.rollWeaponDamage);
      damageButton.addEventListener("click", function (event) {
        store.dispatch(STORE_CLICK, { className: classes.rollWeaponDamage, event, data: { name, damage } });
      });
      console.debug(`Added weapon damage listener: ${name}`);
    }
  }
};
