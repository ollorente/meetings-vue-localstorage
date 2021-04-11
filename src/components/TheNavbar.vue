<template>
  <div class="navbar">
    <span class="navbar__brand" v-if="path.status"><i :class="path.icon"></i> {{ path.title }}</span>
    <router-link :to="path.link" class="navbar__brand" v-else><i :class="path.icon"></i> {{ path.title }}</router-link>
    <ul class="navbar__nav">
      <a href="#" class="navbar__items--link" v-if="path.search"><i class="fas fa-search"></i></a>
      <span class="navbar__items--link" v-if="options.length" @click="isVisible"><i class="fas fa-ellipsis-v"></i></span>
    </ul>
    <div class="options" v-if="show">
      <div class="options__card">
        <ul class="options__card__items">
          <li class="options__card__icon">
            <span>Opciones</span> <i class="fas fa-chevron-up" @click="isVisible"></i>
          </li>
          <li v-for="(menu, index) in options[0].menus" :key="index" class="options__card__item">
            <router-link :to="menu.link" class="options__card__link"><i :class="menu.icon"></i> {{ menu.title }}</router-link>
          </li>
          <hr class="options__card__item" v-if="options[0].menus.length > 0">
          <li class="options__card__item">
            <span class="options__card__link" @click="logout"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar.',
  props: ['path', 'options'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    async isVisible () {
      this.show = !this.show
    },
    async logout () {
      await this.$router.replace({ name: 'Home' })
    }
  }
}
</script>