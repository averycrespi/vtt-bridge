import { createButton, onElementLoad } from "./common";

import { INITIATIVE } from "../types";

const hookInitiative = (onClick) => {
  const elem = document.querySelector(".initiative");
  const button = createButton("roll", function () {
    onClick({
      type: INITIATIVE,
      bonus: elem.innerText,
    });
  });
  button.classList.add("m-t-10");
  elem.parentNode.appendChild(button);
  console.debug("Hooked initiative");
};

export default (onClick) =>
  onElementLoad(".initiative", () => hookInitiative(onClick));
