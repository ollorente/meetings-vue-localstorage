<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <Meeting
            v-for="meeting in meetings"
            :key="meeting._id"
            :meeting="meeting"
          />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'
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
    ...mapActions(['fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${db}/projects/${this.$route.params.project}/meetings?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let meetings = await res.json()

      if (meetings.data.length) {
        this.meetings = this.meetings.concat(meetings.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>