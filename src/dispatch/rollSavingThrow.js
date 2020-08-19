import { classes, onElementLoad } from "../common";

// Brittle: wait for any saving throw name to load.
export const addRollSavingThrowListeners = (store) => onElementLoad("table tr .saving-throw-name", () => ready(store));

const ready = (store) => {
  const className = classes.rollSavingThrow;

  // Brittle: search backwards to find the wrapping table.
  const rows = document.querySelector(".saving-throw-name").closest("table").querySelectorAll("tr");

  for (const row of rows) {
    const name = row.querySelector(".saving-throw-name").innerText;
    const button = row.querySelector(".roll-button");
    const mod = button.innerText;
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    });

    console.debug("Added roll saving throw listener: " + name);
  }
};
