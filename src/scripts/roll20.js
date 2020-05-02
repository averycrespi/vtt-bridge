import { messageTypes, onElementLoad } from "../common";

console.debug("Loading roll20.js ...");

const createNotification = () => {
  const notification = document.createElement("div");
  notification.classList.add("message", "system", "vtt-notification");

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  notification.appendChild(spacer);

  const text = document.createElement("strong");
  text.innerText = "Connected to Dungeon Master's Vault.";
  notification.appendChild(text);

  const button = document.createElement("button");
  button.classList.add("vtt-close-button");
  button.innerText = "×";
  button.onclick = () => document.querySelector(".vtt-notification").remove();
  notification.appendChild(button);

  document.querySelector("#textchat").appendChild(notification);
  console.debug("Created notification");
};

onElementLoad("#textchat", () => createNotification());

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
