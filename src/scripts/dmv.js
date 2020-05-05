import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { addConnectToRoll20Button } from "../dmv/buttons/connectToRoll20";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf({
  types: [{ type: "success", background: "#f1a20f" }],
});

addConnectToRoll20Button((commands) => {
  notyf.success("Sent commands!");
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
