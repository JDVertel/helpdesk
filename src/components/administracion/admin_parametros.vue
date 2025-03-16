<template>
  <h1>admin parametros</h1>
  tipos de soporte 
  oficinas
  modulos de evaluacion


  <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Modulos</button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Oficinas</button>
    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Clasificacion de Soporte</button>
    <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Disabled</button>
  </div>
</nav>
<div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
    <br>
<h6>Modulos disponibles para todos los proyectos </h6>
<br>
<div class="row">
  <div class="col-6"><div class="mb-3">
  <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Nombre del nuevo modulo">
</div></div>
  <div class="col-6"><button type="button" class="btn btn-primary btn-sm">Guardar</button></div>
</div>
<hr>
<table class="table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Detalle</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
 
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>

  </tbody>
</table>


  </div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
    <br>
<div class="container">
<div class="row">
<div class="col-6">  <select class="form-select form-select-sm" aria-label="Small select example">
  <option selected>---Seleccione Proyecto---</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select></div>
<div class="col-6">  <select class="form-select form-select-sm" aria-label="Small select example">
  <option selected>---Seleccione Sede---</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select></div>

</div>
<br>
<div class="row">
  <div class="col-6"><div class="mb-3">
  <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Nombre de la nueva oficina">
</div></div>
  <div class="col-6"><button type="button" class="btn btn-primary btn-sm">Guardar</button></div>
</div>
<hr>
<table class="table">
  <thead>
    <tr>
      <th>Proyecto</th>
      <th>Sede</th>
      <th>Oficina</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

</div>

  </div>
  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
    <br>
<h6>Clasificacion de Soporte disponibles para todos los proyectos </h6>
<br>
<div class="row">
  <div class="col-6"><div class="mb-3">
  <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Nombre del nuevo tipo se soporte">
</div></div>
  <div class="col-6"><button type="button" class="btn btn-primary btn-sm">Guardar</button></div>
</div>
<hr>
<table class="table">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Detalle</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
 
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>

  </tbody>
</table>




  </div>
  <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">...</div>
</div>
</template>

<script>
</script>

<style>
</style>