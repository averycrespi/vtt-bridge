import Store from "beedle";

export const createStore = () => new Store({ actions, mutations, initialState });

const actions = {
  click(context, payload) {
    context.commit("setClick", payload);
  },
  visibility(context, payload) {
    context.commit("setVisibility", payload);
  },
};

const mutations = {
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

const initialState = { click: null, visible: true };
