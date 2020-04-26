import { createHooks } from "../hooks";

console.log("Loaded dmv.js");
createHooks((action) => console.log(action));
