/**
 * Run a callback after a predicate is satisfied.
 *
 * Uses exponential backoff to improve performance.
 *
 * @param {Function} predicate
 * @param {Function} callback
 * @param {Number} attempts
 * @param {Number} timeout
 */
export const onPredicate = (
  predicate,
  callback,
  attempts = 5,
  timeout = 100
) => {
  if (predicate()) {
    callback();
  } else if (attempts <= 0) {
    console.warn("Maximum number of attempts exceeded");
  } else {
    setTimeout(function () {
      onPredicate(predicate, callback, attempts - 1, timeout * 2);
    }, timeout);
  }
};

/**
 * Run a callback after an element loads.
 *
 * @param {String} selector
 * @param {Function} callback
 */
export const onElementLoad = (selector, callback) =>
  onPredicate(() => !!document.querySelector(selector), callback);

/**
 * Enum of message types.
 *
 * @constant
 */
export const messageTypes = {
  ENQUEUE: "ENQUEUE",
  DEQUEUE: "DEQUEUE",
};
