import Store from "beedle";

export const createStore = () => new Store({ actions, mutations, initialState });

const actions = {
  character(context, payload) {
    context.commit("setCharacter", payload);
  },
  click(context, payload) {
    context.commit("setClick", payload);
  },
  visibility(context, payload) {
    context.commit("setVisibility", payload);
  },
};

const mutations = {
  setCharacter(state, payload) {
    state.click = null;
    state.character = payload;
    return state;
  },
  setClick(state, payload) {
    state.click = payload;
    return state;
  },
  setVisibility(state, payload) {
    state.click = null;
    state.visible = payload;
    return state;
  },
};

const initialState = { character: "Player", click: null, visible: true };
