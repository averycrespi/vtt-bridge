import "notyf/notyf.min.css";

import { Notyf } from "notyf";
import manifest from "../manifest.json";

const successNotyf = new Notyf();
const errorNotyf = new Notyf();
const visibilityNotyf = new Notyf({
  position: { x: "left", y: "bottom" },
  types: [
    { type: "visible", background: "#aa7a21", icon: { className: "fa fa-eye", color: "#ffffff" } },
    { type: "hidden", background: "#6591a5", icon: { className: "fa fa-eye-slash", color: "#ffffff" } },
  ],
});

export const showConnected = () =>
  successNotyf.success({
    message: "Connected to VTT Bridge v" + manifest.version + "!",
    duration: 0,
    dismissible: true,
  });

export const showToast = (toast) => {
  successNotyf.dismissAll();
  successNotyf.success(toast);
};

let visibilityToast;
export const showVisibility = (visible) => {
  visibilityNotyf.dismiss(visibilityToast);
  const type = visible ? "visible" : "hidden";
  visibilityToast = visibilityNotyf.open({
    type,
    message: `Commands are ${type}!`,
    duration: 0,
    dismissible: true,
  });
};

export const showError = (error) => {
  errorNotyf.error({ message: error, duration: 0, dismissible: true }).on("dismiss", () => errorNotyf.dismissAll());
};
