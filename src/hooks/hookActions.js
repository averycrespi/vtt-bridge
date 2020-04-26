import { ACTION } from "../types";
import { createButton } from "./common";

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
    button.classList.add("m-t-10", "m-l-10");
    child.appendChild(button);
  }
  console.log("Hooked actions");
};
