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
            <h1 class="main__body__section__person__title">
              {{ getProject.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <router-link
              v-for="(person, index) in getProjectPeople"
              :key="index"
              :to="{ name: 'Person', params: { person: person.id } }"
              class="main__body__section__user"
            >
              <img
                :src="
                  person.photoURL
                    ? person.photoURL
                    : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
                "
                :alt="person.name"
                :title="person.email"
                class="main__body__section__user__logo"
              />
              <div class="main__body__section__user__body">
                <span class="main__body__section__user__title">{{
                  person.name
                }}</span>
                <span class="main__body__section__user__content">{{
                  person.email
                }}</span>
              </div>
            </router-link>
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
  name: "ProjectPeople",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Usuarios del proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyecto/${this.$route.params.project}/editar`,
      options: [],
    };
  },
  created() {
    this.fetchProject(this.$route.params.project);
    this.fetchProjectPeople({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page,
    });
    this.fetchAllProjectPeople();
  },
  methods: {
    ...mapActions([
      "fetchProjectPeople",
      "fetchAllProjectPeople",
      "fetchProject",
    ]),
  },
  computed: {
    ...mapGetters(["getProjectPeople", "getAllProjectPeople", "getProject"]),
  },
  watch: {
    $route: ["fetchProjectPeople", "fetchAllProjectPeople", "fetchProject"],
  },
};
</script>

<style scoped></style>
