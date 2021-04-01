import { db, dbName } from "@/main";

const state = {
  meeting: "",
  meetings: [],
};

const getters = {
  getMeeting: (state) => state.meeting,
  getAllMeetings: (state) => state.meetings,
  getMeetings: (state) => state.meetings,
};

const actions = {
  async addMeeting({ commit }, data) {
    try {
      const date = Date.now();

      const meeting = {
        id: date,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        project: parseInt(data.project),
        dateInt: Date.parse(data.dateInt),
        dateEnd: Date.parse(data.dateEnd),
        isActive: true,
        isLock: false,
        createdAt: date,
        updatedAt: date,
      };

      db.meetings[meeting.id] = meeting;

      // ------- Agregar a reuniones por proyecto -------
      const meetingsProject = await db.projectMeetings[meeting.project];

      if (!meetingsProject) {
        db.projectMeetings[meeting.project] = {};
      }

      db.projectMeetings[meeting.project][meeting.id] = {
        id: meeting.id,
        name: await meeting.name,
        dateInt: meeting.dateInt,
        dateEnd: meeting.dateEnd,
        isActive: meeting.isActive,
        isLock: meeting.isLock,
      };
      // ---X--- Agregar a reuniones por proyecto ---X---

      const collaborators = await meeting.collaborators;

      // ------- Agregar a reuniones por usuario -------
      for (let i = 0; i < collaborators.length; i++) {
        const personMeetings = await db.peopleMeetings[collaborators[i]];

        if (!personMeetings) {
          db.peopleMeetings[collaborators[i]] = {};
        }

        db.peopleMeetings[collaborators[i]][meeting.id] = {
          id: meeting.id,
          name: await meeting.name,
          dateInt: meeting.dateInt,
          dateEnd: meeting.dateEnd,
          isActive: meeting.isActive,
          isLock: meeting.isLock,
        };
      }
      // ---X--- Agregar a reuniones por usuario ---X---

      // ------- Usuarios por reunión -------
      for (let i = 0; i < collaborators.length; i++) {
        const peopleMeeting = await db.meetingPeople[meeting.id];

        if (!peopleMeeting) {
          db.meetingPeople[meeting.id] = {};
        }

        const person = await db.people[collaborators[i]];

        if (person) {
          db.meetingPeople[meeting.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Usuarios por reunión ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_MEETING", meeting);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchMeeting({ commit }, id) {
    try {
      const meeting = await db.meetings[id];

      commit("SET_MEETING", meeting);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchMeetings({ commit }, data) {
    try {
      const limit = data.limit ? data.limit : 20;
      const page = (data.page - 1) * data.limit || 0;

      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .filter((e) => e.dateInt >= Date.now())
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

      commit("SET_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },

  async fetchAllMeetings({ commit }) {
    try {
      const meetings = Object.values(db.meetings)
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true)
        .filter((e) => e.dateInt >= Date.now())
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

      commit("SET_ALL_MEETINGS", meetings);
    } catch (error) {
      if (error) return;
    }
  },

  async updateMeeting({ commit }, data) {
    try {
      const date = Date.now();

      const meeting = {
        id: await data.id,
        name: await data.name.trim(),
        description: await data.description.trim(),
        collaborators: await data.collaborators,
        project: parseInt(data.project),
        dateInt: Date.parse(data.dateInt),
        dateEnd: Date.parse(data.dateEnd),
        isActive: await data.isActive,
        isLock: await data.isLock,
        createdAt: await data.createdAt,
        updatedAt: date,
      };

      db.meetings[meeting.id] = meeting;

      // ------- Agregar a reuniones por proyecto -------
      const meetingsProject = await db.projectMeetings[meeting.project];

      if (!meetingsProject) {
        db.projectMeetings[meeting.project] = {};
      }

      db.projectMeetings[meeting.project][meeting.id] = {
        id: meeting.id,
        name: await meeting.name,
        dateInt: meeting.dateInt,
        dateEnd: meeting.dateEnd,
        isActive: meeting.isActive,
        isLock: meeting.isLock,
      };
      // ---X--- Agregar a reuniones por proyecto ---X---

      const colllaborators = await meeting.collaborators;

      // ------- Editar usuarios por reunión -------
      delete db.meetingPeople[meeting.id];

      for (let i = 0; i < colllaborators.length; i++) {
        const peopleMeeting = await db.meetingPeople[meeting.id];

        if (!peopleMeeting) {
          db.meetingPeople[meeting.id] = {};
        }

        const person = await db.people[colllaborators[i]];

        if (person) {
          db.meetingPeople[meeting.id][person.id] = {
            id: person.id,
            name: person.name,
            email: person.email,
            isActive: person.isActive,
            isLock: person.isLock,
          };
        }
      }
      // ---X--- Editar usuarios por reunión ---X---

      // ------- Editar reuniones por usuario -------
      // ------- Borrar reunión del usuario -------
      const users = Object.values(db.people);

      users.forEach(async (user) => {
        const u = await db.peopleMeetings[user.id];

        if (u) {
          delete db.peopleMeetings[user.id][meeting.id];
        }
      });
      // ---X--- Borrar reunión del usuario ---X---

      for (let i = 0; i < colllaborators.length; i++) {
        const personMeetings = await db.peopleMeetings[colllaborators[i]];

        if (!personMeetings) {
          db.peopleMeetings[colllaborators[i]] = {};
        }

        db.peopleMeetings[colllaborators[i]][meeting.id] = {
          id: meeting.id,
          name: await meeting.name,
          dateInt: meeting.dateInt,
          dateEnd: meeting.dateEnd,
          isActive: meeting.isActive,
          isLock: meeting.isLock,
        };
      }
      // ---X--- Editar reuniones por usuario ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_MEETING", meeting);
    } catch (error) {
      if (error) return;
    }
  },

  async deleteMeeting({ commit }, id) {
    try {
      const meeting = await db.meetings[id];

      // ------- Eliminar a reunión del proyecto -------
      const meetingProject = db.projectMeetings[meeting.project];
      console.log("meetingProject->", meetingProject);

      if (meetingProject) {
        delete db.projectMeetings[meeting.project][meeting.id];
      }
      // ---X--- Eliminar a reunión del proyecto ---X---

      // ------- Eliminar a reunión de los usuarios -------
      const collaborators = await meeting.collaborators;
      console.log("collaborators->", collaborators);

      await collaborators.forEach(async (e) => {
        const meetingPeople = await db.peopleMeetings[e];
        console.log("meetingPeople->", meetingPeople);

        if (meetingPeople) {
          delete db.peopleMeetings[e][meeting.id];
        }
      });
      // ---X--- Eliminar a reunión de los usuarios ---X---

      // // ------- Eliminar tareas de la reunión -------
      // const tasks = await db.meetingTasks[meeting.id];
      // console.log("tasks->", tasks);

      // if (tasks) {
      //   await Object.value(tasks).forEach(async (task) => {
      //     delete db.taskPeople[task.id];
      //     delete db.tasks[task.id];

      //     // ------- Eliminar tarea del proyecto -------
      //     const projects = Object.values(db.projectTasks);
      //     console.log("projects->", projects);

      //     projects.forEach(async (project) => {
      //       delete db.projectTasks[project.id][task.id];
      //     });
      //     // ---X--- Eliminar tarea del proyecto ---X---

      //     // ------- Eliminar tareas del usuario -------
      //     const poeple = Object.values(db.peopleTasks);
      //     console.log("poeple->", poeple);

      //     poeple.forEach(async (person) => {
      //       delete db.peopleTasks[person.id][task.id];
      //     });
      //     // ---X--- Eliminar tareas del usuario ---X---
      //   });
      // }
      // // ---X--- Eliminar tareas de la reunión ---X---

      // ------- Eliminar a reunión y referencias -------
      delete db.meetingTasks[meeting.id];
      delete db.meetingPeople[meeting.id];
      delete db.meetings[meeting.id];
      // ---X--- Eliminar a reunión y referencias ---X---

      localStorage.setItem(dbName, JSON.stringify(db));

      commit("SET_MEETING", true);
    } catch (error) {
      if (error) return;
    }
  },
};

const mutations = {
  SET_ALL_MEETINGS: (state, meetings) => (state.meetings = meetings),
  SET_MEETING: (state, meeting) => (state.meeting = meeting),
  SET_MEETINGS: (state, meetings) => (state.meetings = meetings),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
