<template>
  <main class="main">
    <Alert :msg="alert.msg" v-if="alert.error" />
    <TheSectionNavbar
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
            <h1 class="main__body__section__nav--title">Agregar proyecto</h1>
            <form @submit.prevent="newProject">
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
              <button type="submit" class="btn-p-light">Agregar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Alert from "@/components/Alert";
import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "NewProject",
  components: {
    Alert,
    TheSectionNavbar,
  },
  data() {
    return {
      project: {
        name: "",
        description: "",
        collaborators: [],
      },
      alert: {
        error: false,
        msg: null,
      },
      titleApp: "Agregar proyecto",
      icon: "fas fa-arrow-left",
      link: `/proyectos`,
      options: [],
    };
  },
  created() {
    this.fetchAllPeople();
  },
  methods: {
    ...mapActions(["addProject", "fetchAllPeople"]),
    async newProject() {
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
          name: await this.project.name,
          description: await this.project.description,
          collaborators: await this.project.collaborators,
        };

        await this.addProject(project);

        this.project.name = "";
        this.project.description = "";
        this.project.collaborators = "";

        await this.$router.replace({ name: "Projects" });
      }
    },
  },
  computed: {
    ...mapGetters(["getAllPeople"]),
  },
  watch: {
    $route: ["fetchAllPeople"],
  },
};
</script>
