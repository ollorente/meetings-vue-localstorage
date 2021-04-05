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
              Editar<br />"{{ project.name }}"
            </h1>
            <form @submit.prevent="putProject">
              <div>
                <input
                  type="text"
                  v-model="project.name"
                  id="name"
                  placeholder="Nombre de proyecto"
                  autofocus
                  required
                />
              </div>
              <div>
                <textarea
                  v-model="project.description"
                  id="description"
                  rows="10"
                  placeholder="Agregue una descripción"
                ></textarea>
              </div>
              <div>
                <select
                  multiple
                  v-model="project.collaborators"
                  id="collaborators"
                >
                  <option
                    v-for="person in getAllPeople"
                    :key="person.id"
                    :value="person.id"
                  >
                    {{ person.name }} - {{ person.email }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  ><input type="checkbox" v-model="project.isActive" />
                  Estatus</label
                >
              </div>
              <button type="submit" class="btn-secondary">Editar</button>
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
  name: "EditProject",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      project: "",
      alert: {
        error: false,
        msg: null,
      },
      titleApp: "Editar proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyecto/${this.$route.params.project}`,
      options: [],
    };
  },
  mounted() {
    this.project = {
      id: this.getProject.id,
      name: this.getProject.name,
      description: this.getProject.description,
      collaborators: this.getProject.collaborators,
      isActive: this.getProject.isActive,
      isLock: this.getProject.isLock,
      createdAt: this.getProject.createdAt,
      updatedAt: this.getProject.updatedAt,
    };
  },
  created() {
    this.fetchAllPeople();
    this.fetchProject(this.$route.params.project);
  },
  methods: {
    ...mapActions([
      "fetchAllPeople",
      "fetchProject",
      "removeProject",
      "updateProject",
    ]),
    async putProject() {
      if (
        this.project.name.trim() === "" ||
        this.project.description.trim() === ""
      ) {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const project = {
          id: await this.project.id,
          name: await this.project.name,
          description: await this.project.description,
          collaborators: await this.project.collaborators,
          isActive: await this.project.isActive,
          isLock: await this.project.isLock,
          createdAt: await this.project.createdAt,
        };

        await this.updateProject(project);

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({
          name: "Project",
          params: { project: this.$route.params.project },
        });
      }
    },
    async deleteProject() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.removeProject(this.$route.params.project);

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPeople", "getProject"]),
  },
  watch: {
    $route: ["fetchAllPeople", "fetchProject"],
  },
};
</script>
