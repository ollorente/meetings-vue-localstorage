import { db } from "@/main";

const state = {
  taskPeople: [],
};

const getters = {
  getAllTaskPeople: (state) => state.taskPeople,
  getTaskPeople: (state) => state.taskPeople,
};

const actions = {
  async fetchTaskPeople({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const people = Object.values(db.taskPeople[data.id])
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

      commit("SET_TASK_PEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllTaskPeople({ commit }, id) {
    try {
      const people = Object.values(db.taskPeople[id])
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

      commit("SET_ALL_TASK_PEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_TASK_PEOPLE: (state, people) => (state.taskPeople = people),
  SET_TASK_PEOPLE: (state, people) => (state.taskPeople = people),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
