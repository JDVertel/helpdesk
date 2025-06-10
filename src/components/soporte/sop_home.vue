<template>
<div>
    <h1 class="display-6 center">Encuestador</h1>

    <!--    {{ fechaActual }}
    <hr>
    {{ userData }} -->
    <!--    {{ encuestas}} -->

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
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Detalle</th>

                            <th scope="col">
                                Opciones
                            </th>

                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(encuesta, index) in encuestas" :key="index">
                            <td>Paciente:{{ encuesta.nombre1 }} {{ encuesta.apellido1 }}
                                <hr>
                                Actividades:{{ encuesta.tipoActividad }}
                                <hr> P Riesgo: {{ encuesta.poblacionRiesgo }}</td>

                            <td>

                                <div class="col-4"> <button type="button" class="btn btn-success btn-sm" @click="Agendar(encuesta.id)">
                                        <i class="bi bi-calendar2-check"></i>
                                    </button></div>
                                <div class="col-4"> <button type="button" class="btn btn-info btn-sm" @click="Caracterizar(encuesta.id)">
                                        <i class="bi bi-pencil"></i>
                                    </button></div>

                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="today-tab-pane" role="tabpanel" aria-labelledby="today-tab" tabindex="0">
            <h5>Encuestas Diarias</h5>
            <div class="table-responsive">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Detalle</th>

                            <th scope="col">
                                Opciones
                            </th>

                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(encuesta, index) in this.encuestasToday" :key="index">
                            <td>Paciente: {{ encuesta.nombre1 }} {{ encuesta.apellido1 }}
                                <hr> Actividades:{{ encuesta.tipoActividad }}
                                <hr> P Riesgo: {{ encuesta.poblacionRiesgo }}</td>

                            <td>

                                <div class="col-4"> <button type="button" class="btn btn-danger btn-sm" @click="removeRegEncuesta(encuesta.id)" v-if="encuesta.status_tomamuestras == ''">
                                        <i class="bi bi-x-circle"></i>
                                    </button></div>

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
        ...mapActions(["removeRegEnc", "getAllRegistersByFechaStatus", "getAllRegistersByIduser", "getAllRegistersByFecha"]),

        removeRegEncuesta(id) {
            this.removeRegEnc(id);
            alert("Registro eliminado exitosamente.");
            this.getAllRegistersByFecha({
                idUsuario: this.userData.numDocumento,
                fecha: this.fechaActual
            });
            this.getAllRegistersByFechaStatus({
                idUsuario: this.userData.numDocumento
            });
            this.getAllRegistersByIduser({
                idUsuario: this.userData.numDocumento
            });
        },
        Agendar(id) {
            this.$router.push({
                name: "sop_agendamiento",
                params: {
                    idEncuesta: id
                }
            });
        },
        Caracterizar(id) {
            this.$router.push({
                name: "sop_caracterizacion",
                params: {
                    idEncuesta: id
                }
            });
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
   mounted() {

        this.fechaActual = moment().format("YYYY-MM-DD");
        //encuestas diarias + contador 
        this.getAllRegistersByFecha({
            idUsuario: this.userData.numDocumento,
            fecha: this.fechaActual
        });
        //encuestas abiertas
       this.getAllRegistersByFechaStatus({
        idUsuario: this.userData.numDocumento,
        });
        //total de encuestas del usuario . para contador 
         this.getAllRegistersByIduser({
            idUsuario: this.userData.numDocumento,
        });

    },
};
</script>

<style></style>
