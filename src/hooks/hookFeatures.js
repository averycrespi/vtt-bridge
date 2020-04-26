import { FEATURE } from "../types";
import { createButton } from "./common";

export default (onClick) => {
  const parent = document.querySelector(".features\\,Traits\\,AndFeats");
  for (const child of parent.querySelectorAll("p")) {
    const [name, details, ...rest] = child.querySelectorAll("span");
    const button = createButton("use", function () {
      onClick({
        type: FEATURE,
        name: name.innerText,
        details: details.innerText,
      });
    });
    button.classList.add("m-t-10", "m-l-10");
    child.appendChild(button);
  }
  console.log("Hooked features");
};
