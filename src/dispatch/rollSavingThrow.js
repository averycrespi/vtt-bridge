import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidMod, isValidName } from "../transform/validate";

// Brittle: wait for any saving throw name to load.
export const addRollSavingThrowListeners = (store) => onElementLoad("table tr .saving-throw-name", () => ready(store));

const ready = (store) => {
  const className = classes.rollSavingThrow;

  // Brittle: search backwards to find the wrapping table.
  const rows = document.querySelector(".saving-throw-name").closest("table").querySelectorAll("tr");

  for (const row of rows) {
    const name = row.querySelector(".saving-throw-name").innerText;
    if (!isValidName(name)) {
      store.dispatch(STORE_ERROR, { name: "saving throw", property: "name", value: name });
      continue;
    }

    const button = row.querySelector(".roll-button");

    const mod = button.innerText;
    if (!isValidMod(mod)) {
      store.dispatch(STORE_ERROR, { name, property: "modifier", value: mod });
      continue;
    }

    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch(STORE_CLICK, { className, event, data: { name, mod } });
    });

    console.debug(`Added roll saving throw listener: ${name}`);
  }
};
