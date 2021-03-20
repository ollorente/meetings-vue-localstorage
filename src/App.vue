<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Projects' }">Proyectos</router-link> |
      <router-link :to="{ name: 'Meetings' }">Reuniones</router-link> |
      <router-link :to="{ name: 'Tasks' }">Tareas</router-link> |
      <router-link :to="{ name: 'People' }">Usuarios</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.parrafo {
  width: 100%;
  margin: 1rem 0;
  text-align: left !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.parrafo__info {
  width: 80%;
  display: flex;
  align-items: center;
}

.parrafo__info__number {
  margin: 0 1rem;
}

.parrafo__info__name {
  margin: 0 1rem;
}

.link {
  color: #42b983;
  font-weight: bold;
}

.parrafo__status {
  margin: 0 1rem;
  text-align: right !important;
}
</style>
