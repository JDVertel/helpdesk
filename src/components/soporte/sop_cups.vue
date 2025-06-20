<template>
<div>
    <h3>Página de gestión de cups</h3>

    id de la consulta {{ idEncuesta }}
    <h4>Información de la encuesta</h4>
    <div v-if="InfoEncuestasById.length === 0">
        <p>No hay información disponible para esta encuesta.</p>
    </div>

    <div v-for="item in InfoEncuestasById" :key="item.id" class="mb-4">
      <p><strong>Nombre:</strong> {{ item.nombre1 }} {{ item.apellido1 }}</p>
      <h5>Items del paciente</h5>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Items</th>
            <th>Cups</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(actividad, i) in item.tipoActividad" :key="i">
            <td>{{ actividad }}</td>
            <td>xxxxxxx</td>
            <td>
              <!-- Aquí puedes poner un botón funcional -->
              <button class="btn btn-primary btn-sm">+Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
</div>
</template>

<script>
import {
    mapActions,
    mapState
} from "vuex";

export default {
    data() {
        return {
            idEncuesta: null,
            actividades: [],

        };
    },
    computed: {
        ...mapState(["InfoEncuestasById"]),
    },
    methods: {
        ...mapActions(["getAllEncuestasById"]),
    },
    mounted() {
        this.idEncuesta = this.$route.params.idEncuesta;
        this.getAllEncuestasById(this.idEncuesta);
    },
};
</script>

<style></style>
