<template>
  <router-link
    :to="{ name: 'Person', params: { person: person.id } }"
    class="main__section__user"
  >
    <img
      :src="
        person.photoURL
          ? person.photoURL
          : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
      "
      :alt="person.name"
      :title="person.email"
      class="main__section__user__logo"
    />
    <div class="main__section__user__body">
      <span class="main__section__user__title">{{ person.name }}</span>
      <span class="main__section__user__content">{{ person.email }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'User',
  props: ['person']
}
</script>