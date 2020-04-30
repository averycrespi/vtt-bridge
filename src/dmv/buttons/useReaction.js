import { createButton, withLeftMargin, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";
import { useAbility } from "../commands";

const ready = (onClick) => {
  const parent = document.querySelector(".reactions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const bonusAction = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton(
      "use",
      function () {
        onClick(useAbility(bonusAction, details));
      },
      [withTopMargin(), withLeftMargin(), "vtt-use-reaction"]
    );
    child.appendChild(button);
  }
  console.debug("Created " + children.length + " use reaction buttons");
};

export default (onClick) => onElementLoad(".reactions", () => ready(onClick));
