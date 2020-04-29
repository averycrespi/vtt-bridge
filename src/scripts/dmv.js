import { createToast, showToast } from "../dmv/toasts";

import createConnectButton from "../dmv/buttons/connectToRoll20";

console.debug("Loading dmv.js ...");

createToast();

createConnectButton((commands) => {
  showToast();
  browser.runtime.sendMessage(commands);
});
