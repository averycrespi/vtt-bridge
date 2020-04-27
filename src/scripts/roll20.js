import { onElementLoad } from "../common";

console.debug("Loading roll20.js ...");

browser.runtime.onMessage.addListener((commands) =>
  onElementLoad("#textchat-input", () => {
    const chat = document.querySelector("#textchat-input");
    chat.querySelector("textarea").value = commands.join("\n");
    chat.querySelector(".btn").click();
  })
);

onElementLoad("#textchat", () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("message", "system");

  const spacer = document.createElement("div");
  spacer.classList.add("spacer");
  wrapper.appendChild(spacer);

  const message = document.createElement("strong");
  message.innerText = "Connected to Dungeon Master's Vault.";
  wrapper.append(message);

  document.querySelector("#textchat").appendChild(wrapper);
});
