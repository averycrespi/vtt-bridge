import { onElementLoad } from "../common";

const ready = (commands) => {
  const input = document.querySelector("#textchat-input");
  input.querySelector("textarea").value = commands.join("\n");
  input.querySelector(".btn").click();
  console.debug("Ran commands: " + JSON.stringify(commands));
};

export default (commands) =>
  onElementLoad("#textchat-input", () => ready(commands));
