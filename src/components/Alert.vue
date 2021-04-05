<template>
  <div class="alert">
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
