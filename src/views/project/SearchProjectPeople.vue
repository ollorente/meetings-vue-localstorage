<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <div class="navbar__search">
            <form @submit.prevent="search">
              <input type="text" class="navbar__search--input mb-3" placeholder="Buscar...">
            </form>
          </div>
          <User v-for='person in people' :key='person.id' :person='person' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
        title: 'Usuarios proyecto',
        link: { name: 'Project', params: { project: this.$route.params.project } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
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
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['fetchProjectPeople', 'fetchProject']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchProjectPeople({
        id: this.$route.params.project,
        limit: this.limit,
        page: this.page
      })

      let people = await this.getProjectPeople

      if (people.length) {
        this.people = this.people.concat(people)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProjectPeople', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectPeople', 'fetchProject']
  }
}
</script>