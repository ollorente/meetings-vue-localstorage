import { db, dbName } from "@/main";

const state = {
  personTasks: [],
};

const getters = {
  getPersonTasks: (state) => state.personTasks,
  getAllPersonTasks: (state) => state.personTasks,
};

const actions = {
  async fetchPersonTasks({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const tasks = Object.values(db.peopleTasks[data.id])
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
            meetingId: e.meetingId,
            projectId: e.projectId,
            start: e.start,
            check: e.check,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllPersonTasks({ commit }, id) {
    try {
      const tasks = Object.values(db.peopleTasks[id])
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
            projectId: e.projectId,
            start: e.start,
            check: e.check,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_PERSON_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },

  async removePersonTask({ commit }, id) {
    delete db.peopleTasks[id];

    localStorage.setItem(dbName, JSON.stringify(db));

    commit("REMOVE_PERSON_TASK", true);
  },
};

const mutations = {
  SET_PERSON_TASKS: (state, tasks) => (state.personTasks = tasks),
  SET_ALL_PERSON_TASKS: (state, tasks) => (state.personTasks = tasks),
  REMOVE_PERSON_TASK: (state, task) => (state.personTasks = task),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
