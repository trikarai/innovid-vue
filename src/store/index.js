import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    missionsLength: "",
    missionsList: [],
    profileRecord: {},
    mentorship: {
      id: "",
      program: {
        id: "",
        name: "",
      },
      introduction: null,
    },
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
    getMentorship: (state) => {
      return state.mentorship;
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
    setMentorship: (state, payload) => {
      state.mentorship = payload;
    },
  },
  actions: {},
  modules: {},
});
