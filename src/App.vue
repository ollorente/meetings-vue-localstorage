<template>
  <div id="app">
    <main>
     <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'app',
  created () {
    this.fetchToken()
  },
  methods: {
    ...mapActions(['fetchToken'])
  }
}
</script>

<style></style>
