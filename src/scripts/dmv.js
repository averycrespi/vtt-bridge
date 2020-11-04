import { showConnected, showToast, showVisibility } from "../notify";

import { addDispatchers } from "../dispatch";
import { createStore } from "../store";
import { messageType } from "../common";
import { parseState } from "../transform/state";

const store = createStore();
addDispatchers(store, () => showConnected());

let lastVisibility = true;
store.subscribe((state) => {
  if (state.click !== null) {
    const { toast, commands } = parseState(state);
    showToast(toast);
    browser.runtime.sendMessage({ type: messageType.enqueue, commands });
    console.log("Showed toast: " + toast);
    console.log("Sent commands: " + commands);
  } else if (state.visible !== lastVisibility) {
    showVisibility(state.visible);
    lastVisibility = state.visible;
  }
});
