<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
          <User v-for='person in people' :key='person.id' :person='person' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'SeacrhMeetingPeople',
  components: {
    TheNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Usuarios encuentro',
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
      people: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchMeeting(this.$route.params.meeting)
  },
  methods: {
    ...mapActions(['fetchMeetingPeople', 'fetchMeeting']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchMeetingPeople({
        id: this.$route.params.meeting,
        limit: parseInt(this.limit),
        page: parseInt(this.page)
      })

      let people = await this.getMeetingPeople

      if (people.length) {
        this.people = this.people.concat(people)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getMeetingPeople', 'getMeeting'])
  },
  watch: {
    $route: ['fetchMeetingPeople', 'fetchMeeting']
  }
}
</script>