import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    missionsLength: "",
    missionsList: [],
  },
  getters: {
    getMissionLength: (state) => {
      return state.missionsLength;
    },
    getMissionList: (state) => {
      return state.missionsList;
    },
  },
  mutations: {
    setMissionLength: (state, payload) => {
      state.missionsLength = payload;
    },
    setMissionList: (state, payload) => {
      state.missionsList = payload;
    },
  },
  actions: {},
  modules: {},
});
