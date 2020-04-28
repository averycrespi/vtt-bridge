import { createButton, withTopMargin } from "./elements";

import { onElementLoad } from "../common";
import { rollDice } from "./commands";

const ready = (onClick) => {
  const elem = document.querySelector(".initiative");
  const mod = elem.innerText;
  const button = createButton(
    "roll",
    function () {
      onClick(rollDice("initiative", mod));
    },
    [withTopMargin(), "vtt-roll-initiative"]
  );
  elem.parentNode.appendChild(button);
  console.debug("Created roll initiative button");
};

export default (onClick) => onElementLoad(".initiative", () => ready(onClick));
