<template>
  <div class="tasks">
    <h1 style="margin: 0">
      {{ getAllMeetingTasks.length }}
      {{
        getAllMeetingTasks.length === 1
          ? "Tarea de la reunión"
          : "Tareas de la reunión"
      }}
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
    <p v-for="(task, index) in getMeetingTasks" :key="index" class="parrafo">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tasks",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchMeetingTasks({
      id: this.$route.params.meeting,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllMeetingTasks(this.$route.params.meeting);
  },
  methods: {
    ...mapActions(["fetchMeetingTasks", "fetchAllMeetingTasks"]),
  },
  computed: {
    ...mapGetters(["getMeetingTasks", "getAllMeetingTasks"]),
  },
  watch: {
    $route: ["fetchMeetingTasks", "fetchAllMeetingTasks"],
  },
};
</script>
