import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addExpandSpellListeners = (store) => onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const pointers = document.querySelector(".details-columns").querySelectorAll(".pointer.orange");

  for (const pointer of pointers) {
    pointer.addEventListener("click", function () {
      onElementLoad(".spells td .form-button", () => {
        const className = classes.castSpell;

        const button = document.querySelector(".spells td .form-button");
        button.classList.remove("form-button"); // Avoid selecting this button on other pointer clicks.
        button.classList.add("roll-button", className);

        // Extract the spell name from the prevous row.
        const row = button.closest("tr");
        const name = row.previousSibling.firstChild.innerText;

        const cell = button.closest("td");
        const paragraphs = Array.from(cell.querySelectorAll("p"));
        const description = paragraphs.map((p) => p.innerText).join("\n");

        button.addEventListener("click", function (event) {
          store.dispatch("click", { className, event, data: { name, description } });
        });
      });
    });
  }

  console.debug("Added expand spell listeners");
};
