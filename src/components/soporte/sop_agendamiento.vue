<template>
<!-- llega id encuesta para (datos paciente ) -->
<!-- lleha id usuarrio para grupo  -->
<!-- carga agendas filtradas por grupo disponibles fechas  en input  de visita-->
<div class="container-fluid">
    <h5><i class="bi bi-calendar2-check"></i> Agendamiento de visita</h5>
    <div class="container agendamiento mb-4">
        <br />
        {{ userData.grupo }}
        <div class="row">
            <div class="col-12 col-md-6">
                <h5><i class="bi bi-prescription2"></i> Toma de laboratorios</h5>

                <hr />

                <div class="row mb-4">
                    <div class="col-6">
                        <div>
                            <label for="dateconsulta" class="form-label">Fecha</label>

                            <select class="form-select" aria-label="Default select example" v-model="datelab">
                                <option value="">Seleccione fecha disponible</option>
                                <option v-for="(fecha, index) in agendas" :value="fecha.fecha" :key="index">
                                    {{ fecha.grupo }} - {{ fecha.fecha }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-6">
                        <label for="horalab" class="form-label">Hora:</label>
                        <input type="time" class="form-control" id="horalab" v-model="horalab" />
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6" v-if="datelab !== ''">
                <p>Agenda del dia Toma de Laboratorio</p>
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">grupo</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Barrio</th>
                            <th scope="col">eliminar</th>
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
        <div class="row">
            <div class="col-12 col-md-6">
                <h6><i class="bi bi-people-fill"></i> Visita Medica</h6>
                <hr />
                <div class="row mb-4">
                    <div class="col-6">
                        <div>
                            <label for="dateconsulta" class="form-label">Fecha</label>

                            <select class="form-select" aria-label="Default select example" v-model="dateConsulta">
                                <option value="">Seleccione fecha disponible</option>
                                <option v-for="(fecha, index) in itemsGrupo" :value="fecha.fecha" :key="index">
                                    {{ fecha.grupo }} - {{ fecha.fecha }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-6">
                        <label for="horaconsulta" class="form-label">Hora</label>
                        <input type="time" class="form-control" id="horaconsulta" v-model="horaConsulta" />
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6" v-if="dateConsulta !== ''">
                <p>Agenda del dia Visita medica</p>
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
            <button class="btn btn-sm btn-warning mb-3">Guardar Agendamiento</button>
        </div>
    </div>

    <router-link to="/admin_cambioclave">Ir a destino</router-link>
</div>
</template>

<script>
import moment from 'moment';
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data: () => {
        return {
            fechaActual: "",
            idgrupo: "",
            dateConsulta: "",
            horaConsulta: "",
            datelab: "",
            horalab: "",
        };
    },
    methods: {
        ...mapActions(["getListAgendas", "getTomamuestras"]),
    },
    computed: {
        ...mapState(["agendas", "userData"]),

        itemsGrupo() {
            return this.agendas.filter((item) => item.grupo == this.userData.grupo);
        },
    },
    mounted() {
        this.fechaActual = moment().format('YYYY-MM-DD');
        this.getListAgendas(this.fechaActual);
        /*     this.getTomamuestras(); */
    },
};
</script>

<style>
.agendamiento {
    background-color: greenyellow;
}
</style>
