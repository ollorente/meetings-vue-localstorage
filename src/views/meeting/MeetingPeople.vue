<template>
  <div class="people">
    <h1 style="margin: 0">
      {{ getAllMeetingPeople.length }}
      {{
        getAllMeetingPeople.length === 1
          ? "Persona en la reunión"
          : "Personas en la reunión"
      }}
    </h1>
    <h2 style="margin: 0">{{ getMeeting.name }}</h2>
    <p>
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(person, index) in getMeetingPeople" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><router-link
            :to="{ name: 'Person', params: { person: person.id } }"
            :title="person.email"
            class="link"
            >{{ person.name }}</router-link
          ></span
        ></span
      >
      <span class="parrafo__status">{{
        person.isActive ? "Activo" : "Inactivo"
      }}</span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeetingPeople",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchAllMeetingPeople(this.$route.params.meeting);
    this.fetchMeeting(this.$route.params.meeting);
    this.fetchMeetingPeople({
      id: this.$route.params.meeting,
      limit: this.limt,
      page: this.page,
    });
  },
  methods: {
    ...mapActions([
      "fetchAllMeetingPeople",
      "fetchMeeting",
      "fetchMeetingPeople",
    ]),
  },
  computed: {
    ...mapGetters(["getMeetingPeople", "getMeeting", "getAllMeetingPeople"]),
  },
  watch: {
    $route: ["fetchMeetingPeople", "fetchMeeting", "fetchAllMeetingPeople"],
  },
};
</script>

<style scoped></style>
