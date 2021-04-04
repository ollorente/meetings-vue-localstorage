<template>
  <div class="alert" id="alert" v-if="alert.error">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    msg: String,
  },
};
</script>

<style scoped></style>
