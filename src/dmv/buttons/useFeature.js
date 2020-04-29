import { createButton, withLeftMargin, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";
import { useAbility } from "../commands";

const ready = (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const feature = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton(
      "use",
      function () {
        onClick(useAbility(feature, details));
      },
      [withTopMargin(), withLeftMargin(), "vtt-use-feature"]
    );

    child.appendChild(button);
  }
  console.debug("Created " + children.length + " use feature buttons");
};

export default (onClick) =>
  onElementLoad(".features\\,Traits\\,AndFeats", () => ready(onClick));
