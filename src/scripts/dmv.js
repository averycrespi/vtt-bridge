import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import { connectToRoll20 } from "../dmv";
import { createStore } from "../dmv/store";
import { messageTypes } from "../common";
import { parseClick } from "../dmv/click";

let notyf = new Notyf();
let store = createStore();

const HIDDEN_KEY = "KeyH";
let hidden = false;
let hiddenTimer = null;
function toggleHidden() {
  notyf.dismissAll();
  if (hidden) {
    hidden = false;
    notyf.success({
      message: "Rolls are now visible!",
      background: "CornflowerBlue",
      duration: 0,
      dismissible: true,
    });
  } else {
    hidden = true;
    notyf.success({
      message: "Rolls are now hidden!",
      background: "CornflowerBlue",
      duration: 0,
      dismissible: true,
    });
  }
}
document.addEventListener("keydown", function (e) {
  if (e.code === HIDDEN_KEY && !hiddenTimer) {
    hiddenTimer = window.setTimeout(toggleHidden, 1000);
  }
});
document.addEventListener("keyup", function (e) {
  if (e.code === HIDDEN_KEY && hiddenTimer) {
    window.clearTimeout(hiddenTimer);
    hiddenTimer = null;
  }
});

connectToRoll20(store);
notyf.success({ message: "Connected to VTT Bridge!", duration: 5000 });

store.subscribe((state) => {
  const { toast, commands } = parseClick(state.click, hidden);
  notyf.success(toast);
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
