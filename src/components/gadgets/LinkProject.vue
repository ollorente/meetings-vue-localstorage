<template>
  <router-link :to="{ name: 'Project', params: { project: project.id } }">{{ project.name }}</router-link>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'LinkProject',
  props: {
    projectId: Number
  },
  data () {
    return {
      project: ''
    }
  },
  created () {
    this.getProject(this.$props.projectId)
  },
  methods: {
    async getProject (id) {
      try {
        this.project = await db.projects[id]
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  },
  watch: {
    $route: ['getProject']
  }
}
</script>