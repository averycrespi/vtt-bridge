console.debug("Loaded roll20.js");

const handleMessage = (message) => {
  console.log(
    "Received message from background.js: " + JSON.stringify(message)
  );
  const chat = document.querySelector("#textchat-input");
  const textArea = chat.querySelector("textarea");
  textArea.value = message;
  setTimeout(function () {
    chat.querySelector(".btn").click();
  }, 100);
};

browser.runtime.onMessage.addListener(handleMessage);
