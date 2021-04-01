<template>
  <div class="project">
    <h1 style="margin: 0">Tarea de reunión</h1>
    <p>
      <router-link
        :to="{
          name: 'TaskPeople',
          params: { task: $route.params.task },
        }"
        class="link"
        >Usuarios</router-link
      >
      |
      <router-link
        :to="{
          name: 'EditTask',
          params: { task: $route.params.task },
        }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link
        :to="{
          name: 'ProjectTasks',
          params: { project: getTask.projectId },
        }"
        class="link"
        >Volver</router-link
      >
    </p>
    <h2 style="margin: 0">{{ getTask.name }}</h2>
    <!-- <p>
      <span>{{ meeting.name }}</span
      ><br /><span
        ><router-link
          :to="{ name: 'Project', params: { project: project.id } }"
          class="link"
          >{{ project.name }}</router-link
        ></span
      >
    </p> -->
    <div v-html="getTask.description"></div>
    <p>
      <span v-for="person in getPeople" :key="person.id"
        ><router-link
          :to="{ name: 'Person', params: { person: person.id } }"
          class="link"
          >{{ person.name }}</router-link
        ><br
      /></span>
    </p>
    <p>
      <span>{{ getTask.start ? "Iniciado" : "Sin iniciar" }}</span
      ><br />
      <span>{{ getTask.check ? "Terminado" : "Sin terminar" }}</span
      ><br />
      <span>{{ getTask.isActive ? "Activo" : "Inactivo" }}</span
      ><br />
      <span>{{ getTask.isLock ? "Bloqueado" : "público" }}</span
      ><br />
    </p>
    <p>
      <span
        ><span>Asignada:</span>
        <span>{{ new Date(getTask.createdAt).toLocaleString() }}</span></span
      >
      <span v-if="getTask.createdAt !== getTask.updatedAt"
        ><br /><span>Actualizda:</span>
        <span>{{ new Date(getTask.updatedAt).toLocaleString() }}</span></span
      >
    </p>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProjectTask",
  components: {},
  data() {
    return {};
  },
  created() {
    this.fetchTask(this.$route.params.task);
  },
  methods: {
    ...mapActions(["fetchPeople", "fetchTask"]),
  },
  computed: {
    ...mapGetters(["getPeople", "getTask"]),
  },
  watch: {
    $route: ["fetchTask"],
  },
};
</script>
