import { showConnected, showError, showToast, showVisibility } from "../notify";

import { addDispatchers } from "../dispatch";
import { createStore } from "../store";
import { formatError } from "../transform/error";
import { messageType } from "../common";
import { parseState } from "../transform/state";

const store = createStore();
addDispatchers(store, () => showConnected());

let lastError = null;
let lastVisibility = true;
store.subscribe((state) => {
  if (state.click !== null) {
    const { toast, commands } = parseState(state);
    showToast(toast);
    console.debug(`Showed command toast: ${toast}`);
    browser.runtime.sendMessage({ type: messageType.enqueue, commands });
    console.debug(`Sent commands to background: ${JSON.stringify(commands)}`);
  } else if (state.error !== lastError) {
    showError(formatError(state.error));
    lastError = state.error;
    console.debug(`Showed error toast: ${JSON.stringify(state.error)}`);
  } else if (state.visible !== lastVisibility) {
    showVisibility(state.visible);
    lastVisibility = state.visible;
    console.debug(`Showed visibility toast: ${JSON.stringify(state.visible)}`);
  }
});
