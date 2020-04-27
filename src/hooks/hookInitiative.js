import { addTopMargin, createButton } from "./elements";
import { emote, roll } from "./commands";

import { onElementLoad } from "../common";

const hookInitiative = (onClick) => {
  const elem = document.querySelector(".initiative");
  const mod = elem.innerText;
  const button = createButton("roll", function () {
    onClick([emote("is rolling initiative"), roll(mod)]);
  });
  addTopMargin(button);
  elem.parentNode.appendChild(button);
  console.debug("Hooked initiative");
};

export default (onClick) =>
  onElementLoad(".initiative", () => hookInitiative(onClick));
