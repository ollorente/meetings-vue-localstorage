<template>
  <div class="navbar">
    <span class="navbar__brand" v-if="path.status"><i :class="path.icon"></i> {{ path.title }}</span>
    <router-link :to="path.link" class="navbar__brand" v-else><i :class="path.icon"></i> {{ path.title }}</router-link>
    <span v-if="loggIn">
      <ul class="navbar__nav" v-if="options">
        <li class="navbar__items">
          <span class="navbar__link" @click="logOut"><b>Cerrar sesión</b></span>
        </li>
      </ul>
    </span>
    <span v-else>
      <ul class="navbar__nav" v-if="options">
        <li class="navbar__items" v-for="(menu, index) in options[0].menus" :key="index">
          <span class="navbar__link" v-if="menu.status"><b>{{ menu.title }}</b></span>
          <router-link :to="menu.link" class="navbar__link" v-else>{{ menu.title }}</router-link>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainNavbar',
  props: ['path', 'options'],
  data () {
    return {
      loggIn: false
    }
  },
  mounted () {
    this.loggIn = this.$store.state.token
  },
  methods: {
    ...mapActions(['logout']),
    async logOut () {
      this.logout()
      await this.$router.go({ name: 'Home' })
    }
  }
}
</script>