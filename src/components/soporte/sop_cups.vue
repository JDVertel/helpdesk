<template>
<div>
    <h5>Página de gestión de cups</h5>
    {{ idEncuesta }}
    <hr />
    {{ InfoEncuestasById[0] ? InfoEncuestasById[0].eps : "" }}
    <hr />
    <div v-if="InfoEncuestasById.length === 0">
        <p>No hay información disponible para esta encuesta.</p>
    </div>

    <hr />
    <div v-for="item in InfoEncuestasById" :key="item.id" class="mb-4">
        <p>
            Paciente: {{ item.nombre1 }} {{ item.nombre2 }} {{ item.apellido1 }}
            {{ item.apellido2 }} / Eps:{{ item.eps }}
        </p>
        <hr />
        <h6>Items del paciente</h6>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Items</th>
                    <th>Cups</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(actividad, index) in item.tipoActividad" :key="index">
                    <td>{{ actividad }}</td>
                    <td>xxxxxxx</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="clear">
                            + Añadir Cup
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr />
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Añadir Cup</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Seleccione el cup que desea añadir a la actividad realizada al paciente
                <div class="row">
                    <div class="mb-3">

                        <br />
                        <select v-model="CupsSeleccionado" class="form-select" id="cupSelect">
                            <option value="">Seleccione CUPS</option>
                            <option v-for="cup in this.cupsEPS" :key="cup.id" :value="cup">
                                {{ cup.DescripcionCUP }}
                            </option>
                        </select>
                        <button class="btn btn-primary btn-sm mt-2" @click="addCups(CupsSeleccionado)">
                            + Agregar
                        </button>
                    </div>
                </div>
                <hr />
            </div>
            <div class="modal-body">
              
                <h6>Cups seleccionados:</h6>
         

                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Cups /grupo</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Grupo</th>
               
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(cup, index) in cupsArray" :key="index">
                        <th> {{  cup.Homolog }} </th>
                        <td>  {{ cup.DescripcionCUP }}</td>
                        <td> {{ cup.Grupo }}</td>
                      </tr>
                
                    </tbody>
                  </table>
                <hr />
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" @click="confirmarSeleccion">
                        Entendido
                    </button>
                </div>
            </div>
        </div>
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
            CupsFiltradosByEPs: [],
            CupsSeleccionado: {},
            cupsArray: [], // Esta propiedad se usará para almacenar los cups seleccionados
        };
    },
    computed: {
        ...mapState(["InfoEncuestasById", "userData", "cups", "encuestas"]),

        dataencuesta() {
            return this.encuestas.length > 0 ? this.encuestas[0] : null;
        },

        cupsEPS() {
            if (!this.cups || !this.dataencuesta || !this.dataencuesta.eps) return [];
            return this.cups.filter(
                (cup) =>
                Array.isArray(cup.Eps) &&
                cup.Eps.includes(this.InfoEncuestasById[0].eps) &&
                cup.Profesional == this.userData.cargo
            );
        },

        addCups() {
            if (this.CupsSeleccionado !== "") {
                this.cupsArray.push(this.CupsSeleccionado);
                this.CupsSeleccionado = {}; // Se recomienda usar camelCase para variables
            } else {
                alert("Seleccione una opción válida.");
            }
            return this.CupsSeleccionado;
        },
    },
    methods: {
        ...mapActions(["getAllEncuestasById", "getAllCups"]),
        clear() {
            this.CupsSeleccionado ="";
            this.cupsArray = []; // Limpiar el array de cups seleccionados al abrir el modal
        },
    },
    mounted() {
        this.idEncuesta = this.$route.params.idEncuesta;
        this.getAllEncuestasById(this.idEncuesta);
        this.getAllCups();
    },
};
</script>

<style>
select {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
