import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidMod, isValidName } from "../transform/validate";

// Brittle: wait for any roll button to load.
export const addRollProficiencyListeners = (store) =>
  onElementLoad(".details-columns table tr .roll-button", () => ready(store));

const ready = (store) => {
  const className = classes.rollProficiency;
  const tables = document.querySelector(".details-columns").querySelectorAll("table");

  for (const table of tables) {
    const rows = table.querySelectorAll("tr");

    for (const row of rows) {
      // Skip table headers.
      if (row.querySelectorAll("th").length > 0) {
        continue;
      }

      const cells = Array.from(row.querySelectorAll("td"));
      const name = cells[0].innerText;
      if (!isValidName(name)) {
        store.dispatch(STORE_ERROR, { name: "proficiency", property: "name", value: name });
        continue;
      }

      const button = row.querySelector(".roll-button");

      // Temporary workaround: tool buttons are not compact.
      const mod = button.innerText === "Roll" ? cells[cells.length - 2].innerText : button.innerText;
      if (!isValidMod(mod)) {
        store.dispatch(STORE_ERROR, { name, property: "modifier", value: mod });
        continue;
      }

      button.classList.add(className);
      button.addEventListener("click", function (event) {
        store.dispatch(STORE_CLICK, { className, event, data: { name, mod } });
      });

      console.debug(`Added roll proficiency listener: ${name}`);
    }
  }
};
