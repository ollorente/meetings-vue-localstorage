<template>
  <router-link
    :to="{ name: 'Task', params: { task: task.id } }"
    class="main__section__task"
  >
    <span class="main__section__task__text">
      <i class="fas fa-clipboard-check"></i>
      <div class="main__section__task__body">
        <span class="main__section__task__title">{{ task.name }}</span>
        <span class="main__section__task__content">{{ getProject.name }}</span>
      </div>
    </span>
    <span class="main__section__task__icon">
      <i class="fas fa-circle"></i>
      <i class="far fa-circle"></i>
    </span>
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Task',
  props: ['task'],
  created () {
    this.fetchProject(this.$props.task.projectId)
  },
  methods: {
    ...mapActions(['fetchProject'])
  },
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>