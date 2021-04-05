<template>
  <main class="main">
    <Alert :msg="alert.msg" v-if="alert.error" />
    <TheSectionNavbar
      :titleApp="titleApp"
      :icon="icon"
      :link="link"
      :options="options"
    />
    <div class="main__body">
      <div class="main__body__content">
        <div class="main__body__section">
          <div class="main__body__section__nav">
            <h1 class="main__body__section__nav--title">Agregar usuario</h1>
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
              <button type="submit" class="btn-p-light">Agregar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions } from "vuex";
import { db } from "@/main";

import Alert from "@/components/Alert";
import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "NewPerson",
  components: {
    Alert,
    TheSectionNavbar,
  },
  data() {
    return {
      person: {
        name: "",
        email: "",
        role: "",
      },
      alert: {
        error: false,
        msg: null,
      },
      titleApp: "Agregar usuario",
      icon: "fas fa-arrow-left",
      link: `/usuarios`,
      options: [],
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
