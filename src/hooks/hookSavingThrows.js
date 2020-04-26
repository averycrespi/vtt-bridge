import { createButtonInCell, onElementLoad } from "../common/dom";
import { emote, roll } from "../common/commands";

import { LEFT_MARGIN } from "../common/classes";

const hookSavingThrows = (onClick) => {
  // This table has no helpful selectors, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const stat = row.querySelector(".saving-throw-name").innerText;
    const mod = row.querySelector(".saving-throw-bonus").innerText;
    const cell = createButtonInCell(
      "roll",
      function () {
        onClick([emote("is rolling", stat, "save"), roll(mod)]);
      },
      [LEFT_MARGIN]
    );
    row.appendChild(cell);
  }
  console.debug("Hooked " + rows.length + " saving throws");
};

export default (onClick) =>
  onElementLoad(".saving-throw-name", () => hookSavingThrows(onClick));
