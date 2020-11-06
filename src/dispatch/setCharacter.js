import { STORE_CHARACTER } from "../store";
import { onElementLoad } from "../common";

export const setCharacter = (store) => onElementLoad(".character-name", () => ready(store));

const ready = (store) => {
  const character = document.querySelector(".character-name").innerText;
  store.dispatch(STORE_CHARACTER, character);
  console.debug(`Set character to: ${character}`);
};
