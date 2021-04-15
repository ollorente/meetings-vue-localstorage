<template>
  <router-link
    :to="{ name: 'Task', params: { task: taskItem.id } }"
    class="main__section__task"
    :class="taskItem.isLock ? 'lock' : ''"
  >
    <span class="main__section__task__text">
      <i class="fas fa-clipboard-check"></i>
      <div class="main__section__task__body">
        <span class="main__section__task__title">{{ taskItem.name }}</span>
        <span class="main__section__task__content">{{ project.name }}</span>
      </div>
    </span>
    <span class="main__section__task__icon">
      <i :class="taskItem.isActive ? 'fas' : 'far text-gray'" class="fa-circle"></i>
      <i class="fas" :class="taskItem.isLock ? 'fa-lock text-gray' : 'fa-lock-open'"></i>
    </span>
  </router-link>
</template>

<script>
import { db } from '@/main'

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
  methods: {
    async getProject (id) {
      try {
        this.project = await db.projects[id]
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  },
  mounted () {
    this.taskItem = {
      id: this.$props.task.id,
      name: this.$props.task.name,
      isActive: this.$props.task.isActive,
      isLock: this.$props.task.isLock
    }
    this.getProject(this.$props.task.project)
  },
  watch: {
    $route: ['getProject']
  }
}
</script>