<template>
  <div class="app">
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <!-- Botón movido al lado izquierdo -->
        <button
          class="navbar-toggler me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas configurado para abrirse desde la izquierda -->
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  <i class="bi bi-house-door-fill"></i> Home
                </router-link>
              </li>
              <section v-if="rol == 'enc'">
                <li class="nav-item active" aria-current="page">
                  <strong><i class="bi bi-people-fill"></i> Equipo</strong>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/sop_home">
                    <i class="bi bi-list-check"></i> Encuestas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/sop_profesional">
                    <i class="bi bi-person-circle"></i> Profesionales
                  </router-link>
                </li>
              </section>

              <section v-if="rol == 'admin'">
                <li class="nav-item active" aria-current="page">
                  <strong><i class="bi bi-gear-fill"></i> Admin</strong>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_encuestas">
                    <i class="bi bi-file-earmark-text-fill"></i> Encuestas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_programavisitas">
                    <i class="bi bi-car-front"></i> Prog Visitas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/registrousuarios">
                    <i class="bi bi-person-fill"></i> Usuarios
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_parametros">
                    <i class="bi bi-sliders"></i> Parámetros
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_informes">
                    <i class="bi bi-bar-chart-fill"></i> Informes
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_ips">
                    <i class="bi bi-building"></i> IPS
                  </router-link>
                </li>
              </section>
              <li class="nav-item">
                <router-link class="nav-link" to="/login">
                  <i class="bi bi-building"></i> Login
                </router-link>
              </li>

              <li class="nav-item" @click="logoutUser()">
                
                <i class="bi bi-x-circle"></i> Cerrar sesion
              
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import {
    auth
} from "@/api/firebase";
import {
    signOut
} from "firebase/auth";
export default {
  data() {
    return {
      rol: "",
    };
  },
  computed: {
    token() {
      return localStorage.getItem("token") || "";
    },
  },
  methods: {
    logoutUser() {
      // Aquí puedes agregar la lógica para cerrar sesión con Firebase si usas auth
      // Por ejemplo:
      // signOut(auth).then(() => { ... }).catch(() => { ... });

      localStorage.removeItem("token");
      // Recarga o redirige a login
      this.$router.push("/login");
    },

    async logoutUser() {
            try {
                // Cerrar sesión con Firebase
                await signOut(auth);
                // Eliminar token local si lo usas
                localStorage.removeItem("token");
                localStorage.removeItem("uid");
                // Actualizar estado global y redirigir
                this.$store.dispatch("logout");
                this.$router.push("/logout");
            } catch (error) {
                console.error("Error al cerrar sesión:", error.message);
            }
        }
  },
};
</script>

<style scoped></style>
