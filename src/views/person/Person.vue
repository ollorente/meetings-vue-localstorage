<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <section class="section">
        <div class="main__section__person">
        <p class="main__section__person__avatar">
            <img
              :src="
                getPerson.photoURL
                  ? getPerson.photoURL
                  : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
              "
              :alt="getPerson.name"
              class="main__section__person__avatar--img"
            />
          </p>
          <h1 class="main__section__person__title">{{ getPerson.name }}</h1>
          <h3 class="main__section__person__subtitle">
            {{ getPerson.role }}
          </h3>
          <p class="main__section__person__block">
            <span class="main__section__person__block__label">Email:</span
            ><br />
            <span class="main__section__person__block__content">{{
              getPerson.email
            }}</span>
          </p>
          <p class="main__section__person__block">
            <span class="main__section__person__block__label">ID:</span
            ><br />
            <span class="main__section__person__block__content">{{
              getPerson.id
            }}</span>
          </p>
          <p class="main__section__person__block">
            <span class="main__section__person__block__label"
              >Creado:</span
            ><br />
            <span class="main__section__person__block__content">{{
              new Date(getPerson.createdAt).toLocaleDateString()
            }}</span>
          </p>
          <p
            v-if="getPerson.createdAt !== getPerson.updatedAt"
            class="main__section__person__block"
          >
            <span class="main__section__person__block__label"
              >Actualizado:</span
            ><br />
            <span class="main__section__person__block__content">{{
              new Date(getPerson.updatedAt).toLocaleDateString()
            }}</span>
          </p>
          <p class="main__section__person__block">
            <span class="main__section__person__block__content"
              ><i
                :class="getPerson.isActive ? 'fas' : 'far'"
                class="fa-circle"
              ></i>
              {{ getPerson.isActive ? "Activo" : "Inactivo" }}</span
            ><br />
            <span class="main__section__person__block__content"
              ><i
                :class="getPerson.isLock ? '´far' : 'fas'"
                class="fa-circle"
              ></i>
              {{ getPerson.isLock ? "Oculto" : "Público" }}</span
            >
          </p>
          <p class="main__section__person__block"></p>
          <form class="main__section__person__block">
            <button @click="removePerson" class="btn-outline-s-dark">
              Eliminar
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Person',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Usuario',
        link: { name: 'People' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditPerson' },
              icon: 'fas fa-user-edit',
              status: false
            },
            {
              title: 'Proyectos',
              link: { name: 'PersonProjects' },
              icon: 'fas fa-user-tie',
              status: false
            },
            {
              title: 'Reuniones',
              link: { name: 'PersonMeetings' },
              icon: 'fas fa-handshake',
              status: false
            },
            {
              title: 'Tareas',
              link: { name: 'PersonTasks' },
              icon: 'fas fa-tasks',
              status: false
            }
          ]
        }
      ]
    }
  },
  created () {
    this.fetchPerson(this.$route.params.person)
  },
  methods: {
    ...mapActions(['fetchPerson', 'deletePerson', 'deletePeopleMeetings']),
    async removePerson () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deletePerson(this.$route.params.person)
        await this.deletePeopleMeetings(this.$route.params.person)
        await this.deletePeopleProjects(this.$route.params.person)
        await this.deletePeopleTasks(this.$route.params.person)

        await this.$router.replace({ name: 'People' })
      }
    }
  },
  computed: {
    ...mapGetters(['getPerson'])
  },
  watch: {
    $route: ['fetchPerson']
  }
}
</script>