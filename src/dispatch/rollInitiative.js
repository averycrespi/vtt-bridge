import { classes, onElementLoad } from "../common";

export const addRollInitiativeListeners = (store) => onElementLoad(".initiative", () => ready(store));

const ready = (store) => {
  const className = classes.rollInitiative;
  const name = "initiative";

  const parent = document.querySelector(".initiative");
  const button = parent.querySelector(".roll-button");
  const mod = button.innerText;
  button.classList.add(className);
  button.addEventListener("click", function (event) {
    store.dispatch("click", { className, event, data: { name, mod } });
  });

  console.debug("Added roll initiative listener");
};
