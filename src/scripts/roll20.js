import createNotification from "../roll20/createNotification";
import { messageTypes } from "../common";
import runCommands from "../roll20/runCommands";

console.debug("Loading roll20.js ...");

createNotification();

setInterval(
  () =>
    browser.runtime
      .sendMessage({ type: messageTypes.DEQUEUE })
      .then((commands) => {
        if (commands.length > 0) {
          runCommands(commands);
        }
      }),
  1000
);
