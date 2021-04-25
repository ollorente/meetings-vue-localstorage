import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const BASE_URL_TITLE = '© MeetingsApp'

const routes = [
  {
    path: '/', // TODO -> Hacer lógica de la vista
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: `Home ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/login', // TODO -> Ajustar diseño
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: `Login ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/registro', // TODO -> Ajustar diseño
    name: 'Logup',
    component: () => import('../views/Logup.vue'),
    meta: {
      title: `Registro ${BASE_URL_TITLE}`
    }
  },
  {
    path: '/proyectos',
    name: 'Projects',
    component: () => import('../views/project/Projects.vue'),
    meta: {
      title: `Proyectos ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/buscar',
    name: 'SearchProjects',
    component: () => import('../views/project/SearchProjects.vue'),
    meta: {
      title: `Buscar proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/nuevo',
    name: 'NewProject',
    component: () => import('../views/project/NewProject.vue'),
    meta: {
      title: `Agreagr proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project',
    name: 'Project',
    component: () => import('../views/project/Project.vue'),
    meta: {
      title: `Proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/editar', // TODO -> Hacer lógica de la vista
    name: 'EditProject',
    component: () => import('../views/project/EditProject.vue'),
    meta: {
      title: `Editar proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/encuentros',
    name: 'ProjectMeetings',
    component: () => import('../views/project/ProjectMeetings.vue'),
    meta: {
      title: `Encuentros proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/encuentro/buscar',
    name: 'SearchProjectMeetings',
    component: () => import('../views/project/SearchProjectMeetings.vue'),
    meta: {
      title: `Buscar encuentro proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/encuentro/nueva',
    name: 'NewProjectMeeting',
    component: () => import('../views/project/NewProjectMeeting.vue'),
    meta: {
      title: `Agregar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/actividades',
    name: 'ProjectTasks',
    component: () => import('../views/project/ProjectTasks.vue'),
    meta: {
      title: `Actividades proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/actividad/buscar',
    name: 'SearchProjectTasks',
    component: () => import('../views/project/SearchProjectTasks.vue'),
    meta: {
      title: `Buscar actividad proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/usuarios',
    name: 'ProjectPeople',
    component: () => import('../views/project/ProjectPeople.vue'),
    meta: {
      title: `Usuarios proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/proyecto/:project/usuario/buscar',
    name: 'SearchProjectPeople',
    component: () => import('../views/project/SearchProjectPeople.vue'),
    meta: {
      title: `Buscar usuario proyecto ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentros',
    name: 'Meetings',
    component: () => import('../views/meeting/Meetings.vue'),
    meta: {
      title: `Encuentros ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/buscar',
    name: 'SearchMeetings',
    component: () => import('../views/meeting/SearchMeetings.vue'),
    meta: {
      title: `Buscar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting',
    name: 'Meeting',
    component: () => import('../views/meeting/Meeting.vue'),
    meta: {
      title: `Encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/editar', // TODO -> Hacer lógica de la vista
    name: 'EditMeeting',
    component: () => import('../views/meeting/EditMeeting.vue'),
    meta: {
      title: `Editar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/actividades',
    name: 'MeetingTasks',
    component: () => import('../views/meeting/MeetingTasks.vue'),
    meta: {
      title: `Actividades encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/actividad/buscar',
    name: 'SearchMeetingTasks',
    component: () => import('../views/meeting/SearchMeetingTasks.vue'),
    meta: {
      title: `Buscar actividad encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/actividad/nueva',
    name: 'NewMeetingTask',
    component: () => import('../views/meeting/NewMeetingTask.vue'),
    meta: {
      title: `Agregar actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/usuarios',
    name: 'MeetingPeople',
    component: () => import('../views/meeting/MeetingPeople.vue'),
    meta: {
      title: `Usuarios encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/encuentro/:meeting/usuario/buscar',
    name: 'SearchMeetingPeople',
    component: () => import('../views/meeting/SearchMeetingPeople.vue'),
    meta: {
      title: `Buscar usuario encuentro ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividades',
    name: 'Tasks',
    component: () => import('../views/task/Tasks.vue'),
    meta: {
      title: `Actividades ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividad/buscar',
    name: 'SearchTasks',
    component: () => import('../views/task/SearchTasks.vue'),
    meta: {
      title: `Buscar actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividad/:task',
    name: 'Task',
    component: () => import('../views/task/Task.vue'),
    meta: {
      title: `Actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividad/:task/editar', // TODO -> Hacer lógica de la vista
    name: 'EditTask',
    component: () => import('../views/task/EditTask.vue'),
    meta: {
      title: `Editar actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividad/:task/usuarios',
    name: 'TaskPeople',
    component: () => import('../views/task/TaskPeople.vue'),
    meta: {
      title: `Usuarios actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/actividad/:task/usuario/buscar',
    name: 'SearchTaskPeople',
    component: () => import('../views/task/SearchTaskPeople.vue'),
    meta: {
      title: `Buscar usuario actividad ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuarios',
    name: 'People',
    component: () => import('../views/person/People.vue'),
    meta: {
      title: `Usuarios ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/buscar',
    name: 'SearchPeople',
    component: () => import('../views/person/SearchPeople.vue'),
    meta: {
      title: `Buscar usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/nuevo',
    name: 'NewPerson',
    component: () => import('../views/person/NewPerson.vue'),
    meta: {
      title: `Agregar usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person',
    name: 'Person',
    component: () => import('../views/person/Person.vue'),
    meta: {
      title: `Usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/editar',
    name: 'EditPerson',
    component: () => import('../views/person/EditPerson.vue'),
    meta: {
      title: `Editar usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/proyectos',
    name: 'PersonProjects',
    component: () => import('../views/person/PersonProjects.vue'),
    meta: {
      title: `Proyectos usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/proyecto/buscar',
    name: 'SearchPersonProjects',
    component: () => import('../views/person/SearchPersonProjects.vue'),
    meta: {
      title: `Buscar proyecto usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/encuentros',
    name: 'PersonMeetings',
    component: () => import('../views/person/PersonMeetings.vue'),
    meta: {
      title: `Encuentros usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/encuentro/buscar',
    name: 'SearchPersonMeetings',
    component: () => import('../views/person/SearchPersonMeetings.vue'),
    meta: {
      title: `Buscar encuentro usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/actividades',
    name: 'PersonTasks',
    component: () => import('../views/person/PersonTasks.vue'),
    meta: {
      title: `Actividades usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/usuario/:person/actividad/buscar',
    name: 'SearchPersonTasks',
    component: () => import('../views/person/SearchPersonTasks.vue'),
    meta: {
      title: `Buscar actividad usuario ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '/perfil', // TODO -> Hacer lógica de la vista
    name: 'Profile',
    component: () => import('../views/profile/Profile.vue'),
    meta: {
      title: `Perfil ${BASE_URL_TITLE}`,
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error.vue'),
    meta: {
      title: `Página no encontrada ${BASE_URL_TITLE}`
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()

  const privateRuote = to.matched.some(item => item.meta.requireAuth)

  if (privateRuote && store.state.token === null) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
