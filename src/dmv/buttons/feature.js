import * as classes from "../classes";

import { createButton, withLeftMargin, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add use buttons for features.
 *
 * @param {Function} store
 */
export const addUseFeatureButtons = (store) => {
  onElementLoad(".actions p span", () =>
    ready(store, ".actions", "action", classes.useAction)
  );

  onElementLoad(".bonusActions p span", () =>
    ready(store, ".bonusActions", "bonus action", classes.useBonusAction)
  );

  onElementLoad(".features\\,Traits\\,AndFeats p span", () =>
    ready(store, ".features\\,Traits\\,AndFeats", "feature", classes.useFeature)
  );

  onElementLoad(".reactions p span", () =>
    ready(store, ".reactions", "reaction", classes.useReaction)
  );
};

const ready = (store, selector, label, buttonClass) => {
  // Remove any existing buttons.
  for (const button of document.querySelectorAll("." + buttonClass)) {
    button.remove();
  }

  const children = document.querySelector(selector).querySelectorAll("p");
  for (const child of children) {
    // There may be more spans, but we don't care about them.
    const [featureSpan, detailsSpan, ,] = child.querySelectorAll("span");
    const feature = featureSpan.innerText;
    const details = detailsSpan.innerText;

    const button = createButton(
      "use",
      function () {
        store.dispatch("click", {
          className: buttonClass,
          event,
          data: { name: feature, description: details },
        });
      },
      [withTopMargin(), withLeftMargin(), buttonClass]
    );

    child.appendChild(button);
  }

  console.debug("Added " + children.length + " use " + label + " buttons");
};
