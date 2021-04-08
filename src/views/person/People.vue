<template>
  <div class='content'>
    <TheNavbar :path='path' :options='options' />
    <main>
      <TheSecondNavbar />

      <section class='section'>
        <User v-for='person in getPeople' :key='person.id' :person='person' />
        <div class='card-alert' v-if='getPeople.length < 1'>
          No hay usuarios 😒
        </div>
      </section>
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