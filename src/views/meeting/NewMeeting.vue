<template>
  <div class="new-meeting">
    <h1 style="margin: 0">Nueva reunión</h1>
    <p>
      <router-link :to="{ name: 'Meetings' }" class="link">Volver</router-link>
    </p>
    <form @submit.prevent="addMeeting">
      <div>
        <input
          type="text"
          v-model="meeting.name"
          id="name"
          placeholder="Nombre de proyecto"
          autofocus
          required
        />
      </div>
      <div>
        <textarea v-model="meeting.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <input
          type="datetime-local"
          v-model="meeting.dateInt"
          id="dateInt"
          name="trip-start"
          value="2018-07-22"
          min="2018-01-01"
          max="2018-12-31"
        />
      </div>
      <div>
        <input
          type="datetime-local"
          v-model="meeting.dateEnd"
          id="dateEnd"
          name="trip-start"
          value="2018-07-22"
          min="2018-01-01"
          max="2018-12-31"
        />
      </div>
      <div>
        <select v-model="meeting.project" id="collaborators" @change="getuUers">
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>
      <div v-if="isCollaborators">
        <select multiple v-model="meeting.collaborators" id="collaborators">
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "NewMeeting",
  components: {},
  data() {
    return {
      meeting: {
        name: null,
        description: null,
        dateInt: null,
        dateEnd: null,
        project: null,
        collaborators: [],
      },
      people: [],
      projects: [],
      isCollaborators: false,
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getProjects();
  },
  methods: {
    async getProjectPeople(id) {
      if (id !== null) {
        const data = Object.values(db.projectPeople[id])
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
              isActive: e.isActive,
            };
          });

        this.people = data;
      }
    },
    async getuUers() {
      this.isCollaborators = true;

      this.getProjectPeople(this.meeting.project);
    },
    async getProjects() {
      const data = Object.values(db.projects)
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
            isActive: e.isActive,
          };
        });

      this.projects = data;
    },
    async addMeeting() {
      if (this.meeting.name.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `El nombre puede estar vacio.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const meeting = {
          id: date,
          name: await this.meeting.name.trim(),
          description: await this.meeting.description.trim(),
          collaborators: await this.meeting.collaborators,
          project: await this.meeting.project,
          dateInt: Date.parse(this.meeting.dateInt),
          dateEnd: Date.parse(this.meeting.dateEnd),
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

        const colllaborators = await meeting.collaborators;

        // ------- Agregar a reuniones por usuario -------
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
        // ---X--- Agregar a reuniones por usuario ---X---

        // ------- Usuarios por reunión -------
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
        // ---X--- Usuarios por reunión ---X---

        localStorage.setItem(dbName, JSON.stringify(db));

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.dateInt = "";
        this.meeting.dateEnd = "";

        await this.$router.replace({ name: "Meetings" });
      }
    },
  },
  watch: {
    $route: ["getProjectPeople"],
  },
};
</script>
