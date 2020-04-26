import { INITIATIVE } from "../types";
import { createButton } from "../dom";

export default (onClick) => {
  const elem = document.querySelector(".initiative");
  const button = createButton("roll", function () {
    onClick({
      type: INITIATIVE,
      bonus: elem.innerText,
    });
  });
  button.classList.add("m-t-10");
  elem.parentNode.appendChild(button);
  console.log("Hooked initiative");
};
