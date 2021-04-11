<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section">
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
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'Meetings',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Meeting,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Encuentros',
        link: { name: 'Meetings' },
        icon: 'fas fa-handshake',
        status: true,
        search: true
      },
      options: [
        {
          menus: []
        }
      ],
      meetings: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    ...mapActions(['fetchMeetings']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchMeetings({
        limit: this.limit,
        page: this.page
      })

      let meetings = await this.getMeetings

      if (meetings.length) {
        this.meetings = this.meetings.concat(meetings)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getMeetings'])
  },
  watch: {
    $route: ['fetchMeetings']
  }
}
</script>