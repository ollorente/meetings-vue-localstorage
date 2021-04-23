<template>
  <router-link
    :to="{ name: 'Task', params: { task: taskItem._id } }"
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
        _id: '',
        name: '',
        isActive: '',
        isLock: ''
      },
      project: ''
    }
  },
  mounted () {
    this.taskItem = {
      _id: this.$props.task._id,
      name: this.$props.task.name,
      isActive: this.$props.task.isActive,
      isLock: this.$props.task.isLock
    }
    this.getProject(this.$props.task.project._id)
  },
  methods: {
    async getProject (id) {
      try {
        const res = await fetch(`${db}/projects/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })

        const project = await res.json()

        this.project = await project.data
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    }
  },
  watch: {
    $route: ['getProject']
  }
}
</script>