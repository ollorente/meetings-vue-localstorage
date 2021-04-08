<template>
  <div class="main__body__menu">
    <ul class="main__body__menu__nav">
      <li class="main__body__menu__item" :class="$route.path === '/tareas' ? 'active' : ''">
        <router-link :to="{ name: 'Tasks' }" class="main__body__menu__link"><i class="fas fa-tasks"></i> <span class="text">Tareas</span></router-link>
      </li>
      <li class="main__body__menu__item" :class="$route.path === '/proyectos' ? 'active' : ''">
        <router-link :to="{ name: 'Projects' }" class="main__body__menu__link"><i class="fas fa-user-tie"></i> <span class="text">Proyectos</span></router-link>
      </li>
      <li class="main__body__menu__item" :class="$route.path === '/reuniones' ? 'active' : ''">
        <router-link :to="{ name: 'Meetings' }" class="main__body__menu__link"><i class="fas fa-handshake"></i><span class="text">Reuniones</span></router-link>
      </li>
      <li class="main__body__menu__item" :class="$route.path === '/usuarios' ? 'active' : ''">
        <router-link :to="{ name: 'People' }" class="main__body__menu__link"><i class="fas fa-users"></i> <span class="text">Usuarios</span></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheSecondNavbar',
  data () {
    return {}
  }
}
</script>