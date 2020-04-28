import { onElementLoad } from "../common";

const ready = () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", "system");

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  wrapper.appendChild(spacer);

  const notification = document.createElement("strong");
  notification.innerText = "Connected to Dungeon Master's Vault.";
  wrapper.append(notification);

  document.querySelector("#textchat").appendChild(wrapper);

  console.debug("Created notification");
};

export default () => onElementLoad("#textchat", () => ready());
