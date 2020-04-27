import { createButtonInCell, onElementLoad } from "../common/dom";
import { emote, roll } from "../common/commands";

const hookWeapons = (onClick) => {
  const rows = document.querySelector(".weapons").querySelectorAll("tr");
  let headerCount = 0;
  for (const row of rows) {
    if (row.querySelectorAll("th").length > 0) {
      // Don't add a button to the table header.
      headerCount += 1;
      continue;
    }
    const weapon = row.querySelector(".weapon").innerText;
    const mod = row.querySelector(".attack-modifier").innerText;
    const cell = createButtonInCell("attack", function () {
      // Don't expand the weapon details when the button is clicked.
      event.stopPropagation();
      onClick([emote("attacks with", weapon), roll(mod)]);
    });
    row.appendChild(cell);
  }
  console.debug("Hooked " + (rows.length - headerCount) + " weapons");
};

export default (onClick) =>
  onElementLoad(".weapon", () => hookWeapons(onClick));
