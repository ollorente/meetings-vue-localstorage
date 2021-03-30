import { db } from "@/main";

const state = {
  projectMeetings: [],
};

const getters = {
  getAllProjectMeetings: (state) => state.projectMeetings,
  getProjectMeetings: (state) => state.projectMeetings,
};

const actions = {
  async fetchProjectMeetings({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const meetings = Object.values(db.projectMeetings[data.id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1;
          }
          if (a.dateInt < b.dateInt) {
            return -1;
          }
          return 0;
        })
        .splice(page, limit)
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateInt: e.dateInt,
            dateEnd: e.dateEnd,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PROJECT_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllProjectMeetings({ commit }, id) {
    try {
      const meetings = Object.values(db.projectMeetings[id])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .sort(function (a, b) {
          if (a.dateInt > b.dateInt) {
            return 1;
          }
          if (a.dateInt < b.dateInt) {
            return -1;
          }
          return 0;
        })
        .map((e) => {
          return {
            id: e.id,
            name: e.name,
            dateInt: e.dateInt,
            dateEnd: e.dateEnd,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PROJECT_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_PROJECT_MEETINGS: (state, meetings) => (state.projectMeetings = meetings),
  SET_ALL_PROJECT_MEETINGS: (state, meetings) =>
    (state.projectMeetings = meetings),
  REMOVE_PROJECT_MEETING: (state, meeting) => (state.projectMeetings = meeting),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
