<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <Meeting v-for='meeting in meetings' :key='meeting.id' :meeting='meeting' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'ProjectMeetings',
  components: {
    TheNavbar,
    Meeting,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Encuentros proyecto',
        link: {
          name: 'Project',
          params: { project: this.$route.params.project }
        },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: {
          name: 'SearchProjectMeetings',
          params: { project: this.$route.params.project }
        }
      },
      options: [
        {
          menus: [
            {
              title: 'Crear encuentro',
              link: { name: 'NewProjectMeeting' },
              icon: 'fas - fa-handshake',
              status: false
            }
          ]
        }
      ],
      meetings: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProjectMeetings', 'fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchProjectMeetings({
        id: this.$route.params.project,
        limit: this.limit,
        page: this.page
      })

      let meetings = await this.getProjectMeetings

      if (meetings.length) {
        this.meetings = this.meetings.concat(meetings)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProjectMeetings', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectMeetings', 'fetchProject']
  }
}
</script>