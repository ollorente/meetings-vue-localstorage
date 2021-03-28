<template>
  <div class="task">
    <h1 style="margin: 0">Tarea</h1>
    <p>
      <router-link
        :to="{ name: 'EditTask', params: { task: $route.params.task } }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link
        :to="{ name: 'MeetingTasks', params: { meeting: task.meetingId } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <h2 style="margin: 0">{{ task.name }}</h2>
    <p>
      <span>{{ meeting.name }}</span
      ><br /><span
        ><router-link
          :to="{ name: 'Project', params: { project: project.id } }"
          class="link"
          >{{ project.name }}</router-link
        ></span
      >
    </p>
    <div v-html="task.description"></div>
    <p>
      <span v-for="person in people" :key="person.id"
        ><router-link
          :to="{ name: 'Person', params: { person: person.id } }"
          class="link"
          >{{ person.name }}</router-link
        ><br
      /></span>
    </p>
    <p>
      <span>{{ task.start ? "Iniciado" : "Sin iniciar" }}</span
      ><br />
      <span>{{ task.check ? "Terminado" : "Sin terminar" }}</span
      ><br />
      <span>{{ task.isActive ? "Activo" : "Inactivo" }}</span
      ><br />
      <span>{{ task.isLock ? "Bloqueado" : "público" }}</span
      ><br />
    </p>
    <p>
      <span
        ><span>Asignada:</span>
        <span>{{ new Date(task.createdAt).toLocaleString() }}</span></span
      >
      <span v-if="task.createdAt !== task.updatedAt"
        ><br /><span>Actualizda:</span>
        <span>{{ new Date(task.updatedAt).toLocaleString() }}</span></span
      >
    </p>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "Task",
  components: {},
  data() {
    return {
      meeting: "",
      people: [],
      project: "",
      task: "",
    };
  },
  created() {
    this.getTask();
    this.getPeople();
  },
  methods: {
    async getTask() {
      this.task = await db.tasks[this.$route.params.task];

      await this.getProject(this.task.projectId);
      await this.getMeeting(this.task.meetingId);
    },
    async getProject(id) {
      this.project = await db.projects[id];
    },
    async getMeeting(id) {
      this.meeting = await db.meetings[id];
    },
    async getPeople() {
      this.people = await db.taskPeople[this.$route.params.task];
    },
  },
  watch: {
    $route: ["getTask"],
  },
};
</script>
