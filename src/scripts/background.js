import { messageTypes } from "../common";

let commandQueue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messageTypes.ENQUEUE:
      console.debug(
        "Enqueuing commands: " + JSON.stringify(message.commands) + " ..."
      );
      commandQueue.push(...message.commands);
      break;

    case messageTypes.DEQUEUE:
      console.debug(
        "Dequeuing commands: " + JSON.stringify(commandQueue) + " ..."
      );
      sendResponse(commandQueue);
      commandQueue = [];
      break;

    case messageTypes.CLEAR:
      console.debug(
        "Clearing command queue:" + JSON.stringify(commandQueue) + " ..."
      );
      commandQueue = [];
      break;

    default:
      throw "Unknown message type: " + message.type;
  }
});
