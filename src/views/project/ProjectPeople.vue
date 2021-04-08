<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <h1 class="title">{{ getProject.name }}</h1>
        <User v-for='person in getProjectPeople' :key='person.id' :person='person' />
        <div class='card-alert' v-if='getProjectPeople.length < 1'>
          No hay usuarios 😒
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'
import User from '@/components/gadgets/User'

export default {
  name: 'ProjectProjectPeople',
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
      limit: 10,
      page: 1
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
    this.fetchProjectPeople({
      id: this.$route.params.project,
      limit: this.limit,
      page: this.page
    })
  },
  methods: {
    ...mapActions(['fetchProjectPeople', 'fetchProject'])
  },
  computed: {
    ...mapGetters(['getProjectPeople', 'getProject'])
  },
  watch: {
    $route: ['fetchProjectPeople', 'fetchProject']
  }
}
</script>