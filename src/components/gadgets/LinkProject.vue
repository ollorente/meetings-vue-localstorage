<template>
  <router-link :to="{ name: 'Project', params: { project: projectId } }">{{ getProject.name }}</router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LinkProject',
  props: {
    projectId: Number
  },
  created () {
    this.fetchProject(this.$props.projectId)
  },
  methods: {
    ...mapActions(['fetchProject'])
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>