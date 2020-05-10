import * as classes from "../classes";

import { onElementLoad } from "../../common";

/**
 * Add listener to roll initiative button.
 *
 * @param {Function} store
 */
export const addRollInitiativeListener = (store) =>
  onElementLoad(".initiative", () => ready(store));

const ready = (store) => {
  const parent = document.querySelector(".initiative");
  const mod = parent.innerText;

  const button = parent.closest("div.flex-wrap").querySelector(".roll-button");
  button.addEventListener("click", function (event) {
    store.dispatch("click", {
      className: classes.rollInitiatve,
      event,
      data: { name: "initiative", mod },
    });
  });
  button.classList.add(classes.rollInitiatve);

  console.debug("Added listener to roll initiative button");
};
