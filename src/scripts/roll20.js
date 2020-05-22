import * as messageTypes from "../messages";

import { onElementLoad } from "../callbacks";

const createNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("message", "system", "vtt-notification");

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  notification.appendChild(spacer);

  const text = document.createElement("strong");
  text.innerText = "Connected to VTT Bridge.";
  notification.appendChild(text);

  const chat = document.querySelector("#textchat");
  chat.querySelector(".content").appendChild(notification);
  console.debug("Created Roll20 notification");
};

const receiveCommands = () => {
  browser.runtime.sendMessage({ type: messageTypes.DEQUEUE_COMMANDS }).then((commands) => {
    if (commands.length > 0) {
      const input = document.querySelector("#textchat-input");
      input.querySelector("textarea").value = commands.join("\n");
      input.querySelector(".btn").click();
      console.debug("Ran commands: " + JSON.stringify(commands));
    }
  });
};

onElementLoad("#textchat .message.system .userscript-commandintro", () => {
  browser.runtime.sendMessage({ type: messageTypes.CLEAR_QUEUE });
  createNotification();
  setInterval(receiveCommands, 1000);
});
