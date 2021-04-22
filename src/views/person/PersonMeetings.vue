<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getPerson.name }}</h1>
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
  name: 'PersonPeopleMeetings',
  components: {
    TheNavbar,
    InfiniteLoading,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Encuentros usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: {
          name: 'SearchPersonMeetings',
          params: { person: this.$route.params.person }
        }
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
    ...mapActions(['fetchPerson']),
    async infiniteHandler ($state) {
      this.page++

      const res = await fetch(
        `${db}/people/${this.$route.params.person}/meetings?limit=${this.limit}&page=${this.page}`,
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
    ...mapGetters(['getPerson'])
  },
  watch: {
    $route: ['fetchPerson']
  }
}
</script>