import * as classes from "../classes";
import * as commands from "../commands";

import { createButton, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add roll button for initiative.
 *
 * @param {Function} onClick
 */
export const addRollInitiativeButton = (onClick) =>
  onElementLoad(".initiative", () => ready(onClick));

const ready = (onClick) => {
  const elem = document.querySelector(".initiative");
  const mod = elem.innerText;
  const button = createButton(
    "roll",
    function (event) {
      onClick(commands.rollDice("initiative", mod, event));
    },
    [withTopMargin(), classes.rollInitiatve]
  );
  elem.parentNode.appendChild(button);
  console.debug("Created roll initiative button");
};
