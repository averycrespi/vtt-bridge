import { onElementLoad } from "../common";

console.debug("Loaded roll20.js");

const handleMessage = (message) => {
  console.debug(
    "Received message from background.js: " + JSON.stringify(message)
  );
  onElementLoad("#textchat-input", () => {
    const chat = document.querySelector("#textchat-input");
    chat.querySelector("textarea").value = message;
    chat.querySelector(".btn").click();
  });
};

browser.runtime.onMessage.addListener(handleMessage);
