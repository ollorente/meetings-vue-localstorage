<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getMeeting.name }}</h1>
        <User v-for='person in getMeetingPeople' :key='person.id' :person='person' />
        <div class='card-alert' v-if='getMeetingPeople.length < 1'>
          No hay usuarios 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'MeetingPeople',
  components: {
    TheNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Usuarios reunión',
        link: { name: 'Meeting', params: { meeting: this.$route.params.meeting } },
        icon: 'fas fa-arrow-left',
        status: false,
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
    this.fetchMeeting(this.$route.params.meeting)
    this.fetchMeetingPeople({
      id: this.$route.params.meeting,
      limit: parseInt(this.limit),
      page: parseInt(this.page)
    })
  },
  methods: {
    ...mapActions(['fetchMeetingPeople', 'fetchMeeting'])
  },
  computed: {
    ...mapGetters(['getMeetingPeople', 'getMeeting'])
  },
  watch: {
    $route: ['fetchMeetingPeople', 'fetchMeeting']
  }
}
</script>