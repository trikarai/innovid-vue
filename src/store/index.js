import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    missionsLength: "",
    missionsList: [],
    profileRecord: {},
  },
  getters: {
    getMissionLength: (state) => {
      return state.missionsLength;
    },
    getMissionList: (state) => {
      return state.missionsList;
    },
    getProfileRecord: (state) => {
      return state.profileRecord;
    },
  },
  mutations: {
    setProfileRecord: (state, payload) => {
      state.profileRecord = payload;
    },
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
