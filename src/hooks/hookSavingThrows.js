import { SAVING_THROW } from "../types";
import { createButton } from "../dom";

export default (onClick) => {
  // This table has no class, so we need to search upwards from a child.
  const rows = document
    .querySelector(".saving-throw-name")
    .closest("table")
    .querySelectorAll("tr");
  for (const row of rows) {
    const cell = document.createElement("td");
    const button = createButton("roll", function () {
      onClick({
        type: SAVING_THROW,
        name: row.querySelector(".saving-throw-name").innerText,
        bonus: row.querySelector(".saving-throw-bonus").innerText,
      });
    });
    cell.appendChild(button);
    row.appendChild(cell);
  }
  console.log("Hooked saving throws");
};
