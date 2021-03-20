<template>
  <div class="people">
    <h1>{{ total }} {{ total === 1 ? "Persona" : "Personas" }}</h1>
    <p>
      <router-link :to="{ name: 'NewPerson' }" class="link"
        >Agregar</router-link
      >
    </p>
    <p v-for="(person, index) in people" :key="index" class="parrafo">
      <span class="parrafo__info">
        <span class="parrafo__info__number">{{ index + 1 }}</span>
        <span class="parrafo__info__name"
          ><img
            :src="
              person.photoURL
                ? person.photoURL
                : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
            "
            :alt="person.name"
            style="
              width: 2rem;
              height: 2rem;
              margin-right: 0.5rem;
              object-fit: cover;
              position: center center;
              border: solid 1px #ccc;
              border-radius: 50%;
            "
          /><router-link
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
  name: "People",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      total: 0,
      people: [],
    };
  },
  created() {
    this.getPeople();
    this.getTotalPeople();
  },
  methods: {
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
    async getTotalPeople() {
      this.total = Object.values(db.people).length;
    },
  },
  watch: {
    $route: ["getPeople", "getTotalPeople"],
  },
};
</script>

<style scoped></style>
