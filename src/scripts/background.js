import { renderMessage } from "../messages";

console.debug("Loaded background.js");

const handleMessage = (message) => {
  console.debug("Received message from dmv.js: " + JSON.stringify(message));
  browser.tabs
    .query({ url: "*://app.roll20.net/*" })
    .then((tabs) =>
      browser.tabs.sendMessage(tabs[0].id, renderMessage(message))
    );
};

browser.runtime.onMessage.addListener(handleMessage);
