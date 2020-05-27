import * as messages from "../messages";

import { onElementLoad } from "../callbacks";
import { showConnected } from "../notifications";

const receiveCommands = () => {
  browser.runtime.sendMessage({ type: messages.dequeueCommands }).then((commands) => {
    if (commands.length > 0) {
      const input = document.querySelector("#textchat-input");
      input.querySelector("textarea").value = commands.join("\n");
      input.querySelector(".btn").click();
      console.debug("Ran commands: " + JSON.stringify(commands));
    }
  });
};

onElementLoad("#textchat-input", () => {
  showConnected();
  browser.runtime.sendMessage({ type: messages.clearQueue });
  setInterval(receiveCommands, 1000);
});
