import { addTopMargin, createButton } from "./elements";
import { emote, roll } from "./commands";

import { onElementLoad } from "../common";

const hookAbilityScores = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const stat = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;
    const button = createButton("roll", function () {
      onClick([emote("is rolling", stat, "check"), roll(mod)]);
    });
    addTopMargin(button);
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " ability scores");
};

export default (onClick) =>
  onElementLoad(".ability-score-name", () => hookAbilityScores(onClick));
