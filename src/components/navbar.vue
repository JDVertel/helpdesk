<template>
  <div class="app">
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <!-- Botón toggler a la izquierda -->
        <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Offcanvas desde la izquierda -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <router-link class="nav-link" to="/" @click="onNavLinkClick">
                  <i class="bi bi-house-door-fill"></i> Home
                </router-link>
              </li>

              <section v-if="rol === 'enc'">
                <li class="nav-item active" aria-current="page">
                  <strong><i class="bi bi-people-fill"></i> Equipo</strong>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/sop_home" @click="onNavLinkClick">
                    <i class="bi bi-list-check"></i> Encuestas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/sop_profesional" @click="onNavLinkClick">
                    <i class="bi bi-person-circle"></i> Profesionales
                  </router-link>
                </li>
              </section>

              <section v-if="rol === 'admin'">
                <li class="nav-item active" aria-current="page">
                  <strong><i class="bi bi-gear-fill"></i> Admin</strong>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_encuestas" @click="onNavLinkClick">
                    <i class="bi bi-file-earmark-text-fill"></i> Encuestas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_programavisitas" @click="onNavLinkClick">
                    <i class="bi bi-car-front"></i> Prog Visitas
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/registrousuarios" @click="onNavLinkClick">
                    <i class="bi bi-person-fill"></i> Usuarios
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_parametros" @click="onNavLinkClick">
                    <i class="bi bi-sliders"></i> Parámetros
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_informes" @click="onNavLinkClick">
                    <i class="bi bi-bar-chart-fill"></i> Informes
                  </router-link>
                </li>

                <li class="nav-item">
                  <router-link class="nav-link" to="/admin_ips" @click="onNavLinkClick">
                    <i class="bi bi-building"></i> IPS
                  </router-link>
                </li>
              </section>

              <li class="nav-item">
                <router-link class="nav-link" to="/login" @click="onNavLinkClick">
                  <i class="bi bi-building"></i> Login
                </router-link>
              </li>
              <li class="nav-item">
                <button class="logout-btn" @click="logoutUser">
                  <i class="bi bi-x-circle"></i> Cerrar sesión
                </button>
              </li>



            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { auth } from "@/api/firebase";
import { signOut } from "firebase/auth";
import { mapState } from "vuex";

export default {
  data() {
    return {
      rol: "",
      uid: "", // Asigna el rol según tu lógica
    };
  },
  methods: {
    async logoutUser() {
      try {
        await signOut(auth);
        localStorage.removeItem("token");
        localStorage.removeItem("uid");
        this.$store.dispatch("logout");
        this.$router.push("/logout");

        this.closeOffcanvas();
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
      }
    },
    closeOffcanvas() {
      const offcanvasEl = document.getElementById("offcanvasNavbar");
      if (offcanvasEl) {
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvasInstance) {
          offcanvasInstance.hide();
        }
      }
    },
    onNavLinkClick() {
      this.closeOffcanvas();
    },
    computed: {
      ...mapState(["uid"]),
      localuid() {
        return localStorage.getItem('uid');
      }


    }
  },
};
</script>

<style scoped>
/* Ajuste para que los elementos ocupen todo el ancho y tengan padding uniforme */
.offcanvas-body ul.navbar-nav {
  width: 100%;
  padding-left: 0;
}

.offcanvas-body ul.navbar-nav>li.nav-item {
  width: 100%;
}

/* Estilo común para enlaces y botón logout */
.offcanvas-body ul.navbar-nav>li.nav-item>a.nav-link,
.offcanvas-body ul.navbar-nav>li.nav-item>button.logout-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #212529;
  /* Color texto nav-link */
  text-decoration: none;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.2s, color 0.2s;
  text-align: left;
}

/* Hover para enlaces y botón */
.offcanvas-body ul.navbar-nav>li.nav-item>a.nav-link:hover,
.offcanvas-body ul.navbar-nav>li.nav-item>button.logout-btn:hover {
  background-color: #e9ecef;
  color: #0d6efd;
}

/* Opcional: que el botón logout no tenga outline al hacer foco */
.logout-btn:focus {
  outline: none;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
