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
          <Project v-for='project in projects' :key='project.id' :project='project' />
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Project from '@/components/gadgets/Project'

export default {
  name: 'SearchPersonProjects',
  components: {
    TheNavbar,
    Project
  },
  data () {
    return {
      path: {
        title: 'Buscar proyectos usuario',
        link: { name: 'PersonProjects', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ],
      projects: [],
      limit: 10,
      page: 0
    }
  },
  created () {
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPeopleProjects', 'fetchPerson']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchPeopleProjects({
        id: this.$route.params.person,
        limit: this.limit,
        page: this.page
      })

      let projects = await this.getPeopleProjects

      if (projects.length) {
        this.projects = this.projects.concat(projects)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getPeopleProjects', 'getPerson'])
  },
  watch: {
    $route: ['fetchPeopleProjects', 'fetchPerson']
  }
}
</script>