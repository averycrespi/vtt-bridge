import { LEFT_MARGIN, TOP_MARGIN } from "../common/classes";
import { createButton, onElementLoad } from "../common/dom";
import { emote, say } from "../common/commands";

const hookActions = (onClick) => {
  const parent = document.querySelector(".actions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    const spans = child.querySelectorAll("span");
    const action = spans[0].innerText;
    const details = spans[1].innerText;
    const button = createButton(
      "use",
      function () {
        onClick([emote("uses", action), say(details)]);
      },
      [TOP_MARGIN, LEFT_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " actions");
};

export default (onClick) =>
  onElementLoad(".actions", () => hookActions(onClick));
