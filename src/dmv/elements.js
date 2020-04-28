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
  button.classList.add("form-button", ...classes);
  button.onclick = onClick;
  return button;
};

export const withTopMargin = (size = "10") => "m-t-" + size;
export const withLeftMargin = (size = "10") => "m-l-" + size;
