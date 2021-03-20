<template>
  <div class="new-person">
    <h1>Nueva persona</h1>
    <p>
      <router-link :to="{ name: 'People' }" class="link">Volver</router-link>
    </p>
    <form @submit.prevent="addPerson">
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
      <button type="submit">Agregar</button>
    </form>
    <div id="alert" v-if="alert.error">
      {{ alert.msg }}
    </div>
  </div>
</template>

<script>
import { db, dbName } from "@/main";

export default {
  name: "NewPerson",
  components: {},
  data() {
    return {
      person: {
        name: null,
        email: null,
        role: null,
      },
      alert: {
        error: true,
        msg: null,
      },
    };
  },
  methods: {
    async addPerson() {
      const user = Object.values(db.people).filter(
        (e) => e.email === this.person.email
      );

      if (user.length > 0) {
        this.alert.error = true;
        this.alert.msg = `El Correo "${this.person.email}" ya existe.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        const date = Date.now();

        const person = {
          id: date,
          name: await this.person.name,
          email: await this.person.email,
          photoURL: "",
          role: await this.person.role,
          isActive: true,
          isLock: false,
          createdAt: date,
          updatedAt: date,
        };

        db.people[person.id] = person;

        localStorage.setItem(dbName, JSON.stringify(db));

        this.person.name = "";
        this.person.email = "";
        this.person.role = "";

        await this.$router.replace({ name: "People" });
      }
    },
  },
};
</script>
