export const types = {
  SET_NOTIF: "SET_NOTIF"
};

export const state = () => ({
  notif: {
    text: null,
    color: null
  }
});

export const getters = {
  isNotif: state => state.notif.text !== null && state.notif.color !== null
};

export const mutations = {
  [types.SET_NOTIF]: (state, { text, color }) => {
    state.notif = {
      text,
      color
    };
  }
};

export const actions = {
  exampleActions({ commit }, payload) {
    commit(types.SET_EXAMPLE_STATE, payload);
  }
};
