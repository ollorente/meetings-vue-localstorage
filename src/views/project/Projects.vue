<template>
  <main class="main">
    <TheNavbar
      :titleApp="titleApp"
      :icon="icon"
      :link="link"
      :options="options"
    />
    <div class="main__body">
      <TheSecondNavbar />

      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <div
              v-for="(project, index) in getProjects"
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
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TheNavbar from "@/components/TheNavbar";
import TheSecondNavbar from "@/components/TheSecondNavbar";

export default {
  name: "Projects",
  components: {
    TheNavbar,
    TheSecondNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Proyectos",
      icon: "fas fa-user-tie",
      options: [
        {
          menus: [
            {
              title: "Agregar proyecto",
              link: "/proyecto/nuevo",
              icon: "fas fa-user-plus",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchProjects({ limit: this.limit, page: this.page });
    this.fetchAllProjects();
  },
  methods: {
    ...mapActions(["fetchProjects", "fetchAllProjects"]),
  },
  computed: {
    ...mapGetters(["getProjects", "getAllProjects"]),
  },
  watch: {
    $route: ["fetchProjects", "fetchAllProjects"],
  },
};
</script>

<style scoped></style>
