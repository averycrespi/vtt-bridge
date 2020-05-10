import * as classes from "../classes";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll spell and cantrip buttons.
 *
 * @param {Function} store
 */
export const addRollSpellListeners = (store) =>
  onElementLoad(".details-columns tr.spell", () => ready(store));

const ready = (store) => {
  const rows = document
    .querySelector(".details-columns")
    .querySelectorAll("tr.spell");
  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td"));
    const spell = cells[0].innerText;
    const mod = cells[4].innerText; //TODO: use better selector

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      store.dispatch("click", {
        className: classes.castSpell,
        event,
        data: { name: spell, mod },
      });
    });
    button.classList.add(classes.castSpell);
  }

  console.debug("Added listeners to " + rows.length + " roll spell buttons");
};
