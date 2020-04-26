import { createButton, onElementLoad } from "../common/dom";
import { emote, roll } from "../common/commands";

import { TOP_MARGIN } from "../common/classes";

const hookInitiative = (onClick) => {
  const elem = document.querySelector(".initiative");
  const mod = elem.innerText;
  const button = createButton(
    "roll",
    function () {
      onClick([emote("is rolling initiative"), roll(mod)]);
    },
    [TOP_MARGIN]
  );
  elem.parentNode.appendChild(button);
  console.debug("Hooked initiative");
};

export default (onClick) =>
  onElementLoad(".initiative", () => hookInitiative(onClick));
