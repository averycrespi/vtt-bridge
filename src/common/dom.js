import { VTT_BRIDGE } from "./classes";

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
  button.classList.add("form-button", VTT_BRIDGE, ...classes);
  button.onclick = onClick;
  return button;
};

/**
 * Create a styled button in a cell.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @param {Array} classes
 * @returns {HTMLElement}
 */
export const createButtonInCell = (innerText, onClick, classes = []) => {
  const button = createButton(innerText, onClick, classes);
  const cell = document.createElement("td");
  cell.classList.add(VTT_BRIDGE);
  cell.appendChild(button);
  return cell;
};
