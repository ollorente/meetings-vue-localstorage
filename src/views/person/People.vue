<template>
  <div class="people">
    <h1 style="margin: 0">
      {{ getAllPeople.length }}
      {{ getAllPeople.length === 1 ? "Persona" : "Personas" }}
    </h1>
    <p>
      <router-link :to="{ name: 'NewPerson' }" class="link"
        >Agregar</router-link
      >
    </p>
    <p v-for="(person, index) in getPeople" :key="index" class="parrafo">
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "People",
  components: {},
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
    };
  },
  created() {
    this.fetchPeople({ data: { limit: this.limit, page: this.page } });
    this.fetchAllPeople();
  },
  methods: {
    ...mapActions(["fetchAllPeople", "fetchPeople"]),
  },
  computed: {
    ...mapGetters(["getAllPeople", "getPeople"]),
  },
  watch: {
    $route: ["fetchAllPeople", "fetchPeople"],
  },
};
</script>

<style scoped></style>
