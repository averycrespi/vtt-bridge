import { classes, onElementLoad } from "../common";

export const addRollSkillListeners = (store) => onElementLoad(".skills", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");

  for (const row of rows) {
    const className = classes.rollSkill;
    const name = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;

    const button = row.querySelector(".roll-button");
    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch("click", { className, event, data: { name, mod } });
    });

    console.debug("Added roll skill listener: " + name);
  }
};
