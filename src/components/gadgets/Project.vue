<template>
  <div class="main__section__item">
    <router-link
      :to="{ name: 'Project', params: { project: project._id } }"
      class="main__section__link"
    >
      <span class="main__section__link__text">
        <i class="fas fa-user-tie"></i>
        <span class="main__section__link__text__content">
          <span class="text-title">{{ project.name }}</span>
          <span class="text-content mt-3" style="width:100%;">
            <span class="text-content__progress">
              <span class="range" :style="`width: ${percent}%`">&nbsp;</span>
            </span>
          </span>
        </span>
      </span>
      <span class="main__section__link__icon">
        <i :class="project.isActive ? 'fas' : 'far'" class="fa-circle"></i>
        <i class="fas" :class="project.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
      </span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Project',
  props: ['project'],
  computed: {
    percent: function () {
      // const name = this.$props.project.name
      const task = this.$props.project._tasks
      const count = this.$props.project._tasksCount
      // console.log('Name->', name)
      // console.log('Task->', task.length)
      // console.log('Count->', count)
      // console.log('--------------------------------------------------')

      if (task.length > 0) {
        const operation = 100 - (parseInt(task.length * 100) / parseInt(count))
        return operation
      } else {
        return 0
      }
    }
  }
}
</script>