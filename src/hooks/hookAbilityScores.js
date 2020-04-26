import { createButton, onElementLoad } from "./common";

import { ABILITY_SCORE } from "../types";

const hookAbilityScores = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const button = createButton("roll", function () {
      onClick({
        type: ABILITY_SCORE,
        name: child.querySelector(".ability-score-name").innerText,
        score: child.querySelector(".ability-score").innerText,
        modifier: child.querySelector(".ability-score-modifier").innerText,
      });
    });
    button.classList.add("m-t-10");
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " ability scores");
};

export default (onClick) =>
  onElementLoad(".ability-scores", () => hookAbilityScores(onClick));
