import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { connectToRoll20 } from "../dmv";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf({
  types: [{ type: "success", background: "#f1a20f" }],
});

connectToRoll20((commands) => {
  notyf.success(commands[0]);
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});

notyf.success({ message: "Connected to Roll20!", duration: 5000 });
