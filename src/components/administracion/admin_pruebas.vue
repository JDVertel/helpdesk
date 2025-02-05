<template>
  <div>
    <h1>
      Administracion de pruebas de Software
    </h1>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Pruebas</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">+ Prueba</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">+ Solicitud</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">Editar</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <p>listado de pruebas creadas para el sistema( nombre caso de uso,version,fecha,estado )</p>
<div class="container contenedorsombra">
  <div class="row">
      <div class="col-4"><h6>Version Evaluada</h6>  <hr> <p class="display-6">456</p></div>
      <div class="col-4"><h6>Estado de pruebas</h6> <hr> <p class="display-6">70%</p></div>
      <div class="col-4"><h6>Pruebas realizadas</h6> <hr> <p class="display-6">15</p></div>
    </div>
</div>
   <hr>
    <table class="table table-sm">
  <thead>
    <tr>
      <th scope="col">Version</th>
      <th scope="col">modulo</th>
      <th scope="col">Caso de uso</th>
      <th scope="col">Fecha</th>
      <th scope="col">estado</th>
      <th scope="col">Opciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">453</th>
      <td>Memorando virtual</td>
      <td>crear_documento</td>
      <td>02-02-2025</td>
      <td>Ok</td>
      <td>Ver</td>
    </tr>
    <tr>
      <th scope="row">453</th>
      <td>Procesador de texto</td>
      <td>Crear  documento</td>
      <td>02-02-2025</td>
      <td>error</td>
      <td>ver- nueva</td>
    </tr>
    <tr>
      <th scope="row">453</th>
      <td>Procesador de texto</td>
      <td>clasificar documento</td>
      <td>02-02-2025</td>
      <td>error</td>
      <td>ver- nueva</td>
    </tr>
  </tbody>
</table>

  </div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
    <p>crear una nueva prueba (datos base, nueva prueba  )</p> <hr>
    <p>estructuracion de las pruebas en casos de uso nombre, fecha ultima mod  (modulo-caso de uso- comportamiento, complejidad, esperado-cumple o no , detalle )</p> <hr>
    <p>las pruebas creadas deben ser generales para quedar disponible en todos los proyectos</p> <hr>
  
  </div>
  <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
    <p> este modulo debe generar una nuevas orden de pruebas basadas en una nueva version <hr>
      version-seleccionar pruebas a realizar <hr> visualizar estado de pruebas % en tabla cantidad de pruebas realizadas de este tipo


    </p>
  </div>
  <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">
    <p>editar una prueba <hr> crearle nuevos caso de uso <hr> inabilitarla, editar contenido</p>
  </div>
</div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>


.contenedorsombra{
background-color:#e5e8e8;
text-align: center;
border-radius: 15px;

}
</style>