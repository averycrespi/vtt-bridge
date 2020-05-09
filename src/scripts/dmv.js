import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { connectToRoll20 } from "../dmv";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

let notyf = new Notyf();

connectToRoll20(({ toast, commands }) => {
  notyf.success(toast);
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});

notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });
