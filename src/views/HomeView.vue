<template>
<div>
    <div class="container">
<h1>Home</h1>

    </div>

    <footer>
        <p> Propiedad de BigDataManagements.SAS
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
import {
    mapActions,
    mapState
} from "vuex";

export default {
    data() {
        return {
            logo,
            token: localStorage.getItem("token"),
        };
    },
    methods: {
        /*   ...mapActions([""]); */
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

<style>
footer {
    position: fixed;
    /* Fija el footer en la parte inferior de la ventana */
    bottom: 0;
    /* Posición en la parte inferior */
    left: 0;
    /* Alineado al borde izquierdo */
    width: 100%;
    /* Ocupa todo el ancho de la pantalla */
    background-color: #ececec;
    /* Color de fondo (puedes cambiarlo) */
    color: white;
    /* Color del texto */
    padding: 15px 0;
    /* Espaciado interno */
    text-align: center;
    /* Centrar contenido */
    z-index: 1000;
    /* Para que esté encima de otros elementos */
    box-sizing: border-box;
    /* Para que el padding no aumente el ancho */
}
</style>
