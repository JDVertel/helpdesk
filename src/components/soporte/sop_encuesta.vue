<template>
<div>
    <div class="container">
        <h5 class="center">Cuidandote en casa</h5>
        <br />
        <!-- FORMULARIO -->
        <div class="container formulario">
            <form @submit.prevent="addRegistroEncuesta">
                <div class="row">
                    <div class="col-6 col-md-3 mb-3">
                        <label for="eps" class="form-label">EPS</label>
                        <select id="eps" v-model="eps" class="form-select" required>
                            <option value="">Seleccione</option>
                            <option v-for="(ep, index) in Deps" :key="index" :value="ep.nombre">
                                {{ ep.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="regimen" class="form-label">Regimen</label>
                        <select id="regimen" v-model="regimen" class="form-select" required>
                            <option value="">Seleccione</option>
                            <option v-for="(regimen, index) in Dregimen" :key="index" :value="regimen.nombre">
                                {{ regimen.nombre }}
                            </option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="nombre1" class="form-label">Primer Nombre</label>
                        <input type="text" id="nombre1" v-model="nombre1" class="form-control" required />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="nombre2" class="form-label">Segundo Nombre</label>
                        <input type="text" id="nombre2" v-model="nombre2" class="form-control" />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="apellido1" class="form-label">Primer Apellido</label>
                        <input type="text" id="apellido1" v-model="apellido1" class="form-control" required />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="apellido2" class="form-label">Segundo Apellido</label>
                        <input type="text" id="apellido2" v-model="apellido2" class="form-control" />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="fechaNac" class="form-label">F Nacimiento</label>
                        <input type="date" id="fechaNac" v-model="fechaNac" class="form-control" required />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="sexo" class="form-label">Sexo</label>
                        <select id="sexo" v-model="sexo" class="form-select" required>
                            <option value="">Seleccione</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="tipodoc" class="form-label">Tipo de Documento</label>
                        <select id="tipodoc" v-model="tipodoc" class="form-select" required>
                            <option value="">Seleccione</option>
                            <option value="RC">Registro Civil</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NV">Certificado nacido vivo</option>
                            <option value="PA">Pasaporte</option>
                            <option value="PE">Permiso Especial de Permanencia</option>
                            <option value="MS">Menos sin identificacion</option>
                            <option value="AS">Adulto sin identificacion</option>
                            <option value="PT">Permiso por proteccion temporal</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="numdoc" class="form-label">Número de Documento</label>
                        <input type="text" id="numdoc" v-model="numdoc" class="form-control" required />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="direccion" class="form-label">Dirección</label>
                        <input type="text" id="direccion" v-model="direccion" class="form-control" required />
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="telefono" class="form-label">Teléfono</label>
                        <input type="number" id="telefono" v-model="telefono" class="form-control" required />
                    </div>

                    <div class="col-12 col-md-3 mb-3">
                        <label for="barrioVeredacomuna" class="form-label">Barrio-vereda/comuna</label>
                        <div class="horizontal">
                            <select id="barrioVeredacomuna" v-model="barrioVeredacomuna" class="form-select" required>
                                <option value="">Seleccione</option>
                                <option :value="option" v-for="(option, index) in comunasBarrios" :key="index">
                                    {{ option.barrio }} ({{ option.comuna }})
                                </option>
                            </select>
                            <button class="btn btn-warning btn-sm" @click="updateBarrios"><i class="bi bi-arrow-repeat"></i></button>
                        </div>
                    </div>

                    <div class="col-12 col-md-3 mb-3">
                        <label for="tipoActividad" class="form-label">Tipo de Actividad (Proyectada)
                        </label>
                        <div class="row">
                            <div class="col-10">
                                <select id="tipoActividad" v-model="tipoActividad" class="form-select">
                                    <option value="">Seleccione</option>
                                    <option :value="option.nombre" v-for="(option, index) in tipoActividadExtramural" :key="index">
                                        {{ option.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-2" v-if="tipoActividad !== ''">
                                <button class="btn btn-warning btn-sm" @click="addActividad">+</button>
                            </div>
                        </div>
                        <br />
                        <div class="container comb_A">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" v-for="(list, index) in ListtipoActividad" :key="index">
                                    <button class="btn btn-danger btn-sm" @click="removeActividad(index)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    {{ list }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-12 col-md-3 mb-3">
                        <label for="poblacionRiesgo" class="form-label">Población de Riesgo</label>
                        <div class="row">
                            <div class="col-10">
                                <select id="poblacionRiesgo" v-model="poblacionRiesgo" class="form-select">
                                    <option value="">Seleccione</option>
                                    <option :value="option2.nombre" v-for="(option2, index) in poblacionRiesgoOptions" :key="index">
                                        {{ option2.nombre }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-2">
                                <div class="col-2" v-if="poblacionRiesgo !== ''">
                                    <button class="btn btn-warning btn-sm" @click="addRiesgo">+</button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div class="container comb_B">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item" v-for="(list, index) in ListpoblacionRiesgo" :key="index">
                                    <button class="btn btn-danger btn-sm" @click="removeRiesgo(index)">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    {{ list }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="desplazamiento" class="form-label">¿Desplazamiento efectivo?</label>
                        <select id="desplazamiento" v-model="desplazamiento" class="form-select" required>
                            <option value="" disabled>Seleccione</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div class="col-6 col-md-3 mb-3">
                        <label for="requiereRemision" class="form-label">¿Requiere remisión a procedimiento?</label>
                        <select id="requiereRemision" v-model="requiereRemision" class="form-select" required>
                            <option value="" disabled>Seleccione</option>
                            <option value="si">Sí</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary" v-if="userData">Guardar Demanda inducida</button>
            </form>
        </div>
        <br>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions
} from "vuex";
import moment from "moment";

export default {
    data: () => ({
        eps: "",
        regimen: "",
        fechaActual: moment().format("YYYY-MM-DD"),
        nombre1: "",
        nombre2: "",
        apellido1: "",
        apellido2: "",
        tipodoc: "",
        numdoc: "",
        sexo: "",
        fechaNac: "",
        direccion: "",
        barrioVeredacomuna: "",
        telefono: "",
        desplazamiento: "",
        tipoActividad: "",
        poblacionRiesgo: "",
        requiereRemision: "",

        tipoActividadExtramural: [{
            nombre: "Consulta PYMS",
                prof:"M",
            },
            {
                nombre: "Consulta Morbilidad",
                prof:"M",
            },
            {
                nombre: "VPS",
                prof:"M",
            },
            {
                nombre: "Toma lab  PYMS",
                prof:"A",
            },
            {
                nombre: "Toma lab Morbilidad",
                prof:"A",
            },
            {
                nombre: "Vacunacion",
                prof:"A",
            },
            {
                nombre: "Realizacion de tamizajes",
                prof:"E",
            },
            {
                nombre: "Realizacion Test",
                prof:"E",
            },
            {
                nombre: "IEC",
                prof:"E",
            },
            {
                nombre: "Remision IPS",
                prof:"M",
            },
            {
                nombre: "Otro",
            },
        ],

        tipoActividadAdicionales: [],

        poblacionRiesgoOptions: [{
                nombre: "Gestante",
            },
            {
                nombre: "Menor a 5 años",
            },
            {
                nombre: "Discapacidad",
            },
            {
                nombre: "Adulto mayor",
            },
            {
                nombre: "Orientacion sexual diversa",
            },
            {
                nombre: "Grupo etnico",
            },
        ],

        Deps: [{
                nombre: "NuevaEps",
            },
            {
                nombre: "Sanitas",
            },
            {
                nombre: "Coosalud",
            },
        ],

        Dregimen: [{
                nombre: "Contributivo",
            },
            {
                nombre: "Subsidiado",
            },
        ],
        ListpoblacionRiesgo: [],
        ListtipoActividad: [],
    }),
    methods: {
        addRegistroEncuesta() {
            // Validación de campos obligatorios
            if (
                !this.eps ||
                !this.regimen ||
                !this.nombre1 ||
                !this.apellido1 ||
                !this.fechaNac ||
                !this.sexo ||
                !this.tipodoc ||
                !this.numdoc ||
                !this.direccion ||
                !this.telefono ||
                !this.barrioVeredacomuna ||
                this.ListtipoActividad.length === 0 ||
                this.ListpoblacionRiesgo.length === 0 ||
                !this.desplazamiento ||
                !this.requiereRemision ||
                !this.userData.numDocumento

            ) {
                alert("Por favor, complete todos los campos obligatorios.");
                return;
            }

            const registro = {
                fechavisita: "",
                idMedicoAtiende: "",
                idEnfermeroAtiende:"",
                status_encuesta: true,
                status_tomamuestras: false,
                status_caracterizacion: false,
                status_visita: false,
                idEncuesta: 1,
                grupo: this.userData.grupo,
                idEncuestador: this.userData.numDocumento,
                bd: "Encuesta",
                fecha: moment().format("YYYY-MM-DD"),
                eps: this.eps,
                regimen: this.regimen,
                nombre1: this.nombre1,
                nombre2: this.nombre2,
                apellido1: this.apellido1,
                apellido2: this.apellido2,
                tipodoc: this.tipodoc,
                numdoc: this.numdoc,
                sexo: this.sexo,
                fechaNac: this.fechaNac,
                direccion: this.direccion,
                telefono: this.telefono,
                barrioVeredacomuna: this.barrioVeredacomuna,
                desplazamiento: this.desplazamiento,
                tipoActividad: this.ListtipoActividad,
                poblacionRiesgo: this.ListpoblacionRiesgo,
                requiereRemision: this.requiereRemision,
            };
            console.log(registro);
            this.createNewRegister(registro)
                .then(() => {
                    alert("Registro creado exitosamente");
                    this.resetForm();
                    this.$router.push("/sop_home");
                })
                .catch((error) => {
                    console.error("Error al crear el registro:", error);
                    alert("Error al crear el registro");
                });
        },

        ...mapActions(["createNewRegister", "getAllComunaBarrios"]),
        addRiesgo() {
            if (this.poblacionRiesgo !== "") {
                this.ListpoblacionRiesgo.push(this.poblacionRiesgo);
                this.poblacionRiesgo = "";
            } else {
                alert("Seleccione una opción válida.");
            }
            this.poblacionRiesgo = "";
        },
        addActividad() {
            if (this.tipoActividad !== "") {
                this.ListtipoActividad.push(this.tipoActividad);
                this.tipoActividad = "";
            } else {
                alert("Seleccione una opción válida.");
            }
            this.tipoActividad;
        },

        removeActividad(index) {
            this.ListtipoActividad.splice(index, 1);
        },
        removeRiesgo(index) {
            this.ListpoblacionRiesgo.splice(index, 1);
        },
        updateBarrios() {
            this.getAllComunaBarrios()
                .then(() => {
                    alert("Barrios actualizados correctamente");
                })
                .catch((error) => {
                    console.error("Error al actualizar barrios:", error);
                    alert("Error al actualizar barrios");
                });
        },
        resetForm() {
            this.regimen = "";
            this.eps = "";
            this.nombre1 = "";
            this.nombre2 = "";
            this.apellido1 = "";
            this.apellido2 = "";
            this.tipodoc = "";
            this.numdoc = "";
            this.direccion = "";
            this.fechaNac = "";
            this.sexo = "";
            this.telefono = "";
            this.barrioVeredacomuna = "";
            this.desplazamiento = "";
            this.tipoActividad = "";
            this.poblacionRiesgo = "";
            this.requiereRemision = "";
            this.ListpoblacionRiesgo = [];
            this.ListtipoActividad = [];
        },
    },

    computed: {
        ...mapState(["contador", "comunasBarrios", "userData"]),
    },
    mounted() {
        this.getAllComunaBarrios();
    },
};
</script>

<style></style>
