/**
 * Is the toast currently visible?
 *
 * @global
 */
let isVisible = false;

/**
 * Show the toast.
 *
 * If the toast doesn't exist, it will be created.
 * If the toast is already visible, it won't be shown again.
 *
 * @param {Number} timeout
 */
export const showToast = (timeout = 3000) => {
  if (!document.querySelector("#vtt-toast")) {
    const toast = document.createElement("toast");
    toast.id = "vtt-toast";
    const icon = document.createElement("i");
    icon.classList.add("fa", "fa-check-circle", "fa-2x");
    toast.appendChild(icon);
    document.body.appendChild(toast);
    console.log("Created toast");
  }
  if (!isVisible) {
    const toast = document.querySelector("#vtt-toast");
    toast.classList.add("show");
    isVisible = true;
    setTimeout(function () {
      toast.classList.remove("show");
      isVisible = false;
      console.log("Hid toast");
    }, timeout);
    console.log("Showed toast");
  }
};
