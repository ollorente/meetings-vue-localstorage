<template>
  <div class="people">
    <h1>This is a people page</h1>
    <router-link :to="{ name: 'NewPerson' }">Agregar</router-link>
  </div>
</template>

<script>
export default {
  name: "People",
  components: {},
};
</script>
