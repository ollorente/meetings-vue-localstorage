<template>
  <div class="main__section__item">
    <router-link
      :to="{ name: 'Project', params: { project: project.id } }"
      class="main__section__link"
    >
      <span class="main__section__link__text">
        <i class="fas fa-user-tie"></i>
        <span class="main__section__link__text__content">
          <span class="text-title">{{ project.name }}</span>
          <span class="text-content"><input type="range" name="progress" class="text-content__progress" disabled></span>
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
  props: ['project']
}
</script>