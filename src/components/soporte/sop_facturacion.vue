<template>
<div class="container-fluid">
    <h1> <i class="bi bi-clipboard-check"></i> Facturación</h1>
    <div v-if="cargando" class="spinner-overlay">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
        </div>
        <div class="spinner-message">Por favor espere, cargando información...</div>
    </div>
    <div v-if="!cargando">
        <!--      <h4>Facturador:{{ userData?.nombre || 'Usuario' }}</h4>
        {{ userData }} -->
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link" :class="{active: activeTab === 'pendientes'}" @click="activeTab = 'pendientes'" type="button">Pendientes</button>
                <button class="nav-link" :class="{active: activeTab === 'aprovisionar'}" @click="activeTab = 'aprovisionar'" type="button">Aprovisionar</button>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div v-show="activeTab === 'pendientes'" class="tab-pane fade show active" id="nav-home" role="tabpanel" tabindex="0">
                aquí va la consulta de pendientes
                <!--  {{ EncuestasFactAprov }} -->
                <div class="table-responsive" ref="tablaHtml">
                    <table class="table table-bordered table-striped table-sm align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>id</th>
                                <th>Grupo</th>
                                <th>Paciente</th>
                                <th>Sexo</th>
                                <th>Documento</th>
                                <th>Fecha Nac.</th>
                                <th>EPS</th>
                                <th>Régimen</th>
                                <th>Dirección</th>
                                <th>Barrio</th>
                                <th>Comuna</th>
                                <th>Fecha Demanda</th>
                                <th>Remisión</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(paciente, idx) in EncuestasFactAprov" :key="paciente.id">
                                <td>{{ paciente.id }}</td>
                                <td>{{ paciente.grupo }}</td>
                                <td>{{ paciente.nombre1 }} {{ paciente.apellido1 }} {{ paciente.apellido2 }}</td>
                                <td>{{ paciente.sexo }}</td>
                                <td>{{ paciente.tipodoc }}-{{ paciente.numdoc }}</td>
                                <td>{{ paciente.fechaNac }}</td>
                                <td>{{ paciente.eps }}</td>
                                <td>{{ paciente.regimen }}</td>
                                <td>{{ paciente.direccion }}</td>
                                <td>{{ paciente.barrioVeredacomuna?.barrio }}</td>
                                <td>{{ paciente.barrioVeredacomuna?.comuna }}</td>
                                <td>{{ paciente.fecha }}</td>
                                <td>{{ paciente.requiereRemision }}</td>
                                <td><button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-bookmark-check-fill"></i></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-show="activeTab === 'aprovisionar'" class="tab-pane fade show active" id="nav-profile" role="tabpanel" tabindex="0">
                <div class="container mt-3">
                    <div class="row">
                        <div class="col-8">
                            <div class="input-group">
                                <span class="input-group-text">Rango de fechas de la consulta</span>
                                <input type="date" aria-label="First name" class="form-control" v-model="fechaInicio">
                                <input type="date" aria-label="Last name" class="form-control" v-model="fechaFin">
                            </div>
                        </div>
                        <div class="col-4">
                            <button type="button" class="btn btn-warning" @click="getdataEncuestas($event)">Buscar</button>
                        </div>
                    </div>
                </div>
                <br>
                <p>Registro</p>
                <div class="table-responsive" ref="tablaHtml">
                    <table class="table table-bordered table-striped table-sm align-middle">
                        <thead class="table-light">
                            <tr>
                                <th>id</th>
                                <th>Grupo</th>
                                <th>Paciente</th>
                                <th>Sexo</th>
                                <th>Documento</th>
                                <th>Fecha Nac.</th>
                                <th>EPS</th>
                                <th>Régimen</th>
                                <th>Dirección</th>
                                <th>Barrio</th>
                                <th>Comuna</th>
                                <th>Fecha Demanda</th>
                                <th>Remisión</th>
                                <th>Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(paciente, idx) in EncuestasFact" :key="paciente.id">
                                <td>{{ paciente.id }}</td>
                                <td>{{ paciente.grupo }}</td>
                                <td>{{ paciente.nombre1 }} {{ paciente.nombre2 }} {{ paciente.apellido1 }} {{ paciente.apellido2 }}</td>
                                <td>{{ paciente.sexo }}</td>
                                <td>{{ paciente.tipodoc }}-{{ paciente.numdoc }}</td>
                                <td>{{ paciente.fechaNac }}</td>
                                <td>{{ paciente.eps }}</td>
                                <td>{{ paciente.regimen }}</td>
                                <td>{{ paciente.direccion }}</td>
                                <td>{{ paciente.barrioVeredacomuna?.barrio }}</td>
                                <td>{{ paciente.barrioVeredacomuna?.comuna }}</td>
                                <td>{{ paciente.fecha }}</td>
                                <td>{{ paciente.requiereRemision }}</td>
                                <td>
                                    <button type="button" class="btn btn-warning btn-sm" :disabled="aprovDisabled[paciente.id]" @click="AprovisionarPaciente(idEncuesta=paciente.id, idProf=userData.numDocumento)">
                                        <i class="bi bi-person-plus"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Registar Factura</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    datos
                    <hr>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">#factura</span>
                        <input type="text" class="form-control" placeholder="Número de factura" aria-label="numfact" aria-describedby="basic-addon1">
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    doc
} from 'firebase/firestore';
import {
    mapActions,
    mapState
} from 'vuex';

export default {
    data() {
        return {
            fechaFin: "",
            fechaInicio: "",
            cargando: true,
            activeTab: 'pendientes', // Control de pestaña activa
            aprovDisabled: {}, // Estado de desactivación por paciente
        };
    },
    methods: {
        ...mapActions(['GetRegistersbyRangeGeneralFact', 'GetRegistersbyRangeGeneralFactAprov', 'aprovicionarP']),
        async getPendientes() {
            this.cargando = true;
            await this.GetRegistersbyRangeGeneralFactAprov(this.userData.numDocumento);
            this.cargando = false;
        },
        async getdataEncuestas(event) {
            if (event) event.preventDefault();
            this.cargando = true;
            try {
                let parametros = {
                    finicial: this.fechaInicio,
                    ffinal: this.fechaFin
                };
                await this.GetRegistersbyRangeGeneralFact(parametros);
            } catch (error) {
                console.error("Error al consultar encuestas:", error);
            } finally {
                this.cargando = false;
            }
        },
        AprovisionarPaciente(id) {
            this.aprovDisabled[id] = true;
            let data = {
                idEnc: id,
                idProf: this.userData.numDocumento
            }

            this.aprovicionarP(data);

        }
    },
    computed: {
        ...mapState(['EncuestasFact', 'userData', 'EncuestasFactAprov']),
    },
    async mounted() {
        this.cargando = true;
        await this.GetRegistersbyRangeGeneralFactAprov(this.userData.numDocumento);
        this.cargando = false;
    }
}
</script>

<style>
.spinner-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.8);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.spinner-message {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #333;
}
</style>
