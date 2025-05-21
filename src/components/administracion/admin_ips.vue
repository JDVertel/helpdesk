<template>
<div>
    <h1>admin ips</h1>
    <p>Datos de radicacion</p>

    {{ dataips }}

    <ul class="list-group list-group-flush">
        <li class="list-group-item">Nombre: {{ dataips.nombre }}</li>
        <li class="list-group-item">Nit: {{ dataips.nit }}</li>
        <li class="list-group-item">Cod Habilitacion: {{ dataips.codhabilitacion }}</li>
        <li class="list-group-item">Dpto Ubicacion: {{ dataips.dpto }}</li>

    </ul>

</div>
</template>

<script>
import { mapState ,mapActions} from 'vuex'
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

  mounted() {
        this.getdata(this.idips);
    },
  
}
</script>

<style>

</style>
