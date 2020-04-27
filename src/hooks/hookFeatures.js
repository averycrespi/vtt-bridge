import { addLeftMargin, addTopMargin, createButton } from "./elements";
import { emote, say } from "./commands";

import { onElementLoad } from "../common";

const hookFeatures = (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const feature = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton("use", function () {
      onClick([emote("uses", feature), say(details)]);
    });
    addTopMargin(button);
    addLeftMargin(button);
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " features");
};

export default (onClick) =>
  onElementLoad(".features\\,Traits\\,AndFeats", () => hookFeatures(onClick));
