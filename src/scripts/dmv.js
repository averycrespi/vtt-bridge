import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { connectToRoll20 } from "../dmv";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf({
  types: [{ type: "success", background: "#f1a20f" }],
});

connectToRoll20((commands) => {
  notyf.success("Sent commands to Roll20!");
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});

notyf.success("Connected to Roll20!");
