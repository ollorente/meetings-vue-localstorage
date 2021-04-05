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
            <h1 class="main__body__section__nav--title">Editar reunión</h1>
            <h2 class="main__body__section__nav--subtitle">
              {{ meeting.name }}
            </h2>
            <form @submit.prevent="putMeeting">
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
                  rows="10"
                  placeholder="Agregue una descripción"
                ></textarea>
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="meeting.dateInt"
                  id="dateInt"
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="meeting.dateEnd"
                  id="dateEnd"
                />
              </div>
              <div>
                <select
                  multiple
                  v-model="meeting.collaborators"
                  id="collaborators"
                >
                  <option
                    v-for="person in getAllMeetingPeople"
                    :key="person.id"
                    :value="person.id"
                  >
                    {{ person.name }} - {{ person.email }}
                  </option>
                </select>
              </div>
              <div>
                <label
                  ><input type="checkbox" v-model="meeting.isActive" />
                  Estatus</label
                >
              </div>
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
  name: "EditMeeting",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      meeting: "",
      today: new Date(Date.now()).toISOString().substr(0, 16),
      alert: {
        error: false,
        msg: null,
      },
      titleApp: "Editar reunión",
      icon: "fas fa-arrow-left",
      link: `/reunion/${this.$route.params.meeting}`,
      options: [],
    };
  },
  mounted() {
    this.meeting = {
      id: this.getMeeting.id,
      name: this.getMeeting.name,
      description: this.getMeeting.description,
      collaborators: this.getMeeting.collaborators,
      project: this.getMeeting.project,
      dateInt: new Date(this.getMeeting.dateInt - 18000000)
        .toISOString()
        .substr(0, 16),
      dateEnd: new Date(this.getMeeting.dateEnd - 18000000)
        .toISOString()
        .substr(0, 16),
      isActive: this.getMeeting.isActive,
      isLock: this.getMeeting.isLock,
      createdAt: this.getMeeting.createdAt,
      updatedAt: this.getMeeting.updatedAt,
    };
  },
  created() {
    this.fetchMeeting(this.$route.params.meeting);
    this.fetchAllMeetingPeople(this.$route.params.meeting);
  },
  methods: {
    ...mapActions([
      "deleteMeeting",
      "fetchAllMeetingPeople",
      "fetchMeeting",
      "updateMeeting",
    ]),
    async putMeeting() {
      if (
        this.meeting.name.trim() === "" ||
        this.meeting.description.trim() === "" ||
        this.meeting.collaborators === "" ||
        this.meeting.dateInt === null ||
        this.meeting.dateEnd == null
      ) {
        this.alert.error = true;
        this.alert.msg = `Ni el nombre ni la descripción pueden estar vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const meeting = {
          id: await this.meeting.id,
          name: await this.meeting.name,
          description: await this.meeting.description,
          collaborators: await this.meeting.collaborators,
          project: await this.meeting.project,
          dateInt: await this.meeting.dateInt,
          dateEnd: await this.meeting.dateEnd,
          isActive: await this.meeting.isActive,
          isLock: await this.meeting.isLock,
          createdAt: await this.meeting.createdAt,
        };

        await this.updateMeeting(meeting);

        this.meeting.name = "";
        this.meeting.description = "";
        this.meeting.collaborators = "";
        this.meeting.dateInt = "";
        this.meeting.dateEnd = "";

        await this.$router.replace({
          name: "Meeting",
          params: { meeting: this.$route.params.meeting },
        });
      }
    },
    async removeMeeting() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deleteMeeting(this.$route.params.meeting);

        await this.$router.replace({ name: "Meetings" });
      }
    },
  },
  computed: {
    ...mapGetters(["getMeeting", "getAllMeetingPeople"]),
  },
  watch: {
    $route: ["fetchMeeting", "fetchAllMeetingPeople"],
  },
};
</script>
