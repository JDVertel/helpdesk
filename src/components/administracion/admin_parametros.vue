<template>
<div class="container-fluid">
    <h3>Admin Parametros</h3>

    <br />
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                Comunas - Barrios
            </button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                EPS
            </button>
            <button class="nav-link disabled" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                Tipo Actividades
            </button>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
            <br />
            <h6>Opciones disponibles para las encuestas Comunas/Barrios </h6>
            <br />
            <div class="row">
                <div class="col-4">
                    <input type="number" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Comuna" v-model="comuna" />
                </div>
                <div class="col-4">
                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Barrio" v-model="barrio" />
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-warning btn-sm" @click="saveComunaBarrio">
                        + Guardar
                    </button>
                </div>
            </div>
            <br />
            <!--  {{ comunasBarrios }} -->
            <table class="table table-sm mb-4">
                <thead>
                    <tr>
                        <th scope="col">Comuna</th>
                        <th scope="col">Barrio</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(comuna, index) in comunasBarrios" :key="comuna.id || index">
                        <td>{{ comuna.comuna }}</td>
                        <td>{{ comuna.barrio }}</td>
                        <td>
                            <button class="btn btn-danger btn-sm" @click="deleteBarrio(comuna.id)" aria-label="Eliminar barrio" type="button">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
            <br />
            <div class="container">
                <br />
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Nombre de la Eps"  v-model="epsname"/>
                        </div>
                    </div>
                    <div class="col-6">
                        <button type="button" class="btn btn-warning btn-sm" @click="saveEps">Guardar</button>
                    </div>
                </div>
                <hr />
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre de EPS</th>
                            <th>Opciones</th>
  
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ot, index) in epss" :key="ot.id || index">
                            <td>{{ ot.eps }}</td>
                            <td>          <button class="btn btn-danger btn-sm" @click="EpsDelete(ot.id)" aria-label="Eliminar EPS" type="button">
                                <i class="bi bi-trash"></i>
                            </button></td>
                        </tr>
                     
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0">
            <br />
            <h6>Tipo de Actividades disponibles</h6>
            <br />
            <div class="row">
                <div class="col-6">
                    <div class="mb-3">
                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Nombre del nuevo tipo se soporte" />
                    </div>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-primary btn-sm" @click="saveEps">Guardar</button>
                </div>
            </div>
            <hr />
            <table class="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Detalle</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0">
            ...
        </div>
    </div>
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
            comuna: "",
            barrio: "",
            epsname:"",
        };
    },
    computed: {
        ...mapState(["comunasBarrios","epss"]),
    },
    methods: {
        ...mapActions(["getAllComunaBarrios", "crearComunaBarrio", "deleteComunaBarrio","crearEps", "getAllEps", "deleteEps"]),

        saveComunaBarrio() {
            let data = {
                comuna: this.comuna,
                barrio: this.barrio,
                bd: "comunasybarrios",
            };
            if (this.comuna === "" || this.barrio === "") {
                alert("Por favor, complete todos los campos.");
                return;
            }

            this.crearComunaBarrio(data);

            alert("Comuna y barrio creados exitosamente.");

            this.getAllComunaBarrios();
            this.clearform();
        },

        saveEps() {
            let data = {
                eps: this.epsname,
                bd: "eps",
            };
            if (this.epsname === "") {
                alert("Por favor, complete todos los campos.");
                return;
            }

            this.crearEps(data);

            alert("EPS creado exitosamente.");

            this.getAllEps();
            this.clearformeps();
        },
        clearform() {
            this.comuna = "";
            this.barrio = "";
        },
        clearformeps() {
            this.epsname = "";
        },

        async deleteBarrio(index) {
            await this.deleteComunaBarrio(index);
            alert("Comuna y barrio eliminados exitosamente.");
            this.getAllComunaBarrios();
        },
        async EpsDelete(index) {
            await this.deleteEps(index);
            alert("EPS eliminado exitosamente.");
            this.getAllEps();
        },
    },
    mounted() {
        this.getAllComunaBarrios();
        this.getAllEps();
    },
};
</script>

<style></style>
