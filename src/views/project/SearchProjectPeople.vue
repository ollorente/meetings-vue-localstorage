<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
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
          <User v-for='person in people' :key='person._id' :person='person' />
          <div class="my-3" v-if="show">No hay resultados</div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { db } from '@/main'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'SearchProjectPeople',
  components: {
    TheNavbar,
    User
  },
  data () {
    return {
      path: {
        title: 'Buscar contacto proyecto',
        link: { name: 'ProjectPeople', params: { project: this.$route.params.project } },
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
      page: 1,
      q: ''
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProject']),
    async search () {
      const res = await fetch(
        `${db}/projects/${this.$route.params.project}/all-people`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        }
      )

      const peopleData = await res.json()

      const people = peopleData.data
      const texto = this.q.toLowerCase()

      this.people = []

      for (let person of people) {
        let data = person.name.toLowerCase()

        if (data.indexOf(texto) !== -1) {
          this.people = this.people
            .concat(person)
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
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>