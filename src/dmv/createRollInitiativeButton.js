import { createButton, withTopMargin } from "./elements";

import { onElementLoad } from "../common";
import { rollDice } from "./commands";

const ready = (onClick) => {
  const elem = document.querySelector(".initiative");
  const mod = elem.innerText;
  const button = createButton(
    "roll",
    function (event) {
      onClick(rollDice("initiative", mod, event));
    },
    [withTopMargin(), "vtt-roll-initiative"]
  );
  elem.parentNode.appendChild(button);
  console.debug("Created roll initiative button");
};

export default (onClick) => onElementLoad(".initiative", () => ready(onClick));
