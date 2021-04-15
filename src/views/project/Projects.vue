<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <TheSecondNavbar />

      <transition name="fade">
        <section class="section">
          <Project v-for='project in projects' :key='project.id' :project='project' />
          <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

import TheNavbar from '@/components/TheNavbar'
import TheSecondNavbar from '@/components/TheSecondNavbar'
import Project from '@/components/gadgets/Project'

export default {
  name: 'Projects',
  components: {
    TheNavbar,
    TheSecondNavbar,
    Project,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Proyectos',
        link: { name: 'Projects' },
        icon: 'fas fa-user-tie',
        status: true,
        search: true,
        linkSearch: { name: 'SearchProjects' }
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