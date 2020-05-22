const TOGGLE_KEY = "KeyH";
const TOGGLE_TIME = 1000;
const DEFAULT_VISIBLE = true;

export const addToggleVisibilityListeners = (store) => {
  let visible = DEFAULT_VISIBLE;
  let timer = null;

  document.addEventListener("keydown", function (e) {
    if (e.code === TOGGLE_KEY && !timer) {
      timer = window.setTimeout(function () {
        visible = !visible;
        store.dispatch("visibility", visible);
      }, TOGGLE_TIME);
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.code === TOGGLE_KEY && timer) {
      window.clearTimeout(timer);
      timer = null;
    }
  });
};
