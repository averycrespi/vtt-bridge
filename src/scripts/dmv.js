import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { addConnectToRoll20Button } from "../dmv/buttons/connectToRoll20";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf({
  types: [{ type: "success", background: "#f1a20f" }],
});

notyf.error({
  message:
    "Dungeon Master's Vault has recently added native roll buttons, which may interfere with the VTT Bridge extension. This will be fixed in the next release.",
  duration: 0,
  dismissible: true,
});

addConnectToRoll20Button((commands) => {
  notyf.success("Sent commands!");
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
