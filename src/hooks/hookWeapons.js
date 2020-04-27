import { emote, roll } from "./commands";

import { createButton } from "./elements";
import { onElementLoad } from "../common";

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
    const button = createButton("attack", function () {
      // Don't expand the weapon details when the button is clicked.
      event.stopPropagation();
      onClick([emote("attacks with", weapon), roll(mod)]);
    });
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + (rows.length - headerCount) + " weapons");
};

export default (onClick) =>
  onElementLoad(".weapon", () => hookWeapons(onClick));
