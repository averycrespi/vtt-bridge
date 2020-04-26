/**
 * Run a callback after an element loads.
 *
 * @param {String} selector
 * @param {Function} callback
 * @param {Number} maxAttempts
 */
export const onElementLoad = (
  selector,
  callback,
  timeout = 100,
  maxAttempts = 10
) => {
  let attempts = 0;
  const interval = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(interval);
      callback();
    } else if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.warn("Maximum number of attempts exceeded: " + selector);
    } else {
      attempts += 1;
    }
  }, timeout);
};
