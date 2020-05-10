import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { buildCommands } from "../dmv/newCommands";
import { connectToRoll20 } from "../dmv";
import { createStore } from "../dmv/store";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf();
let store = createStore();

connectToRoll20(({ toast, commands }) => {
  notyf.success(toast);
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
}, store);

notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });

store.subscribe((state) => {
  console.log(JSON.stringify(state.click));
  const commands = buildCommands(state.click);
  console.log(JSON.stringify(commands));
});
