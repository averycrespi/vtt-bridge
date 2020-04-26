import { LEFT_MARGIN, TOP_MARGIN } from "../common/classes";
import { createButton, onElementLoad } from "../common/dom";
import { emote, say } from "../common/commands";

const hookActions = (onClick) => {
  const parent = document.querySelector(".actions");
  const children = parent.querySelectorAll("p");
  for (const child of children) {
    // There may be additional spans, but we don't care about them.
    const [action, details, ..._] = child.querySelectorAll("span");
    const button = createButton(
      "use",
      function () {
        onClick([emote("uses", action.innerText), say(details.innerText)]);
      },
      [TOP_MARGIN, LEFT_MARGIN]
    );
    child.appendChild(button);
  }
  console.debug("Hooked " + children.length + " actions");
};

export default (onClick) =>
  onElementLoad(".actions", () => hookActions(onClick));
