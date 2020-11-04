import { classes, onElementLoad } from "../common";

// Brittle: wait for any spell row to load.
export const addRollSpellListeners = (store) => onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const className = classes.attackWithSpell;
  const rows = document.querySelector(".details-columns").querySelectorAll("tr.spell");

  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td"));
    const name = cells[0].innerText;

    const button = row.querySelector(".roll-button");
    const attack = button.innerText;
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, attack } });
    });

    console.debug("Added roll spell listener: " + name);
  }
};
