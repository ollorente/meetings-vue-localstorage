<template>
  <div class="edit-person">
    <h1 style="margin: 0">Editar "{{ person.email }}"</h1>
    <p>
      <a href="#" @click="deletePerson" class="link">Eliminar</a>
      |
      <router-link
        :to="{ name: 'Person', params: { person: person.id } }"
        class="link"
        >Volver</router-link
      >
    </p>
    <form @submit.prevent="updatePerson">
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
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "EditPerson",
  components: {},
  data() {
    return {
      person: {
        id: "",
        email: "",
        name: "",
        photoURL: "",
        role: "",
        isActive: "",
        isLock: "",
        createdAt: "",
      },
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  created() {
    this.getPerson();
  },
  methods: {
    async getPerson() {
      const data = await db.people[this.$route.params.person];

      this.person = {
        id: data.id,
        email: data.email,
        name: data.name,
        photoURL: data.photoURL,
        role: data.role,
        isActive: data.isActive,
        isLock: data.isLock,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      };
    },
    async updatePerson() {
      const date = Date.now();

      const person = {
        id: this.person.id,
        name: this.person.name,
        email: this.person.email,
        photoURL: this.person.photoURL,
        role: this.person.role,
        isActive: this.person.isActive,
        isLock: this.person.isLock,
        createdAt: this.person.createdAt,
        updatedAt: date,
      };

      db.people[person.id] = person;

      localStorage.setItem(dbName, JSON.stringify(db));

      this.person.name = "";
      this.person.email = "";
      this.person.role = "";
      this.person.photoURL = "";

      await this.$router.replace({
        name: "Person",
        params: { person: person.id },
      });
    },
    async deletePerson() {
      if (window.confirm(`Está a punto de borrar un elemento`)) {
        delete db.people[this.$route.params.person];

        localStorage.setItem(dbName, JSON.stringify(db));

        await this.$router.replace({ name: "People" });
      }
    },
  },
};
</script>
