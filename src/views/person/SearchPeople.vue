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
                placeholder="Buscar..."
                v-model="q"
                @keyup="search"
                autofocus
              />
            </form>
          </div>
          <User v-for="person in people" :key="person.id" :person="person" />
          <div class="card" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { db } from '@/main'

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
        title: 'Buscar usuario',
        link: { name: 'People' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
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
      page: 0,
      show: true,
      q: ''
    }
  },
  methods: {
    async search () {
      const people = Object.values(db.people)
      const texto = this.q.toLowerCase()

      this.people = []

      for (let person of people) {
        let data = person.name.toLowerCase()

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

        if (people === '') {
          this.show = !this.show
        } else {
          this.show = !this.show
        }
      }
    }
  }
}
</script>