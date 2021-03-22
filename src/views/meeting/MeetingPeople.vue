<template>
  <div class="people">
    <h1 style="margin: 0">
      {{ total }}
      {{ total === 1 ? "Persona en la reunión" : "Personas en la reunión" }}
    </h1>
    <p>
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <p v-for="(person, index) in meetingPeople" :key="index" class="parrafo">
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
import { db } from "@/main";

export default {
  name: "MeetingPeople",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      meetingPeople: [],
      people: [],
    };
  },
  created() {
    this.getPeople();
    this.getMeetingPeople();
    this.getTotalMeetingPeople();
  },
  methods: {
    async getMeetingPeople() {
      const data = await db.meetings[this.$route.params.meeting];

      const info = await data.collaborators.map((e) => {
        const person = db.people[e];

        return {
          id: person.id,
          name: person.name,
          email: person.email,
          isActive: person.isActive,
        };
      });

      if (data === undefined) {
        this.$router.replace({ name: "Error" });
      } else {
        this.meetingPeople = await info;
      }
    },
    async getPeople() {
      const limit = this.limit;
      const page = (this.page - 1) * this.limit || 0;

      const data = Object.values(db.people)
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
            email: e.email,
            photoURL: e.photoURL,
            isActive: e.isActive,
          };
        });

      this.people = data;
    },
    async getTotalMeetingPeople() {
      this.total = await db.meetings[this.$route.params.meeting].collaborators
        .length;
    },
  },
  watch: {
    $route: ["getMeetingPeople", "getPeople", "getTotalMeetingPeople"],
  },
};
</script>

<style scoped></style>
