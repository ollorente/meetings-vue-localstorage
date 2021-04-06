<template>
  <main class="main">
    <TheSectionNavbar
      :titleApp="titleApp"
      :icon="icon"
      :link="link"
      :options="options"
    />
    <div class="main__body">
      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav" style="text-align: center">
            <i
              class="fas fa-exclamation-triangle"
              style="font-size: 12rem; margin-top: 3rem; color: #ddd"
            ></i>
            <h1 class="main__body__section__nav__title">
              ¡404 Page not found!
            </h1>
            <router-link
              :to="{ name: 'Home' }"
              class="main__body__section__nav--title"
              style="color: #01579b"
              >Go to Home</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "Error",
  components: {
    TheSectionNavbar,
  },
  data() {
    return {
      titleApp: "Error",
      icon: "fas fa-arrow-left",
      link: ``,
      options: [],
    };
  },
};
</script>
