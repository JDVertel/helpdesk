<template>
  <div>
    <div class="container">
  
      <img :src="logo" alt="Logo Extramuralapp" class="logo" />
      <p class="text-center">Facilitando la salud, mejorando vidas</p>
      <div></div>
    </div>

    <footer>
      <p>Propiedad de BigDataManagements.SAS Todos los Derechos Reservados</p>
    </footer>
  </div>
</template>

<script>
import logo from "../assets/images/logo_extramurapp.png";
export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style>
</style>
