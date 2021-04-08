<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <section class="section">
        <Meeting v-for='meeting in getMeetings' :key='meeting.id' :meeting='meeting' />
        <div class='card-alert' v-if='getMeetings.length < 1'>
          No hay reuniones 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'Meetings',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Reuniones',
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
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchMeetings({
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchMeetings'])
  },
  computed: {
    ...mapGetters(['getMeetings'])
  },
  watch: {
    $route: ['fetchMeetings']
  }
}
</script>