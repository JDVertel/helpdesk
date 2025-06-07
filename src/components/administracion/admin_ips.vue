<template>
<div class="container-fluid">

    <div>
        <h1>admin ips</h1>
        <p>Datos de radicacion</p>

        {{ dataips }}

        <ul class="list-group list-group-flush">
            <li class="list-group-item">Nombre: </li>
            <li class="list-group-item">Nit: </li>
            <li class="list-group-item">Cod Habilitacion:</li>
            <li class="list-group-item">Dpto Ubicacion: </li>

        </ul>

    </div>

</div>
</template>

<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            dataips: [],
            idips: 1,
        }
    },
    methods: {
        ...mapActions(['getdataips']),

        getdata(idips) {
            this.getdataips(idips);
        }
    },
    computed: {
        ...mapState(['dataips']),
        dataips() {
            return this.dataips[0];
        }
    },

}
</script>

<style>

</style>
