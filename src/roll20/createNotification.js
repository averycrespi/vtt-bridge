import { onElementLoad } from "../common";

const ready = () => {
  const notification = document.createElement("div");
  notification.classList.add("message", "system");

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  notification.appendChild(spacer);

  const text = document.createElement("strong");
  text.innerText = "Connected to Dungeon Master's Vault.";
  notification.append(text);

  const chat = document.querySelector("#textchat");
  chat.appendChild(notification);

  console.debug("Created notification");
};

export default () => onElementLoad("#textchat", () => ready());
