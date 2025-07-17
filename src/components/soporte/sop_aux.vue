<template>
<div>
    <h1 class="display-6 center">{{ userData.cargo }}</h1>
    <h5>Aux</h5>
    <div class="row">
        <div class="col-6 center">
            <h6 class="display-6">{{ cantEncuestas }}</h6>
            <p>Totales</p>
        </div>
        <div class="col-6 center">
            <h6 class="display-6">{{ encuestasToday.length }}</h6>
            <p>Diarias</p>
        </div>
    </div>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                Abiertas
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="today-tab" data-bs-toggle="tab" data-bs-target="#today-tab-pane" type="button" role="tab" aria-controls="wait-tab-pane" aria-selected="true">
                Diarias
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="wait-tab" data-bs-toggle="tab" data-bs-target="#wait-tab-pane" type="button" role="tab" aria-controls="today-tab-pane" aria-selected="true">
                + Registro
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <h5>Encuestas Pendientes x visita</h5>
            <br />
            <div class="container contenedor-centrado">
                <div class="table-responsive" style="max-height: 600px; overflow-y: auto;"></div>
                <table class="table table-sm table-bordered table-hover table-striped  w-auto">
                    <thead>
                        <tr>
                            <th scope="col">Detalle de Actividades</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(encuesta, index) in encuestas" :key="index">
                            <td>
                                <small>
                                    <strong>Paciente:
                                        {{ encuesta.nombre1 }} {{ encuesta.nombre2 }} {{ encuesta.apellido1 }} {{ encuesta.apellido2 }}</strong> | <strong>Eps:</strong>{{ encuesta.eps }} | <strong>F Nacimiento:</strong> {{ encuesta.fechaNac }} / <small> <strong>P Riesgo:</strong> {{ encuesta.poblacionRiesgo }}</small> / <small><strong>F Encuesta:</strong> {{ encuesta.fecha }}</small>
                                </small>
                                <hr />
                                <small>
                                    <strong>Actividades:</strong>
                                    {{ this.nombresActividades(encuesta.tipoActividad) }}</small>

                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <div v-if="encuesta.Agenda_tomademuestras?.cita_tomamuestras === false">
                                        <button type="button" class="btn btn-success btn-sm" @click="Agendar(encuesta.id, 'tomamuestras')">
                                            <i class="bi bi-droplet-half"> <small> Lab</small></i>
                                        </button>
                                    </div>
                                    <div v-else-if="
                          encuesta.Agenda_tomademuestras?.cita_tomamuestras === undefined
                        ">
                                        <button type="button" class="btn btn-success btn-sm" @click="Agendar(encuesta.id, 'tomamuestras')">
                                            <i class="bi bi-droplet-half"> <small> Lab</small></i>
                                        </button>
                                    </div>

                                    <div v-else>

                                        <h5> <span class="badge text-bg-secondary"> <i class="bi bi-check2-circle mt-1"></i>lab ok</span></h5>

                                    </div>

                                    <div v-if="encuesta.Agenda_Visitamedica?.cita_visitamedica === false">
                                        <button type="button" class="btn btn-info btn-sm" @click="Agendar(encuesta.id, 'visitamedica')">
                                            <i class="bi bi-houses"><small> Visita</small></i>
                                        </button>
                                    </div>
                                    <div v-else-if="
                          encuesta.Agenda_Visitamedica?.cita_visitamedica === undefined
                        ">
                                        <button type="button" class="btn btn-info btn-sm" @click="Agendar(encuesta.id, 'visitamedica')">
                                            <i class="bi bi-houses"><small> Visita</small></i>
                                        </button>
                                    </div>
                                    <div v-else>

                                        <h5> <span class="badge text-bg-secondary"> <i class="bi bi-check2-circle"></i>visita ok</span></h5>
                                    </div>

                                    <div v-if="encuesta.status_caracterizacion === false">
                                        <button type="button" class="btn btn-warning btn-sm" @click="Caracterizar(encuesta.id)">
                                            <i class="bi bi-calendar2-check">
                                                <small> Caract</small></i>
                                        </button>
                                    </div>
                                    <div v-else>

                                        <h5> <span class="badge text-bg-secondary"> <i class="bi bi-check2-circle"></i>caract ok</span></h5>
                                    </div>

                                    <div>
                                        <button type="button" class="btn btn-danger btn-sm" @click="cupsGestion(encuesta.id)">
                                            <i class="bi bi-calendar2-heart-fill">
                                                <small> Cups</small></i>
                                        </button>
                                    </div>
                                </div>

                            </td>

                        </tr>
                    </tbody>
                </table>
           
        </div>
    </div>
    <div class="tab-pane fade" id="today-tab-pane" role="tabpanel" aria-labelledby="today-tab" tabindex="0">
        <h5>Encuestas Diarias</h5>

        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">Detalle</th>

                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(encuesta, index) in this.encuestasToday" :key="index">
                    <td>
                        Paciente: {{ encuesta.nombre1 }} {{ encuesta.apellido1 }}
                        <hr />
                        Actividades:{{ this.nombresActividades(encuesta.tipoActividad) }}
                        <hr />
                        P Riesgo: {{ encuesta.poblacionRiesgo }}
                    </td>

                    <td>
                        <div class="col-4">
                            <button type="button" class="btn btn-danger btn-sm" @click="removeRegEncuesta(encuesta.id)" v-if="encuesta.status_tomamuestras == ''">
                                <i class="bi bi-x-circle"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
    <div class="tab-pane fade" id="wait-tab-pane" role="tabpanel" aria-labelledby="wait-tab" tabindex="0">
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
                        <RouterLink class="btn btn-secondary btn-sm" to="/sop_encuesta">
                            <i class="bi bi-check-square"></i>
                        </RouterLink>
                    </td>
                    <td>Extramural</td>
                    <td>15/12/2025</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
</template>

<script>
import {
    mapActions,
    mapState
} from "vuex";
import moment from "moment";
export default {
    data() {
        return {
            fechaActual: "",
        };
    },

    methods: {
        ...mapActions([
            "removeRegEnc",
            "getAllRegistersByFechaStatus",
            "getAllRegistersByIduser",
            "getAllRegistersByFecha",
            " SelectExistenteAgendas",
        ]),

        removeRegEncuesta(id) {
            this.removeRegEnc(id);
            alert("Registro eliminado exitosamente.");
            this.getAllRegistersByFecha({
                idUsuario: this.userData.numDocumento,
                fecha: this.fechaActual,
            });
            this.getAllRegistersByFechaStatus({
                idUsuario: this.userData.numDocumento,
            });

        },
        Agendar(id, tipo) {
            this.$router.push({
                name: "sop_agendamiento",
                params: {
                    idEncuesta: id,
                    tipo: tipo,
                },
            });
        },
        Caracterizar(id) {
            this.$router.push({
                name: "sop_caracterizacion",
                params: {
                    idEncuesta: id,
                },
            });
        },

        cupsGestion(id) {
            this.$router.push({
                name: "sop_cups",
                params: {
                    idEncuesta: id,
                },
            });
        },

        nombresActividades(act) {
            // Devuelve un array solo con los nombres
            return Object.values(act).map((a) => a.nombre);
        },
    },

    computed: {
        ...mapState(["encuestas", "userData", "cantEncuestas", "encuestasToday"]),
        documento() {
            return this.userData.numDocumento;
        },

        totalRegisters() {
            return this.encuestas.length;
        },
    },
    async mounted() {
        this.fechaActual = moment().format("YYYY-MM-DD");

        //encuestas diarias + contador
        await this.getAllRegistersByFecha({
            idUsuario: this.userData.numDocumento,
            fecha: this.fechaActual,
        });

        //encuestas abiertas
        await this.getAllRegistersByFechaStatus({
            idUsuario: this.userData.numDocumento,
        });

    },
};
</script>

<style>
.btn-group {
    display: flex !important;
    justify-content: space-between;
    width: 100%;
    /* Hace que el grupo ocupe todo el ancho del contenedor padre */
}

table,
th,
td,
tbody,
thead {
    border: 1px solid #000;
    /* Cambia el grosor y color según prefieras */
}

table {
    border-collapse: collapse;
    /* Opcional: para que los bordes no se dupliquen */
}
</style>
