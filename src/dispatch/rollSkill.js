import { STORE_CLICK, STORE_ERROR } from "../store";
import { classes, onElementLoad } from "../common";
import { isValidMod, isValidName } from "../transform/validate";

export const addRollSkillListeners = (store) => onElementLoad(".skills", () => ready(store));

const ready = (store) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");

  for (const row of rows) {
    const className = classes.rollSkill;

    const name = row.querySelector(".skill-name").innerText;
    if (!isValidName(name)) {
      store.dispatch(STORE_ERROR, { name: "skill", property: "name", value: name });
      continue;
    }

    const button = row.querySelector(".roll-button");

    const mod = button.innerText;
    if (!isValidMod(mod)) {
      store.dispatch(STORE_ERROR, { name, property: "modifier", value: mod });
      continue;
    }

    button.classList.add(className);
    button.addEventListener("click", function (event) {
      store.dispatch(STORE_CLICK, { className, event, data: { name, mod } });
    });

    console.debug(`Added roll skill listener: ${name}`);
  }
};
