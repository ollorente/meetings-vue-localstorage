<template>
  <main class="main">
    <TheSectionNavbar
      :titleApp="titleApp"
      :icon="icon"
      :link="link"
      :options="options"
    />
    <div class="main__body">
      <div class="main__body__content">
        <div class="main__body__section">
          <p class="main__body__section__person__avatar">
            <img
              :src="
                getPerson.photoURL
                  ? getPerson.photoURL
                  : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
              "
              :alt="getPerson.name"
              class="main__body__section__person__avatar--img"
            />
          </p>
          <h1 class="main__body__section__person__title">
            {{ getPerson.name }}
          </h1>
          <h3 class="main__body__section__person__subtitle">
            {{ getPerson.role }}
          </h3>
          <p class="main__body__section__person__block">
            <span class="main__body__section__person__block__label">Email:</span
            ><br />
            <span class="main__body__section__person__block__content">{{
              getPerson.email
            }}</span>
          </p>
          <p class="main__body__section__person__block">
            <span class="main__body__section__person__block__label">ID:</span
            ><br />
            <span class="main__body__section__person__block__content">{{
              getPerson.id
            }}</span>
          </p>
          <p class="main__body__section__person__block">
            <span class="main__body__section__person__block__label"
              >Creado:</span
            ><br />
            <span class="main__body__section__person__block__content">{{
              new Date(getPerson.createdAt).toLocaleDateString()
            }}</span>
          </p>
          <p
            v-if="getPerson.createdAt !== getPerson.updatedAt"
            class="main__body__section__person__block"
          >
            <span class="main__body__section__person__block__label"
              >Actualizado:</span
            ><br />
            <span class="main__body__section__person__block__content">{{
              new Date(getPerson.updatedAt).toLocaleDateString()
            }}</span>
          </p>
          <p class="main__body__section__person__block">
            <span class="main__body__section__person__block__content"
              ><i
                :class="getPerson.isActive ? 'fas' : 'far'"
                class="fa-circle"
              ></i>
              {{ getPerson.isActive ? "Activo" : "Inactivo" }}</span
            ><br />
            <span class="main__body__section__person__block__content"
              ><i
                :class="getPerson.isLock ? '´far' : 'fas'"
                class="fa-circle"
              ></i>
              {{ getPerson.isLock ? "Oculto" : "Público" }}</span
            >
          </p>
          <p class="main__body__section__person__block"></p>
          <form class="main__body__section__person__block">
            <button @click="removePerson" class="btn-outline-s-dark">
              Eliminar
            </button>
          </form>
        </div>
      </div>
    </div>
    <pre class="container" hidden>{{ $data }}</pre>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "Person",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      person: "",
      titleApp: "Usuario",
      icon: "fas fa-arrow-left",
      link: `/usuarios`,
      options: [
        {
          menus: [
            {
              title: "Editar",
              link: `/usuario/${this.$route.params.person}/editar`,
              icon: "fas fa-user-edit",
            },
            {
              title: "Proyectos",
              link: `/usuario/${this.$route.params.person}/proyectos`,
              icon: "fas fa-user-tie",
            },
            {
              title: "Reuniones",
              link: `/usuario/${this.$route.params.person}/reuniones`,
              icon: "fas fa-handshake",
            },
            {
              title: "Tareas",
              link: `/usuario/${this.$route.params.person}/tareas`,
              icon: "fas fa-tasks",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
  },
  methods: {
    ...mapActions(["deletePerson", "fetchPerson"]),
    async removePerson() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deletePerson(this.$route.params.person);

        await this.$router.replace({ name: "People" });
      }
    },
  },
  computed: {
    ...mapGetters(["getPerson"]),
  },
  watch: {
    $route: ["fetchPerson"],
  },
};
</script>
