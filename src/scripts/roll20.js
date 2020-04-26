console.debug("Loaded roll20.js");

const handleMessage = (message) => {
  console.log(
    "Received message from background.js: " + JSON.stringify(message)
  );
};

browser.runtime.onMessage.addListener(handleMessage);
