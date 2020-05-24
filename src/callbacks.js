export const onElementLoad = (selector, callback) => onPredicate(() => !!document.querySelector(selector), callback);

const onPredicate = (predicate, callback, attempts = 10, timeout = 100) => {
  if (predicate()) {
    callback();
  } else if (attempts <= 0) {
    console.warn("Maximum number of attempts exceeded");
  } else {
    setTimeout(function () {
      onPredicate(predicate, callback, attempts - 1, timeout * 2);
    }, timeout);
  }
};
