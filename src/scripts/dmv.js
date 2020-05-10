import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { buildCommands } from "../dmv/commands";
import { connectToRoll20 } from "../dmv";
import { createStore } from "../dmv/store";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf();
let store = createStore();

connectToRoll20(store);
notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });

store.subscribe((state) => {
  const { toast, commands } = buildCommands(state.click);
  notyf.success(toast);
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
