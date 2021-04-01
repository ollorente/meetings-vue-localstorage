import { db } from "@/main";

const state = {
  meetingPeople: [],
};

const getters = {
  getAllMeetingPeople: (state) => state.meetingPeople,
  getMeetingPeople: (state) => state.meetingPeople,
};

const actions = {
  async fetchMeetingPeople({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const people = Object.values(db.meetingPeople[data.id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            email: e.email,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_MEETING_PEEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllMeetingPeople({ commit }, id) {
    try {
      const people = Object.values(db.meetingPeople[id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            email: e.email,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_ALL_MEETING_PEEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_MEETING_PEEOPLE: (state, people) => (state.meetingPeople = people),
  SET_MEETING_PEEOPLE: (state, people) => (state.meetingPeople = people),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
