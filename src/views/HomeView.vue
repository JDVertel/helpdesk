<template>
    <div>
      <div class="container">
        <h1>Home</h1>
      </div>
  
      <p v-if="getUserData">
        Nombre: {{ getUserData.nombre }} <br />
        Cargo: {{ getUserData.cargo }} <br />
        Rol: {{ getUserData.rol }} <br />
        Grupo: {{ getUserData.grupo }} <br />
      </p>
      <p v-else>No hay datos disponibles</p>
  
      <footer>
        <p>Propiedad de BigDataManagements.SAS Todos los Derechos Reservados</p>
      </footer>
    </div>
  </template>
  
  <script>
  import logo from "../assets/images/logo_extramurapp.png";
/*   import { signOut } from "firebase/auth";
  import { auth } from "@/api/firebase"; */
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
  /* 
      async logoutUser() {
        try {
          await signOut(auth);
          // Eliminar solo token y uid
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          // Limpiar store (elige solo uno según tu flujo)
          this.$store.commit("RESET_STATE");
          // O bien, si logout ya limpia el estado, solo dispatch
          // await this.logout();
          this.$router.push("/logout");
        } catch (error) {
          console.error("Error al cerrar sesión:", error.message);
        }
      }, */
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
  