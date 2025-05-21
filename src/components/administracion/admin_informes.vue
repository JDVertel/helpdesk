<template>
<h1>admin informes</h1>
<div class="container">
    <h5>Seleccione el rango de fechas a mostrar</h5>
    <div class="row">
        <div class="col-6 col-md-4">
            <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
            <input type="date" id="fechaInicio" class="form-control" v-model="fechaInicio" required />
        </div>
        <div class="col-6 col-md-4">
            <label for="fechaFin" class="form-label">Fecha de Fin</label>
            <input type="date" id="fechaFin" class="form-control" v-model="fechaFin" required/>
        </div>
        <div class="col-12 col-md-4">
            <button type="button" class="btn btn-warning btn-sm mt-4" @click="generarInforme()">Generar Informe</button>
        </div>

    </div>
    <br>
    {{ encuestasFiltradas }}
    <table class="table table-sm" id="miTabla">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>John</td>
                <td>Doe</td>
                <td>@social</td>
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
            fechaInicio: "",
            fechaFin: "",
        }
    },
    methods: {
      ...mapActions(["GetAllRegistersbyRange"]),
        
      generarInforme() {

        let rango = {
            fechaInicio: this.fechaInicio,
            fechaFin: this.fechaFin
        }
            this.GetAllRegistersbyRange(rango)
        },
    },
    computed: {
        ...mapState(["encuestasFiltradas"])
    }

}
</script>

<style>
</style>
