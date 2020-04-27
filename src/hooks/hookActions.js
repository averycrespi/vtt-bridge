import { addLeftMargin, addTopMargin, createButton } from "./elements";
import { emote, say } from "./commands";

import { onElementLoad } from "../common";

const hookActions = (onClick) => {
  const parent = document.querySelector(".actions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const action = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton("use", function () {
      onClick([emote("uses", action), say(details)]);
    });
    addTopMargin(button);
    addLeftMargin(button);
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " actions");
};

export default (onClick) =>
  onElementLoad(".actions", () => hookActions(onClick));
