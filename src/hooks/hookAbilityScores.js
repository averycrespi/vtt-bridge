import { createButton, onElementLoad } from "../common/dom";
import { emote, roll } from "../common/commands";

import { TOP_MARGIN } from "../common/classes";

const hookAbilityScores = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const stat = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;
    const button = createButton(
      "roll",
      function () {
        onClick([emote("is rolling", stat, "check"), roll(mod)]);
      },
      [TOP_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " ability scores");
};

export default (onClick) =>
  onElementLoad(".ability-scores", () => hookAbilityScores(onClick));
