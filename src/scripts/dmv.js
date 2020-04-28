import createConnectButton from "../dmv/createConnectButton";

console.debug("Loading dmv.js ...");

createConnectButton((commands) => browser.runtime.sendMessage(commands));
