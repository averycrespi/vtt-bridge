export const emote = (...parts) => "/em " + parts.join(" ");
export const roll = (mod) => "/roll 1d20" + (mod !== "0" ? mod : "");
export const say = (text) => text;
