import { messageTypes, onElementLoad } from "../common";

console.debug("Loading roll20.js ...");

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

onElementLoad("#textchat .message.system .userscript-commandintro", () =>
  createNotification()
);

const runCommands = (commands) => {
  const input = document.querySelector("#textchat-input");
  input.querySelector("textarea").value = commands.join("\n");
  input.querySelector(".btn").click();
  console.debug("Ran commands: " + JSON.stringify(commands));
};

setInterval(
  () =>
    browser.runtime
      .sendMessage({ type: messageTypes.DEQUEUE })
      .then((commands) => {
        if (commands.length > 0) {
          onElementLoad("#textchat-input", () => runCommands(commands));
        }
      }),
  1000
);
