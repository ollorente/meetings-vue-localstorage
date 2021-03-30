<template>
  <div class="project-projects">
    <h1 style="margin: 0">
      {{ getAllPersonMeetings.length }}
      {{
        getAllPersonMeetings.length === 1
          ? "Reunión del usuario"
          : "Reuniones del usuario"
      }}
    </h1>
    <h2 style="margin: 0">{{ getPerson.name }}</h2>
    <h4 style="margin: 0">{{ getPerson.email }}</h4>
    <p>
      <router-link
        :to="{ name: 'Person', params: { project: $route.params.person } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p
      v-for="(meeting, index) in getPersonMeetings"
      :key="index"
      class="parrafo"
    >
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Meeting', params: { meeting: meeting.id } }"
            class="link"
            >{{ meeting.name }}</router-link
          ></span
        ></span
      >
      <span>{{ new Date(meeting.dateInt).toLocaleString() }}</span>
      <span>{{ new Date(meeting.dateEnd).toLocaleString() }}</span>
      <span class="parrafo__status">{{
        meeting.isActive ? "Activo" : "Inactivo"
      }}</span>
      <span class="parrafo__status">{{
        meeting.isLock ? "Bloqueado" : "Pùblico"
      }}</span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PersonMeetings",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
    this.fetchPersonMeetings({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllPersonMeetings({ id: this.$route.params.person });
  },
  methods: {
    ...mapActions([
      "fetchPerson",
      "fetchPersonMeetings",
      "fetchAllPersonMeetings",
    ]),
  },
  computed: {
    ...mapGetters(["getPerson", "getPersonMeetings", "getAllPersonMeetings"]),
  },
  watch: {
    $route: ["fetchPerson", "fetchPersonMeetings", "fetchAllPersonMeetings"],
  },
};
</script>

<style scoped></style>
