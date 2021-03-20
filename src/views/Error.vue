<template>
  <div class="error">
    <h1>¡404 Page not found!</h1>
    <router-link :to="{ name: 'Home' }" class="link">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Error",
  components: {},
};
</script>
