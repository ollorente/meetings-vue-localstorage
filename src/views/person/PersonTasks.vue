<template>
  <div class="task-projects">
    <h1 style="margin: 0">
      {{ getAllPersonTasks.length }}
      {{
        getAllPersonTasks.length === 1
          ? "Tarea del usuario"
          : "Tareas del usuario"
      }}
    </h1>
    <h2 style="margin: 0">{{ getPerson.name }}</h2>
    <h4 style="margin: 0">{{ getPerson.email }}</h4>
    <p>
      <router-link
        :to="{ name: 'Person', params: { task: $route.params.person } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(task, index) in getPersonTasks" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Task', params: { task: task.id } }"
            class="link"
            >{{ task.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status">{{
        task.isActive ? "Activo" : "Inactivo"
      }}</span>
      <span class="parrafo__status">{{
        task.isLock ? "Bloqueado" : "Pùblico"
      }}</span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PersonTasks",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
    this.fetchPersonTasks({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllPersonTasks({ id: this.$route.params.person });
  },
  methods: {
    ...mapActions(["fetchPerson", "fetchPersonTasks", "fetchAllPersonTasks"]),
  },
  computed: {
    ...mapGetters(["getPerson", "getPersonTasks", "getAllPersonTasks"]),
  },
  watch: {
    $route: ["fetchPerson", "fetchPersonTasks", "fetchAllPersonTasks"],
  },
};
</script>

<style scoped></style>
