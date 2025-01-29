<template>
  <h1 class="display-6">soporte remoto solicitud</h1>
<!--   cargamos: fecha hora, oficina , funcionario, detalle estado -->

<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">En Cola</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">+ Solicitud</button>
  </li>
<!--   <li class="nav-item" role="presentation">
    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Contact</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false" disabled>Disabled</button>
  </li> -->
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
    <br>
<h6>Cola de soportes (13) </h6>

    <table class="table">
  <thead>
    <tr>
      <th>Solicitante</th>
      <th>Sede</th>
      <th>Oficina</th>
      <th>Detalle</th>
      <th>Estado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td>@mdo</td>
    </tr>
  </tbody>
</table>
  </div>
  <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">

    <div class="container">
      <br>
    <h6>Nueva solicitud de soporte</h6>
    <div class="row centerA">
      <div class="col-12 col-md-6">
        <div class="mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option selected>--Canal de solicitud--</option>
            <option value="1">Telefono</option>
            <option value="2">Correo</option>
            <option value="3">Presencial</option>
          </select>
        </div>
        <div class="mb-3">
          <select
            class="form-select form-select-sm"
            aria-label="Default select example"
          >
            <option selected>--Seleccione oficina--</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div class="mb-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="exampleFormControlInput1"
            placeholder="Nombre de funcionario"
          />
        </div>
      </div>

      <div class="col-12 col-md-6">
        <div class="mb-3">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            placeholder="Descripcion de la solicitud"
          ></textarea>
        </div>
        <button type="button" class="btn btn-primary btn-sm">Enviar</button>
      </div>
    </div>
  </div>
  </div>
<!--   <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">...</div>
  <div class="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabindex="0">...</div> -->
</div>




</template>

<script>
export default {};
</script>

<style></style>