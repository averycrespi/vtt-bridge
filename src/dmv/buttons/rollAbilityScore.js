import * as classes from "../classes";
import * as commands from "../commands";

import { createButton, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add roll buttons for ability scores.
 *
 * @param {Function} onClick
 */
export const addRollAbilityScoreButtons = (onClick) =>
  onElementLoad(".ability-scores .ability-score-name", () => ready(onClick));

const ready = (onClick) => {
  const parent = document.querySelector(".ability-scores");
  const children = parent.children;
  for (const child of children) {
    const stat = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;
    const button = createButton(
      "roll",
      function (event) {
        onClick(commands.rollDice(stat + " check", mod, event));
      },
      [withTopMargin(), classes.rollAbilityScore]
    );
    child.appendChild(button);
  }
  console.debug("Created " + children.length + " roll ability score buttons");
};
