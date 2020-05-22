import * as classes from "../classes";

import { onElementLoad } from "../../callbacks";

export const addUseFeatureListeners = (store) => {
  onElementLoad(".actions p span", () => ready(store, ".actions"));
  onElementLoad(".bonusActions p span", () => ready(store, ".bonusActions"));
  onElementLoad(".features\\,Traits\\,AndFeats p span", () => ready(store, ".features\\,Traits\\,AndFeats"));
  onElementLoad(".reactions p span", () => ready(store, ".reactions"));
};

const ready = (store, selector) => {
  const children = document.querySelector(selector).querySelectorAll("p");

  for (const child of children) {
    // There may be more spans, but we don't care about them.
    const [featureSpan, detailsSpan, ,] = child.querySelectorAll("span");

    const className = classes.useFeature;
    const name = featureSpan.innerText;
    const description = detailsSpan.innerText;

    const button = document.createElement("button");
    button.innerText = "use";
    button.classList.add("roll-button", "m-t-10", "m-l-10", className);
    button.onclick = function (event) {
      store.dispatch("click", {
        className,
        event,

        data: { name, description },
      });
    };
    child.appendChild(button);
  }

  console.debug("Created use feature buttons with selector: " + selector);
  console.debug("Added use feature listeners with selector: " + selector);
};
