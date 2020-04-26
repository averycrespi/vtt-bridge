import { createHooks } from "../hooks";

console.debug("Loaded dmv.js");

createHooks((action) => browser.runtime.sendMessage(action));
