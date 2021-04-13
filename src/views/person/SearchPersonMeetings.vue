<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getPerson.name }}</h1>
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input type="text" class="navbar__search--input mb-3" placeholder="Buscar...">
            </form>
          </div>
          <Meeting v-for='meeting in meetings' :key='meeting.id' :meeting='meeting' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'SearchPersonMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Buscar encuentro usuario',
        link: { name: 'PersonMeetings', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
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
  created () {
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPeopleMeetings', 'fetchPerson']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchPeopleMeetings({
        id: this.$route.params.person,
        limit: this.limit,
        page: this.page
      })

      let meetings = await this.getPeopleMeetings

      if (meetings.length) {
        this.meetings = this.meetings.concat(meetings)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getPeopleMeetings', 'getPerson'])
  },
  watch: {
    $route: ['fetchPeopleMeetings', 'fetchPerson']
  }
}
</script>