import * as classes from "./classes";

import { onElementLoad } from "../common";

const ready = () => {
  if (document.querySelector("." + classes.NOTIFICATION)) {
    // Notification already exists.
    return;
  }

  const notification = document.createElement("div");
  notification.classList.add("message", "system", classes.NOTIFICATION);

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  notification.appendChild(spacer);

  const text = document.createElement("strong");
  text.innerText = "Connected to Dungeon Master's Vault.";
  notification.append(text);

  const button = document.createElement("button");
  button.classList.add(classes.CLOSE_BUTTON);
  button.innerText = "×";
  button.onclick = function () {
    notification.remove();
  };
  notification.append(button);

  const chat = document.querySelector("#textchat");
  chat.appendChild(notification);

  console.debug("Created notification");
};

export default () => onElementLoad("#textchat", () => ready());
