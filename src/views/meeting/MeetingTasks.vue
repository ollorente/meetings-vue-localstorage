<template>
  <div class="tasks">
    <h1 style="margin: 0">
      {{ total }}
      {{ total === 1 ? "Tarea del proyecto" : "Tareas del proyecto" }}
    </h1>
    <p>
      <router-link :to="{ name: 'NewMeetingTask' }" class="link"
        >Agregar</router-link
      >
      |
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(task, index) in tasks" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{
              name: 'MeetingTask',
              params: { project: task.projectId, task: task.id },
            }"
            class="link"
            >{{ task.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status">{{
        task.isActive ? "Activo" : "Inactivo"
      }}</span>
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "Tasks",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      tasks: [],
    };
  },
  created() {
    this.getTasks();
    this.getTotalTasks();
  },
  methods: {
    async getTasks() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;

      const data = Object.values(db.meetingTasks[this.$route.params.meeting])
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
            isActive: e.isActive,
          };
        });

      this.tasks = data;
    },
    async getTotalTasks() {
      this.total = Object.values(db.meetingTasks[this.$route.params.meeting])
        .filter((e) => e.isLock === false)
        .filter((e) => e.isActive === true).length;
    },
  },
  watch: {
    $route: ["getTasks", "getTotalTasks"],
  },
};
</script>
