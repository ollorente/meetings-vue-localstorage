<template>
  <div class="edit-meeting">
    <h1 style="margin: 0">Editar reunión</h1>
    <h2 style="margin: 0">{{ meeting.name }}</h2>
    <h3 style="margin: 0">{{ project.name }}</h3>
    <p>
      <a href="#" @click="deleteMeeting" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="updateMeeting">
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
          :min="today"
        />
      </div>
      <div>
        <input
          type="datetime-local"
          v-model="meeting.dateEnd"
          id="dateEnd"
          :min="today"
        />
      </div>
      <div>
        <select multiple v-model="meeting.collaborators" id="collaborators">
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <button type="submit">Actualizar</button>
    </form>
    <pre class="container" hiddens style="text-align: left">{{ $data }}</pre>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "EditMeeting",
  components: {},
  data() {
    return {
      meeting: {
        id: "",
        name: "",
        description: "",
        project: "",
        collaborators: [],
        dateInt: "",
        dateEnd: "",
        isActive: "",
        isLock: "",
        createdAt: "",
        updatedAt: "",
      },
      people: [],
      project: "",
      projects: [],
      today: new Date(Date.now()).toISOString().substr(0, 16),
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getMeeting();
    this.getProjects();
  },
  methods: {
    async getMeeting() {
      const data = await db.meetings[this.$route.params.meeting];

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        const data = await db.meetings[this.$route.params.meeting];
        const DateInt = data.dateInt - 18000000;
        const DateEnd = data.dateEnd - 18000000;

        this.meeting = {
          id: data.id,
          name: data.name,
          description: data.description,
          project: data.project,
          collaborators: data.collaborators,
          dateInt: new Date(DateInt).toISOString().substr(0, 16),
          dateEnd: new Date(DateEnd).toISOString().substr(0, 16),
          isActive: data.isActive,
          isLock: data.isLock,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };

        await this.getProjectPeople(this.meeting.project);
        await this.getProject(this.meeting.project);
      }
    },
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
    async getProject(id) {
      this.project = await db.projects[id];
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
    async updateMeeting() {
      if (
        this.meeting.name.trim() === "" ||
        this.meeting.description === "" ||
        this.meeting.collaborators === "" ||
        this.meeting.dateInt === "" ||
        this.meeting.dateEnd == ""
      ) {
        this.alert.error = true;
        this.alert.msg = `El nombre puede estar vacio.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const meeting = {
          id: this.meeting.id,
          name: await this.meeting.name.trim(),
          description: await this.meeting.description.trim(),
          collaborators: await this.meeting.collaborators,
          project: await this.meeting.project,
          dateInt: Date.parse(this.meeting.dateInt),
          dateEnd: Date.parse(this.meeting.dateEnd),
          isActive: this.meeting.isActive,
          isLock: this.meeting.isLock,
          createdAt: this.meeting.createdAt,
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
    async deleteMeeting() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        delete db.meetings[this.$route.params.meeting];

        localStorage.setItem(dbName, JSON.stringify(db));

        await this.$router.replace({ name: "Meetings" });
      }
    },
  },
  watch: {
    $route: ["getMeeting"],
  },
};
</script>
