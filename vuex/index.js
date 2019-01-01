import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const state = () => ({
  notif: {
    text: null,
    color: null
  }
});

export default {
  state,
  getters,
  mutations,
  actions
};
