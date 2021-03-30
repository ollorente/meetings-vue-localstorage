<template>
  <div class="project-people">
    <h1 style="margin: 0">
      {{ getAllProjectTasks.length }}
      {{
        getAllProjectTasks.length === 1
          ? "tarea en el proyecto"
          : "tareas en el proyectos"
      }}
    </h1>
    <h2 style="margin: 0">{{ getProject.name }}</h2>
    <h3 style="margin: 0">{{ getProject.name }}</h3>
    <p>
      <router-link
        :to="{ name: 'Project', params: { project: $route.params.project } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(task, index) in getProjectTasks" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{
              name: 'ProjectTask',
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
      <span class="parrafo__status">{{
        task.isLock ? "Bloqueado" : "Público"
      }}</span>
    </p>
    <pre class="container" hidden style="text-align: left">{{
      getProjectTasks
    }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectTasks",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchProject(this.$route.params.project);
    this.fetchProjectTasks({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllProjectTasks();
  },
  methods: {
    ...mapActions([
      "fetchProject",
      "fetchProjectTasks",
      "fetchAllProjectTasks",
    ]),
  },
  computed: {
    ...mapGetters(["getProject", "getProjectTasks", "getAllProjectTasks"]),
  },
  watch: {
    $route: ["fetchProject", "fetchProjectTasks", "fetchAllProjectTasks"],
  },
};
</script>

<style scoped></style>
