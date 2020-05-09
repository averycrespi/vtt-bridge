import * as classes from "../classes";
import * as commands from "../commands";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll skill buttons.
 *
 * @param {Function} onClick
 */
export const addRollSkillListeners = (onClick) =>
  onElementLoad(".skills tr .skill-name", () => ready(onClick));

const ready = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      onClick(commands.rollCheck(skill, mod, event));
    });
    button.classList.add(classes.rollSkillCheck);
  }

  console.debug("Added listeners to " + rows.length + " roll skill buttons");
};
