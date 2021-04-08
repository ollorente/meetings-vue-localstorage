<template>
  <div class='content'>
    <TheNavbar :path='path' :options='options' />
    <main>
      <TheSecondNavbar />

      <section class='section'>
        <User v-for='person in people' :key='person.id' :person='person' />
        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'People',
  components: {
    TheNavbar,
    TheSecondNavbar,
    User,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Usuarios',
        link: { name: 'Home' },
        icon: 'fas fa-users',
        status: true,
        search: true
      },
      options: [
        {
          menus: [
            {
              title: 'Crear usuario',
              link: { name: 'NewPerson' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      people: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    ...mapActions(['fetchPeople']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchPeople({
        limit: this.limit,
        page: this.page
      })

      let people = await this.getPeople

      if (people.length) {
        this.people = this.people.concat(people)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getPeople'])
  },
  watch: {
    $route: ['fetchPeople']
  }
}
</script>