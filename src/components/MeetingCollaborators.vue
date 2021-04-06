<template>
  <select multiple>
    <option
      v-for="person in getAllProjectPeople"
      :key="person.id"
      :value="person.id"
    >
      {{ person.name }} - {{ person.email }}
    </option>
  </select>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MeetingCollaborators",
  props: {
    project: Number,
  },
  created() {
    this.fetchAllProjectPeople(this.$props.project);
  },
  methods: {
    ...mapActions(["fetchAllProjectPeople"]),
  },
  computed: {
    ...mapGetters(["getAllProjectPeople"]),
  },
  watch: {
    $route: ["fetchAllProjectPeople"],
  },
};
</script>
