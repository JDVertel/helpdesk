<template>
<div>
    <h1 class="display-6 center">{{ userData.cargo }}</h1>
    <h5>Medico</h5>
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
                <div class="table-responsive" style="max-height: 600px; overflow-y: auto;">
                    <table class="table table-striped table-sm  w-auto">
                        <thead>
                            <tr>
                                <th scope="col">Detalle</th>

                                <th scope="col">Programacion</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr v-for="(encuesta, index) in encuestas" :key="index">
                                <td>
                                    <small>
                                        Paciente: {{ encuesta.nombre1 }} {{ encuesta.apellido1 }} | Eps:{{
                      encuesta.eps
                    }}
                                    </small>
                                    <hr />
                                    <small>
                                        Actividades:
                                        {{ this.nombresActividades(encuesta.tipoActividad) }}</small>
                                    <hr />
                                    <small>P Riesgo: {{ encuesta.poblacionRiesgo }}</small>
                                    <hr />
                                    <small>F Encuesta: {{ encuesta.fecha }}</small>
                                </td>
                                <td>

                                    <div class="row">
                                        <div class="col">
                                            <div v-if="encuesta.Agenda_tomademuestras?.cita_tomamuestras === false">
                                                <p>Agenda visita toma de muestras Pendiente...</p>
                                            </div>
                                            <div v-else-if="
                          encuesta.Agenda_tomademuestras?.cita_tomamuestras === undefined
                        ">
                                                <p>Agenda visita toma de muestras Pendiente...</p>
                                            </div>

                                            <div v-else>
                                                <h6 class="ok">
                                                    <i class="bi bi-check2-circle"></i>Toma de muestras agendada
                                                </h6>
                                            </div>
                                            <hr />
                                            <div v-if="encuesta.Agenda_Visitamedica?.cita_visitamedica === false">
                                                <p>Agenda visita medica Pendiente...</p>
                                            </div>
                                            <div v-else-if="
                          encuesta.Agenda_Visitamedica?.cita_visitamedica === undefined
                        ">
                                                <p>Agenda visita medica Pendiente...</p>
                                            </div>
                                            <div v-else>
                                                <h6 class="ok">
                                                    <i class="bi bi-check2-circle"></i>Visita medica agendada
                                                </h6>
                                            </div>
                                            <hr />
                                            <div v-if="encuesta.status_caracterizacion === false">
                                                <p>Caracterizacion Pendiente...</p>
                                            </div>
                                            <div v-else>
                                                <h6 class="ok">
                                                    <i class="bi bi-check2-circle"></i> Caracterizacion ok
                                                </h6>
                                            </div>
                                            <hr />
                                            <div>
                                                <button type="button" class="btn btn-danger btn-sm" @click="cupsGestion(encuesta.id)">
                                                    <i class="bi bi-calendar2-heart-fill">
                                                        <small> Gestionar Cups</small></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
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
                            <RouterLink class="btn btn-primary btn-sm" to="/sop_encuesta">
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
            "getAllRegistersByIduserProf",
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
        await this.getAllRegistersByIduserProf({
            idUsuario: this.userData.numDocumento,
        });
    },
};
</script>

<style></style>
