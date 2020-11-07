import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidDescription, isValidName } from "../transform/validate";

export const addUseFeatureListeners = (store) => {
  onElementLoad(".actions p span", () => ready(store, ".actions"));
  onElementLoad(".bonusActions p span", () => ready(store, ".bonusActions"));
  onElementLoad(".features\\,Traits\\,AndFeats p span", () => ready(store, ".features\\,Traits\\,AndFeats"));
  onElementLoad(".reactions p span", () => ready(store, ".reactions"));
};

const ready = (store, selector) => {
  const className = classes.useFeature;
  const children = document.querySelector(selector).querySelectorAll("p");

  for (const child of children) {
    // There may be more spans, but we don't care about them.
    const [featureSpan, detailsSpan, ,] = child.querySelectorAll("span");

    const name = featureSpan.innerText;
    if (!isValidName(name)) {
      store.dispatch(STORE_ERROR, { name: "feature", property: "name", value: name });
      continue;
    }

    const description = detailsSpan.innerText;
    if (!isValidDescription(description)) {
      store.dispatch(STORE_ERROR, { name, property: "description", value: description });
      continue;
    }

    // These buttons don't normally exist, so we need to create them.
    const button = document.createElement("button");
    button.innerText = "USE";
    button.classList.add("roll-button", "m-t-10", "m-l-10", className);
    button.onclick = function (event) {
      store.dispatch(STORE_CLICK, { className, event, data: { name, description } });
    };
    child.appendChild(button);

    console.debug(`Added use feature listener: ${name}`);
  }
};
