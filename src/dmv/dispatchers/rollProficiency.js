import * as classes from "../classes";

import { onElementLoad } from "../../common";

export const addRollProficiencyListeners = (store) =>
  onElementLoad(".details-columns table tr .roll-button", () => ready(store));

const ready = (store) => {
  const tables = document.querySelector(".details-columns").querySelectorAll("table");

  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    for (const row of rows) {
      if (row.querySelectorAll("th").length > 0) {
        continue; // Skip table header.
      }

      const cells = Array.from(row.querySelectorAll("td"));

      const className = classes.rollProficiency;
      const name = cells[0].innerText;
      const mod = cells.find((c) => c.innerText.match(/^[0-9+-]+/)).innerText;

      const button = row.querySelector(".roll-button");
      button.classList.add(className);
      button.addEventListener("click", function (event) {
        store.dispatch("click", { className, event, data: { name, mod } });
      });

      console.debug("Added roll proficiency listener: " + name);
    }
  }
};
