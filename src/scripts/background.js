console.debug("Loaded background.js");

function handleMessage(message) {
  console.log("Message from content script: " + JSON.stringify(message));
}

browser.runtime.onMessage.addListener(handleMessage);
