import createNotification from "../roll20/createNotification";
import runCommands from "../roll20/runCommands";

console.debug("Loading roll20.js ...");

browser.runtime.onMessage.addListener((commands) => runCommands(commands));

createNotification();
