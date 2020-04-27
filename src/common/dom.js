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

/**
 * Create a styled button.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @param {Array} classes
 * @returns {HTMLElement}
 */
export const createButton = (innerText, onClick, classes = []) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.classList.add("form-button", ...classes);
  button.onclick = onClick;
  return button;
};

/**
 * Create a styled button in a table cell.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @param {Array} classes
 * @returns {HTMLElement}
 */
export const createButtonInCell = (innerText, onClick, classes = []) => {
  const button = createButton(innerText, onClick, classes);
  const cell = document.createElement("td");
  cell.appendChild(button);
  return cell;
};
