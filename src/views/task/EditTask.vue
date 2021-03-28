<template>
  <div class="edit-task">
    <h1 style="margin: 0">Editar "{{ task.name }}"</h1>
    <p>
      <a href="#" @click="deleteTask" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Task', params: { task: task.id } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="updateTask">
      <div>
        <input
          type="text"
          v-model="task.name"
          id="name"
          placeholder="Nombre de proyecto"
          autofocus
          required
        />
      </div>
      <div>
        <textarea v-model="task.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <select multiple v-model="task.collaborators" id="collaborators">
          <option v-for="person in people" :key="person.id" :value="person.id">
            {{ person.name }} - {{ person.email }}
          </option>
        </select>
      </div>
      <div>
        <label><input type="checkbox" v-model="task.start" /> Iniciada</label>
      </div>
      <div>
        <label><input type="checkbox" v-model="task.check" /> Terminada</label>
      </div>
      <div>
        <label><input type="checkbox" v-model="task.isActive" /> Estatus</label>
      </div>
      <button type="submit">Editar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "EditTask",
  components: {},
  data() {
    return {
      task: {
        id: null,
        name: null,
        description: null,
        collaborators: [],
        projectId: null,
        meetingId: null,
        start: null,
        check: null,
        createdAt: null,
        isActive: null,
        isLock: null,
      },
      people: [],
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getPeople();
    this.getTask();
  },
  methods: {
    async getTask() {
      const data = await db.tasks[this.$route.params.task];

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        this.task = await db.tasks[this.$route.params.task];
      }
    },
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
            photoURL: e.photoURL,
            isActive: e.isActive,
          };
        });

      this.people = data;
    },
    async updateTask() {
      if (this.task.name.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `El nombre puede estar vacio.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const task = {
          id: await this.task.id,
          name: await this.task.name.trim(),
          description: await this.task.description.trim(),
          collaborators: await this.task.collaborators,
          projectId: await this.task.projectId,
          meetingId: await this.task.meetingId,
          start: await this.task.start,
          check: await this.task.check,
          isActive: await this.task.isActive,
          isLock: await this.task.isLock,
          createdAt: await this.task.createdAt,
          updatedAt: date,
        };

        db.tasks[task.id] = task;

        // ------- Editar tarea a reunión -------
        const taskMeetings = await db.meetingTasks[task.meetingId];

        if (!taskMeetings) {
          db.meetingTasks[task.meetingId] = {};
        }

        db.meetingTasks[task.meetingId][task.id] = {
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

        // ------- Editar tareas por usuario -------
        // ------- Borrar tarea del usuario -------
        const users = Object.values(db.people);

        users.forEach(async (user) => {
          const u = await db.peopleTasks[user.id];

          if (u) {
            delete db.peopleTasks[user.id][task.id];
          }
        });
        // ---X--- Borrar tarea del usuario ---X---

        for (let i = 0; i < collaborators.length; i++) {
          const personTasks = await db.peopleTasks[collaborators[i]];

          if (!personTasks) {
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
        // ---X--- Editar tareas por usuario ---X---

        localStorage.setItem(dbName, JSON.stringify(db));

        this.task.name = "";
        this.task.description = "";
        this.task.collaborators = "";

        await this.$router.replace({
          name: "Task",
          params: { task: task.id },
        });
      }
    },
    async deleteTask() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        const task = await db.tasks[this.$route.params.task];
        const collaborators = await task.collaborators;

        delete db.tasks[task.id];
        delete db.taskPeople[task.id];

        for (let i = 0; i < collaborators.length; i++) {
          delete db.peopleTasks[collaborators[i]][task.id];
        }

        localStorage.setItem(dbName, JSON.stringify(db));

        await this.$router.replace({ name: "Tasks" });
      }
    },
  },
  computed: {},
  watch: {
    $route: ["getPeople", "getTask"],
  },
};
</script>
