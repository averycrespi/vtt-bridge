import * as messageTypes from "../messages";

let commandQueue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messageTypes.ENQUEUE_COMMANDS:
      commandQueue.push(...message.commands);
      break;

    case messageTypes.DEQUEUE_COMMANDS:
      sendResponse(commandQueue);
      commandQueue = [];
      break;

    case messageTypes.CLEAR_QUEUE:
      commandQueue = [];
      break;

    default:
      throw "Unknown message type: " + message.type;
  }
});
