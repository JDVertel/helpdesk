<template>
<div class="app">
    <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
            <!-- Botón movido al lado izquierdo -->
            <button class="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">ExtramurApp</a>

            <!-- Offcanvas configurado para abrirse desde la izquierda -->
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link" href="/"><i class="bi bi-house-door-fill"></i> Home</a>
                        </li>
                        <li class="nav-link active" aria-current="page" href="#">
                            <strong><i class="bi bi-people-fill"></i> Equipo</strong>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/sop_soporte"><i class="bi bi-list-check"></i> Encuestas</a>
                        </li>
                        <li class="nav-link active" aria-current="page" href="#">
                            <strong><i class="bi bi-gear-fill"></i> Admin</strong>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin_encuestas"><i class="bi bi-file-earmark-text-fill"></i> Encuestas</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin_usuarios"><i class="bi bi-person-fill"></i> Usuarios</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin_parametros"><i class="bi bi-sliders"></i> Parametros</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin_informes"><i class="bi bi-bar-chart-fill"></i> Informes</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/admin_ips"><i class="bi bi-building"></i> IPS</a>
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
    RouterLink,
    RouterView
} from "vue-router";
export default {};
</script>

<style>
</style>
