<template>
  <div class="new-project-task">
    <h1 style="margin: 0">Nueva tarea</h1>
    <p>
      <router-link
        :to="{
          name: 'MeetingTasks',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="addTask">
      <div>
        <input
          type="text"
          v-model="task.name"
          id="name"
          placeholder="Nombre de tarea"
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
      <button type="submit">Agregar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "NewMeetingTask",
  components: {},
  data() {
    return {
      task: {
        name: "",
        description: "",
        collaborators: [],
        meeting: parseInt(this.$route.params.meeting),
      },
      people: [],
      meeting: "",
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getMeeting();
    this.getMeetingPeople();
  },
  methods: {
    async getMeeting() {
      this.meeting = await db.meetings[this.$route.params.meeting];
    },
    async getMeetingPeople() {
      const data = Object.values(db.meetingPeople[this.$route.params.meeting])
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
    async addTask() {
      if (this.task.name.trim() === "" || this.task.description.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const task = {
          id: date,
          name: await this.task.name.trim(),
          description: await this.task.description.trim(),
          collaborators: await this.task.collaborators,
          projectId: await this.meeting.project,
          meetingId: await this.task.meeting,
          start: false,
          check: false,
          isActive: true,
          isLock: false,
          createdAt: date,
          updatedAt: date,
        };

        db.tasks[task.id] = task;

        // ------- Agregar tarea a reunión -------
        const taskMeetings = await db.meetingTasks[this.$route.params.meeting];

        if (!taskMeetings) {
          db.meetingTasks[this.$route.params.meeting] = {};
        }

        db.meetingTasks[this.$route.params.meeting][task.id] = {
          id: task.id,
          name: await task.name,
          projectId: await task.projectId,
          meetingId: await task.meetingId,
          start: task.start,
          check: task.check,
          isActive: task.isActive,
          isLock: task.isLock,
        };
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
        for (let i = 0; i < collaborators.length; i++) {
          const peopletask = await db.taskPeople[task.id];

          if (!peopletask) {
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
        // ---X--- Agregar usuarios por tarea ---X---

        localStorage.setItem(dbName, JSON.stringify(db));

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.project = "";

        await this.$router.replace({
          name: "MeetingTasks",
          params: { meeting: this.$route.params.meeting },
        });
      }
    },
  },
  watch: {
    $route: ["getMeetingPeople"],
  },
};
</script>
