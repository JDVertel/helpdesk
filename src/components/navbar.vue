<template>
<div class="app">
    <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <!-- Botón toggler a la izquierda -->
            <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div>
                <h6 v-if="userData" class="text-sm-end text-capitalize blanco">
                    {{ userData.nombre || "" }} /
                    {{ userData.cargo || "" }}
                </h6>
            </div>

            <!-- Offcanvas desde la izquierda -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <div class="row">
                        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
                        <h6 v-if="userData">{{ userData.cargo || "" }}</h6>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

                            <li class="nav-item active" aria-current="page">
                                <strong><i class="bi bi-people-fill"></i> Equipo</strong>
                            </li>

                            <li class="nav-item" v-if="userData && (userData.cargo === 'Auxiliar de enfermeria')">
                                <router-link class="nav-link" to="/sop_aux" @click="onNavLinkClick" >
                                    <i class="bi bi-person-circle"></i> Auxiliar
                                </router-link>
                            </li>

                            <li class="nav-item" v-if="userData && (userData.cargo === 'Medico')">
                                <router-link class="nav-link" to="/sop_profesional" @click="onNavLinkClick" >
                                    <i class="bi bi-person-circle"></i> Medico
                                </router-link>
                            </li>
                            <li class="nav-item"  v-if="userData && (userData.cargo === 'Enfermero')">
                                <router-link class="nav-link" to="/sop_enfermero" @click="onNavLinkClick">
                                    <i class="bi bi-person-circle"></i> Enfermer@
                                </router-link>
                            </li>
                            <li class="nav-item" v-if="userData && (userData.cargo === 'Auxiliar de enfermeria' || userData.cargo === 'Enfermero' || userData.cargo === 'Medico')">
                                <router-link class="nav-link" to="/admin_informes" @click="onNavLinkClick" >
                                    <i class="bi bi-bar-chart-fill"></i> Informes
                                </router-link>
                            </li>
                        

                        <template v-if="userData && userData.cargo === 'admin'">
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
                        </template>

                        <li class="nav-item">
                            <router-link class="nav-link" to="/" @click="onNavLinkClick">
                                <i class="bi bi-house-door-fill"></i> Home
                            </router-link>
                        </li>

                        <li class="nav-item">
                            <button type="button" class="logout-btn" @click="logoutUser">
                                <i class="bi bi-x-circle"></i> Salir
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
import {
    auth
} from "@/api/firebase";
import {
    signOut
} from "firebase/auth";
import {
    mapState,
    mapActions
} from "vuex";
// En navbar.vue

export default {
    methods: {
        ...mapActions(["userLogout"]),
        clearLocalStorage() {
            localStorage.removeItem("token");
            localStorage.removeItem("uid");
        },
        async logoutUser() {
            try {
                this.userLogout();
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
            }
        },

        closeOffcanvas() {
            const offcanvasEl = document.getElementById("offcanvasNavbar");
            if (offcanvasEl && window.bootstrap) {
                let offcanvasInstance = window.bootstrap.Offcanvas.getInstance(offcanvasEl);
                if (!offcanvasInstance) {
                    offcanvasInstance = new window.bootstrap.Offcanvas(offcanvasEl);
                }
                offcanvasInstance.hide();
            }
        },
        onNavLinkClick() {
            this.closeOffcanvas();
        },
    },
    computed: {
        ...mapState(["uid", "userData"]),
    },
};
</script>

<style scoped>

</style>
