<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getMeeting.name }}</h1>
          <User v-for='person in people' :key='person._id' :person='person' />
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
        title: 'Contactos encuentro',
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
    ...mapActions(['fetchMeeting']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${db}/meetings/${this.$route.params.meeting}/people?limit=${this.limit}&page=${this.page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      let people = await res.json()

      if (people.data.length) {
        this.people = this.people.concat(people.data)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getMeeting'])
  },
  watch: {
    $route: ['fetchMeeting']
  }
}
</script>