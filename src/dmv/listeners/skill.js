import * as classes from "../classes";

import { onElementLoad } from "../../common";

/**
 * Add listeners to roll skill buttons.
 *
 * @param {Function} store
 */
export const addRollSkillListeners = (store) =>
  onElementLoad(".skills tr .skill-name", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;

    const button = row.querySelector(".roll-button");
    button.addEventListener("click", function (event) {
      store.dispatch("click", {
        className: classes.rollSkillCheck,
        event,
        data: { name: skill, mod },
      });
    });
    button.classList.add(classes.rollSkillCheck);
  }

  console.debug("Added listeners to " + rows.length + " roll skill buttons");
};
