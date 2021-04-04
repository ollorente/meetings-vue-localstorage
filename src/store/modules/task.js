import { db, dbName } from "@/main";

const state = {
  task: "",
  tasks: [],
};

const getters = {
  getAllTasks: (state) => state.tasks,
  getTask: (state) => state.task,
  getTasks: (state) => state.tasks,
};

const actions = {
  async addTask({ commit }, data) {
    try {
      const date = Date.now();

      const task = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        projectId: await data.project,
        meetingId: await data.meeting,
        start: false,
        check: false,
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date,
      };

      db.tasks[task.id] = task;

      // ------- Agregar tarea a reunión -------
      const taskMeetings = await db.meetingTasks[task.id];

      if (!taskMeetings) {
        db.meetingTasks[task.id] = {};
        console.log(`db.meetingTasks->`, db.meetingTasks);
      }

      db.meetingTasks[task.meetingId][task.id] = {
        id: task.id,
        name: await task.name,
        projectId: await task.projectId,
        start: task.start,
        check: task.check,
        isActive: task.isActive,
        isLock: task.isLock,
      };
      console.log(
        `db.meetingTasks[${task.meetingId}][${task.id}]->`,
        db.meetingTasks[task.meetingId][task.id]
      );
      // ---X--- Agregar tarea a reunión ---X---

      // ------- Agregar tarea a proyecto -------
      const taskProjects = await db.projectTasks[task.projectId];

      if (!taskProjects) {
        db.projectTasks[task.projectId] = {};
      }

      db.projectTasks[task.projectId][task.id] = {
        id: task.id,
        name: await task.name,
        projectId: await task.projectId,
        meetingId: await task.meetingId,
        start: task.start,
        check: task.check,
        isActive: task.isActive,
        isLock: task.isLock,
      };
      // ---X--- Agregar tarea a proyecto ---X---

      const collaborators = await task.collaborators;

      // ------- Agregar tarea a usuario -------
      for (let i = 0; i < collaborators.length; i++) {
        const taskPerson = await db.peopleTasks[collaborators[i]];

        if (!taskPerson) {
          db.peopleTasks[collaborators[i]] = {};
        }

        db.peopleTasks[collaborators[i]][task.id] = {
          id: task.id,
          name: await task.name,
          projectId: await task.projectId,
          meetingId: await task.meetingId,
          start: task.start,
          check: task.check,
          isActive: task.isActive,
          isLock: task.isLock,
        };
      }
      // ---X--- Agregar tarea a usuario ---X---

      // ------- Agregar usuarios por tarea -------
      const peopleTask = await db.taskPeople[task.id];

      if (!peopleTask) {
        db.taskPeople[task.id] = {};
      }

      for (let i = 0; i < collaborators.length; i++) {
        const person = await db.people[collaborators[i]];

        if (person) {
          db.taskPeople[task.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Agregar usuarios por tarea ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_TASK", task);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchTask({ commit }, id) {
    try {
      const task = await db.tasks[id];

      commit("SET_TASK", task);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchTasks({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const tasks = Object.values(db.tasks)
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

      commit("SET_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllTasks({ commit }) {
    try {
      const tasks = Object.values(db.tasks)
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
            start: e.start,
            check: e.check,
            isActive: e.isActive,
            isLock: e.isLock,
          };
        });

      commit("SET_ALL_TASKS", tasks);
    } catch (error) {
      if (error) return;
    }
  },

  async updateTask({ commit }, data) {
    try {
      const date = Date.now();

      const task = {
        id: await data.name.id,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        projectId: await data.project,
        meetingId: await data.meeting,
        start: await data.name.start,
        check: await data.name.check,
        isActive: await data.name.isActive,
        isLock: await data.name.isLock,
        createdAt: await data.name.createdAt,
        updatedAt: date,
      };

      db.tasks[task.id] = task;

      // ------- Editar tarea a reunión -------
      const taskMeetings = await db.meetingTasks[task.id];

      if (!taskMeetings) {
        db.meetingTasks[task.id] = {};
      }

      db.meetingTasks[task.id][task.id] = {
        id: task.id,
        name: await task.name,
        projectId: await task.projectId,
        meetingId: await task.meetingId,
        start: task.start,
        check: task.check,
        isActive: task.isActive,
        isLock: task.isLock,
      };
      // ---X--- Editar tarea a reunión ---X---

      // ------- Editar tarea a proyecto -------
      const taskProjects = await db.projectTasks[task.projectId];

      if (!taskProjects) {
        db.projectTasks[task.projectId] = {};
      }

      db.projectTasks[task.projectId][task.id] = {
        id: task.id,
        name: await task.name,
        projectId: await task.projectId,
        meetingId: await task.meetingId,
        start: task.start,
        check: task.check,
        isActive: task.isActive,
        isLock: task.isLock,
      };
      // ---X--- Editar tarea a proyecto ---X---

      const collaborators = await task.collaborators;

      // ------- Editar tarea a usuario -------
      for (let i = 0; i < collaborators.length; i++) {
        const taskPerson = await db.peopleTasks[collaborators[i]];

        if (!taskPerson) {
          db.peopleTasks[collaborators[i]] = {};
        }

        delete db.peopleTasks[collaborators[i]][task.id];

        db.peopleTasks[collaborators[i]][task.id] = {
          id: task.id,
          name: await task.name,
          projectId: await task.projectId,
          meetingId: await task.meetingId,
          start: task.start,
          check: task.check,
          isActive: task.isActive,
          isLock: task.isLock,
        };
      }
      // ---X--- Editar tarea a usuario ---X---

      // ------- Editar usuarios por tarea -------
      delete db.taskPeople[task.id];

      for (let i = 0; i < collaborators.length; i++) {
        const peopleTask = await db.taskPeople[task.id];

        if (!peopleTask) {
          db.taskPeople[task.id] = {};
        }

        const person = await db.people[collaborators[i]];

        if (person) {
          db.taskPeople[task.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Editar usuarios por tarea ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_TASK", task);
    } catch (error) {
      if (error) return;
    }
  },

  async removeTask({ commit }, id) {
    try {
      const task = await db.tasks[id];

      // ------- Eliminando tarea de usuarios -------
      const Users = Object.values(db.people);

      Users.forEach(async (user) => {
        const t = Object.values(db.peopleTasks[user.id]);

        if (t) {
          delete db.peopleTasks[user.id][task.id];
        }
      });
      // ---X--- Eliminando tarea de usuarios ---X---

      // ------- Eliminando tarea de reuniones -------
      delete db.meetingTasks[task.meetingId][task.id];
      // ---X--- Eliminando tarea de reuniones ---X---

      // ------- Eliminando tarea de proyectos -------
      delete db.projectTasks[task.projectId][task.id];
      // ---X--- Eliminando tarea de proyectos ---X---

      // ------- Eliminando tarea y referencias -------
      delete db.taskPeople[id];
      delete db.tasks[id];
      // ---X--- Eliminando tarea y referencias ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_TASK", true);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_TASKS: (state, tasks) => (state.tasks = tasks),
  SET_TASK: (state, task) => (state.task = task),
  SET_TASKS: (state, tasks) => (state.tasks = tasks),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
