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
        <select v-model="meeting.project" id="collaborators">
          <option
            v-for="project in projects"
            :key="project.id"
            :value="project.id"
          >
            {{ project.name }}
          </option>
        </select>
      </div>
      <div>
        <select multiple v-model="meeting.collaborators" id="collaborators">
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
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
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getProjects();
    this.getPeople();
  },
  methods: {
    async getPeople() {
      const data = Object.values(db.people)
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
          };
        });

      this.people = data;
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
          description: await this.meeting.description,
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
    $route: ["getPeople"],
  },
};
</script>
