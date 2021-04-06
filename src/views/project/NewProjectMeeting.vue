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
            <h1 class="main__body__section__nav--title">Nueva reunión</h1>
            <h3 class="main__body__section__person__subtitle">
              {{ getProject.name }}
            </h3>
            <form @submit.prevent="newMeeting">
              <div>
                <input
                  type="text"
                  v-model="meeting.name"
                  id="name"
                  placeholder="Nombre de proyecto"
                  autofocus
                  required
                />
              </div>
              <div>
                <textarea
                  v-model="meeting.description"
                  id="description"
                  rows="5"
                  placeholder="Agregue una descripción"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="meeting.dateInt"
                  id="dateInt"
                  name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01"
                  max="2018-12-31"
                  required
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="meeting.dateEnd"
                  id="dateEnd"
                  name="trip-start"
                  value="2018-07-22"
                  min="2018-01-01"
                  max="2018-12-31"
                  required
                />
              </div>
              <div>
                <select
                  multiple
                  v-model="meeting.collaborators"
                  id="collaborators"
                  required
                >
                  <option
                    v-for="person in getAllProjectPeople"
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

import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "NewProjectMeeting",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      meeting: {
        name: "",
        description: "",
        dateInt: "",
        dateEnd: "",
        collaborators: [],
      },
      alert: {
        error: true,
        msg: null,
      },
      titleApp: "Agregar reunión",
      icon: "fas fa-arrow-left",
      link: `/proyectos`,
      options: [],
    };
  },
  created() {
    this.fetchAllProjectPeople(this.$route.params.project);
    this.fetchProject(this.$route.params.project);
  },
  methods: {
    ...mapActions(["addMeeting", "fetchAllProjectPeople", "fetchProject"]),
    async newMeeting() {
      if (
        this.meeting.name.trim() === "" ||
        this.meeting.description.trim() === "" ||
        this.meeting.dateInt === "" ||
        this.meeting.dateEnd === "" ||
        this.meeting.collaborators === ""
      ) {
        this.alert.error = true;
        this.alert.msg = `Los campos no pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const meeting = {
          name: await this.meeting.name,
          description: await this.meeting.description,
          collaborators: await this.meeting.collaborators,
          project: this.$route.params.project,
          dateInt: await this.meeting.dateInt,
          dateEnd: await this.meeting.dateEnd,
        };

        await this.addMeeting(meeting);

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.dateInt = "";
        this.meeting.dateEnd = "";

        await this.$router.replace({
          name: "ProjectMeetings",
          params: { project: this.$route.params.project },
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getAllProjectPeople", "getProject"]),
  },
  watch: {
    $route: ["fetchAllProjectPeople", "fetchProject"],
  },
};
</script>
