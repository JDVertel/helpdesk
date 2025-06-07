<template>
  <div class="container loginform">
    <div class="card p-4 shadow" style="max-width: 400px; width: 100%">
      <i class="bi bi-person-circle text-center" style="font-size: 150px"></i>

      <h2 class="text-center mb-4">Iniciar Sesión</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Ingresa tu email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit" class="buttonLogin mb-3 w-100">Entrar</button>
      </form>
      <router-link to="/"> <i class="bi bi-house"></i></router-link>

      <p v-if="errorMessage" class="text-danger mt-3">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import firebase_api from "@/api/ApiFirebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/api/firebase"; // Tu instancia de auth inicializada en firebase.js

import {} from "@/api/ApiFirebase";

export default {
  name: "App",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      logueado: false,
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        const token = await user.getIdToken();
        const uid = user.uid;

        if (!token) {
          throw new Error("No se recibió token de autenticación");
        }

        // Guardar token y uid en el store Vuex
        this.$store.dispatch("login", {
          token,
          uid,
        });

        // Opcional: también guardar en localStorage si quieres persistencia
        localStorage.setItem("token", token);
        localStorage.setItem("uid", uid);

        // Redirigir al dashboard
        this.$router.push("/homeviews");
      } catch (error) {
        if (error.code) {
          switch (error.code) {
            case "auth/user-not-found":
              this.errorMessage = "Usuario no encontrado.";
              break;
            case "auth/wrong-password":
              this.errorMessage = "Contraseña incorrecta.";
              break;
            case "auth/invalid-email":
              this.errorMessage = "Email inválido.";
              break;
            default:
              this.errorMessage = error.message;
          }
        } else {
          this.errorMessage = "Error al iniciar sesión. Intenta de nuevo.";
        }
        console.error("Error en login:", error);
      }
    },
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/homeViews");
    }
  },
};
</script>

<style></style>
