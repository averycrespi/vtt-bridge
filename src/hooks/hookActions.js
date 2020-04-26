import { createButton, onElementLoad } from "./common";

import { ACTION } from "../types";

const hookActions = (onClick) => {
  const parent = document.querySelector(".actions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    // There may be additional spans, but we don't care about them.
    const [name, details, ..._] = child.querySelectorAll("span");
    const button = createButton("use", function () {
      onClick({
        type: ACTION,
        name: name.innerText,
        details: details.innerText,
      });
    });
    button.classList.add("m-t-10", "m-l-10");
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " actions");
};

export default (onClick) =>
  onElementLoad(".actions", () => hookActions(onClick));