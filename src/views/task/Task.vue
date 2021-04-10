<template>
  <div class="content">
    <TheNavbar :path="path" :options="options" />
    <main>
      <!-- <transition name="fade"> -->
        <section class="section">
          <div class="main__section__person">
            <h1 class="title">{{ getTask.name }}</h1>
            <div v-html="getTask.description"></div>
            <!-- <p class="main__section__person__block">
              <span class="main__section__person__block__content">
                <b>{{ getTask.collaborators.length }}</b> {{ getTask.collaborators.length === 1 ? 'Collaborador' : 'Collaboradores' }}
              </span>
            </p> -->
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Proyecto:</span
              ><br />
              <span class="main__section__person__block__content">{{
               getTask.project
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label">Reunión:</span
              ><br />
              <span class="main__section__person__block__content">{{
                getTask.meeting
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__label"
                >Creada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getTask.createdAt).toLocaleDateString()
              }}</span>
            </p>
            <p
              v-if="getTask.createdAt !== getTask.updatedAt"
              class="main__section__person__block"
            >
              <span class="main__section__person__block__label"
                >Actualizada:</span
              ><br />
              <span class="main__section__person__block__content">{{
                new Date(getTask.updatedAt).toLocaleDateString()
              }}</span>
            </p>
            <p class="main__section__person__block">
              <span class="main__section__person__block__content"
                ><i
                  :class="getTask.isActive ? 'fas' : 'far'"
                  class="fa-circle"
                ></i>
                {{ getTask.isActive ? "Activa" : "Inactiva" }}</span
              ><br />
              <span class="main__section__person__block__content">
                <i class="fas" :class="getTask.isLock ? 'fa-lock' : 'fa-lock-open'"></i>
                {{ getTask.isLock ? "Oculta" : "Pública" }}</span
              >
            </p>
            <p class="main__section__person__block"></p>
            <form class="main__section__person__block">
              <button @click="removeTask" class="btn-outline-s-dark">
                Eliminar
              </button>
            </form>
          </div>
        </section>
      <!-- </transition> -->
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import TheNavbar from '@/components/TheNavbar'

export default {
  name: 'Task',
  components: {
    TheNavbar
  },
  data () {
    return {
      path: {
        title: 'Tarea',
        link: { name: 'Tasks' },
        icon: 'fas fa-arrow-left',
        status: false,
        search: false
      },
      options: [
        {
          menus: [
            {
              title: 'Editar',
              link: { name: 'EditTask' },
              icon: 'fas fa-tasks',
              status: false
            },
            {
              title: 'Usuarios',
              link: { name: 'TaskPeople' },
              icon: 'fas fa-users',
              status: false
            }
          ]
        }
      ]
    }
  },
  created () {
    this.fetchTask(this.$route.params.task)
  },
  methods: {
    ...mapActions(['fetchTask', 'deleteTask']),
    async removeTask () {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        const task = await this.getTask

        await this.deleteTask(task.id)

        await this.$router.replace({
          name: 'Tasks'
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getTask'])
  },
  watch: {
    $route: ['fetchTask']
  }
}
</script>