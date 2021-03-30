<template>
  <div class="edit-person">
    <h1 style="margin: 0">Editar "{{ person.email }}"</h1>
    <p>
      <a href="#" @click="removePerson" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Person', params: { person: this.$route.params.person } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="putPerson">
      <div>
        <input
          type="text"
          v-model="person.name"
          id="name"
          placeholder="Nombre de usuario"
          autofocus
          required
        />
      </div>
      <div>
        <input
          type="email"
          v-model="person.email"
          id="email"
          placeholder="email@email.com"
          required
        />
      </div>
      <div>
        <input
          type="text"
          v-model="person.role"
          id="role"
          placeholder="Cargo"
        />
      </div>
      <div>
        <input
          type="text"
          v-model="person.photoURL"
          id="photoURL"
          placeholder="Imagen de avatar"
        />
      </div>
      <div>
        <label
          ><input type="checkbox" v-model="person.isActive" /> Estatus</label
        >
      </div>
      <button type="submit">Actualizar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
    <pre class="container" hidden style="text-align: left">{{ $data }}</pre>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditPerson",
  components: {},
  data() {
    return {
      person: "",
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  mounted() {
    this.person = {
      id: this.getPerson.id,
      email: this.getPerson.email,
      name: this.getPerson.name,
      photoURL: this.getPerson.photoURL,
      role: this.getPerson.role,
      isActive: this.getPerson.isActive,
      isLock: this.getPerson.isLock,
      createdAt: this.getPerson.createdAt,
      updatedAt: this.getPerson.updatedAt,
    };
  },
  created() {
    this.fetchPerson(this.$route.params.person);
  },
  methods: {
    ...mapActions(["deletePerson", "fetchPerson", "updatePerson"]),
    async putPerson() {
      await this.updatePerson(this.person);

      this.person.name = "";
      this.person.email = "";
      this.person.role = "";
      this.person.photoURL = "";

      await this.$router.replace({
        name: "Person",
        params: { person: this.$route.params.person },
      });
    },
    async removePerson() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        await this.deletePerson(this.$route.params.person);

        await this.$router.replace({ name: "People" });
      }
    },
  },
  computed: {
    ...mapGetters(["getPerson"]),
  },
  watch: {
    $route: ["fetchPerson"],
  },
};
</script>
