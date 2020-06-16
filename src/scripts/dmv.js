import { showCommands, showConnected, showVisibility } from "../notifications";

import { addDispatchers } from "../dmv/dispatchers";
import { createStore } from "../dmv/store";
import { messageType } from "../common";
import { parseClick } from "../dmv/click";

const store = createStore();
addDispatchers(store, () => showConnected());

store.subscribe((state) => {
  if (state.click !== null) {
    const { toast, commands } = parseClick(state.click, state.visible);
    showCommands(toast);
    browser.runtime.sendMessage({ type: messageType.enqueue, commands });
  } else if (state.visible !== null) {
    showVisibility(state.visible);
  }
});
