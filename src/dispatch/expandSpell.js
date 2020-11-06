import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidDescription, isValidName } from "../transform/validate";

// Brittle: wait for any spell row to load.
export const addExpandSpellListeners = (store) => onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const className = classes.castSpell;
  let pointers = document.querySelector(".details-columns").querySelectorAll(".spell.pointer");

  for (const pointer of pointers) {
    pointer.addEventListener("click", function () {
      // Brittle: wait for any form button in a cell to load.
      onElementLoad(".spells td .form-button", () => {
        const button = document.querySelector(".spells td .form-button");
        button.classList.remove("form-button"); // Avoid matching this button again.
        button.classList.add("roll-button", className);
        button.innerText = "CAST SPELL";

        // Brittle: search backwards to find the spell name.
        const prevRow = button.closest("tr").previousSibling;
        const name = prevRow.firstChild.innerText;
        if (!isValidName(name)) {
          store.dispatch(STORE_ERROR, { name: "spell", property: "name", value: name });
          return;
        }

        const cell = button.closest("td");
        const paragraphs = Array.from(cell.querySelectorAll("p"));
        const description = paragraphs.map((p) => p.innerText).join("\n");
        if (!isValidDescription(description)) {
          store.dispatch(STORE_ERROR, { name, property: "description", value: description });
          return;
        }

        button.addEventListener("click", function (event) {
          store.dispatch(STORE_CLICK, { className, event, data: { name, description } });
        });

        console.debug(`Added expand spell listener: ${name}`);
      });
    });
  }
};
