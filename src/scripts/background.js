import * as messages from "../messages";

let commandQueue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messages.enqueueCommands:
      commandQueue.push(...message.commands);
      break;

    case messages.dequeueCommands:
      sendResponse(commandQueue);
      commandQueue = [];
      break;

    case messages.clearQueue:
      commandQueue = [];
      break;

    default:
      throw "Unknown message type: " + message.type;
  }
});
