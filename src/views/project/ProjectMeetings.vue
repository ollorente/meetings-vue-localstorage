<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getProject.name }}</h1>
        <Meeting v-for='meeting in getProjectMeetings' :key='meeting.id' :meeting='meeting' />
        <div class='card-alert' v-if='getProjectMeetings.length < 1'>
          No hay reuniones 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'ProjectMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Reuniones proyecto',
        link: {
          name: 'Project',
          params: { project: this.$route.params.project }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Crear reunión',
              link: { name: 'NewProjectMeeting' },
              icon: 'fas - fa-handshake',
              status: false
            }
          ]
        }
      ],
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
    this.fetchProjectMeetings({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchProjectMeetings', 'fetchProject'])
  },
  computed: {
    ...mapGetters(['getProjectMeetings', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectMeetings', 'fetchProject']
  }
}
</script>