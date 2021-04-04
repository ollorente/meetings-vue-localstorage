import { db } from "@/main";

const state = {
  meetingTasks: [],
};

const getters = {
  getAllMeetingTasks: (state) => state.meetingTasks,
  getMeetingTasks: (state) => state.meetingTasks,
};

const actions = {
  async fetchMeetingTasks({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const tasks = Object.values(db.meetingTasks[data.id])
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
            start: e.start,
            check: e.check,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_MEETING_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllMeetingTasks({ commit }, id) {
    try {
      const tasks = Object.values(db.meetingTasks[id])
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
            meetingId: e.meetingId,
            start: e.start,
            check: e.check,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_ALL_MEETING_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_MEETING_TASKS: (state, tasks) => (state.meetingTasks = tasks),
  SET_MEETING_TASKS: (state, tasks) => (state.meetingTasks = tasks),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
