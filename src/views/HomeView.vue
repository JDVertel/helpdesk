<script>
import logo from '@/assets/images/logo_extramurapp.png' // importa la imagen desde assets
export default {
    name: 'App',
    data() {
        return {
            logo
        }
    }
}
</script>

<template>
<main>
    <div class="container-fluid">
        <img :src="logo" alt="Logo Extramuralapp" class="logo" />
        <p>Transformando la salud comunitaria, un dato a la vez</p>
        <h4>Login</h4>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button class="buttonLogin mb-3">Iniciar sesión</button>

        <h6>Version 1.0</h6>
        <br>
        <p>ExtramurApp &#174; - Todos los derechos reservados</p>
        <hr>
        <strong>BigData Managements</strong>

    </div>

</main>
</template>

<style>

</style>
