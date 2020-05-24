import "notyf/notyf.min.css";

import * as messages from "../messages";

import { Notyf } from "notyf";
import { onElementLoad } from "../callbacks";

let notyf = new Notyf();

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
  notyf.success({ message: "Connected to VTT Bridge!", duration: 0, dismissible: true });
  browser.runtime.sendMessage({ type: messages.clearQueue });
  setInterval(receiveCommands, 1000);
});
