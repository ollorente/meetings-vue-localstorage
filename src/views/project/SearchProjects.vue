<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
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
  name: 'SearchProjects',
  components: {
    TheNavbar,
    Project
  },
  data () {
    return {
      path: {
        title: 'Proyectos',
        link: { name: 'Projects' },
        icon: 'fas fa-user-tie',
        status: true,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Crear proyecto',
              link: { name: 'NewProject' },
              icon: 'fas fa-user-tie',
              status: false
            }
          ]
        }
      ],
      projects: [],
      limit: 10,
      page: 0
    }
  },
  methods: {
    ...mapActions(['fetchProjects']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchProjects({
        limit: this.limit,
        page: this.page
      })

      let projects = await this.getProjects

      if (projects.length) {
        this.projects = this.projects.concat(projects)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getProjects'])
  },
  watch: {
    $route: ['fetchProjects']
  }
}
</script>