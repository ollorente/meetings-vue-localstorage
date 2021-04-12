<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ project.name }}</h1>
          <div class="main__section__person">
            <div v-html="project.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ project.collaborators.length }}</b> {{ project.collaborators.length === 1 ? 'Colaborador' : 'Colaboradores' }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Creado:</span><br />
              <span class="main__section__person__block__content">{{
                new Date(project.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="project.createdAt !== project.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label">Actualizado:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(project.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="project.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ project.isActive ? "Activo" : "Inactivo" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="project.isLock ? 'fa-lock' : 'fa-lock-open'"></i> {{ project.isLock ? "Oculto" : "Público" }}
              </span>
            </p>
            <div class="main__section__person__block--flex">
              <button @click="removeProject" class="btn-outline-s-dark">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="editProject" class="btn-secondary">
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
  name: 'Project',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Proyecto',
        link: { name: 'Projects' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditProject' },
              icon: 'fas fa-user-tie',
              status: false
            },
            {
              title: 'Actividades',
              link: { name: 'ProjectTasks' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Encuentros',
              link: { name: 'ProjectMeetings' },
              icon: 'fas fa-handshake',
              status: false
            },
            {
              title: 'Usuarios',
              link: { name: 'ProjectPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ],
      project: {
        id: '',
        name: '',
        description: '',
        collaborators: [],
        isActive: '',
        isLock: '',
        createdAt: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.getProject()
  },
  methods: {
    ...mapActions(['deleteProject']),
    async getProject () {
      try {
        const data = await db.projects[this.$route.params.project]

        if (data === undefined) {
          await this.$router.replace({ name: 'Error' })
        } else {
          this.project = {
            id: await data.id,
            name: await data.name,
            description: await data.description,
            collaborators: await data.collaborators,
            isActive: await data.isActive,
            isLock: await data.isLock,
            createdAt: await data.createdAt,
            updatedAt: await data.updatedAt
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-useless-return
        if (error) return
      }
    },
    async editProject () {
      await this.$router.replace({
        name: 'EditProject',
        params: { project: this.$route.params.project }
      })
    },
    async removeProject () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deleteProject(this.$route.params.project)

        await this.$router.replace({ name: 'Projects' })
      }
    }
  },
  watch: {
    $route: ['getProject']
  }
}
</script>