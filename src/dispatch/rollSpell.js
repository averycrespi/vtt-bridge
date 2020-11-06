import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidAttack, isValidName } from "../transform/validate";

// Brittle: wait for any spell row to load.
export const addRollSpellListeners = (store) => onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const className = classes.attackWithSpell;
  const rows = document.querySelector(".details-columns").querySelectorAll("tr.spell");

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td"));
    const name = cells[0].innerText;
    if (!isValidName(name)) {
      store.dispatch(STORE_ERROR, { name: "spell", property: "name", value: name });
      continue;
    }

    const button = row.querySelector(".roll-button");

    const attack = button.innerText;
    if (!isValidAttack(attack)) {
      store.dispatch(STORE_ERROR, { name, property: "attack", value: attack });
      continue;
    }

    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch(STORE_CLICK, { className, event, data: { name, attack } });
    });

    console.debug(`Added roll spell listener: ${name}`);
  }
};
