import { db, dbName } from "@/main";

const state = {
  person: "",
  people: [],
};

const getters = {
  getAllPeople: (state) => state.people,
  getPerson: (state) => state.person,
  getPeople: (state) => state.people,
};

const actions = {
  async addPerson({ commit }, data) {
    try {
      const date = Date.now();

      const person = {
        id: date,
        name: await data.name.trim(),
        email: await data.email.trim(),
        photoURL: "",
        role: data.role ? await data.role.trim() : "",
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date,
      };

      db.people[person.id] = person;

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PERSON", person);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchPerson({ commit }, id) {
    try {
      const person = await db.people[id];

      commit("SET_PERSON", person);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchPersonByEmail({ commit }, id) {
    try {
      const person = Object.values(db.people).filter((e) => e.email === id);

      commit("SET_PERSON", person);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchPeople({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const people = Object.values(db.people)
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
            photoURL: e.photoURL,
            isActive: e.isActive,
          };
        });

      commit("SET_PEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllPeople({ commit }) {
    try {
      const people = Object.values(db.people)
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
            photoURL: e.photoURL,
            isActive: e.isActive,
          };
        });

      commit("SET_ALL_PEOPLE", people);
    } catch (error) {
      if (error) return;
    }
  },

  async updatePerson({ commit }, data) {
    try {
      const person = {
        id: await data.id,
        name: await data.name.trim(),
        email: await data.email.trim(),
        photoURL: data.photoURL ? await data.photoURL.trim() : "",
        role: await data.role.trim(),
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: Date.now(),
      };

      db.people[person.id] = person;

      // ------- Actualizar usuario en proyectos -------
      const Projects = Object.values(db.projects);

      Projects.forEach(async (project) => {
        const p = Object.values(db.projectPeople[project.id]);
        // console.log("p->", p);

        if (p) {
          const u = await db.projectPeople[project.id][person.id];

          if (u) {
            db.projectPeople[project.id][person.id] = {
              id: await person.id,
              name: await person.name,
              email: await person.email,
              isActive: await person.isActive,
              isLock: await person.isLock,
            };
          }
        }
      });
      // ---X--- Actualizar usuario en proyectos ---X---

      // ------- Actualizar usuario en reuniones -------
      const Meeting = Object.values(db.meetings);

      Meeting.forEach(async (meeting) => {
        const m = Object.values(db.meetingPeople[meeting.id]);
        // console.log("m->", m);

        if (m) {
          const u = await db.meetingPeople[meeting.id][person.id];

          if (u) {
            db.meetingPeople[meeting.id][person.id] = {
              id: await person.id,
              name: await person.name,
              email: await person.email,
              isActive: await person.isActive,
              isLock: await person.isLock,
            };
          }
        }
      });
      // ---X--- Actualizar usuario en reuniones ---X---

      // ------- Actualizar usuario en tareas -------
      const Task = Object.values(db.tasks);

      Task.forEach(async (task) => {
        const t = Object.values(db.taskPeople[task.id]);
        // console.log("t->", t);

        if (t) {
          const u = await db.taskPeople[task.id][person.id];

          if (u) {
            db.taskPeople[task.id][person.id] = {
              id: await person.id,
              name: await person.name,
              email: await person.email,
              isActive: await person.isActive,
              isLock: await person.isLock,
            };
          }
        }
      });
      // ---X--- Actualizar usuario en tareas ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PERSON", person);
    } catch (error) {
      if (error) return;
    }
  },

  async deletePerson({ commit }, id) {
    try {
      // ------- Eliminar usuario de proyectos -------
      const Projects = Object.values(db.projects);

      Projects.forEach(async (project) => {
        const p = Object.values(db.projectPeople[project.id]);

        if (p) {
          delete db.projectPeople[project.id][id];
        }
      });
      // ---X--- Eliminar usuario de proyectos ---X---

      // ------- Eliminar usuario de reuniones -------
      const Meetings = Object.values(db.meetings);

      Meetings.forEach(async (meeting) => {
        const m = Object.values(db.meetingPeople[meeting.id]);

        if (m) {
          delete db.meetingPeople[meeting.id][id];
        }
      });
      // ---X--- Eliminar usuario de reuniones ---X---

      // ------- Eliminar usuario de tareas -------
      const Tasks = Object.values(db.tasks);

      Tasks.forEach(async (task) => {
        const t = Object.values(db.taskPeople[task.id]);

        if (t) {
          delete db.taskPeople[task.id][id];
        }
      });
      // ---X--- Eliminar usuario de tareas ---X---

      // ------- Eliminar usuario y referencias -------
      delete db.people[id];
      delete db.peopleMeetings[id];
      delete db.peopleProjects[id];
      delete db.peopleTasks[id];
      // ---X--- Eliminar usuario y referencias ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_PERSON", true);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_PEOPLE: (state, people) => (state.people = people),
  SET_PERSON: (state, person) => (state.person = person),
  SET_PEOPLE: (state, people) => (state.people = people),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
