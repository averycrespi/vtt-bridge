/**
 * Create a styled button.
 *
 * @param {String} innerText
 * @param {Function} onClick
 */
export const createButton = (innerText, onClick) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.className = "form-button";
  button.onclick = onClick;
  return button;
};

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
      console.error("Maximum number of attempts exceeded: " + selector);
    } else {
      attempts += 1;
    }
  }, timeout);
};
