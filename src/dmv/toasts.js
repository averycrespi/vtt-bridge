/**
 * Create the toast.
 */
export const createToast = () => {
  const toast = document.createElement("toast");
  toast.id = "vtt-toast";
  const icon = document.createElement("i");
  icon.classList.add("fa", "fa-check-circle", "fa-2x");
  toast.appendChild(icon);
  document.body.appendChild(toast);
  console.debug("Created toast");
};

/**
 * Show the toast.
 *
 * @param {Number} timeout
 */
export const showToast = (timeout = 3000) => {
  const toast = document.querySelector("#vtt-toast");
  toast.classList.add("show");
  setTimeout(function () {
    toast.classList.remove("show");
  }, timeout);
};
