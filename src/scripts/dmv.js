import { createHooks } from "../hooks";

console.debug("Loading dmv.js ...");

createHooks((message) => browser.runtime.sendMessage(message));
