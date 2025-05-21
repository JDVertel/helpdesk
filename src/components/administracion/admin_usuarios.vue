<template>
<h1>Admin usuarios</h1>

<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
            Usuarios
        </button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
            + Usuarios
        </button>
    </li>
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
        <h5>Listado de usuarios</h5>
        <br />
        <table class="table">
            <thead>
                <tr>
                    <th>Eliminar</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Reset</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td> <button class="btn btn-danger btn-sm" @click="removeUser(usuario.id)">
                            <i class="bi bi-person-x-fill"></i>
                        </button></td>
                    <td>
                      <div class="row">
                        <div class="col-12 col-md-4">Nombre: {{ usuario.nombres }} </div>
                        <div class="col-12 col-md-4">Documento: {{ usuario.documento }}</div>
                        <div class="col-12 col-md-4">Cargo: {{ usuario.cargo }}</div>
                      </div>
                  </td>
        
            
                    <td>
                        <button class="btn btn-primary btn-sm" @click="resetPass(usuario.id)">
                            <i class="bi bi-key"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
        <h5>Crear un nuevo usuario</h5>
        <br />
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-4">
                    <div class="mb-3">
                        <label for="nombres">Nombres</label>
                        <input type="text" class="form-control" id="nombres" v-model="nombres" />
                    </div>
                    <div class="mb-3">
                        <label for="documento">Documento</label>
                        <input type="text" class="form-control" id="documento" v-model="documento" />
                    </div>
                </div>
                <div class="col-12 col-md-4">
                    <div class="mb-3">
                        <label for="cargo">Cargo</label>
                        <select id="cargo" v-model="cargo" class="form-select" required>
                            <option value="" disabled>Seleccione</option>
                            <option value="encuestador">Encuestador</option>
                            <option value="coordinador">Coordinador</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-primary btn-sm" @click="crearUsuario">
                        + Crear
                    </button>
                </div>
            </div>
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
    data: function () {
        return {
            nombres: "",
            documento: "",
            cargo: "",
        };
    },

    computed: {
        ...mapState(["usuarios"]),
    },
    methods: {
        ...mapActions(["createUser", "getAllUsers", " getUser", "deleteUser", "resetPassword"]),

        async crearUsuario() {
            if (this.nombres && this.documento && this.cargo) {
                const user = {
                    bd: "usuarios",
                    nombres: this.nombres,
                    documento: this.documento,
                    cargo: this.cargo,
                    password: 12345,
                    estado: "activo",
                };
                await this.createUser(user);
                this.nombres = "";
                this.documento = "";
                this.cargo = "";
            } else {
                alert("Por favor, complete todos los campos.");
          }
          alert("Usuario creado exitosamente.");
            this.getAllUsers();
        },

        async removeUser(id) {
            if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
                await this.deleteUser(id);
            }
            this.getAllUsers();
        },

        async resetPass(id) {
            if (confirm("¿Está seguro de que desea restablecer la contraseña de este usuario?")) {
                await this.resetPassword(id);
            }
        },
    },
    mounted() {
        this.getAllUsers();
    },
};
</script>

<style></style>
