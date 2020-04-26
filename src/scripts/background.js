console.debug("Loaded background.js");

function handleMessage(message) {
  console.log("Received action from dmv.js: " + JSON.stringify(message));
}

browser.runtime.onMessage.addListener(handleMessage);
