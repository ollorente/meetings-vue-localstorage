<template>
  <div class="person">
    <h1 style="margin: 0">{{ person.name }}</h1>
    <h3 style="margin: 0">{{ person.role }}</h3>
    <p>
      <router-link
        :to="{ name: 'EditPerson', params: { person: person.id } }"
        class="link"
        >Editar</router-link
      >
      |
      <router-link :to="{ name: 'People' }" class="link">Volver</router-link>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <img
        :src="
          person.photURL
            ? person.photURL
            : `https://res.cloudinary.com/dbszizqh4/image/upload/v1592198427/images_lvwix2.png`
        "
        :alt="person.name"
        style="
          width: 5rem;
          height: 5rem;
          object-fit: cover;
          position: center center;
          border-raduis: 50%;
        "
      />
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>Email: </b><span>{{ person.email }}</span
      ><br />
      <b>ID: </b><span>{{ person.id }}</span>
    </p>
    <p style="text-align: left; padding: 0 1rem">
      <b>{{ person.isActive ? "Activo" : "Inactivo" }}</b
      ><br />
      <span
        ><b>Creado: </b
        ><span>{{ new Date(person.createdAt).toLocaleDateString() }}</span>
      </span>
      <span v-if="person.createdAt !== person.updatedAt"
        ><br />
        <b>Actualizado: </b
        ><span>{{
          new Date(person.updatedAt).toLocaleDateString()
        }}</span></span
      >
    </p>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "Person",
  components: {},
  data() {
    return {
      person: "",
    };
  },
  created() {
    this.getPerson();
  },
  methods: {
    async getPerson() {
      this.person = await db.people[this.$route.params.person];
    },
  },
};
</script>
