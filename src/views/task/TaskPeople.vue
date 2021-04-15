<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getTask.name }}</h1>
          <User v-for='person in people' :key='person.id' :person='person' />
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
import User from '@/components/gadgets/User'

export default {
  name: 'TaskPeople',
  components: {
    TheNavbar,
    User,
    InfiniteLoading
  },
  data () {
    return {
      path: {
        title: 'Usuarios actividad',
        link: { name: 'Task', params: { task: this.$route.params.task } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: true,
        linkSearch: { name: 'SearchTaskPeople', params: { task: this.$route.params.task } }
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
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTaskPeople', 'fetchTask']),
    async infiniteHandler ($state) {
      this.page++

      this.fetchTaskPeople({
        id: this.$route.params.task,
        limit: this.limit,
        page: this.page
      })

      let people = await this.getTaskPeople

      if (people.length) {
        this.people = this.people.concat(people)
        $state.loaded()
      } else {
        $state.complete()
      }
    }
  },
  computed: {
    ...mapGetters(['getTaskPeople', 'getTask'])
  },
  watch: {
    $route: ['fetchTaskPeople', 'fetchTask']
  }
}
</script>