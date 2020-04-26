import { ACTION } from "../types";
import { createButton } from "../dom";

export default (onClick) => {
  const parent = document.querySelector(".actions");
  for (const child of parent.querySelectorAll("p")) {
    const spans = child.querySelectorAll("span");
    const button = createButton("use", function () {
      onClick({
        type: ACTION,
        name: spans[0].innerText,
        details: spans[1].innerText,
      });
    });
    child.appendChild(button);
  }
  console.log("Hooked actions");
};
