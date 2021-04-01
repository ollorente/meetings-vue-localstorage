<template>
  <div class="meeting">
    <h1 style="margin: 0">Reunión</h1>
    <p>
      <router-link
        :to="{
          name: 'MeetingTasks',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Tareas</router-link
      >
      |
      <router-link
        :to="{
          name: 'MeetingPeople',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Usuarios</router-link
      >
      |
      <router-link
        :to="{
          name: 'EditMeeting',
          params: { meeting: $route.params.meeting },
        }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'Meetings' }" class="link">Volver</router-link>
    </p>
    <h2 style="margin: 0 1rem; text-align: left">{{ getMeeting.name }}</h2>
    <div v-html="getMeeting.description"></div>
    <p>
      <span class="parrafo__status" style="display: flex">
        <span style="padding: 0 0.5rem; font-size: 2rem; font-weight: 600">{{
          new Date(getMeeting.dateInt).toString().split(" ")[2]
        }}</span>
        <span
          >{{ new Date(getMeeting.dateInt).toString().split(" ")[4] }}<br />{{
            new Date(getMeeting.dateEnd).toString().split(" ")[4]
          }}</span
        >
      </span>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ getMeeting.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(getMeeting.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="getMeeting.createdAt !== getMeeting.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(getMeeting.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Meeting",
  components: {},
  data() {
    return {};
  },
  created() {
    this.fetchMeeting(this.$route.params.meeting);
  },
  methods: {
    ...mapActions(["fetchMeeting"]),
  },
  computed: {
    ...mapGetters(["getMeeting"]),
  },
  watch: {
    $route: ["fetchMeeting"],
  },
};
</script>
