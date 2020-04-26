import { createHooks } from "../hooks";

console.debug("Loading dmv.js ...");

createHooks((commands) => {
  console.debug("Received commands from button: " + JSON.stringify(commands));
  console.debug("Sending commands from DMV to background ...");
  browser.runtime.sendMessage(commands);
});
