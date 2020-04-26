console.debug("Loading background.js ...");

const handleMessage = (commands) => {
  console.debug("Received commands from DMV: " + JSON.stringify(commands));
  console.debug("Sending commands from background to Roll20 ...");
  browser.tabs
    .query({ url: "*://app.roll20.net/*" })
    .then((tabs) => browser.tabs.sendMessage(tabs[0].id, commands));
};

browser.runtime.onMessage.addListener(handleMessage);
