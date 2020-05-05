/**
 * Create a styled button.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @param {Array} classes
 * @returns {HTMLElement} Styled button
 */
export const createButton = (innerText, onClick, classes = []) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.classList.add("roll-button", ...classes);
  button.onclick = onClick;
  return button;
};

/**
 * Create a top margin class.
 *
 * @param {String} size
 */
export const withTopMargin = (size = "10") => "m-t-" + size;

/**
 * Create a left margin class.
 *
 * @param {String} size
 */
export const withLeftMargin = (size = "10") => "m-l-" + size;
