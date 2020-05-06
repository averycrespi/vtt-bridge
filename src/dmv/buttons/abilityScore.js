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
  // Remove any existing buttons.
  for (const button of document.querySelectorAll(
    "." + classes.rollAbilityScoreCheck
  )) {
    button.remove();
  }

  const children = document.querySelector(".ability-scores").children;
  for (const child of children) {
    const stat = child.querySelector(".ability-score-name").innerText;
    const mod = child.querySelector(".ability-score-modifier").innerText;

    const button = createButton(
      "roll",
      function (event) {
        onClick(commands.rollAbilityScoreCheck(stat, mod, event));
      },
      [withTopMargin(), classes.rollAbilityScoreCheck]
    );

    child.appendChild(button);
  }

  console.debug("Added " + children.length + " roll ability score buttons");
};
