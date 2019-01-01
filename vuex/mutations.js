import types from "./mutation-types";

export default {
  [types.SET_NOTIF]: (state, { text, color }) => {
    state.notif = {
      text,
      color
    };
  }
};
