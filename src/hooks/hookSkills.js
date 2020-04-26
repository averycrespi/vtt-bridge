import { createButtonInCell, onElementLoad } from "../common/dom";
import { emote, roll } from "../common/commands";

import { LEFT_MARGIN } from "../common/classes";

const hookSkills = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;
    const cell = createButtonInCell(
      "roll",
      function () {
        onClick([emote("is rolling", skill), roll(mod)]);
      },
      [LEFT_MARGIN]
    );
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " skills");
};

export default (onClick) => onElementLoad(".skills", () => hookSkills(onClick));
