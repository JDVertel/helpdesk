<template>
  <h1>Admin Proyectos</h1>
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
        Proyectos
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
        + Proyecto
      </button>
    </li>
    <!--     <li class="nav-item" role="presentation">
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
        Contact
      </button>
    </li>
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
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
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
                placeholder="Nombre de proyecto"
              />
            </div>
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Fecha Inicial</label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label">Fecha Final</label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Fecha Fin"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="mb-3">
              <textarea
                placeholder="Descripcion"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div class="col-4">
            <button type="button" class="btn btn-primary btn-sm">Crear</button>
          </div>
        </div>
      </div>
    </div>
    <!--   <div
      class="tab-pane fade"
      id="contact-tab-pane"
      role="tabpanel"
      aria-labelledby="contact-tab"
      tabindex="0"
    >
      ...
    </div>
    <div
      class="tab-pane fade"
      id="disabled-tab-pane"
      role="tabpanel"
      aria-labelledby="disabled-tab"
      tabindex="0"
    >
      ...
    </div> -->
  </div>
</template>

<script>
</script>

<style>
</style>