<template>
  <h1>Admin usuarios</h1>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="home-tab"
        data-bs-toggle="tab"
        data-bs-target="#home-tab-pane"
        type="button"
        role="tab"
        aria-controls="home-tab-pane"
        aria-selected="true"
      >
        Usuarios
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile-tab-pane"
        type="button"
        role="tab"
        aria-controls="profile-tab-pane"
        aria-selected="false"
      >
        + Usuarios
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#contact-tab-pane"
        type="button"
        role="tab"
        aria-controls="contact-tab-pane"
        aria-selected="false"
      >
        Grupos
      </button>
    </li>
    <!--    
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="disabled-tab"
        data-bs-toggle="tab"
        data-bs-target="#disabled-tab-pane"
        type="button"
        role="tab"
        aria-controls="disabled-tab-pane"
        aria-selected="false"
        disabled
      >
        Disabled
      </button>
    </li> -->
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="home-tab-pane"
      role="tabpanel"
      aria-labelledby="home-tab"
      tabindex="0"
    >
      <table class="table table-striped table sm">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Grupos</th>
            <th scope="col">Estado</th>
            <th scope="col">Seguridad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>juan pablo becerra</th>
            <td>
              minsalud/principal <br />
              minsalud/FNE
            </td>
            <td>Activo</td>
            <td>
              <button type="button" class="btn btn-primary btn-sm">?</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      class="tab-pane fade"
      id="profile-tab-pane"
      role="tabpanel"
      aria-labelledby="profile-tab"
      tabindex="0"
    >
      <br />
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Nombres"
              />
            </div>
            <div class="mb-3">
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Apellidos"
              />
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="mb-3">
              <input
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Documento"
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
              />
            </div>
          </div>
          <div class="col-4">
            <button type="button" class="btn btn-primary btn-sm">Crear</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade"
      id="contact-tab-pane"
      role="tabpanel"
      aria-labelledby="contact-tab"
      tabindex="0"
    >
      <br />
      <h6>
        Seleccione el proyecto y la sede en la que desea adicionar el usuario
      </h6>
      <hr />
      <div class="container">
        <div class="row">
          <div class="col-6">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option selected>---Seleccione Proyecto---</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-6">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option selected>---Seleccione Sede---</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <div class="container">
        <div class="row">
          <div class="col-6">
            <select
              class="form-select form-select-sm"
              aria-label="Small select example"
            >
              <option selected>---Seleccione Usuario---</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-primary btn-sm">
              Adicionar
            </button>
          </div>
        </div>
          <br />
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
                <td>   <button type="button" class="btn btn-success btn-sm">
              Activo
            </button></td>
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
  </div>
  <!--   <div
      class="tab-pane fade"
      id="disabled-tab-pane"
      role="tabpanel"
      aria-labelledby="disabled-tab"
      tabindex="0"
    >
      ...
    </div> -->
</template>

<script>
</script>

<style>
</style>