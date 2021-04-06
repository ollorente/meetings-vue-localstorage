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
            <h2 class="main__body__section__person__subtitle">
              {{ getMeeting.name }}
            </h2>
            <form @submit.prevent="putMeeting">
              <div>
                <input
                  type="text"
                  v-model="getMeeting.name"
                  id="name"
                  placeholder="Nombre de proyecto"
                  autofocus
                  required
                />
              </div>
              <div>
                <textarea
                  v-model="getMeeting.description"
                  id="description"
                  rows="5"
                  placeholder="Agregue una descripción"
                  required
                ></textarea>
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="getMeeting.dateInt"
                  id="dateInt"
                  required
                />
              </div>
              <div>
                <input
                  type="datetime-local"
                  v-model="getMeeting.dateEnd"
                  id="dateEnd"
                  required
                />
              </div>
              <div>
                <MeetingCollaborators :project="getMeeting.project" required />
              </div>
              <div>
                <label for="isActive" class="form-label" @click="isActive"
                  ><i
                    :class="getMeeting.isActive ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                  Activa</label
                >
              </div>
              <button type="submit" class="btn-secondary">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <pre class="container" hiddens>{{ $data }}</pre>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import MeetingCollaborators from "@/components/MeetingCollaborators";
import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "EditMeeting",
  components: {
    MeetingCollaborators,
    TheSectionNavbar,
  },
  data() {
    return {
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
      dateInt: this.getMeeting.dateInt,
      dateEnd: this.getMeeting.dateEnd,
      isActive: this.getMeeting.isActive,
      isLock: this.getMeeting.isLock,
      createdAt: this.getMeeting.createdAt,
      updatedAt: this.getMeeting.updatedAt,
    };
  },
  created() {
    this.fetchMeeting(this.$route.params.meeting);
  },
  methods: {
    ...mapActions(["fetchMeeting", "updateMeeting"]),
    async putMeeting() {
      if (
        this.meeting.name.trim() === "" ||
        this.meeting.description.trim() === "" ||
        this.meeting.collaborators === "" ||
        this.meeting.dateInt === "" ||
        this.meeting.dateEnd == ""
      ) {
        this.alert.error = true;
        this.alert.msg = `Los campos no pueden estar vacios.`;

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
    async isActive() {
      this.meeting.isActive = !this.meeting.isActive;
    },
    async removeMeeting() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deleteMeeting(this.$route.params.meeting);

        await this.$router.replace({ name: "Meetings" });
      }
    },
  },
  computed: {
    ...mapGetters(["getMeeting"]),
  },
  watch: {
    $route: ["fetchMeeting"],
  },
};
</script>
