import { addConnectToRoll20Button } from "../dmv/buttons/connectToRoll20";
import { messageTypes } from "../common";
import { showToast } from "../dmv/toasts";

console.debug("Loading dmv.js ...");

addConnectToRoll20Button((commands) => {
  showToast();
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
