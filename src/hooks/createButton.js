export default (innerText, onClick) => {
  const button = document.createElement("button");
  button.innerText = innerText;
  button.className = "form-button";
  button.onclick = onClick;
  return button;
};
