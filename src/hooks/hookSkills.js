import { createButton, createElement, onElementLoad } from "../common/dom";

import { LEFT_MARGIN } from "../common/classes";
import { ROLL_SKILL } from "../common/messages";

const hookSkills = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const cell = createElement("td");
    const button = createButton(
      "roll",
      function () {
        onClick({
          type: ROLL_SKILL,
          skill: row.querySelector(".skill-name").innerText,
          mod: row.querySelector(".skillbonus").innerText,
        });
      },
      [LEFT_MARGIN]
    );
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " skills");
};

export default (onClick) => onElementLoad(".skills", () => hookSkills(onClick));
