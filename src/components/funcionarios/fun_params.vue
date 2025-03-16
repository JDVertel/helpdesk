<template>
  <div>
    <h4>Parametros</h4>
    <hr />

    <div class="container">
      <div class="row">

   
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-4"><strong>Proyecto</strong></div>
          <div class="col-8">Minsalud</div>
        </div>
        <div class="row">
          <div class="col-4"><strong>Piso / oficina </strong></div>
          <div class="col-8">
            <select class="form-select form-select-sm" aria-label="Default select example">
              <option selected>--Opciones--</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-4"><strong>Extencion Oficina</strong></div>
          <div class="col-8">
            <input
              type="number"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="row">
          <div class="col-4"><strong>Nombres</strong></div>
          <div class="col-8">
            <input
              type="text"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4"><strong>Apellidos</strong></div>
          <div class="col-8">
            <input
              type="text"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4"><strong>Usuario/login</strong></div>
          <div class="col-8">
            <input
              type="text"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-4"><strong># Celular</strong></div>
          <div class="col-8">
            <input
              type="number"
              class="form-control form-control-sm"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <br>
        <div><button type="button" class="btn btn-primary btn-sm">Guardar cambios</button></div>
      </div>

    </div>
    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style></style>
