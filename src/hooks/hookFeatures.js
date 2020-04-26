import { LEFT_MARGIN, TOP_MARGIN } from "../common/classes";
import { createButton, onElementLoad } from "../common/dom";

import { USE_FEATURE } from "../common/messages";

const hookFeatures = (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    // There may be additional spans, but we don't care about them.
    const [name, details, ..._] = child.querySelectorAll("span");
    const button = createButton(
      "use",
      function () {
        onClick({
          type: USE_FEATURE,
          feature: name.innerText,
          details: details.innerText,
        });
      },
      [TOP_MARGIN, LEFT_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " features");
};

export default (onClick) =>
  onElementLoad(".features\\,Traits\\,AndFeats", () => hookFeatures(onClick));
