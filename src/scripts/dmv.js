import { createHooks } from "../hooks";

console.debug("Loading dmv.js ...");

createHooks((commands) => browser.runtime.sendMessage(commands));
