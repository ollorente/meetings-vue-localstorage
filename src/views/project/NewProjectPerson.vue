<template>
  <main class="main">
    <TheSectionNavbar :titleApp="titleApp" :icon="icon" :options="options" />
    <div class="main__body">
      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <h1 class="main__body__section__nav--title">
              {{ getProject.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <form @submit.prevent="upateProjectPeople">
              <select
                multiple
                v-model="project.collaborators"
                style="height: 20rem"
              >
                <option
                  v-for="person in getAllPeople"
                  :key="person.id"
                  :value="person.id"
                >
                  {{ person.name }} - {{ person.email }}
                </option>
              </select>
              <button type="submit" class="btn-secondary">Actualizar</button>
            </form>
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
  name: "NewProjectPerson",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      project: "",
      titleApp: "Agregar usuarios",
      icon: "fas fa-arrow-left",
      options: [],
    };
  },
  mounted() {
    this.project = this.getProject;
  },
  created() {
    this.fetchProject(this.$route.params.project);
    this.fetchAllPeople();
  },
  methods: {
    ...mapActions([
      "fetchProject",
      "fetchAllPeople",
      "updateProject",
      "updateProjectPeople",
    ]),
    async upateProjectPeople() {
      await this.updateProject(this.project);
      await this.updateProjectPeople(this.project);

      await this.$router.replace({
        name: "ProjectPeople",
        params: { project: this.$route.params.project },
      });
    },
  },
  computed: {
    ...mapGetters(["getProject", "getAllPeople"]),
  },
  watch: {
    $route: ["fetchProject", "fetchAllPeople"],
  },
};
</script>

<style scoped></style>
