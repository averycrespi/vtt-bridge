export const makeToast = (text, { hasAdvantage, hasDisadvantage, visible }) => {
  let suffix = "!";
  if (hasAdvantage) {
    suffix = " with advantage!";
  } else if (hasDisadvantage) {
    suffix = " with disadvantage!";
  }
  if (!visible) {
    suffix += " (hidden)";
  }
  return text + suffix;
};
