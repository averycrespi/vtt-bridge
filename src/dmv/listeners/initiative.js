import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listener to roll initiative button.
 *
 * @param {Function} onClick
 */
export const addRollInitiativeListener = (onClick) =>
  onElementLoad(".initiative", () => ready(onClick));

const ready = (onClick) => {
  const parent = document.querySelector(".initiative");
  const mod = parent.innerText;

  const button = parent.closest("div.flex-wrap").querySelector(".roll-button");
  button.addEventListener("click", function (event) {
    onClick(commands.rollInitiative(mod, event));
  });
  button.classList.add(classes.rollInitiatve);

  console.debug("Added listener to roll initiative button");
};
