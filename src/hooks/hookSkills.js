import { addLeftMargin, createButton } from "./elements";
import { emote, roll } from "./commands";

import { onElementLoad } from "../common";

const hookSkills = (onClick) => {
  const rows = document.querySelector(".skills").querySelectorAll("tr");
  for (const row of rows) {
    const skill = row.querySelector(".skill-name").innerText;
    const mod = row.querySelector(".skillbonus").innerText;
    const button = createButton("roll", function () {
      onClick([emote("is rolling", skill), roll(mod)]);
    });
    addLeftMargin(button);
    const cell = document.createElement("td");
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " skills");
};

export default (onClick) =>
  onElementLoad(".skill-name", () => hookSkills(onClick));
