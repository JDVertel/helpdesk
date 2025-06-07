<template>
<div class="container-fluid">
    <h1>Admin Informes</h1>
    <h5>Seleccione el rango de fechas a mostrar</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
            <input type="date" id="fechaInicio" class="form-control" v-model="fechaInicio" required />
        </div>
        <div class="col-6 col-md-4">
            <label for="fechaFin" class="form-label">Fecha de Fin</label>
            <input type="date" id="fechaFin" class="form-control" v-model="fechaFin" required />
        </div>
        <div class="col-12 col-md-4">
            <button type="button" class="btn btn-warning btn-sm mt-4" @click="generarInforme()">
                Generar Informe
            </button>
        </div>
    </div>
    <br />
    <!--  {{ encuestasFiltradas }} -->

    <table class="table-bordered" border="1" style="border-collapse: collapse; width: 100%">
        <thead>
            <tr>
                <th colspan="5" style="background: #d0e6f7">DATOS DE IPS</th>
                <th colspan="7" style="background: #d0e6f7">DATOS DEL USUARIO</th>
                <th colspan="11" style="background: #d0e6f7">TIPO ACTIVIDAD REALIZADA</th>
                <th colspan="6" style="background: #d0e6f7">POBLACIÓN DE RIESGO</th>
                <th colspan="1" style="background: #d0e6f7">REQUIERE REMISION</th>
                <th colspan="3" style="background: #d0e6f7">ENCUESTADOR</th>
            </tr>
            <tr>
                <th>DPTO</th>
                <th>MUNICIPIO</th>
                <th>NOMBRE</th>
                <th>CODIGO</th>
                <th>FECHA</th>
                <!--  -->
                <th>NOMBRE DEL USUARIO</th>
                <th>TIPO ID</th>
                <th>NUMERO ID</th>
                <th>DIRECCION DEL USUARIO</th>
                <th>TELEFONO DE USUARIO</th>
                <th>BARRIO/VEREDA</th>
                <th>DESPLAZAMIENTO EFECTIVO (Si/No)</th>
                <!-- TIPO ACTIVIDAD -->
                <th v-for="col in columnasTipoActividad" :key="col" style="writing-mode: vertical-lr">
                    {{ col }}
                </th>
                <!-- POBLACIÓN DE RIESGO -->
                <th v-for="col in columnasPoblacionRiesgo" :key="col" style="writing-mode: vertical-lr">
                    {{ col }}
                </th>
                <!-- REMISION -->
                <th style="writing-mode: vertical-lr">
                    REQUIERE REMISION A PROCEDIMIENTOS (Si/No)
                </th>
                <th style="writing-mode: vertical-lr">NOMBRE</th>
                <th style="writing-mode: vertical-lr">CARGO</th>
                <th style="writing-mode: vertical-lr">DOCUMENTO</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="usuario in encuestasFiltradas" :key="usuario.id">
                <td>dpt</td>
                <td>municipio</td>
                <td>nombre</td>
                <td>codigo</td>
                <td>{{ usuario.fecha }}</td>
                <!--  -->
                <td>
                    {{ usuario.nombre1 }} {{ usuario.nombre2 }} {{ usuario.apellido1 }}
                    {{ usuario.apellido2 }}
                </td>
                <td>{{ usuario.tipodoc }}</td>
                <td>{{ usuario.numdoc }}</td>
                <td>{{ usuario.direccion }}</td>
                <td>{{ usuario.telefono }}</td>
                <td>{{ usuario.barrioVeredacomuna.barrio }}</td>
                <td>{{ usuario.desplazamiento }}</td>
                <!-- TIPO ACTIVIDAD -->
                <td v-for="col in columnasTipoActividad" :key="col" style="text-align: center">
                    <span v-if="usuario.tipoActividad && usuario.tipoActividad.includes(col)">X</span>
                </td>
                <!-- POBLACIÓN DE RIESGO -->
                <td v-for="col in columnasPoblacionRiesgo" :key="col" style="text-align: center">
                    <span v-if="usuario.poblacionRiesgo && usuario.poblacionRiesgo.includes(col)">X</span>
                </td>
                <!-- REMISION -->
                <td style="text-align: center">{{ usuario.requiereRemision }}</td>
                <td>NOMBRE</td>
                <td>CARGO</td>
                <td>DOC</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data() {
        return {
            /* Datos de Login */

            /* cargara los datos del la ips  */
            idips: "",
            /* cargara los datos del profesional */
            idprofesional: "",

/* ----------------------------------------------------------- */
            fechaInicio: "",
            fechaFin: "",
            columnasTipoActividad: [
                "Consulta PYMS",
                "Consulta Morbilidad",
                "VPS",
                "Toma lab  PYMS",
                "Toma lab Morbilidad",
                "Vacunacion",
                "Realizacion de tamizajes",
                "Realizacion Test",
                "IEC",
                "Remision IPS",
                "Otro",
            ],
            columnasPoblacionRiesgo: [
                "Gestante",
                "Menor a 5 años",
                "Discapacidad",
                "Adulto mayor",
                "Orientacion sexual diversa",
                "Grupo etnico",
            ],
     
        };
    },
    methods: {
        ...mapActions(["GetAllRegistersbyRange"]),

        /* metodo para cargar los datos del profesional, y los datos de la ips */
        generarInforme() {
            let rango = {
                fechaInicio: this.fechaInicio,
                fechaFin: this.fechaFin,
            };
            this.GetAllRegistersbyRange(rango);
        },
    },
    computed: {
        ...mapState(["encuestasFiltradas"]),
    },
};
</script>
