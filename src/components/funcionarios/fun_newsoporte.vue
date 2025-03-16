<template>
  <div>
    
<h4>Soportes</h4>
<hr>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">+ Solicitar soporte</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Registro de mis soportes</button>
      </li>
      <!-- <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false" disabled>Disabled</button>
      </li> -->
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
        <div class="container">
          <div class="row mb-2">
            <strong>1. Seleccione su modalidad de trabajo actual</strong>
          </div>
          <select class="form-select form-select-sm mb-3" aria-label="Small select example">
            <option selected>--Opciones--</option>
            <option value="1">Presencial</option>
            <option value="2">Teletrabajo</option>
          </select>
       <div class="container">
        <div class="row mb-2">
          <strong>Datos de contacto</strong>
        </div>
        <div class="row mb-3">
          <div class="row mb-2">
            <div class="col-3">Extencion: <br> 3322</div>
            <div class="col-3">Celular: <br> 3145564332 </div>
            <div class="col-6">Correo: funcionario@minsalud.gov.co</div>
          </div>
          <small>Atencion <br>Estos datos se usaran para comunicarnos y gestionar su solicitud, si los estos son incorrectos deben ser actualizados desde menu/parametros previa solicitud</small>
        </div>
       </div>

          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label"><strong>2. Describa su solicitud</strong></label>
            <textarea class="form-control form-control-sm" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="formFileMultiple" class="form-label"> <strong>3. Seleccione las imagenes referentes a su solicitud</strong>  </label>
            <input class="form-control form-control-sm" type="file" id="formFileMultiple" multiple>
          </div>
          <div class="row mb-3"><small>Para agregar varios archivos simultaneamente debes elegirlos en la ventana  presionando la tecla Ctrl+ Click</small></div>
         
        </div>
       
        <div> <button type="button" class="btn btn-primary btn-sm">Enviar Solicitud</button></div>
      </div>
      <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
        <div class="row">
          <strong> Listado de soportes</strong>
        </div>

    <hr>
    <div class="table-responsive">
        <table class="table table-sm table-borderless">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Clasificacion</th>
              <th>Estado</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              
            </tr>
            <tr>
              <td>Mark</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>








      </div>
     <!--  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">...</div>
      <div class="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabindex="0">...</div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>