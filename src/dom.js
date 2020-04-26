/**
 * Run a callback after an element loads.
 *
 * @param {String} selector
 * @param {Function} callback
 */
export const onElementLoad = (selector, callback) => {
  const interval = setInterval(() => {
    if (document.querySelector(selector)) {
      clearInterval(interval);
      callback();
    }
  }, 100);
};

/**
 * Create a styled button.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @param {Array} classes
 */
export const createButton = (innerText, onClick) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.className = "form-button";
  button.onclick = onClick;
  return button;
};
