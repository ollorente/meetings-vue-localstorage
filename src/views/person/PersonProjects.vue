<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getPerson.name }}</h1>
        <Project v-for='project in getPeopleProjects' :key='project.id' :project='project' />
        <div class='card-alert' v-if='getPeopleProjects.length < 1'>
          No hay proyectos 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import Project from '@/components/gadgets/Project'

export default {
  name: 'PersonProjects',
  components: {
    TheNavbar,
    Project
  },
  data () {
    return {
      path: {
        title: 'Proyectos usuario',
        link: { name: 'Person', params: { person: this.$route.params.person } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true
      },
      options: [
        {
          menus: []
        }
      ],
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchPerson(this.$route.params.person)
    this.fetchPeopleProjects({
      id: this.$route.params.person,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchPeopleProjects', 'fetchPerson'])
  },
  computed: {
    ...mapGetters(['getPeopleProjects', 'getPerson'])
  },
  watch: {
    $route: ['fetchPeopleProjects', 'fetchPerson']
  }
}
</script>