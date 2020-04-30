import { createToast, showToast } from "../dmv/toasts";

import createConnectButton from "../dmv/createButtons/connectToRoll20";
import { messageTypes } from "../common";

console.debug("Loading dmv.js ...");

createToast();

createConnectButton((commands) => {
  showToast();
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
