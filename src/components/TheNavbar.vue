<template>
  <div class="main__navbar">
    <router-link :to="{ name: 'Home' }" class="main__navbar__logo"
      ><i :class="icon"></i> {{ titleApp }}</router-link
    >
    <div class="main__navbar__items">
      <a href="#" class="main__navbar_items_link"
        ><i class="fas fa-search"></i
      ></a>
      <a href="#" class="main__navbar_items_link"
        ><i class="fas fa-ellipsis-v"></i
      ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  props: {
    icon: String,
    titleApp: String,
  },
};
</script>
