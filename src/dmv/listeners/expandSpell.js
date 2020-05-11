import * as classes from "../classes";

import { onElementLoad } from "../../common";

export const addExpandSpellListeners = (store) =>
  onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const pointers = document
    .querySelector(".details-columns")
    .querySelectorAll(".pointer.orange");

  for (const pointer of pointers) {
    pointer.addEventListener("click", function () {
      onElementLoad(".spells td .form-button", () => {
        const className = classes.castSpell;

        const button = document.querySelector(".spells td .form-button");
        // Avoid selecting this button on other pointer clicks.
        button.classList.remove("form-button");
        button.classList.add("roll-button", className);

        // Extract the name spell from the prevous row.
        const row = button.closest("tr");
        const name = row.previousSibling.firstChild.innerText;

        const cell = button.closest("td");
        const paragraphs = Array.from(cell.querySelectorAll("p"));
        const description = paragraphs.map((p) => p.innerText).join("\n");
        // If the value isn't selected, cast at level 1.
        const level = cell.querySelector("select").value || "1";

        button.addEventListener("click", function (event) {
          store.dispatch("click", {
            className,
            event,
            data: { name, description, level },
          });
        });
      });
    });
  }

  console.debug("Added expand spell listeners");
};
