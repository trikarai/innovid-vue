import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    missionsLength: "",
  },
  getters: {
    getMissionLength: (state) => {
      return state.missionsLength;
    },
  },
  mutations: {
    setMissionLength: (state, payload) => {
      state.missionsLength = payload;
    },
  },
  actions: {},
  modules: {},
});
