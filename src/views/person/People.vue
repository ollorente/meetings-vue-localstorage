<template>
  <div class='content'>
    <TheNavbar :path='path' :options='options' />
    <main>
      <TheSecondNavbar />

      <transition name="bounce">
        <section class='section'>
          <User v-for='person in getPeople' :key='person._id' :person='person' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'People',
  components: {
    TheNavbar,
    TheSecondNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Usuarios',
        link: { name: 'Home' },
        icon: 'fas fa-users',
        status: true,
        search: true,
        linkSearch: { name: 'SearchPeople' }
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
      page: 1
    }
  },
  created () {
    this.fetchPeople({
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchPeople'])
  },
  computed: {
    ...mapGetters(['getPeople'])
  },
  watch: {
    $route: ['fetchPeople']
  }
}
</script>