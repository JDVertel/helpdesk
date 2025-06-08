<template>
    <div>
      <div class="container">
        <h1>Bienvenido</h1>
      </div>
  <hr>
      <p v-if="getUserData">
        Nombre: {{ getUserData.nombre }} <br />
        Cargo: {{ getUserData.cargo }} <br />
        Rol: {{ getUserData.rol }} <br />
        Grupo: {{ getUserData.grupo }} <br />
      </p>
      <p v-else>Cargando...</p>
  
      <footer>
        <p>Propiedad de BigDataManagements.SAS Todos los Derechos Reservados</p>
      </footer>
    </div>
  </template>
  
  <script>
  import logo from "../assets/images/logo_extramurapp.png";
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        logo,
        token: localStorage.getItem("token"),
        uid: localStorage.getItem("uid"),
      };
    },
    methods: {
      ...mapActions(["fetchUserDataByUid"]),

    },
    computed: {
      ...mapGetters(["getUserData"]),
    },
    mounted() {
      if (this.uid) {
        this.fetchUserDataByUid(this.uid);
      } else {
        console.warn("UID no disponible para cargar datos de usuario");
      }
    },
  };
  </script>
  
  <style>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #ececec;
    color: #333; /* Cambiado a gris oscuro para mejor legibilidad */
    padding: 15px 0;
    text-align: center;
    z-index: 1000;
    box-sizing: border-box;
  }
  </style>
  