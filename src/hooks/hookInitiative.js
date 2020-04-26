import { createButton, onElementLoad } from "../common/dom";

import { ROLL_INITIATIVE } from "../common/messages";
import { TOP_MARGIN } from "../common/classes";

const hookInitiative = (onClick) => {
  const elem = document.querySelector(".initiative");
  const button = createButton(
    "roll",
    function () {
      onClick({
        type: ROLL_INITIATIVE,
        mod: elem.innerText,
      });
    },
    [TOP_MARGIN]
  );
  elem.parentNode.appendChild(button);
  console.debug("Hooked initiative");
};

export default (onClick) =>
  onElementLoad(".initiative", () => hookInitiative(onClick));
