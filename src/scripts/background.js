import { messageType } from "../common";

let queue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messageType.enqueue:
      queue.push(...message.commands);
      break;

    case messageType.dequeue:
      sendResponse(queue);
      queue = [];
      break;

    case messageType.clear:
      queue = [];
      break;

    default:
      throw `Unknown message type: ${message.type}`;
  }
});
