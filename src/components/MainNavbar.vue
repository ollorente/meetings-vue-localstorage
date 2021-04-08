<template>
  <div class="navbar">
    <span class="navbar__brand" v-if="path.status"><i :class="path.icon"></i> {{ path.title }}</span>
    <router-link :to="path.link" class="navbar__brand" v-else><i :class="path.icon"></i> {{ path.title }}</router-link>
    <ul class="navbar__nav" v-if="options">
      <li class="navbar__items" v-for="(menu, index) in options[0].menus" :key="index">
        <span class="navbar__link" v-if="menu.status"><b>{{ menu.title }}</b></span>
        <router-link :to="menu.link" class="navbar__link" v-else>{{ menu.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainNavbar',
  props: ['path', 'options']
}
</script>