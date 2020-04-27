console.debug("Loading background.js ...");

browser.runtime.onMessage.addListener((message) => {
  console.debug("Forwarding message: " + JSON.stringify(message));
  browser.tabs
    .query({ url: "*://app.roll20.net/*" })
    .then((tabs) => tabs.map((t) => browser.tabs.sendMessage(t.id, message)));
});
