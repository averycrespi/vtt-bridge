import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { addDispatchers } from "../dmv/dispatchers";
import { createStore } from "../dmv/store";
import { messageTypes } from "../common";
import { parseClick } from "../dmv/click";

let notyf = new Notyf();
let store = createStore();

notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });

addDispatchers(store);
store.subscribe((state) => {
  if (state.click) {
    const { toast, commands } = parseClick(state.click, !state.visible);
    notyf.success(toast);
    browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
  } else {
    notyf.dismissAll();
    const message = state.visible ? "Commands are now hidden!" : "Commands are now visible!";
    notyf.success({ message, duration: 0, dismissible: true });
  }
});
