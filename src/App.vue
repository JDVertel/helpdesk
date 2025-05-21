<script>

import navbar from "./components/navbar.vue";
export default {
  components: { navbar },
};
</script>

<template>
  <div class="apk">
  <br>
    <navbar> </navbar>
<!--     <br>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink> -->
    <RouterView />
  </div>
</template>

<style scoped>

</style>

