import { createButton, withTopMargin } from "./elements";

import { onElementLoad } from "../common";
import { rollDice } from "./commands";

const ready = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const stat = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;
    const button = createButton(
      "roll",
      function () {
        onClick(rollDice(stat + " check", mod));
      },
      [withTopMargin(), "vtt-roll-check"]
    );
    child.appendChild(button);
  }
  console.debug("Created " + children.length + " roll ability score buttons");
};

export default (onClick) =>
  onElementLoad(".ability-score-name", () => ready(onClick));
