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
                {{ encuestasFiltradasById }}
                <div class="col-12 col-md-6" v-if="dateIDlab !== ''">
                    <p>Agenda del dia Toma de Laboratorio</p>
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">grupo</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Barrio</th>
                                <th scope="col">Hora</th>
                                <th scope="col">eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in encuestasFiltradasById" :key="index">
                                <td>{{ item.tomademuestras }}</td>
                                <td>{{ item.idEncuesta }}</td>
                                <td>{{ item.barrio }}</td>
                                <td>{{ item.hora }}</td>
                                <td>
                                    <button class="btn btn-danger btn-sm" @click="eliminarAgenda(item.id)">Eliminar</button>
                                </td>
                            </tr>
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

                                <select class="form-select" aria-label="Default select example" v-model="dateIDvisita">
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
                <div class="col-12 col-md-6" v-if="dateIDvisita !== ''">
                    <p>Agenda del dia Visita medica y enfermeria</p>
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Barrio</th>
                                <th scope="col">Eliminar</th>
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
                                <td>John</td>
                                <td>Doe</td>
                                <td>@social</td>
                            </tr>
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
            "getAgendasTomaLabById",
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
                idAgenda: this.dateIDAgenda,
                idEncuesta: this.idEncuesta,
                dateIDlab: this.dateIDlab,
                horalab: this.horalab,
                grupo: this.userData.grupo,
            };
            this.guardarAgendaT(datos);
            console.log("Agendamiento toma de muestras guardado");
        },

        agendaActualTomaLab(id) {
            console.log("datos que salen", id);
            this.getAgendasTomaLabById(id);
        },
       /*  guardarAgendamientoVisitas() {
            if (this.dateIDvisita === "" || this.horavisita === "") {
                alert("Por favor, seleccione una fecha y hora para la visita.");
                return;
            }
            let datos = {
                idEncuesta: this.idEncuesta,
                dateIDvisita: this.dateIDvisita,
                horavisita: this.horavisita,
                grupo: this.userData.grupo,
            };
            this.guardarAgendaV(datos);
            console.log("Agendamiento visita guardado");
        }, */
    },
    computed: {
        ...mapState(["agendas", "userData", "encuestasFiltradasById"]),

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
        /*     this.getTomamuestras(); */
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
