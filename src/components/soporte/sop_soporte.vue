<template>
  <div>
    <h1 class="display-6 center">Programa de Gestion Extramural</h1>

    <hr />
    {{ fechaActual }}
    <div class="row">
      <div class="col-6 center">
        <h6 class="display-6">{{ totalRegisters }}</h6>
        <p>Totales</p>
      </div>
      <div class="col-6 center">
        <h6 class="display-6">{{ getFilteredRegistersCount }}</h6>
        <p>Diarias</p>
      </div>
    </div>

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
          + Registro
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
        <h5>Encuestas Activas</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Fecha vigencia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a class="btn btn-primary btn-sm" href="/sop_encuesta">
                  <i class="bi bi-check-square"></i>
                </a>
              </td>
              <td>Extramural</td>
              <td>15/12/2025</td>
            </tr>
          </tbody>
        </table>
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
                <th scope="col">Paciente</th>
                <th scope="col">TipoActividad</th>
                <th scope="col">Poblacion Riesgo</th>
                <th scope="col">Eliminar</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(encuesta, index) in getFilteredRegisters" :key="index">
                <td>{{ encuesta.nombre1 }} {{ encuesta.apellido1 }}</td>
                <td>{{ encuesta.tipoActividad }}</td>
                <td>{{ encuesta.poblacionRiesgo }}</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="removeRegEncuesta(encuesta.id)"
                  >
                    <i class="bi bi-x-circle"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      fechaActual: "",
    };
  },

  methods: {
    ...mapActions(["getAllRegisters", "removeRegEnc"]),

    removeRegEncuesta(id) {
      this.removeRegEnc(id);
      alert("Registro eliminado exitosamente.");
      this.getAllRegisters(1);
    },
  },

  computed: {
    ...mapState(["encuestas"]),

    totalRegisters() {
      return this.encuestas.length;
    },

    getFilteredRegisters() {
      return this.encuestas.filter((encuesta) => encuesta.fecha === this.fechaActual);
    },

    getFilteredRegistersCount() {
      return this.getFilteredRegisters.length;
    },
  },
  mounted() {
    this.getAllRegisters(1);
    this.fechaActual = moment().format("YYYY-MM-DD");
  },
};
</script>

<style></style>
