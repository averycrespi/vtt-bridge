import { createButton, withLeftMargin, withTopMargin } from "../elements";

import { onElementLoad } from "../../common";
import { useAbility } from "../commands";

const ready = (onClick, selector, label) => {
  const parent = document.querySelector(selector);
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    // There may be more spans, but we don't care about them.
    const [abilitySpan, detailsSpan, ,] = child.querySelectorAll("span");
    const ability = abilitySpan.innerText;
    const details = detailsSpan.innerText;
    const button = createButton(
      "use",
      function () {
        onClick(useAbility(ability, details));
      },
      [withTopMargin(), withLeftMargin(), "vtt-use-" + label.replace(" ", "-")]
    );
    child.appendChild(button);
  }
  console.debug("Created " + children.length + " use " + label + " buttons");
};

export default (onClick) => {
  onElementLoad(".actions", () => ready(onClick, ".actions", "action"));

  onElementLoad(".bonusActions", () =>
    ready(onClick, ".bonusActions", "bonus action")
  );

  onElementLoad(".features\\,Traits\\,AndFeats", () =>
    ready(onClick, ".features\\,Traits\\,AndFeats", "feature")
  );

  onElementLoad(".reactions", () => ready(onClick, ".reactions", "reaction"));
};
