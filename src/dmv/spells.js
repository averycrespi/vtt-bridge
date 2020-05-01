import { castSpell } from "./commands";
import createCastCantripButtons from "./createButtons/castCantrip";

/**
 * Look for spells while a predicate is satisfied.
 *
 * @param {Function} onClick
 * @param {Function} predicate
 */
export const lookForSpells = (onClick, predicate) => {
  console.debug("Looking for active spells");
  const interval = setInterval(() => {
    if (predicate()) {
      createCastCantripButtons(onClick);
      addSpellListeners(onClick);
    } else {
      console.debug("Stopped looking for active spells");
      clearInterval(interval);
    }
  }, 500);
};

const addSpellListeners = (onClick) => {
  const buttons = document
    .querySelector(".spells")
    .querySelectorAll(".form-button");
  for (const button of buttons) {
    if (button.innerText.toLowerCase() == "cast spell") {
      button.innerText = "cast spell on roll20";
      button.classList.add("vtt-cast-spell");

      const row = button.closest("tr");
      const cell = button.closest("td");

      // These selectors are quite brittle, but we can't do much better.
      const spell = row.previousSibling.querySelector("td").innerText;
      const details = cell.querySelector("p").parentElement.innerText;

      button.addEventListener("click", function () {
        onClick(castSpell(spell, details));
      });

      console.debug("Added listener to cast spell button");
    }
  }
};
