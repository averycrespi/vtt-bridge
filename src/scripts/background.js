import { messageTypes } from "../common";

console.debug("Loading background.js ...");

let queue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messageTypes.ENQUEUE:
      console.debug("Enqueuing commands: " + JSON.stringify(message.commands));
      queue.push(...message.commands);
      break;
    case messageTypes.DEQUEUE:
      console.debug("Dequeuing commands: " + JSON.stringify(queue));
      sendResponse(queue);
      queue = [];
      break;
  }
});
