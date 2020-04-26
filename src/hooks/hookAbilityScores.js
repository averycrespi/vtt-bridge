import { createButton, onElementLoad } from "../common/dom";

import { ROLL_ABILITY_SCORE } from "../common/messages";
import { TOP_MARGIN } from "../common/classes";

const hookAbilityScores = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const button = createButton(
      "roll",
      function () {
        onClick({
          type: ROLL_ABILITY_SCORE,
          stat: child.querySelector(".ability-score-name").innerText,
          score: child.querySelector(".ability-score").innerText,
          mod: child.querySelector(".ability-score-modifier").innerText,
        });
      },
      [TOP_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " ability scores");
};

export default (onClick) =>
  onElementLoad(".ability-scores", () => hookAbilityScores(onClick));
