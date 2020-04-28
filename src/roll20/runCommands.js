import { onElementLoad } from "../common";

const ready = (commands) => {
  const chat = document.querySelector("#textchat-input");
  chat.querySelector("textarea").value = commands.join("\n");
  chat.querySelector(".btn").click();
  console.debug("Ran commands: " + JSON.stringify(commands));
};

export default (commands) =>
  onElementLoad("#textchat-input", () => ready(commands));
