<template>
<div>
    <h5>Página de gestión de CUPS</h5>

    <hr />
    <div v-for="item in InfoEncuestasById" :key="item.id" class="mb-4">
        <p>
            Paciente: {{ item.nombre1 }} {{ item.nombre2 }} {{ item.apellido1 }}
            {{ item.apellido2 }} / Eps:{{ item.eps }}
        </p>
        <hr />

        <h6>Items del paciente</h6>

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
                        <template v-if="actividad.CUPS && Object.keys(actividad.CUPS).length > 0">
                            <!-- Verifica si hay al menos un array de CUPS no vacío -->
                            <template v-if="
                    Object.values(actividad.CUPS).some((list) => list && list.length > 0)
                  ">
                                <template v-for="(cupList, cupKey) in actividad.CUPS" :key="cupKey">
                                    <template v-if="cupList && cupList.length > 0">
                                        <span v-for="(cup, index) in cupList" :key="index">
                                            {{ cup.DescripcionCUP
                        }}<span v-if="index < cupList.length - 1">, </span>
                                        </span>
                                    </template>
                                </template>
                            </template>
                            <template v-if="actividad.CUPS && Object.keys(actividad.CUPS).length > 0">
                                <template v-for="(cupObj, cupKey) in actividad.CUPS" :key="cupKey">
                                    <span v-for="(cup, index) in cupObj.cups" :key="index">
                                        {{ cup.DescripcionCUP
                      }}<span v-if="
                          !(
                            cupKey ===
                              Object.keys(actividad.CUPS)[
                                Object.keys(actividad.CUPS).length - 1
                              ] && index === cupObj.cups.length - 1
                          )
                        ">
                                            <hr />
                                        </span>
                                    </span>
                                </template>
                            </template>
                            <template v-else><p class="textRed"><i class="bi bi-x-octagon"></i> Sin CUPS asignados</p>  </template>
                        </template>
                        <template v-else> <p class="textRed"><i class="bi bi-x-octagon"></i>  Sin CUPS asignados</p> </template>
                    </td>

                    <td>
                        <button class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="integrarCup(actividad.id)" v-if="
                    Array.isArray(actividad.Profesional) &&
                    actividad.Profesional.includes(userData.cargo) &&
                    !(actividad.CUPS && Object.keys(actividad.CUPS).length > 0)
                  ">
                            + Cups
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <hr />
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
        };
    },
    computed: {
        ...mapState(["InfoEncuestasById", "userData", "cups", "encuestas"]),

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

        nombresActividades(act) {
            // Devuelve un array solo con los nombres
            return Object.values(act).map((a) => a.nombre);
        },
    },
    methods: {
        ...mapActions(["getAllEncuestasById", "getAllCups", "adicionarCups"]),
        clear() {
            this.idItem = "";
            this.keyActividad = "";
            this.CupsSeleccionado = "";
            this.cupsArray = []; // Limpiar el array de cups seleccionados al abrir el modal
        },
        hasCups(actividad) {
            if (!actividad.CUPS || Object.keys(actividad.CUPS).length === 0) {
                return false;
            }
            // Verifica si hay al menos un array de CUPS no vacío
            return Object.values(actividad.CUPS).some(list =>
                list && list.length > 0
            );
        },
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

        integrarCup(id) {
            this.clear();
            this.keyActividad = "CUPS";
            this.idItem = id;
        },

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
        recargar() {
            this.idEncuesta = this.$route.params.idEncuesta;
            this.getAllEncuestasById(this.idEncuesta);
            this.getAllCups();
        }
    },
    mounted() {
        this.idEncuesta = this.$route.params.idEncuesta;
        this.getAllEncuestasById(this.idEncuesta);
        this.getAllCups();
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
