<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
          <User v-for='person in people' :key='person.id' :person='person' />
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
import User from '@/components/gadgets/User'

export default {
  name: 'MeetingPeople',
  components: {
    TheNavbar,
    User,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Usuarios encuentro',
        link: { name: 'Meeting', params: { meeting: this.$route.params.meeting } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: { name: 'SearchMeetingPeople', params: { meeting: this.$route.params.meeting } }
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