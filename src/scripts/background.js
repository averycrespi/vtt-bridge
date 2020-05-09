import { messageTypes } from "../common";

console.debug("Loading background.js ...");

/**
 * Queue of commands to be run.
 *
 * @global
 */
let commandQueue = [];

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  switch (message.type) {
    case messageTypes.ENQUEUE:
      console.debug("Enqueuing: " + JSON.stringify(message.commands) + " ...");
      commandQueue.push(...message.commands);
      break;

    case messageTypes.DEQUEUE:
      console.debug("Dequeuing: " + JSON.stringify(commandQueue) + " ...");
      sendResponse(commandQueue);
      commandQueue = [];
      break;

    case messageTypes.CLEAR:
      console.debug("Clearing command queue ...");
      commandQueue = [];
      break;
  }
});
