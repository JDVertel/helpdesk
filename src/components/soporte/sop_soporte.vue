<template>
  <div>
    <h1 class="display-6 center">Gestion de Soportes</h1>

    <div class="row">
      <div class="col-6 center">
        <h6 class="display-6">5</h6>
        <p>Ejecutando</p>
      </div>
      <div class="col-6 center">
        <h6 class="display-6">10</h6>
        <p>Cerrados</p>
      </div>
    </div>
    <hr />
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="wait-tab"
          data-bs-toggle="tab"
          data-bs-target="#wait-tab-pane"
          type="button"
          role="tab"
          aria-controls="wait-tab-pane"
          aria-selected="true"
        >
          Sala
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home-tab-pane"
          type="button"
          role="tab"
          aria-controls="home-tab-pane"
          aria-selected="true"
        >
          Pendientes
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
          +Nuevo
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
          Historial
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="wait-tab-pane"
        role="tabpanel"
        aria-labelledby="wait-tab"
        tabindex="0"
      >
        <h4 class="display-6 center">Sala</h4>
        <br />
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Canal</th>
                <th scope="col">Oficina</th>
                <th scope="col">funcionario</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Cerrar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="home-tab-pane"
        role="tabpanel"
        aria-labelledby="home-tab"
        tabindex="0"
      >
        <h4 class="display-6 center">Pendientes</h4>
        <br />
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Oficina</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Cerrar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    cerrar
                  </button>
                </td>
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
      <div
        class="tab-pane fade"
        id="profile-tab-pane"
        role="tabpanel"
        aria-labelledby="profile-tab"
        tabindex="0"
      >
        <br />
        <div class="container campos">
          <div class="row">
            <div class="col-6 col-md-3">Proyecto:</div>
            <div class="col-6 col-md-3">Fecha del reporte</div>
            <div class="col-6 col-md-3">Canal: Presencial</div>
            <div class="col-6 col-md-3">Estado del Soporte: Abierto</div>
          </div>
        </div>

        <br />
        <div class="container">
          <div class="row fila">
            <div class="col-12 col-md-4">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="oficina"
              >
                <option value="0">Oficina</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <input
                type="text"
                class="form-control m-2 campos"
                id="exampleFormControlInput1"
                placeholder="Nombre de funcionario"
                v-model="funcionario"
              />
            </div>
            <div class="col-12">
              <textarea
                type="text"
                class="form-control m-2 campos"
                id="exampleFormControlInput1"
                placeholder="Descripcion de la solicitud"
                v-model="desc_solicitud"
              />
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
        <h3 class="display-6 center">Historial</h3>
        <br />
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Hora</th>
                <th scope="col">Oficina</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Tiempo</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr>
                <th>1</th>
                <td>Mark</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Mark</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>Mark</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>
            Oficina: <br />
            Descripcion:
          </p>
          <hr />
          <div class="row">
            <div class="col-6">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="moduloimpactado"
              >
                <option value="0">Modulo impactado</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            <div class="col-6">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="clasesoporte"
              >
                <option value="0">Clasificacion del Soporte</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <textarea
              type="text"
              class="form-control m-2 campos"
              id="exampleFormControlInput1"
              placeholder="Descripcion de la solucion"
              v-model="desc_solucion"
            />
          </div>

          <div class="row">
            <div class="col-4">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="impacto"
              >
                <option value="0">Impacto</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
              </select>
            </div>
            <div class="col-4">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="urgencia"
              >
                <option value="0">Urgencia</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
              </select>
            </div>
            <div class="col-4">
              <select
                class="form-select m-2 campos"
                aria-label="Default select example"
                v-model="prioridad"
              >
                <option value="0">Prioridad</option>
                <option value="1">Baja</option>
                <option value="2">Media</option>
                <option value="3">Alta</option>
              </select>
            </div>
          </div>

          <div class="col-12">
            <textarea
              type="text"
              class="form-control m-2 campos"
              id="exampleFormControlInput1"
              placeholder="Sugerencias"
              v-model="sugerencias"
            />
          </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-sm btn-primary">Guardar</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      hora: "",
      oficina: "0",
      funcionario: "",
      desc_solicitud: "",
      desc_solucion: "",
      clasesoporte: "0",
      moduloimpactado: "0",
      tiemposoporte: "",
      impacto: "0",
      urgencia: "0",
      prioridad: "0",
      sugerencias: "",
    };
  },
};
</script>

<style scoped>
</style>