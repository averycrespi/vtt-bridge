import { createButton, withTopMargin } from "../elements";

import { castSpell } from "../commands";
import { onElementLoad } from "../../common";

const ready = (onClick) => {
  const divs = document
    .querySelector(".spells")
    .querySelectorAll("div.opacity-5");
  for (const div of divs) {
    if (div.innerText.toLowerCase().includes("cantrip")) {
      const row = div.closest("tr");
      const cell = div.closest("td");

      if (cell.querySelector(".vtt-cast-cantrip")) {
        // The button for this cantrip already exists.
        continue;
      }

      // These selectors are quite brittle, but we can't do much better.
      const cantrip = row.previousSibling.querySelector("td").innerText;
      const details = cell.querySelector("p").parentElement.innerText;

      const button = createButton(
        "cast cantrip on roll20",
        function () {
          onClick(castSpell(cantrip, details));
        },
        ["vtt-cast-cantrip"]
      );

      // Put the button in the same position as the cast spell buttons.
      const wrapper = document.createElement("div");
      wrapper.classList.add(
        "flex",
        "justify-cont-end",
        "align-items-c",
        withTopMargin()
      );
      wrapper.appendChild(button);
      cell.prepend(wrapper);

      console.debug("Created cast cantrip button");
    }
  }
};

export default (onClick) =>
  onElementLoad(".spells tr td div.opacity-5", () => ready(onClick));
