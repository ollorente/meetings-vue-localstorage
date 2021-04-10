<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getTask.name }}</h1>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'EditTask',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Editar tarea',
        link: { name: 'Task', params: { task: this.$route.params.task } },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: []
        }
      ]
    }
  },
  created () {
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTask'])
  },
  computed: {
    ...mapGetters(['getTask'])
  },
  watch: {
    $route: ['fetchTask']
  }
}
</script>