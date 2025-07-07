<template>
<!-- {{ InfoEncuestasById }} -->
<div v-for="item in InfoEncuestasById" :key="item.id" class="mb-4">
    <p>
        Paciente: {{ item.nombre1 }} {{ item.nombre2 }} {{ item.apellido1 }}
        {{ item.apellido2 }} / Eps:{{ item.eps }}
    </p>
    <hr />
    <h6>Items del paciente</h6>
    <hr />
    <table class="table table-striped table-sm table-bordered">
        <thead>
            <tr>
                <th>Profesional Autorizado</th>
                <th>Items</th>
                <th>Cups Asignados</th>
                <th>Opciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(actividad, index) in item.tipoActividad || []" :key="index">
                <td>{{ actividad.Profesional }}</td>
                <td>{{ actividad.nombre }}</td>
                <td>
                    <span>
                        <span v-for="(cup, idx) in actividad.cups" :key="idx">

                            <span>
                                <span v-for="item in cup" :key="item.id">

                                    <span v-for="it in item.cups" :key="it.id">
                                        <button @click="removeCup(it.id)">-</button>  {{ it.DescripcionCUP }}
                                        <hr>
                                    </span>
                                </span>
                            
                            </span>
                        </span>
                    </span>
                </td>
                <td>
                    <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="integrarCup(actividad.id)">
                        + Cups
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                    Añadir CUPS a procedimientos
                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Seleccione el cup que desea añadir a la actividad realizada al paciente
                <div class="row">
                    <div class="mb-3">
                        <br />
                        <select v-model="CupsSeleccionado" class="form-select" id="cupSelect">
                            <option value="">Seleccione CUPS</option>
                            <option v-for="cup in cupsEPS" :key="cup.id" :value="cup">
                                {{ cup.DescripcionCUP }}
                            </option>
                        </select>
                        <button class="btn btn-warning btn-sm mt-2" @click="addCups(CupsSeleccionado)">
                            + Agregar
                        </button>
                    </div>
                </div>
                <hr />
            </div>
            <div class="modal-body">
                <h6>Cups seleccionados:</h6>

                <table class="table">
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

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                        Cerrar
                    </button>
                    <button type="button" class="btn btn-primary btn-sm" @click="confirmarSeleccion()" data-bs-dismiss="modal">
                        Guardar
                    </button>
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
        ]),
        //logica para obtener los cups filtrados por EPS y profesional
        dataencuesta() {
            return this.encuestas.length > 0 ? this.encuestas[0] : null;
        },
        cupsEPS() {
            if (!this.cups || !this.dataencuesta || !this.dataencuesta.eps) return [];
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
            "getAllEncuestasById",
            "getAllCups",
            "adicionarCups",
            "selectCupsByActividad",
        ]),
        clear() {
            this.idItem = "";
            this.keyActividad = "";
            this.CupsSeleccionado = "";
            this.cupsArray = []; // Limpiar el array de cups seleccionados al abrir el modal
        },
        //adiciona los cups al listado que se va guardando
        addCups() {
            if (this.CupsSeleccionado && Object.keys(this.CupsSeleccionado).length > 0) {
                if (!this.cupsArray.some((cup) => cup.id === this.CupsSeleccionado.id)) {
                    this.cupsArray.push(this.CupsSeleccionado);
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
            this.keyActividad = this.userData.cargo;
            this.idItem = id;
        },
        //confirma la seleccion de cups arma paquete para entregar al storage
        async confirmarSeleccion() {
            let data = {
                key: this.keyActividad,
                cups: this.cupsArray,
                idEncuesta: this.idEncuesta,
                id: this.idItem,
                cargo: this.userData.cargo,
                nombre: this.userData.nombre,
            };
            this.adicionarCups(data);
            this.clear();
            this.recargar();
        },

        //2
        async Nuevoarray() {
            const valorDelState = this.InfoEncuestasById;
            let copia = JSON.parse(JSON.stringify(valorDelState));
            console.log("datos trasformados", copia);
            return copia;
        },
        /* ---------------------------------------------------------------------------- */
        async procesarData(datos) {
            // Procesar todos los items de forma asíncrona
            if (!Array.isArray(this.datos)) {
                this.datos = [];
            }

            const resultados = await Promise.all(
                datos.map(async (item) => {
                    // Clonar el objeto para evitar mutaciones directas
                    const nuevoItem = {
                        ...item,
                    };

                    // Crear un nuevo objeto para tipoActividad
                    const nuevoTipoActividad = {};

                    // Obtener un array con las actividades para procesar en paralelo
                    const actividades = item.tipoActividad ? Object.values(item.tipoActividad) : [];

                    // Procesar cada actividad y esperar cupsAsignados
                    await Promise.all(
                        actividades.map(async (actividad) => {
                            try {
                                const cups = await this.cupsAsignados(actividad.id);
                                nuevoTipoActividad[actividad.id] = {
                                    ...actividad,
                                    cups, // cups ya es string con los CUPS separados por coma
                                };
                            } catch (error) {
                                console.error(
                                    `Error al obtener cups para actividad ${actividad.id}:`,
                                    error
                                );
                                nuevoTipoActividad[actividad.id] = {
                                    ...actividad,
                                    cups: "",
                                };
                            }
                        })
                    );

                    nuevoItem.tipoActividad = nuevoTipoActividad;
                    return nuevoItem;
                })
            );

            // Acumular los nuevos resultados sin duplicados (por id)
            resultados.forEach((nuevo) => {
                // Buscar si ya existe un item con el mismo id
                const idx = this.datoscups.findIndex((item) => item.id === nuevo.id);
                if (idx === -1) {
                    // No existe, agregar
                    this.datoscups.push(nuevo);
                } else {
                    // Ya existe, fusionar actividades (acumular tipoActividad)
                    const actividadesExistentes = this.datoscups[idx].tipoActividad || {};
                    const actividadesNuevas = nuevo.tipoActividad || {};
                    // Fusionar actividades por id
                    this.datoscups[idx] = {
                        ...this.datoscups[idx],
                        ...nuevo,
                        tipoActividad: {
                            ...actividadesExistentes,
                            ...actividadesNuevas,
                        },
                    };
                }
            });

            return this.datoscups;
        },
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

        async recargar() {
            this.idEncuesta = this.$route.params.idEncuesta;
            await this.getAllEncuestasById(this.idEncuesta);
            await this.getAllCups();
        },
    },
    /* ----------------------------------------------------------------------------------------------- */
    async mounted() {
        await this.getAllEncuestasById(this.idEncuesta);
        await this.getAllCups();
        //1
        /*  this.datoslistos = await this.Nuevoarray();
            this.datosfinal = await this.procesarData(this.datoslistos); */
    },

    /* ----------------------------------------------------------------------------------------------- */
    async created() {
        this.idEncuesta = this.$route.params.idEncuesta;
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

.table-auto {
    width: auto;
    /* Opcional: evita que la tabla se estire al 100% */
    max-width: 100%;
    border-collapse: collapse;
}

.table-auto td,
.table-auto th {
    white-space: nowrap;
    /* Opcional: padding para separar contenido */
    padding: 8px 12px;
}
</style>
