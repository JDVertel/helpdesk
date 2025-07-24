<template>
<div>
    <h1 class="display-6 center">{{ userData.cargo }}</h1>

    <div class="row">
        <div class="col-6 center">
            <h6 class="display-6">{{ cantEncuestas }}</h6>
            <p>Abiertas</p>
        </div>
        <div class="col-6 center">
            <h6 class="display-6">{{ encuestasToday.length }}</h6>
            <p>Diarias</p>
        </div>

    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">
                Abiertas
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="today-tab" data-bs-toggle="tab" data-bs-target="#today-tab-pane" type="button" role="tab" aria-controls="wait-tab-pane" aria-selected="true">
                Diarias
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="wait-tab" data-bs-toggle="tab" data-bs-target="#wait-tab-pane" type="button" role="tab" aria-controls="today-tab-pane" aria-selected="true">
                + Registro
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
            <h5>Encuestas Pendientes x visita</h5>
            <br />
            <div style="max-height: 650px; overflow-y: auto; mt-3">
                <div v-for="(encuesta, index) in encuestas" :key="index">
                    <div class="row">

                        <div class="col-12 col-md-3 paciente">

                            <small>
                                <strong>Paciente: </strong> {{ encuesta.nombre1 }} {{ encuesta.apellido1 }} <strong>/</strong> <strong>Eps:</strong>
                                {{ encuesta.eps }}
                            </small>
                            /
                            <small> <strong>F Encuesta: </strong>{{ encuesta.fecha }}</small>
                            <hr />
                            <small><strong>Encuestador:</strong> <strong>{{ getNombreEncuestador(encuesta.idEncuestador) }}</strong></small>
                            /
                            <small>Fecha Visita: {{ encuesta.fechavisita }}</small>
                        </div>
                        <!--  -->
                        <div class="col-12 col-md-6 Actividades">
                            <small>
                                <strong>Actividades:</strong>
                                {{ this.nombresActividades(encuesta.tipoActividad) }}</small>
                            <hr>
                            <small> <strong>P Riesgo:</strong> {{ encuesta.poblacionRiesgo }}</small>

                        </div>

                        <div class="col-12 col-md-3 ">
                            <div class="row">
                                <div class="col-6 col-md-3">
                                    <div v-if="encuesta.Agenda_tomademuestras?.cita_tomamuestras === false">
                                        <small>Agenda laboratorios pendiente...</small>
                                    </div>
                                    <div v-else-if="
                          encuesta.Agenda_tomademuestras?.cita_tomamuestras === undefined
                        ">
                                        <small>Agenda laboratorios pendiente...</small>
                                    </div>

                                    <div v-else>
                                        <h6 class="ok">
                                            <i class="bi bi-check2-circle"></i>Laboratorios ok
                                        </h6>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div v-if="encuesta.Agenda_Visitamedica?.cita_visitamedica === false">
                                        <small>Agenda visita Pendiente...</small>
                                    </div>
                                    <div v-else-if="
                          encuesta.Agenda_Visitamedica?.cita_visitamedica === undefined
                        ">
                                        <small>Agenda visita Pendiente...</small>
                                    </div>
                                    <div v-else>
                                        <h6 class="ok">
                                            <i class="bi bi-check2-circle"></i>Visita medica ok
                                        </h6>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">
                                    <div v-if="encuesta.status_caracterizacion === false">
                                        <small>Caracterizacion Pendiente...</small>
                                    </div>
                                    <div v-else>
                                        <h6 class="ok">
                                            <i class="bi bi-check2-circle"></i> Caracterizacion ok
                                        </h6>
                                    </div>
                                </div>
                                <div class="col-6 col-md-3"> <button type="button" class="btn btn-danger btn-sm" @click="cupsGestion(encuesta.id)">
                                        <i class="bi bi-calendar2-heart-fill">
                                            <small> Gestionar Cups</small></i>
                                    </button></div>

                            </div>
                            <div>
                            </div>

                        </div>
                        <hr>
                    </div>
                    <!--  -->
                </div>

            </div>
        </div>
        <div class="tab-pane fade" id="today-tab-pane" role="tabpanel" aria-labelledby="today-tab" tabindex="0">
            <h5>Encuestas Diarias</h5>
            <div class="table-responsive" style="max-height:600px; overflow-y: auto;">
                <table class="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Detalle</th>

                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(encuesta, index) in this.encuestasToday" :key="index">
                            <td>
                                Paciente: {{ encuesta.nombre1 }} {{ encuesta.apellido1 }}
                                <hr />
                                Actividades:{{ this.nombresActividades(encuesta.tipoActividad) }}
                                <hr />
                                P Riesgo: {{ encuesta.poblacionRiesgo }}
                            </td>

                            <td>
                                <div class="col-4">

                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="wait-tab-pane" role="tabpanel" aria-labelledby="wait-tab" tabindex="0">

        </div>
    </div>
</div>
</template>

<script>
import {
    doc,
    setDoc,
    collection,
    getDocs
} from "firebase/firestore";
import {
    db
} from "@/api/firebase";
import {
    mapActions,
    mapState
} from "vuex";
import moment from "moment";
export default {
    data() {
        return {
            fechaActual: "",
            mapUsuarios: {}, // id -> nombre completo
            users: [],
        };
    },

    methods: {
        ...mapActions([
            "removeRegEnc",
            "getAllRegistersByFechaStatus",
            "getAllRegistersByIduserProf",
            "getAllRegistersByFecha",
            "SelectExistenteAgendas",
            "getAllUsers"
        ]),

        removeRegEncuesta(id) {
            this.removeRegEnc(id);
            alert("Registro eliminado exitosamente.");
            this.getAllRegistersByFecha({
                idUsuario: this.userData.numDocumento,
                fecha: this.fechaActual,
            });
            this.getAllRegistersByFechaStatus({
                idUsuario: this.userData.numDocumento,
            });
            this.getAllRegistersByIduser({
                idUsuario: this.userData.numDocumento,
            });
        },
        Agendar(id, tipo) {
            this.$router.push({
                name: "sop_agendamiento",
                params: {
                    idEncuesta: id,
                    tipo: tipo,
                },
            });
        },
        Caracterizar(id) {
            this.$router.push({
                name: "sop_caracterizacion",
                params: {
                    idEncuesta: id,
                },
            });
        },

        cupsGestion(id) {
            this.$router.push({
                name: "sop_cups",
                params: {
                    idEncuesta: id,
                },
            });
        },

        nombresActividades(act) {
            // Devuelve un array solo con los nombres
            return Object.values(act).map((a) => a.nombre);
        },
        /* ............................................................ */
        crearMapaUsuarios() {
            this.mapUsuarios = {};
            if (Array.isArray(this.usuarios)) {
                this.usuarios.forEach(e => {
                    this.mapUsuarios[e.id] = `${e.nombre1} ${e.apellido1}`;
                });
            }
        },

        getNombreEncuestador(idEncuestador) {
            // Buscar en usuarios (users) por id, uid o numDocumento
            if (Array.isArray(this.users)) {
                const usuario = this.users.find(u => u.id === idEncuestador || u.uid === idEncuestador || u.numDocumento === idEncuestador);
                if (usuario) {
                    // Intenta mostrar nombre completo
                    return `${usuario.nombre1 || usuario.nombres || usuario.nombre || ''} ${usuario.apellido1 || usuario.apellidos || ''}`.trim() || usuario.nombre || 'No disponible';
                }
            }
            // Fallback a mapUsuarios (de la store)
            if (this.mapUsuarios && this.mapUsuarios[idEncuestador]) {
                return this.mapUsuarios[idEncuestador];
            }
            return 'No disponible';
        },
        /* ............................................................ */

        async fetchUsers() {
            try {
                const usersCol = collection(db, "users");
                const querySnapshot = await getDocs(usersCol);
                this.users = querySnapshot.docs.map((doc) => ({
                    uid: doc.id,
                    ...doc.data(),
                }));
            } catch (error) {
                this.message = `Error al cargar usuarios: ${error.message}`;
                this.messageType = "error";
                console.error("Error fetchUsers:", error);
            }
        },

        async DataUser(id) {

            if (!id) {
                console.error("ID is required to fetch user data.");
                return null;
            }
            try {
                const user = this.users.find(user => user.uid === id);
                if (user) {
                    return user;
                } else {
                    console.error("No such user!");
                    return null;
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
            }

        }
    },

    computed: {
        ...mapState(["encuestas", "userData", "cantEncuestas", "encuestasToday", "usuarios"]),
        documento() {
            return this.userData.numDocumento;
        },
        totalRegisters() {
            return this.encuestas.length;
        }
    },

    watch: {
        usuarios: {
            immediate: true,
            handler() {
                this.crearMapaUsuarios();
            }
        }
    },

    mounted: async function () {
        this.fechaActual = moment().format("YYYY-MM-DD");

        //encuestas diarias + contador
        await this.getAllRegistersByFecha({
            idUsuario: this.userData.numDocumento,
            fecha: this.fechaActual,
        });

        //encuestas abiertas
        await this.getAllRegistersByFechaStatus({
            idUsuario: this.userData.numDocumento,
        });

        //total de encuestas del usuario . para contador
        await this.getAllRegistersByIduserProf({
            idUsuario: this.userData.numDocumento,
        });
        this.fetchUsers();
    },
}
</script>

<style></style>
