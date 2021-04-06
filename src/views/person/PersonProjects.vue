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
          <div class="main__body__section__nav">
            <h1 class="main__body__section__nav--title">
              {{ getPerson.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle">
              {{ getPerson.email }}
            </h3>
            <div
              v-for="(project, index) in getPersonProjects"
              :key="index"
              class="main__body__section__item"
            >
              <router-link
                :to="{ name: 'Project', params: { project: project.id } }"
                class="main__body__section__link"
              >
                <span class="main__body__section__link__text">
                  <i class="fas fa-chevron-circle-right"></i>
                  <span class="main__body__section__link__text__content">
                    <span class="text-title">{{ project.name }}</span>
                    <span class="text-content">Proyecto Uno...</span>
                  </span>
                </span>
                <span class="main__body__section__link__icon">
                  <i
                    :class="project.isActive ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                  <i
                    :class="project.isLock ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                </span>
              </router-link>
            </div>
            <div v-if="getPersonProjects.length < 1">
              No pertenece a ningún proyecto 😢
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "PersonProjects",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Proyectos",
      icon: "fas fa-arrow-left",
      link: `/usuario/${this.$route.params.person}`,
      options: [],
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
    this.fetchPersonProjects({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllPersonProjects({ id: this.$route.params.person });
  },
  methods: {
    ...mapActions([
      "fetchPerson",
      "fetchPersonProjects",
      "fetchAllPersonProjects",
    ]),
  },
  computed: {
    ...mapGetters(["getPerson", "getPersonProjects", "getAllPersonProjects"]),
  },
  watch: {
    $route: ["fetchPerson", "fetchPersonProjects", "fetchAllPersonProjects"],
  },
};
</script>

<style scoped></style>
