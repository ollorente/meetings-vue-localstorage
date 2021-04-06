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
              {{ getMeeting.name }}
            </h1>
            <h3 class="main__body__section__person__subtitle"></h3>
            <router-link
              v-for="(person, index) in getMeetingPeople"
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
  name: "MeetingPeople",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Usuarios de la reunión",
      icon: "fas fa-arrow-left",
      link: `/reunion/${this.$route.params.meeting}`,
      options: [
        {
          menus: [
            {
              title: "Agregar usuario",
              link: `/reunion/${this.$route.params.meeting}/usuario/nuevo`,
              icon: "fas fa-user-plus",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.fetchAllMeetingPeople(this.$route.params.meeting);
    this.fetchMeeting(this.$route.params.meeting);
    this.fetchMeetingPeople({
      id: this.$route.params.meeting,
      limit: this.limt,
      page: this.page,
    });
  },
  methods: {
    ...mapActions([
      "fetchAllMeetingPeople",
      "fetchMeeting",
      "fetchMeetingPeople",
    ]),
  },
  computed: {
    ...mapGetters(["getMeetingPeople", "getMeeting", "getAllMeetingPeople"]),
  },
  watch: {
    $route: ["fetchMeetingPeople", "fetchMeeting", "fetchAllMeetingPeople"],
  },
};
</script>

<style scoped></style>
