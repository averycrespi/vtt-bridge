import { createButton, onElementLoad } from "./common";

import { FEATURE } from "../types";

const hookFeatures = (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  for (const child of parent.querySelectorAll("p")) {
    // There may be additional spans, but we don't care about them.
    const [name, details, ..._] = child.querySelectorAll("span");
    const button = createButton("use", function () {
      onClick({
        type: FEATURE,
        name: name.innerText,
        details: details.innerText,
      });
    });
    button.classList.add("m-t-10", "m-l-10");
    child.appendChild(button);
  }
  console.log("Hooked features");
};

export default (onClick) =>
  onElementLoad(".features\\,Traits\\,AndFeats", () => hookFeatures(onClick));
