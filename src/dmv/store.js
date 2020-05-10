import Store from "beedle";

/**
 * Create a new store.
 *
 * @returns {Object} Store
 */
export const createStore = () =>
  new Store({ actions, mutations, initialState });

const actions = {
  click(context, payload) {
    context.commit("setClick", payload);
  },
};

const mutations = {
  setClick(state, payload) {
    state.click = payload;
    return state;
  },
};

const initialState = {};
