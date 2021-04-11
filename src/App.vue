<template>
  <div id="app">
    <!-- <div class="navbar">
      <router-link :to="{ name: 'Home' }" class="navbar__brand"><i class="fas fa-tasks"></i> MeetingsApp</router-link>
      <ul class="navbar__nav">
        <li class="navbar__items"><router-link :to="{ name: 'Logup' }" class="navbar__link">Registro</router-link></li>
        <li class="navbar__items"><router-link :to="{ name: 'Login' }" class="navbar__link">Login</router-link></li>
      </ul>
    </div> -->
    <main>
      <!-- <img src="./assets/img/logo.png" alt="Vue.js PWA"> -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style></style>
