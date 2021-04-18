<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <transition name="fade">
        <section class="section">
          <h1 class="title">{{ getProject.name }}</h1>
          <div class="main__section__person">
            <div v-html="getProject.description"></div>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ getProject._collaboratorsCount }}</b> {{ getProject._collaboratorsCount === 1 ? 'Colaborador' : 'Colaboradores' }}
              </span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Creado:</span><br />
              <span class="main__section__person__block__content">{{
                new Date(getProject.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="getProject.createdAt !== getProject.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label">Actualizado:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getProject.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="getProject.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ getProject.isActive ? "Activo" : "Inactivo" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="getProject.isLock ? 'fa-lock' : 'fa-lock-open'"></i> {{ getProject.isLock ? "Oculto" : "Público" }}
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
import { mapActions, mapGetters } from 'vuex'

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
      ]
    }
  },
  created () {
    this.fetchProject(this.$route.params.project)
  },
  methods: {
    ...mapActions(['deleteProject', 'fetchProject']),
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
  computed: {
    ...mapGetters(['getProject'])
  },
  watch: {
    $route: ['fetchProject']
  }
}
</script>