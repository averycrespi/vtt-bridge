import * as classes from "../classes";

import { createButton, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add roll buttons for ability scores.
 *
 * @param {Function} store
 */
export const addRollAbilityScoreButtons = (store) =>
  onElementLoad(".ability-scores .ability-score-name", () => ready(store));

const ready = (store) => {
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
        store.dispatch("click", {
          event,
          className: classes.rollAbilityScoreCheck,
          data: { stat, mod },
        });
      },
      [withTopMargin(), classes.rollAbilityScoreCheck]
    );

    child.appendChild(button);
  }

  console.debug("Added " + children.length + " roll ability score buttons");
};
