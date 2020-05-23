import "notyf/notyf.min.css";

import * as messageTypes from "../messages";

import { Notyf } from "notyf";
import { addDispatchers } from "../dmv/dispatchers";
import { createStore } from "../dmv/store";
import { parseClick } from "../dmv/click";

let notyf = new Notyf();
let store = createStore();

addDispatchers(store);

store.subscribe((state) => {
  if (state.click) {
    const { toast, commands } = parseClick(state.click, !state.visible);
    notyf.success(toast);
    browser.runtime.sendMessage({ type: messageTypes.ENQUEUE_COMMANDS, commands });
  } else {
    notyf.dismissAll();
    const message = state.visible ? "Commands are now visible!" : "Commands are now hidden!";
    notyf.success({ message, duration: 0, dismissible: true });
  }
});

notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });
