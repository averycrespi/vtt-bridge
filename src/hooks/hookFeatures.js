import { LEFT_MARGIN, TOP_MARGIN } from "../common/classes";
import { createButton, onElementLoad } from "../common/dom";
import { emote, say } from "../common/commands";

const hookFeatures = (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const feature = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton(
      "use",
      function () {
        onClick([emote("uses", feature), say(details)]);
      },
      [TOP_MARGIN, LEFT_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " features");
};

export default (onClick) =>
  onElementLoad(".features\\,Traits\\,AndFeats", () => hookFeatures(onClick));
