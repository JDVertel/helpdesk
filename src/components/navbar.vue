<template>
  <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid">
        <!-- Botón movido al lado izquierdo -->
        <button
          class="navbar-toggler me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">HelpDesk</a>

        <!-- Offcanvas configurado para abrirse desde la izquierda -->
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <!-- ------------------------------------------- -->
              <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
                
              </li>
              <li class="nav-item">
                
                <a class="nav-link active" aria-current="page" href="#"
                  ><strong>Soporte en Sitio</strong></a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sop_soporte">Soportes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sop_reportes">Reportes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sop_encuesta">Encuestas</a>
              </li>

              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"
                  ><strong>Soporte Remoto</strong></a
                >
                <!-- --------------------------------------------------- -->
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sr_solicitud">+ Solicitud</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/sr_reportes">Reportes</a>
               
              </li>

              <li class="nav-link active" aria-current="page" href="#">
                <strong>Administracion</strong>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin_proyectos">Proyectos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin_usuarios">Usuarios</a>
              </li>
<!--               <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="admin_parametros"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  parametros
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">Tipos de soporte</a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">Modulos evaluados</a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li><a class="dropdown-item" href="#">Seguridad</a></li>
                </ul>
              </li> -->
              <li class="nav-item">
                <a class="nav-link" href="/admin_parametros">Parametros</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/admin_informes">Informes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">+ Encuestas</a>
              </li>
              <hr class="dropdown-divider" />
              <li class="nav-item">
                <!-- ------------------------------------------- -->
                <a class="nav-link active" aria-current="page" href="#"
                  ><strong>Clientes</strong></a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">+ Solicitud</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Informes de soportes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Estadisticas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Informes ANS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Estadisticos Encuestas</a>
              </li>

              <!-- ------------------------------------------- -->
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"
                  ><strong>Gerencial</strong></a
                >
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">Resumen Proyectos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Estadisticos Encuestas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">ANS generales</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"
                  ><strong>Acerca de...</strong></a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {};
</script>

<style>
</style>