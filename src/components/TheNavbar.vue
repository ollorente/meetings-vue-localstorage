<template>
  <div class="main__navbar">
    <div class="main__navbar__logo"><i :class="icon"></i> {{ titleApp }}</div>
    <div class="main__navbar__items">
      <a href="#" class="main__navbar_items_link"
        ><i class="fas fa-search"></i
      ></a>
      <span class="main__navbar_items_link" v-if="options" @click="isVisible"
        ><i class="fas fa-ellipsis-v"></i
      ></span>
    </div>
    <div class="options" v-if="show">
      <div class="options__card">
        <ul class="options__card__items">
          <li class="options__card__icon">
            <span>Opciones</span>
            <i class="fas fa-chevron-up" @click="isVisible"></i>
          </li>
          <li
            v-for="(menu, index) in options[0].menus"
            :key="index"
            class="options__card__item"
          >
            <a :href="menu.link" class="options__card__link"
              ><i :class="menu.icon"></i> {{ menu.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
  props: {
    icon: String,
    titleApp: String,
    link: String,
    options: Array,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    async isVisible() {
      this.show = !this.show;
    },
  },
};
</script>
