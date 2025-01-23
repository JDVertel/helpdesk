<script>

import navbar from "./components/navbar.vue";
export default {
  components: { navbar },
};
</script>

<template>
  <div>
  <br>
    <navbar> </navbar>
<!--     <br>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
    <RouterView />
  </div>
</template>

<style scoped>
.vertical-menu {
  width: 200px; /* Ancho del menú */
  background-color: #f9f9f9; /* Color de fondo */
  border: 1px solid #ccc; /* Borde */
}

.vertical-menu a {
  display: block; /* Hacer que los enlaces aparezcan uno debajo del otro */
  color: black; /* Color del texto */
  padding: 12px; /* Espaciado interno */
  text-decoration: none; /* Quitar subrayado */
}

.vertical-menu a:hover {
  background-color: #ddd; /* Color de fondo al pasar el mouse */
}

.vertical-menu a.active {
  background-color: #04aa6d; /* Color para el enlace activo */
  color: white; /* Color del texto activo */
}
</style>

