<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getPerson.name }}</h1>
        <Meeting v-for='meeting in getPeopleMeetings' :key='meeting.id' :meeting='meeting' />
        <div class='card-alert' v-if='getPeopleMeetings.length < 1'>
          No hay reuniones 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Meeting from '@/components/gadgets/Meeting'

export default {
  name: 'PersonPeopleMeetings',
  components: {
    TheNavbar,
    Meeting
  },
  data () {
    return {
      path: {
        title: 'Reuniones usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
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
    this.fetchPerson(this.$route.params.person)
    this.fetchPeopleMeetings({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchPeopleMeetings', 'fetchPerson'])
  },
  computed: {
    ...mapGetters(['getPeopleMeetings', 'getPerson'])
  },
  watch: {
    $route: ['fetchPeopleMeetings', 'fetchPerson']
  }
}
</script>