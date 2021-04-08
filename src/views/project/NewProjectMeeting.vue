<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getProject.name }}</h1>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'NewProjectMeeting',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Crear reunión',
        link: {
          name: 'ProjectMeetings',
          params: { project: this.$route.params.project }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ]
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
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