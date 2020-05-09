import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll spell and cantrip buttons.
 *
 * @param {Function} onClick
 */
export const addRollSpellListeners = (onClick) =>
  onElementLoad(".details-columns tr.spell", () => ready(onClick));

const ready = (onClick) => {
  const rows = document
    .querySelector(".details-columns")
    .querySelectorAll("tr.spell");
  for (const row of rows) {
    const cells = Array.from(row.querySelectorAll("td"));
    const spell = cells[0].innerText;
    const mod = cells[4].innerText; //TODO: use better selector

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      onClick(commands.attackWith(spell, mod, event));
    });
    button.classList.add(classes.castSpell);
  }

  console.debug("Added listeners to " + rows.length + " roll spell buttons");
};
