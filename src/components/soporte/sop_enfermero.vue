<template>
<div>
    <h1 class="display-6 center">{{ userData.cargo }}</h1>
 
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
            <div class="container-fluid" style="max-height: 600px; overflow-y: auto;">

                <div class="row fila-con-columnas" tr v-for="(encuesta, index) in encuestas" :key="index">
                    <hr>
                    <div class="col-12 col-md-3 p-1 paciente"> <small>
                            <strong> Paciente:</strong> {{ encuesta.nombre1 }} {{ encuesta.nombre2 }} {{ encuesta.apellido1 }} {{ encuesta.apellido2 }} <strong>| Eps:</strong>{{
                      encuesta.eps
                    }}
                            <hr>
                            <small> <strong>F Encuesta:</strong> {{ encuesta.fecha }}</small>
                        </small></div>
                    <!--  -->

                    <!--  -->
                    <div class="col-12 col-md-5 Actividades p-1"> <small>
                            <strong> Actividades:</strong>
                            {{ this.nombresActividades(encuesta.tipoActividad) }}</small>
                        <hr>
                        <small> <strong>P Riesgo: </strong>{{ encuesta.poblacionRiesgo }}</small></div>
                    <!--  -->

                    <div class="col-12 col-md-4 p-1 cupsAsignados">

                        <div class="row">
                            <div class="col-6">
                                <div>
                                    <span class="badge" :class="encuesta.status_gest_medica ? 'bg-success' : 'bg-secondary'">
                                        Gestión médica: {{ encuesta.status_gest_medica ? 'Completada' : 'Pendiente' }}
                                    </span>
                                    <span class="badge ms-1" :class="encuesta.status_gest_aux ? 'bg-success' : 'bg-secondary'">
                                        Gestión auxiliar: {{ encuesta.status_gest_aux ? 'Completada' : 'Pendiente' }}
                                    </span>
                                </div>
                            </div>
                            <div class="col-6">
                                <div>
                                    <button type="button" class="btn btn-danger btn-sm" @click="cupsGestion(encuesta.id)">
                                        <i class="bi bi-calendar2-heart-fill">
                                            <small> Gestionar Cups</small></i>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!--  -->
                </div>
            </div>
            <br />

        </div>
        <div class="tab-pane fade" id="today-tab-pane" role="tabpanel" aria-labelledby="today-tab" tabindex="0">
            <h5>Encuestas Diarias</h5>
            <div class="table-responsive" style="max-height: 600px; overflow-y: auto;">
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
                                <small>Paciente: {{ encuesta.nombre1 }} {{ encuesta.apellido1 }}</small>
                                <hr />
                                <small><strong>F Encuesta:</strong> {{ encuesta.fecha }}</small>
                                <hr />
                                Actividades:{{ this.nombresActividades(encuesta.tipoActividad) }}
                                <hr />
                                P Riesgo: {{ encuesta.poblacionRiesgo }}
                            </td>

                            <td>
                                <div class="col-4">

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="wait-tab-pane" role="tabpanel" aria-labelledby="wait-tab" tabindex="0">
            <h6>Modulo no diponible para enfermero</h6>

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
            "getAllRegistersByIduserEnfer",
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
            this.getAllRegistersByIduser({
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

        //total de encuestas del usuario . para contador
        await this.getAllRegistersByIduserEnfer({
            idUsuario: this.userData.numDocumento,
        });
    },
};
</script>

<style></style>
