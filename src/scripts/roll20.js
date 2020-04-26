import { onElementLoad } from "../common/dom";

console.debug("Loading roll20.js ...");

const handleMessage = (commands) => {
  console.log("Received commands from background: " + JSON.stringify(commands));
  onElementLoad("#textchat-input", () => {
    const chat = document.querySelector("#textchat-input");
    chat.querySelector("textarea").value = commands.join("\n");
    chat.querySelector(".btn").click();
  });
};

browser.runtime.onMessage.addListener(handleMessage);
