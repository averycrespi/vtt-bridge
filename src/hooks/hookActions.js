import { createButton, onElementLoad } from "./common";

import { USE_ACTION } from "../messages";

const hookActions = (onClick) => {
  const parent = document.querySelector(".actions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    // There may be additional spans, but we don't care about them.
    const [name, details, ..._] = child.querySelectorAll("span");
    const button = createButton("use", function () {
      onClick({
        type: USE_ACTION,
        action: name.innerText,
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
