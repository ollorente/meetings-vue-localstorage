<template>
  <div class="new-person">
    <h1 style="margin: 0">Nueva persona</h1>
    <p>
      <router-link :to="{ name: 'People' }" class="link">Volver</router-link>
    </p>
    <form @submit.prevent="newPerson">
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
import { mapActions } from "vuex";
import { db } from "@/main";

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
    ...mapActions(["addPerson"]),
    async newPerson() {
      if (this.person.name.trim() === "" || this.person.email.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `El Correo y/o Email no pueden ser vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
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
          const person = {
            name: this.person.name,
            email: this.person.email,
            role: this.person.role,
          };

          await this.addPerson(person);

          this.person.name = "";
          this.person.email = "";
          this.person.role = "";

          await this.$router.replace({ name: "People" });
        }
      }
    },
  },
};
</script>
