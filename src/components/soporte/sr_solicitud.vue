<template>
  <h1 class="display-6">soporte remoto solicitud</h1>
<!--   cargamos: fecha hora, oficina , funcionario, detalle estado -->
  <div class="container">
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
</template>

<script>
export default {};
</script>

<style></style>