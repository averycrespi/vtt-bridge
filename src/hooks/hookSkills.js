import { createButton, onElementLoad } from "./common";

import { SKILL } from "../types";

const hookSkills = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createButton("roll", function () {
      onClick({
        type: SKILL,
        name: row.querySelector(".skill-name").innerText,
        bonus: row.querySelector(".skillbonus").innerText,
      });
    });
    button.classList.add("m-l-10");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " skills");
};

export default (onClick) => onElementLoad(".skills", () => hookSkills(onClick));
