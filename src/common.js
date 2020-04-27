/**
 * Run a callback after an element loads.
 *
 * Uses exponential backoff to improve performance.
 *
 * @param {String} selector
 * @param {Function} callback
 * @param {Number} attempts
 * @param {Number} timeout
 */
export const onElementLoad = (
  selector,
  callback,
  attempts = 10,
  timeout = 100
) => {
  if (document.querySelector(selector)) {
    callback();
  } else if (attempts <= 0) {
    console.warn("Maximum number of attempts exceeded: " + selector);
  } else {
    setTimeout(function () {
      onElementLoad(selector, callback, attempts - 1, timeout * 2);
    }, timeout);
  }
};
