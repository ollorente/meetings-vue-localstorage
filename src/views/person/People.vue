<template>
  <main class="main">
    <TheNavbar :titleApp="titleApp" :icon="icon" />
    <div class="main__body">
      <TheSecondNavbar />

      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <router-link
              v-for="(person, index) in getPeople"
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

import TheNavbar from "@/components/TheNavbar";
import TheSecondNavbar from "@/components/TheSecondNavbar";

export default {
  name: "People",
  components: {
    TheNavbar,
    TheSecondNavbar,
  },
  data() {
    return {
      limit: parseInt(this.limit || 20),
      page: parseInt(this.page) > 0 ? parseInt(this.page || 1) : 1,
      titleApp: "Usuarios",
      icon: "fas fa-users",
    };
  },
  created() {
    this.fetchPeople({ data: { limit: this.limit, page: this.page } });
    this.fetchAllPeople();
  },
  methods: {
    ...mapActions(["fetchAllPeople", "fetchPeople"]),
  },
  computed: {
    ...mapGetters(["getAllPeople", "getPeople"]),
  },
  watch: {
    $route: ["fetchAllPeople", "fetchPeople"],
  },
};
</script>

<style scoped></style>
