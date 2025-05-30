<template>
    <div>
        <div class="container">
            <h1>Home</h1>
            {{ token }}
            {{ uid }}
        </div>

        <footer>
            <p class="fs-6 lh-1"> By BigDataManagements.SAS
                Todos los Derechos Reservados</p>
        </footer>
    </div>
</template>

<script>
import logo from "../assets/images/logo_extramurapp.png";
import {
    signOut
} from "firebase/auth";
import {
    auth
} from "@/api/firebase";
import { mapState } from "vuex";


export default {
    data() {
        return {
            logo,
            token: localStorage.getItem("token"),
        };
    },
    methods: {
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
        },
        computed: {
            ...mapState(["token", "uid"])
        }

    },

};
</script>

<style></style>
