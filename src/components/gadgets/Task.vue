<template>
  <router-link
    :to="{ name: 'Task', params: { task: taskItem.id } }"
    class="main__section__task"
  >
    <span class="main__section__task__text">
      <i class="fas fa-clipboard-check"></i>
      <div class="main__section__task__body">
        <span class="main__section__task__title">{{ taskItem.name }}</span>
        <span class="main__section__task__content">{{ project.name }}</span>
      </div>
    </span>
    <span class="main__section__task__icon">
      <i :class="taskItem.isActive ? 'fas' : 'far'" class="fa-circle"></i>
      <i class="fas" :class="taskItem.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
    </span>
  </router-link>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Task',
  props: ['task'],
  data () {
    return {
      taskItem: {
        id: '',
        name: '',
        isActive: '',
        isLock: ''
      },
      project: ''
    }
  },
  mounted () {
    this.taskItem = {
      id: this.$props.task.id,
      name: this.$props.task.name,
      isActive: this.$props.task.isActive,
      isLock: this.$props.task.isLock
    }
    this.project = this.getProject
  },
  created () {
    this.fetchProject(this.$props.task.project)
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