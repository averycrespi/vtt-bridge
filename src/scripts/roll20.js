import { messageType, onElementLoad } from "../common";

import { showConnected } from "../notify";

const receiveCommands = () => {
  browser.runtime.sendMessage({ type: messageType.dequeue }).then((commands) => {
    if (commands.length > 0) {
      const input = document.querySelector("#textchat-input");
      input.querySelector("textarea").value = commands.join("\n");
      input.querySelector(".btn").click();
      console.debug(`Ran commands: ${JSON.stringify(commands)}`);
    }
  });
};

onElementLoad("#textchat-input", () => {
  showConnected();
  browser.runtime.sendMessage({ type: messageType.clear });
  setInterval(receiveCommands, 1000);
});
