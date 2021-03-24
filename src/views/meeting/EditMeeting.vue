<template>
  <div class="edit-meeting">
    <h1 style="margin: 0">Editar reunión</h1>
    <p>
      <a href="#" @click="deleteMeeting" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
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
      {{ meeting.dateInt }}
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
      {{ meeting.dateEnd }}
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
    {{ $data.meeting }}
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
        name: "",
        description: "",
        dateInt: "",
        dateEnd: "",
        project: "",
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

        this.meeting = {
          name: data.name,
          description: data.description,
          dateInt: data.dateInt,
          dateEnd: data.dateEnd,
          project: data.project,
          collaborators: data.collaborators,
        };

        await this.getProjectPeople(this.meeting.project);
      }
    },
    async getProjectPeople(id) {
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
