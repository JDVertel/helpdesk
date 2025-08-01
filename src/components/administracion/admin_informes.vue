<template>
<div class="container-fluid mt-2">

    <h1><i class="bi bi-clipboard2-data h1"></i>Informes Administrativos</h1>
    <div class="row">

        <div class="col-12 col-md-2">
            <label class="form-label">tipo informe</label>
            <select class="form-select" aria-label="Default select example" v-model="tipoinforme">
                <option selected>Seleccione</option>
                <option value="1">Seguimiento</option>
          <!--       <option value="2">General</option>
                <option value="3">Actividades del Profesional</option> -->

            </select>
        </div>
        <div class="col-6 col-md-2" v-if="tipoinforme == '3'">
            <label class="form-label">Profesional</label>
            <select class="form-select" aria-label="Default select example" v-model="profesionalselect">
                <option selected>Seleccione</option>
                <option :value="profesional.numDocumento" v-for="profesional in profesionales" :key="profesional.id">({{profesional.cargo}}){{ profesional.nombre }}</option>
            </select>
        </div>

        <div class="col-6 col-md-2">
            <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
            <input type="date" id="fechaInicio" class="form-control" v-model="fechaInicio" required />
        </div>
        <div class="col-6 col-md-2">
            <label for="fechaFin" class="form-label">Fecha de Fin</label>
            <input type="date" id="fechaFin" class="form-control" v-model="fechaFin" required />
        </div>

        <div class="col-12 col-md-2 mt-3">
            <button type="button" class="btn btn-warning  mt-3" @click="generarInforme()">
                <i class="bi bi-clipboard2-data h6"></i> Generar Informe
            </button>
        </div>
    </div>
    <!-- {{ EncuestasAdmin }}
 -->

    <div>
        <h1>Listado de Pacientes</h1>
        <div class="table-responsive">
            <!-- Botón de copiar tabla eliminado -->
            <table class="table table-bordered table-striped table-sm align-middle">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Documento</th>
                        <th>Fecha Nac.</th>
                        <th>EPS</th>
                        <th>Régimen</th>
                        <th>Dirección</th>
                        <th>Barrio</th>
                        <th>Comuna</th>
                        <th>Cita Médica</th>
                        <th>Toma Muestras</th>
                        <th>Gest. Aux</th>
                        <th>Gest. Enfermera</th>
                        <th>Gest. Médica</th>
                        <th>Remisión</th>
                        <th>Procedimientos y Actividades</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(paciente, idx) in EncuestasAdmin" :key="paciente.id">
                        <td>{{ idx + 1 }}</td>
                        <td>{{ paciente.nombre1 }} {{ paciente.apellido1 }} {{ paciente.apellido2 }}</td>
                        <td>{{ paciente.numdoc }}</td>
                        <td>{{ paciente.fechaNac }}</td>
                        <td>{{ paciente.eps }}</td>
                        <td>{{ paciente.regimen }}</td>
                        <td>{{ paciente.direccion }}</td>
                        <td>{{ paciente.barrioVeredacomuna?.barrio }}</td>
                        <td>{{ paciente.barrioVeredacomuna?.comuna }}</td>
                        <td>{{ paciente.Agenda_Visitamedica?.cita_visitamedica ? 'Sí' : 'No' }}</td>
                        <td>{{ paciente.Agenda_tomademuestras?.cita_tomamuestras ? 'Sí' : 'No' }}</td>
                        <td>{{ paciente.status_gest_aux ? 'Sí' : 'No' }}</td>
                        <td>{{ paciente.status_gest_enfermera ? 'Sí' : 'No' }}</td>
                        <td>{{ paciente.status_gest_medica ? 'Sí' : 'No' }}</td>
                        <td>{{ paciente.requiereRemision }}</td>
                        <td>
                            <div>
                                <div v-for="(actividad, actividadKey) in paciente.tipoActividad" :key="actividadKey" class="actividad-section">
                                    <h5>{{ actividad.nombre }}</h5>
                                    <table class="tabla-procedimientos table-bordered table-striped table-sm align-middle">
                                        <thead>
                                            <tr>
                                                <th>Profesional</th>
                                                <th>Nombre</th>
                                                <th>Descripción CUP</th>
                                                <th>Cantidad</th>
                                                <th>Detalle</th>
                                                <th>EPS</th>
                                                <th>Grupo</th>
                                                <th>Homolog</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <template v-for="profesional in actividad.Profesional" :key="profesional">
                                                <template v-if="actividad.cups && actividad.cups[profesional]">
                                                    <tr v-for="(cup, cupId) in actividad.cups[profesional].cups" :key="cupId">
                                                        <td>{{ profesional }}</td>
                                                        <td>{{ actividad.cups[profesional].nombre || '-' }}</td>
                                                        <td>{{ cup.DescripcionCUP }}</td>
                                                        <td>{{ cup.cantidad }}</td>
                                                        <td>{{ cup.detalle || '-' }}</td>
                                                        <td>{{ cup.Eps ? cup.Eps.join(', ') : '-' }}</td>
                                                        <td>{{ cup.Grupo || '-' }}</td>
                                                        <td>{{ cup.Homolog || '-' }}</td>
                                                    </tr>
                                                </template>
                                                <template v-else>
                                                    <tr>
                                                        <td>{{ profesional }}</td>
                                                        <td colspan="7">No hay procedimientos asignados.</td>
                                                    </tr>
                                                </template>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>

</div>
</template>

<style>
.table-responsive {
    overflow-x: auto;
    min-width: 100%;
}
</style>

<script>
import {
    mapState,
    mapActions
} from "vuex";
export default {
    data() {
        return {
            fechaInicio: "",
            fechaFin: "",
            tipoinforme: "",
            profesionalselect: "",
            profesionales: [],
            detallesVisibles: [], // Para controlar la visibilidad de detalles por fila
        };
    },
    methods: {
        /*  */

        getActividadesPlanas(paciente) {
            // Devuelve un array plano de objetos para la tabla de actividades
            if (!paciente.tipoActividad || !Array.isArray(paciente.tipoActividad) || paciente.tipoActividad.length === 0) return [];
            const rows = [];
            for (const actividad of paciente.tipoActividad) {
                if (actividad.Profesional && Array.isArray(actividad.Profesional) && actividad.Profesional.length) {
                    for (const profesional of actividad.Profesional) {
                        if (
                            actividad.cups &&
                            actividad.cups[profesional] &&
                            Array.isArray(actividad.cups[profesional].cups) &&
                            actividad.cups[profesional].cups.length
                        ) {
                            for (const cup of actividad.cups[profesional].cups) {
                                rows.push({
                                    actividad: actividad.nombre,
                                    profesional,
                                    cup: cup.DescripcionCUP,
                                    cantidad: cup.cantidad,
                                    detalle: cup.detalle
                                });
                            }
                        } else {
                            rows.push({
                                actividad: actividad.nombre,
                                profesional,
                                cup: 'Sin CUPS registrados',
                                cantidad: '',
                                detalle: ''
                            });
                        }
                    }
                } else {
                    rows.push({
                        actividad: actividad.nombre,
                        profesional: 'Sin profesionales registrados',
                        cup: '',
                        cantidad: '',
                        detalle: ''
                    });
                }
            }
            return rows;
        },
        /*  */
        ...mapActions(["consultarUsuariosFirestore", "GetRegistersbyRangeCerrados", "GetRegistersbyRangeGeneral", "GetAllRegistersbyRangeAndProf"]),

        generarInforme() {
            try {
                //informe de seguimiento (finicio-ffin)
                if (this.fechaInicio && this.fechaFin && this.tipoinforme == "1") {
                    let parametros = {
                        finicial: this.fechaInicio,
                        ffinal: this.fechaFin,
                    };
                    this.GetRegistersbyRangeCerrados(parametros);

                    //informe general (finicio-ffin)
                } else if (this.fechaInicio && this.fechaFin && this.tipoinforme == "2") {
                    let parametros = {
                        finicial: this.fechaInicio,
                        ffinal: this.fechaFin,
                    };
                    this.GetRegistersbyRangeGeneral(parametros);

                } else if (this.profesionalselect && this.fechaInicio && this.fechaFin && this.tipoinforme == "3") {
                    let parametros = {
                        idprof: this.profesionalselect,
                        finicial: this.fechaInicio,
                        ffinal: this.fechaFin,
                    };
                    this.GetAllRegistersbyRangeAndProf(parametros);
                } else {
                    this.$toast.error("Debe seleccionar un profesional y un rango de fechas");
                }
            } catch (error) {
                console.error("Error al generar el informe:", error);
            }
        },

        toggleDetalles(idx) {
            this.$set(this.detallesVisibles, idx, !this.detallesVisibles[idx]);
        },
    },

    computed: {
        ...mapState(["userData", "EncuestasAdmin"]),

    },
    mounted() {
        this.consultarUsuariosFirestore().then(profesionales => {
            this.profesionales = profesionales;
        });
        // Inicializar detallesVisibles según la cantidad de pacientes
        this.$watch(
            () => this.EncuestasAdmin,
            (nuevo) => {
                this.detallesVisibles = Array.isArray(nuevo) ? Array(nuevo.length).fill(false) : [];
            }, {
                immediate: true,
                deep: false
            }
        );
    },
};
</script>
