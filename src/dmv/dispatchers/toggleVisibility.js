export const addToggleVisibilityListeners = (store) => {
  let visible = true;
  let timer = null;

  document.addEventListener("keydown", function (e) {
    if (e.code === "KeyH" && !timer) {
      timer = window.setTimeout(function () {
        visible = !visible;
        store.dispatch("visibility", visible);
      }, 1000);
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.code === "KeyH" && timer) {
      window.clearTimeout(timer);
      timer = null;
    }
  });
};
