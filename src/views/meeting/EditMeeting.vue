<template>
  <div class="edit-meeting">
    <h1 style="margin: 0">Editar reunión</h1>
    <h2 style="margin: 0">{{ meeting.name }}</h2>
    <!-- <h3 style="margin: 0">{{ project.name }}</h3> -->
    <p>
      <a href="#" @click="removeMeeting" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Meeting', params: { meeting: $route.params.meeting } }"
        class="link"
        >Volver</router-link
      >
    </p>
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
        <textarea v-model="meeting.description" id="description" rows="10">
          Agregue una descripción</textarea
        >
      </div>
      <div>
        <input type="datetime-local" v-model="meeting.dateInt" id="dateInt" />
      </div>
      <div>
        <input type="datetime-local" v-model="meeting.dateEnd" id="dateEnd" />
      </div>
      <div>
        <select multiple v-model="meeting.collaborators" id="collaborators">
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
          ><input type="checkbox" v-model="meeting.isActive" /> Estatus</label
        >
      </div>
      <button type="submit">Actualizar</button>
    </form>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
    <pre class="container" hidden style="text-align: left">{{
      getMeeting
    }}</pre>
    <pre class="container" hidden style="text-align: left">{{
      getAllMeetingPeople
    }}</pre>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditMeeting",
  components: {},
  data() {
    return {
      meeting: "",
      today: new Date(Date.now()).toISOString().substr(0, 16),
      alert: {
        error: false,
        msg: null,
      },
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
