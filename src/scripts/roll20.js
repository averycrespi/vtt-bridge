import { onElementLoad } from "../common/dom";

console.debug("Loading roll20.js ...");

browser.runtime.onMessage.addListener((commands) =>
  onElementLoad("#textchat-input", () => {
    const chat = document.querySelector("#textchat-input");
    chat.querySelector("textarea").value = commands.join("\n");
    chat.querySelector(".btn").click();
  })
);
