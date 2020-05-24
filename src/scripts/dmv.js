import "notyf/notyf.min.css";

import * as messages from "../messages";

import { Notyf } from "notyf";
import { addDispatchers } from "../dmv/dispatchers";
import { createStore } from "../dmv/store";
import { parseClick } from "../dmv/click";

let notyf = new Notyf();
notyf.success({ message: "Connected to VTT Bridge!", duration: 0, dismissible: true });

let store = createStore();
addDispatchers(store);
store.subscribe((state) => {
  if (state.click) {
    const { toast, commands } = parseClick(state.click, state.visible);
    notyf.success(toast);
    browser.runtime.sendMessage({ type: messages.enqueueCommands, commands });
  } else {
    notyf.dismissAll();
    const toast = state.visible ? "Commands are now visible!" : "Commands are now hidden!";
    notyf.success({ message: toast, duration: 0, dismissible: true });
  }
});
