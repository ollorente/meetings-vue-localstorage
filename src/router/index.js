import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const BASE_URL_TITLE = "© MeetingsApp";

const routes = [
  {
    path: "/", // TODO -> Hacer lógica de la vista
    name: "Home",
    component: () => import(/* webpackChunkName: 'login' */ "../views/Home.vue"),
    meta: {
      title: `Home ${BASE_URL_TITLE}`,
    },
  },
  {
    path: "/login", // TODO -> Ajustar diseño
    name: "Login",
    component: () =>
      import(/* webpackChunkName: 'login' */ "../views/Login.vue"),
    meta: {
      title: `Login ${BASE_URL_TITLE}`,
    },
  },
  {
    path: "/registro", // TODO -> Ajustar diseño
    name: "Logup",
    component: () =>
      import(/* webpackChunkName: 'logup' */ "../views/Logup.vue"),
    meta: {
      title: `Registro ${BASE_URL_TITLE}`,
    },
  },
  {
    path: "/proyectos",
    name: "Projects",
    component: () =>
      import(
        /* webpackChunkName: 'projects' */ "../views/project/Projects.vue"
      ),
    meta: {
      title: `Proyectos ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/buscar",
    name: "SearchProjects",
    component: () =>
      import(
        /* webpackChunkName: 'search-projects' */ "../views/project/SearchProjects.vue"
      ),
    meta: {
      title: `Buscar proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/nuevo",
    name: "NewProject",
    component: () =>
      import(
        /* webpackChunkName: 'new-project' */ "../views/project/NewProject.vue"
      ),
    meta: {
      title: `Agreagr proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project",
    name: "Project",
    component: () =>
      import(/* webpackChunkName: 'project' */ "../views/project/Project.vue"),
    meta: {
      title: `Proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/editar",
    name: "EditProject",
    component: () =>
      import(
        /* webpackChunkName: 'edit-project' */ "../views/project/EditProject.vue"
      ),
    meta: {
      title: `Editar proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/encuentros",
    name: "ProjectMeetings",
    component: () =>
      import(
        /* webpackChunkName: 'project-meetings' */ "../views/project/ProjectMeetings.vue"
      ),
    meta: {
      title: `Encuentros proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/encuentro/buscar",
    name: "SearchProjectMeetings",
    component: () =>
      import(
        /* webpackChunkName: 'search-project-meetings' */ "../views/project/SearchProjectMeetings.vue"
      ),
    meta: {
      title: `Buscar encuentro proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/encuentro/nueva",
    name: "NewProjectMeeting",
    component: () =>
      import(
        /* webpackChunkName: 'new-project-meeting' */ "../views/project/NewProjectMeeting.vue"
      ),
    meta: {
      title: `Agregar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/actividades",
    name: "ProjectTasks",
    component: () =>
      import(
        /* webpackChunkName: 'project-tasks' */ "../views/project/ProjectTasks.vue"
      ),
    meta: {
      title: `Actividades proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/actividad/buscar",
    name: "SearchProjectTasks",
    component: () =>
      import(
        /* webpackChunkName: 'search-project-tasks' */ "../views/project/SearchProjectTasks.vue"
      ),
    meta: {
      title: `Buscar actividad proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/usuarios",
    name: "ProjectPeople",
    component: () =>
      import(
        /* webpackChunkName: 'project-people' */ "../views/project/ProjectPeople.vue"
      ),
    meta: {
      title: `Usuarios proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/proyecto/:project/usuario/buscar",
    name: "SearchProjectPeople",
    component: () =>
      import(
        /* webpackChunkName: 'search-project-people' */ "../views/project/SearchProjectPeople.vue"
      ),
    meta: {
      title: `Buscar usuario proyecto ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentros",
    name: "Meetings",
    component: () =>
      import(
        /* webpackChunkName: 'meetings' */ "../views/meeting/Meetings.vue"
      ),
    meta: {
      title: `Encuentros ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/buscar",
    name: "SearchMeetings",
    component: () =>
      import(
        /* webpackChunkName: 'search-meetings' */ "../views/meeting/SearchMeetings.vue"
      ),
    meta: {
      title: `Buscar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting",
    name: "Meeting",
    component: () =>
      import(/* webpackChunkName: 'meeting' */ "../views/meeting/Meeting.vue"),
    meta: {
      title: `Encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/editar",
    name: "EditMeeting",
    component: () =>
      import(
        /* webpackChunkName: 'edit-meeting' */ "../views/meeting/EditMeeting.vue"
      ),
    meta: {
      title: `Editar encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/actividades",
    name: "MeetingTasks",
    component: () =>
      import(
        /* webpackChunkName: 'meeting-tasks' */ "../views/meeting/MeetingTasks.vue"
      ),
    meta: {
      title: `Actividades encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/actividad/buscar",
    name: "SearchMeetingTasks",
    component: () =>
      import(
        /* webpackChunkName: 'search-meeting-tasks' */ "../views/meeting/SearchMeetingTasks.vue"
      ),
    meta: {
      title: `Buscar actividad encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/actividad/nueva",
    name: "NewMeetingTask",
    component: () =>
      import(
        /* webpackChunkName: 'new-meeting-task' */ "../views/meeting/NewMeetingTask.vue"
      ),
    meta: {
      title: `Agregar actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/usuarios",
    name: "MeetingPeople",
    component: () =>
      import(
        /* webpackChunkName: 'meeting-people' */ "../views/meeting/MeetingPeople.vue"
      ),
    meta: {
      title: `Usuarios encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/encuentro/:meeting/usuario/buscar",
    name: "SearchMeetingPeople",
    component: () =>
      import(
        /* webpackChunkName: 'search-meeting-people' */ "../views/meeting/SearchMeetingPeople.vue"
      ),
    meta: {
      title: `Buscar usuario encuentro ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividades",
    name: "Tasks",
    component: () =>
      import(/* webpackChunkName: 'tasks' */ "../views/task/Tasks.vue"),
    meta: {
      title: `Actividades ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividad/buscar",
    name: "SearchTasks",
    component: () =>
      import(
        /* webpackChunkName: 'search-tasks' */ "../views/task/SearchTasks.vue"
      ),
    meta: {
      title: `Buscar actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividad/:task",
    name: "Task",
    component: () =>
      import(/* webpackChunkName: 'task' */ "../views/task/Task.vue"),
    meta: {
      title: `Actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividad/:task/editar",
    name: "EditTask",
    component: () =>
      import(/* webpackChunkName: 'edit-task' */ "../views/task/EditTask.vue"),
    meta: {
      title: `Editar actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividad/:task/usuarios",
    name: "TaskPeople",
    component: () =>
      import(
        /* webpackChunkName: 'task-people' */ "../views/task/TaskPeople.vue"
      ),
    meta: {
      title: `Usuarios actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/actividad/:task/usuario/buscar",
    name: "SearchTaskPeople",
    component: () =>
      import(
        /* webpackChunkName: 'search-task-people' */ "../views/task/SearchTaskPeople.vue"
      ),
    meta: {
      title: `Buscar usuario actividad ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuarios",
    name: "People",
    component: () =>
      import(/* webpackChunkName: 'people' */ "../views/person/People.vue"),
    meta: {
      title: `Usuarios ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/buscar",
    name: "SearchPeople",
    component: () =>
      import(
        /* webpackChunkName: 'search-people' */ "../views/person/SearchPeople.vue"
      ),
    meta: {
      title: `Buscar usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/nuevo",
    name: "NewPerson",
    component: () =>
      import(
        /* webpackChunkName: 'new-person' */ "../views/person/NewPerson.vue"
      ),
    meta: {
      title: `Agregar usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person",
    name: "Person",
    component: () =>
      import(/* webpackChunkName: 'person' */ "../views/person/Person.vue"),
    meta: {
      title: `Usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/editar",
    name: "EditPerson",
    component: () =>
      import(
        /* webpackChunkName: 'edit-person' */ "../views/person/EditPerson.vue"
      ),
    meta: {
      title: `Editar usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/proyectos",
    name: "PersonProjects",
    component: () =>
      import(
        /* webpackChunkName: 'person-projects' */ "../views/person/PersonProjects.vue"
      ),
    meta: {
      title: `Proyectos usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/proyecto/buscar",
    name: "SearchPersonProjects",
    component: () =>
      import(
        /* webpackChunkName: 'search-person-projects' */ "../views/person/SearchPersonProjects.vue"
      ),
    meta: {
      title: `Buscar proyecto usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/encuentros",
    name: "PersonMeetings",
    component: () =>
      import(
        /* webpackChunkName: 'person-meetings' */ "../views/person/PersonMeetings.vue"
      ),
    meta: {
      title: `Encuentros usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/encuentro/buscar",
    name: "SearchPersonMeetings",
    component: () =>
      import(
        /* webpackChunkName: 'search-person-meetings' */ "../views/person/SearchPersonMeetings.vue"
      ),
    meta: {
      title: `Buscar encuentro usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/actividades",
    name: "PersonTasks",
    component: () =>
      import(
        /* webpackChunkName: 'person-tasks' */ "../views/person/PersonTasks.vue"
      ),
    meta: {
      title: `Actividades usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/usuario/:person/actividad/buscar",
    name: "SearchPersonTasks",
    component: () =>
      import(
        /* webpackChunkName: 'search-person-tasks' */ "../views/person/SearchPersonTasks.vue"
      ),
    meta: {
      title: `Buscar actividad usuario ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/perfil", // TODO -> Hacer lógica de la vista
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: 'profile' */ "../views/profile/Profile.vue"),
    meta: {
      title: `Perfil ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/perfil/editar", // TODO -> Hacer lógica de la vista
    name: "EditProfile",
    component: () =>
      import(
        /* webpackChunkName: 'edit-profile' */ "../views/profile/Profile.vue"
      ),
    meta: {
      title: `Editar perfil ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "/perfil/cambiar-clave", // TODO -> Hacer lógica de la vista
    name: "ChangePassword",
    component: () =>
      import(
        /* webpackChunkName: 'change-password' */ "../views/profile/Profile.vue"
      ),
    meta: {
      title: `Cambiar password ${BASE_URL_TITLE}`,
      requireAuth: true,
    },
  },
  {
    path: "*",
    name: "Error",
    component: () =>
      import(/* webpackChunkName: 'error' */ "../views/Error.vue"),
    meta: {
      title: `Página no encontrada ${BASE_URL_TITLE}`,
    },
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();

  const privateRuote = to.matched.some((item) => item.meta.requireAuth);

  if (privateRuote && store.state.token === null) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
