import { createButton, withLeftMargin } from "../elements";

import { onElementLoad } from "../../common";
import { rollDice } from "../commands";

const ready = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;
    const button = createButton(
      "roll",
      function (event) {
        onClick(rollDice(skill, mod, event));
      },
      [withLeftMargin(), "vtt-roll-skill"]
    );
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Created " + rows.length + " roll skill buttons");
};

export default (onClick) =>
  onElementLoad(".skills tr .skill-name", () => ready(onClick));
