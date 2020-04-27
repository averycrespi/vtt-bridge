/**
 * Create a styled button.
 *
 * @param {String} innerText
 * @param {Function} onClick
 * @returns {HTMLElement}
 */
export const createButton = (innerText, onClick) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.classList.add("form-button");
  button.onclick = onClick;
  return button;
};

/**
 * Add a top margin to an element.
 *
 * The element is mutated in-place.
 *
 * @param {HTMLElement} elem
 */
export const addTopMargin = (elem) => elem.classList.add("m-t-10");

/**
 * Add a left margin to an element.
 *
 * The element is mutated in-place.
 *
 * @param {HTMLElement} elem
 */
export const addLeftMargin = (elem) => elem.classList.add("m-l-10");
