import { createHooks } from "../hooks";

console.debug("Loaded dmv.js");

createHooks((message) => browser.runtime.sendMessage(message));
