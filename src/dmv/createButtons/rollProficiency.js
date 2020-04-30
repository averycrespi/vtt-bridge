import { createButton } from "../elements";
import { onElementLoad } from "../../common";
import { rollDice } from "../commands";

const ready = (onClick) => {
  const tables = document
    .querySelector(".details-columns")
    .querySelectorAll("table");
  let buttonCount = 0;
  for (const table of tables) {
    const rows = table.querySelectorAll("tr");
    for (const row of rows) {
      if (row.querySelectorAll("th").length > 0) {
        // Don't add a button to the table header.
        continue;
      }
      // We don't care about the proficiency and expertise cells.
      const [nameCell, , , bonusCell] = row.querySelectorAll("td");
      const name = nameCell.innerText;
      const bonus = bonusCell.innerText;
      const button = createButton(
        "roll",
        function (event) {
          onClick(rollDice(name, bonus, event));
        },
        ["vtt-roll-proficiency"]
      );
      const cell = document.createElement("td");
      cell.appendChild(button);
      row.appendChild(cell);
      buttonCount += 1;
    }
  }
  console.debug("Created " + buttonCount + " roll proficiency buttons");
};

export default (onClick) =>
  onElementLoad(".details-columns", () => ready(onClick));
