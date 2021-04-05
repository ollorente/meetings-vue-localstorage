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
            <h1 class="main__body__section__nav--title">Editar usuario</h1>
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
              <div hidden>
                <label for="isActive" class="form-label"
                  ><input type="checkbox" v-model="person.isActive" />
                  Estatus</label
                >
              </div>
              <div>
                <label for="isActive" class="form-label" @click="isActive"
                  ><i
                    :class="person.isActive ? 'fas' : 'far'"
                    class="fa-circle"
                  ></i>
                  Activo</label
                >
              </div>
              <button type="submit" class="btn-secondary">Actualizar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <pre class="container" hidden>{{ $data }}</pre>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Alert from "@/components/Alert";
import TheSectionNavbar from "@/components/TheSectionNavbar";

export default {
  name: "EditPerson",
  components: {
    Alert,
    TheSectionNavbar,
  },
  data() {
    return {
      person: "",
      titleApp: "Editar usuario",
      icon: "fas fa-arrow-left",
      link: `/usuario/${this.$route.params.person}`,
      alert: {
        error: false,
        msg: null,
      },
      options: [],
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
      if (this.person.name.trim() === "" || this.person.email.trim() === "") {
        this.alert.error = true;
        this.alert.msg = `El Correo y/o Email no pueden ser vacios.`;

        setTimeout(() => {
          this.alert.error = false;
        }, 4000);

        return;
      } else {
        await this.updatePerson(this.person);

        this.person.name = "";
        this.person.email = "";
        this.person.role = "";
        this.person.photoURL = "";

        await this.$router.replace({
          name: "Person",
          params: { person: this.$route.params.person },
        });
      }
    },
    async isActive() {
      this.person.isActive = !this.person.isActive;
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
