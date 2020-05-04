import * as classes from "../classes";
import * as commands from "../commands";

import { createButton, withLeftMargin } from "../elements";

import { onElementLoad } from "../../common";

/**
 * Add roll buttons for skills.
 *
 * @param {Function} onClick
 */
export const addRollSkillButtons = (onClick) =>
  onElementLoad(".skills tr .skill-name", () => ready(onClick));

const ready = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;
    const button = createButton(
      "roll",
      function (event) {
        onClick(commands.rollDice(skill + " check", mod, event));
      },
      [withLeftMargin(), classes.rollSkill]
    );
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Created " + rows.length + " roll skill buttons");
};
