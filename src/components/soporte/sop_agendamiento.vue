<template>
<!-- llega id encuesta para (datos paciente ) -->
<!-- lleha id usuarrio para grupo  -->
<!-- carga agendas filtradas por grupo disponibles fechas  en input  de visita-->
<div class="container-fluid">
    <h5><i class="bi bi-calendar2-check"></i> Agendamiento de visita</h5>
    <div class="container mb-4">
        <br />
        <div class="container-fluid tomademuestras">
            <div class="row">
                <div class="col-12 col-md-6">
                    <h5><i class="bi bi-prescription2"></i> Toma de laboratorios</h5>

                    <hr />

                    <div class="row mb-4">
                        <div class="col-6">
                            <div>
                                <label for="dateconsulta" class="form-label">Fecha</label>
                                <select class="form-select" aria-label="Default select example" v-model="dateIDAgenda" @change="agendaActualTomaLab(dateIDAgenda)">
                                    <option>Disponibles</option>
                                    <option v-for="(fecha, index) in agendas" :value="fecha.id" :key="index">
                                        {{ fecha.grupo }} - {{ fecha.fecha }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-6">
                            <label for="horalab" class="form-label">Hora:</label>
                            <select class="form-control" id="horalab" v-model="horalab">
                                <option v-for="hora in horasValidasLab" :key="hora" :value="hora">
                                    {{ hora }}
                                </option>
                            </select>
                        </div>
                        <button class="btn btn-sm btn-warning mb-3 mt-3" @click="guardarAgendamientoTomaLab">
                            Guardar Agendamiento
                        </button>
                    </div>
                </div>
                <!--       {{ encuestasFiltradasById }} -->
                <div class="col-12 col-md-6" v-if="encuestasFiltradasLabById.length !== 0">
                    <p>Agenda del dia Toma de Laboratorio</p>
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Hora Lab</th>
                                <th>Grupo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(item, index) in encuestasFiltradasLabById" :key="item.id + index">
                                <tr v-for="(muestra, i) in item.tomademuestras" :key="muestra.idEncuesta + i">
                                    <td>{{ muestra.horalab }}</td>
                                    <td>{{ muestra.grupo }}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" @click="eliminarAgenda(muestra.idEncuesta)" v-if="userData && userData.grupo && muestra.grupo === this.userData.grupo">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <br />
        <div class="container-fluid visitas">
            <div class="row">
                <div class="col-12 col-md-6">
                    <h6><i class="bi bi-people-fill"></i> Visita Medica y Enfermeria</h6>
                    <hr />
                    <div class="row mb-4">
                        <div class="col-6">
                            <div>
                                <label for="datevisita" class="form-label">Fecha</label>

                                <select class="form-select" aria-label="Default select example" v-model="dateIDvisita" @change="agendaActualVisita(dateIDvisita)">
                                    <option value="">Disponibles</option>
                                    <option v-for="(fecha, index) in FechasVisitasGrupo" :value="fecha.id" :key="index">
                                        {{ fecha.grupo }} - {{ fecha.fecha }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="col-6">
                            <label for="horaconsulta" class="form-label">Hora</label>
                            <select class="form-control" id="horavisita" v-model="horavisita">
                                <option v-for="hora in horasValidasVisita" :key="hora" :value="hora">
                                    {{ hora }}
                                </option>
                            </select>
                        </div>
                        <button class="btn btn-sm btn-warning mb-3 mt-3" @click="guardarAgendamientoVisitas">
                            Guardar Agendamiento
                        </button>
                    </div>
                </div>
                <div class="col-12 col-md-6" v-if="encuestasFiltradasVisitaById.length !== 0">
                    <p>Agenda del dia Visita medica y enfermeria</p>
                    <!-- {{ encuestasFiltradasVisitaById }} -->
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th>Hora Lab</th>
                                <th>Grupo</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                         <!--    <tr v-for="(item, index) in encuestasFiltradasVisitaById" :key="item.id + index">
                                <td>{{ item.horavisita }}</td>
                                <td>{{ item.grupo }}</td>
                                <td>
                                    <button class="btn btn-danger btn-sm" @click="eliminarAgenda(item.id)" v-if="userData && userData.grupo && item.grupo === this.userData.grupo">
                                        Eliminar
                                    </button>
                                </td>
                            </tr> -->

                            <template v-for="(item, index) in encuestasFiltradasVisitaById" :key="item.id + index">
                                <tr v-for="(muestra, i) in item.visitamedica" :key="muestra.idEncuesta + i">
                                    <td>{{ muestra.horavisita }}</td>
                                    <td>{{ muestra.grupo }}</td>
                                    <td>
                                        <button class="btn btn-danger btn-sm" @click="eliminarAgenda(muestra.idEncuesta)" v-if="userData && userData.grupo && muestra.grupo === this.userData.grupo">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <router-link to="/sop_home">Volver</router-link>
</div>
</template>

<script>
import moment from "moment";
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data: () => {
        return {
            dateIDAgenda: "",
            dateIDvisita: "",
            idEncuesta: "",
            fechaActual: "",

            dateIDlab: "",
            horalab: "",
            dateIDvisita: "",
            horavisita: "",
        };
    },
    methods: {
        ...mapActions([
            "getListAgendas",
            "getTomamuestras",
            "guardarAgendaT",
            "guardarAgendaV",
            "getAgendasTomaLabById",
            "getAgendasVisitaById"
        ]),

        generarHorasValidasLab() {
            const horas = [];
            for (let i = 6; i <= 8; i++) {
                for (let j = 0; j < 60; j += 30) {
                    // Incrementos de 30 minutos
                    const hora = `${String(i).padStart(2, "0")}:${String(j).padStart(2, "0")}`;
                    horas.push(hora);
                }
            }
            return horas;
        },

        generarHorasValidasVisita() {
            const horas = [];
            for (let i = 9; i <= 11; i++) {
                for (let j = 0; j < 60; j += 30) {
                    // Incrementos de 30 minutos
                    const hora = `${String(i).padStart(2, "0")}:${String(j).padStart(2, "0")}`;
                    horas.push(hora);
                }
            }
            return horas;
        },

        guardarAgendamientoTomaLab() {
            if (this.dateIDAgenda === "" || this.horalab === "") {
                alert("Por favor, seleccione una fecha y hora para la toma de laboratorio.");
                return;
            }
            let datos = {
                idAgenda: this.dateIDAgenda, // id de la fecha que se selecciona
                idEncuesta: this.idEncuesta, // id pasado desde la seleccion de la encuesta para vincular los datos 
                horalab: this.horalab, // hora seleccionada
                grupo: this.userData.grupo, // grupo del usuario quien agenda
            };
            this.guardarAgendaT(datos);
            console.log("Agendamiento toma de muestras guardado");
        },
        /* ---------------------------------------------------------- */

        guardarAgendamientoVisitas() {
            if (this.dateIDvisita === "" || this.horavisita === "") {
                alert("Por favor, seleccione una fecha y hora para la visita.");
                return;
            }
            let datos = {
                idAgenda: this.dateIDvisita, // id de la fecha que se selecciona
                horavisita: this.horavisita, // hora seleccionada
                idEncuesta: this.idEncuesta,
                grupo: this.userData.grupo,
            };
            this.guardarAgendaV(datos);
            console.log("Agendamiento visita guardado");
        },

        /* ------------------------------------------------- */
        //consulta las citas  de toma de muestra del dia seleccionado
        agendaActualTomaLab(id) {
            this.getAgendasTomaLabById(id);
        },
        //consulta las citas de visita del dia seleccionado
        //se usa el id de la agenda seleccionada para consultar las citas de visita
        agendaActualVisita(id) {
            this.getAgendasVisitaById(id);
        },
    
    },
    computed: {
        ...mapState(["agendas", "userData", "encuestasFiltradasLabById", "encuestasFiltradasVisitaById"]),

        FechasVisitasGrupo() {
            return this.agendas.filter((item) => item.grupo == this.userData.grupo);
        },

        getAllAgendasbyDate(datelab) {
            return this.agendas.filter((item) => item.fecha == this.dateConsulta);
        },
        horasValidasLab() {
            return this.generarHorasValidasLab();
        },

        horasValidasVisita() {
            return this.generarHorasValidasVisita();
        },
    },
    mounted() {
        this.idEncuesta = this.$route.params.idEncuesta;
        console.log(this.idEncuesta);
        this.fechaActual = moment().format("YYYY-MM-DD");
        this.getListAgendas(this.fechaActual);

    },
};
</script>

<style>
.tomademuestras {
    background-color: rgb(133, 243, 210);
    border-radius: 15px;
}

.visitas {
    background-color: rgb(30, 201, 121);
    border-radius: 15px;
}
</style>
