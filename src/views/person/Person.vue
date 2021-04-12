<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <div class="main__section__person">
            <p class="main__section__person__avatar">
              <img
                :src="
                  person.photoURL
                    ? person.photoURL
                    : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
                "
                :alt="person.name"
                class="main__section__person__avatar--img"
              />
            </p>
            <h1 class="main__section__person__title">{{ person.name }}</h1>
            <h3 class="main__section__person__subtitle">
              {{ person.role }}
            </h3>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Email:</span
              ><br />
              <span class="main__section__person__block__content">{{
                person.email
              }}</span>
            </p>
            <p class="main__section__person__block" v-if="person.phone">
              <span class="main__section__person__block__label">Teléfono:</span
              ><br />
              <span class="main__section__person__block__content">{{
                person.phone
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Creado:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(person.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="person.createdAt !== person.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizado:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(person.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="person.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ person.isActive ? "Activo" : "Inactivo" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="person.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ person.isLock ? "Oculto" : "Público" }}</span
              >
            </p>
            <div class="main__section__person__block--flex">
              <button @click="removePerson" class="btn-outline-s-dark">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="editPerson" class="btn-secondary">
                <i class="fas fa-edit"></i>
              </button>
            </div>
          </div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { db } from '@/main'

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
              title: 'Actividades',
              link: { name: 'PersonTasks' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Encuentros',
              link: { name: 'PersonMeetings' },
              icon: 'fas fa-handshake',
              status: false
            },
            {
              title: 'Proyectos',
              link: { name: 'PersonProjects' },
              icon: 'fas fa-user-tie',
              status: false
            }
          ]
        }
      ],
      person: ''
    }
  },
  created () {
    this.getPerson()
  },
  methods: {
    ...mapActions(['deletePerson']),
    async getPerson () {
      const data = await db.people[this.$route.params.person]

      if (data === undefined) {
        await this.$router.replace({ name: 'Error' })
      } else {
        this.person = {
          id: await data.id,
          name: await data.name,
          email: await data.email,
          photoURL: await data.photoURL,
          phone: await data.phone,
          role: await data.role,
          isActive: await data.isActive,
          isLock: await data.isLock,
          createdAt: await data.createdAt,
          updatedAt: await data.updatedAt
        }
      }
    },
    async editPerson () {
      await this.$router.replace({
        name: 'EditPerson',
        params: { person: this.$route.params.person }
      })
    },
    async removePerson () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deletePerson(this.$route.params.person)

        await this.$router.replace({ name: 'People' })
      }
    }
  },
  watch: {
    $route: ['getPerson']
  }
}
</script>