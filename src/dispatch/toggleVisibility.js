import { classes, onElementLoad } from "../common";

import { STORE_VISIBILITY } from "../store";

export const addToggleVisibilityListeners = (store) => onElementLoad(".character-summary", () => ready(store));

const ready = (store) => {
  let visible = true;

  const summary = document.querySelector(".character-summary");

  const button = document.createElement("button");
  button.classList.add("form-button", "m-l-10", "h-40", classes.toggleVisibility);
  button.addEventListener("click", function () {
    visible = !visible;
    store.dispatch(STORE_VISIBILITY, visible);
  });
  summary.appendChild(button);

  const iconSpan = document.createElement("span");
  button.appendChild(iconSpan);

  const icon = document.createElement("i");
  icon.classList.add("fa", "f-s-18", "fa-eye");
  iconSpan.appendChild(icon);

  const textSpan = document.createElement("span");
  textSpan.classList.add("m-l-5");
  textSpan.innerText = "toggle visibility";
  button.appendChild(textSpan);

  console.debug("Added toggle visibility listeners");
};
