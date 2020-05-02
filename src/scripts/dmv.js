import createConnectButton from "../dmv/createButtons/connectToRoll20";
import { messageTypes } from "../common";
import { showToast } from "../dmv/toasts";

console.debug("Loading dmv.js ...");

createConnectButton((commands) => {
  showToast();
  browser.runtime.sendMessage({ type: messageTypes.ENQUEUE, commands });
});
