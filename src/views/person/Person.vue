<template>
  <div class="person">
    <h1 style="margin: 0">{{ getPerson.name }}</h1>
    <h3 style="margin: 0">{{ getPerson.role }}</h3>
    <p>
      <router-link
        :to="{ name: 'PersonTasks', params: { person: $route.params.person } }"
        class="link"
        >Tareas</router-link
      >
      |
      <router-link
        :to="{
          name: 'PersonMeetings',
          params: { person: $route.params.person },
        }"
        class="link"
        >Reuniones</router-link
      >
      |
      <router-link
        :to="{
          name: 'PersonProjects',
          params: { person: $route.params.person },
        }"
        class="link"
        >Proyectos</router-link
      >
      |
      <router-link
        :to="{ name: 'EditPerson', params: { person: getPerson.id } }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'People' }" class="link">Volver</router-link>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <img
        :src="
          getPerson.photoURL
            ? getPerson.photoURL
            : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
        "
        :alt="getPerson.name"
        style="
          width: 5rem;
          height: 5rem;
          object-fit: cover;
          position: center center;
          border: solid 1px #ccc;
          border-radius: 50%;
        "
      />
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>Email: </b><span>{{ getPerson.email }}</span
      ><br />
      <b>ID: </b><span>{{ getPerson.id }}</span>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ getPerson.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(getPerson.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="getPerson.createdAt !== getPerson.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(getPerson.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Person",
  components: {},
  data() {
    return {
      person: "",
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
  },
  methods: {
    ...mapActions(["fetchPerson"]),
  },
  computed: {
    ...mapGetters(["getPerson"]),
  },
  watch: {
    $route: ["fetchPerson"],
  },
};
</script>
