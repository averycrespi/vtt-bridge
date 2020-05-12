export const attackWithData = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    mod: { type: "string", required: true },
  },
};

export const castData = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
    level: { type: "string", required: true },
  },
};

export const rollData = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    mod: { type: "string", required: true },
  },
};

export const rollDamageData = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    damage: { type: "string", required: true },
  },
};

export const useData = {
  type: "object",
  properties: {
    name: { type: "string", required: true },
    description: { type: "string", required: true },
  },
};
