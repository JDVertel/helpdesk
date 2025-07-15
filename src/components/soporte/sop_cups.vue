<template>
<!-- {{ InfoEncuestasById }} -->
<div v-for="itemE in InfoEncuestasById" :key="itemE.id" class="mb-4">
    <div class="container-fluid cabecera">
        <h5><i class="bi bi-person"></i> Informacion del Paciente</h5>

        <div class="row">
            <div class="col-4"><strong>Nombre:</strong> {{ itemE.nombre1 }} {{ itemE.nombre2 }} {{ itemE.apellido1
                    }}
                {{ itemE.apellido2 }}

            </div>
            <div class="col-4"><strong>Eps:</strong> {{ itemE.eps }}
                <hr>
                <strong>Regimen:</strong> {{ itemE.regimen }}
            </div>
            <div class="col-4">
                <hr>
                <strong>Sexo:</strong> {{ itemE.sexo }}
                <hr> <strong>Edad:</strong> {{ edadActual(itemE.fechaNac) }}
            </div>
        </div>
    </div>

    <br />

    <div class="container-fluid cabecera">

        <h5><i class="bi bi-person-check-fill"></i> Actividades del paciente </h5>
        <br>

        <table class="table table-striped table-sm table-bordered w-auto">
            <thead>
                <tr>
                    <th>Profesional Autorizado</th>
                    <th>Actividades /+Cups</th>
                    <th>Cups Asignados / Detalle</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="actividad in actividadesConMedico(itemE.tipoActividad)" :key="actividad.id">
                    <td><small>{{ actividad.Profesional }}</small></td>
                    <td class="d-flex justify-content-between">
                        <small>{{ actividad.nombre }}</small>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="integrarCup(actividad.id)" :disabled="!userData || !userData.cargo || (cupsEPS && cupsEPS.length === 0)">
                            <i class="bi bi-bookmark-heart"></i>
                        </button>
                    </td>
                    <td>
                        <span v-for="cup in actividad.cups" :key="cup.id">
                            <span v-for="itex in (cup.cups || [])" :key="itex?.id">
                                <button class="btn btn-danger btn-sm m-1" v-if="itex && itex.Profesional === userData.cargo" @click="eliminarCUP(itemE.id, actividad.id, itex.id)">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <small>{{ itex.DescripcionCUP }}</small>
                                <span class="vr"></span> <strong>Cant:{{ itex.cantidad }} </strong>
                                <span class="vr"></span> <strong>Detalle:{{ itex.detalle }} </strong>
                                <hr>
                            </span>
                        </span>
                    </td>
                </tr>
            </tbody>

        </table>
        <footer>
            <tr>
                <td colspan="4" class="text-end">
                    <button class="btn btn-success btn-sm" @click="cerrarVisita(this.userData.cargo)">
                        <i class="bi bi-clipboard2-check"></i> Cerrar Visita
                    </button>
                </td>
            </tr>
        </footer>
    </div>

    <!------------------------------------------------------------- Modal -------------------------------------------------------------------------------->

    <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        <i class="bi bi-file-earmark-plus"></i> Añadir CUPS a procedimientos
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Seleccione el CUP que desea asignar a la actividad
                    <div class="row">
                        <div class="mb-3">
                            <br />
                            <select v-model="CupsSeleccionado" class="form-select" id="cupSelect" :disabled="cupsEPS.length === 0">
                                <option value="">Listado de CUPS disponible</option>
                                <option v-for="cup in cupsEPS" :key="cup.id" :value="cup">
                                    {{ cup.DescripcionCUP }}
                                </option>
                            </select>
                            <span v-if="cupsEPS.length === 0" class="text-muted">Cargando CUPS...</span>

                            <div class="row mt-2">
                                <div class="col-2">Cantidad <input type="number" class="form-control" aria-label="Cantidad" v-model="cantidad"></div>
                                <div class="col-10">
                                    <div class="input-group">
                                        <span class="input-group-text">Detalle</span>
                                        <textarea class="form-control" aria-label="With textarea" v-model="detalle"></textarea>
                                    </div>
                                </div>
                            </div>

                            <button class="btn btn-warning btn-sm mt-2" @click="addCups(this.CupsSeleccionado, this.cantidad, this.detalle)">
                                <i class="bi bi-plus-circle-dotted"></i> Agregar al listado
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <h6>Listado de CUPS:</h6>
                    <hr />
                    <table class="table" v-if="cupsArray.length > 0">
                        <thead>
                            <tr>
                                <th scope="col">CUPS</th>
                                <th scope="col">Detalle</th>
                                <th scope="col">Grupo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(cup, index) in cupsArray" :key="index">
                                <th>{{ cup.Homolog }}</th>
                                <td>{{ cup.DescripcionCUP }}</td>
                                <td>{{ cup.Grupo }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="cupsArray.length === 0">No hay CUPS seleccionados.</div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal">
                            <i class="bi bi-x-square"></i> Cancelar
                        </button>
                        <button type="button" class="btn btn-primary btn-sm" @click="confirmarSeleccion()" data-bs-dismiss="modal" v-if="cupsArray.length !== 0">
                            <i class="bi bi-floppy"></i> Guardar Listado
                        </button>
                    </div>
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

/* ----------------------------------------------------------------------------------------------- */
export default {
    data() {
        return {
            idEncuesta: null,
            actividades: [],
            CupsFiltradosByEPs: [],
            CupsSeleccionado: {},
            cupsArray: [], // Esta propiedad se usará para almacenar los cups seleccionados
            keyActividad: "",
            idItem: "",
            actividadesProcesadas: [],
            datoslistos: [],
            datoscups: [],
            datosfinal: [],
            cantidad: 1, // Valor por defecto para la cantidad
            detalle: "", // Detalle del cup seleccionado
        };
    },

    /* ----------------------------------------------------------------------------------------------- */
    computed: {
        ...mapState([
            "InfoEncuestasById",
            "userData",
            "cups",
            "encuestas",
            "cupsbyActividad",
            "deleteCUPS"
        ]),
        //logica para obtener los cups filtrados por EPS y profesional
        dataencuesta() {
            return this.encuestas.length > 0 ? this.encuestas[0] : null;
        },
        cupsEPS() {
            if (
                !this.cups ||
                !this.dataencuesta ||
                !this.dataencuesta.eps ||
                !this.userData ||
                !this.userData.cargo
            ) return [];
            return this.cups.filter(
                (cup) =>
                Array.isArray(cup.Eps) &&
                cup.Eps.includes(this.dataencuesta.eps) &&
                cup.Profesional === this.userData.cargo
            );
        },

    },

    /* ----------------------------------------------------------------------------------------------- */
    methods: {
        ...mapActions([
            "getEncuestaById",
            "getAllCups",
            "adicionarCups",
            "selectCupsByActividad",
        ]),
        edadActual(x) {
            if (!x) return null; // valida que haya fecha

            let nacimiento;

            // Manejar diferentes tipos de entrada
            if (typeof x === 'string' || x instanceof String) {
                nacimiento = new Date(x);
            } else if (x instanceof Date) {
                nacimiento = x;
            } else if (typeof x === 'object' && x !== null) {
                // Si es un objeto, intenta extraer una propiedad con la fecha (ajusta según tu estructura)
                if (x.date) {
                    nacimiento = new Date(x.date);
                } else {
                    console.warn('Formato de fecha no soportado:', x);
                    return null;
                }
            } else {
                console.warn('Formato de fecha no soportado:', x);
                return null;
            }

            // Validar que la fecha sea válida
            if (isNaN(nacimiento.getTime())) {
                console.warn('Fecha inválida:', x);
                return null;
            }

            const hoy = new Date();

            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mesDiff = hoy.getMonth() - nacimiento.getMonth();
            const diaDiff = hoy.getDate() - nacimiento.getDate();

            // Si aún no ha pasado el cumpleaños este año, resta 1
            if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
                edad--;
            }

            return edad;
        },
        cerrarVisita(tipousuario) {
            if (tipousuario === "Enfermero") {
                alert("La visita ha sido cerrada exitosamente x enfermera");
            } else if (tipousuario === "Medico") {
                alert("La visita ha sido cerrada exitosamente x  medico");
            } else {
                alert("La visita ha sido cerrada exitosamente x auxiliar.");
            }

        },

        clear() {
            this.idItem = "";
            this.keyActividad = "";
            this.CupsSeleccionado = {};
            this.cantidad = 1; // Reiniciar cantidad
            this.detalle = ""; // Reiniciar detalle
            this.cupsArray = []; // Limpiar el array de cups seleccionados al abrir el modal
        },
        //adiciona los cups al listado que se va guardando
        addCups(cups, cant, detalle) {
            if (cups && Object.keys(cups).length > 0) {
                if (!this.cupsArray.some((cup) => cup.id === cups.id)) {
                    this.cupsArray.push({
                        ...cups,
                        cantidad: cant,
                        detalle: detalle
                    });
                } else {
                    alert("Este elemento ya fue agregado.");
                }
                this.CupsSeleccionado = {};
            } else {
                alert("Seleccione una opción válida.");
            }
        },
        //gestiona los parametros de la ruta de almacenamiento
        integrarCup(id) {
            this.clear();

            if (this.userData && this.userData.cargo) {
                this.keyActividad = this.userData.cargo;
            } else {
                this.keyActividad = this.userData.cargo;
            }
            this.idItem = id;
        },
        //confirma la seleccion de cups arma paquete para entregar al storage
        async confirmarSeleccion() {
            let data = {
                key: this.keyActividad,
                cups: this.cupsArray,
                idEncuesta: this.idEncuesta,
                idActividad: this.idItem,
                cargo: this.userData.cargo,
                nombre: this.userData.nombre,
                cantidad: this.cantidad,
                detalle: this.detalle
            };
            await this.adicionarCups(data);
            this.clear();
            this.recargar();
        },

        actividadesConMedico(tipoActividad) {
            if (!tipoActividad || !this.userData || !this.userData.cargo) return [];
            return Object.values(tipoActividad).filter(actividad =>
                actividad.Profesional && actividad.Profesional.includes(this.userData.cargo)
            );
        },
        /* ---------------------------------------------------------------------------- */

        /* --------------------------------------------------------------------- */
        async cupsAsignados(idAct) {
            try {
                const response = await this.selectCupsByActividad({
                    enc: this.idEncuesta,
                    act: idAct,
                });
                console.log(response);
                if (response && response.length > 0) {
                    return response.map((cup) => cup.DescripcionCUP).join(", ");
                } else {
                    return "No hay CUPS asignados";
                }
            } catch (error) {
                console.error("Error al obtener los CUPS asignados:", error);
                return "Error al cargar CUPS";
            }
        },

        eliminarCUP(idEncuesta, idActividad, idCup) {
            if (confirm("¿Estás seguro de que deseas eliminar este CUP?")) {
                /*    console.log("Eliminar cup con id:", idx); */
                this.$store.dispatch("deleteCUPS", {
                    idEncuesta: this.idEncuesta,
                    idActividad: idActividad,
                    idCup: idCup,
                    rol: this.userData.cargo
                }).then(() => {
                    this.recargar();
                }).catch(error => {
                    console.error("Error al eliminar el CUP:", error);
                });
            }
        },

        async recargar() {
            /* this.idEncuesta = this.$route.params.idEncuesta; */
            await this.getEncuestaById(this.idEncuesta);
        },
        watch: {
            '$route.params.idEncuesta'(newId) {
                this.idEncuesta = newId;
                this.recargar();
            }
        }

    },
    /* ----------------------------------------------------------------------------------------------- */
    async mounted() {

        await this.getAllCups();

    },

    /* ----------------------------------------------------------------------------------------------- */
    async created() {
        this.idEncuesta = this.$route.params.idEncuesta;
        await this.getEncuestaById(this.idEncuesta);
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
