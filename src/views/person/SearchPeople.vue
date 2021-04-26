<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="bounce">
        <section class="section">
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input
                type="text"
                class="navbar__search--input mb-3"
                placeholder="Buscar contacto..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <User v-for="person in people" :key="person._id" :person="person" />
          <div class="my-3" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { DB } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'SearchPeople',
  components: {
    TheNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Buscar contacto',
        link: { name: 'People' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ],
      show: true,
      people: [],
      limit: 10,
      page: 0,
      q: ''
    }
  },
  created () {
    this.fetchAllPeople()
  },
  methods: {
    ...mapActions(['fetchAllPeople']),
    async search () {
      const res = await fetch(`${DB}/users/all-people`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })

      const peopleData = await res.json()

      const people = await peopleData.data
      const texto = this.q.toLowerCase()

      this.people = []

      for (let person of people) {
        let data = await person.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.people = this.people
            .concat(person)
            .filter((e) => e.isLock === false)
            .filter((e) => e.isActive === true)
            .sort(function (a, b) {
              if (a.name > b.name) {
                return 1
              }
              if (a.name < b.name) {
                return -1
              }
              return 0
            })
        }

        if (this.people.length === 0) {
          this.show = true
        } else {
          this.show = false
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPeople'])
  },
  watch: {
    $route: ['fetchAllPeople']
  }
}
</script>