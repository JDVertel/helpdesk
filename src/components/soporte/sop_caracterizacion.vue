<template>
  <div class="container">
    <h1 class="text-center">Caracterización de la visita</h1>
    <div class="row">
      <h4>Visita</h4>
      <div class="col-6">
        <select class="form-select" aria-label="Default select example" v-model="visita">
          <option selected value="">Seleccione</option>
          <option value="efectiva">Efectiva</option>
          <option value="no_efectiva">No Efectiva</option>
        </select>
      </div>
      <div class="col-6" v-if="visita == 'efectiva'">
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="tipovisita"
        >
          <option selected value="">Tipo Visita</option>
          <option value="1">primera visita</option>
          <option value="2">control</option>
          <option value="3">seguimiento</option>
        </select>
      </div>
    </div>

    <br />

    <div class="row">
      <hr>
      <h4>Vivienda</h4>
      <div class="col-6">
        <select
          class="form-select"
          aria-label="Default select example"
          v-model="tipovivienda"
        >
          <option selected value="">Seleccione</option>
          <option value="propia">propia</option>
          <option value="arriendo">arriendo</option>
          <option value="familiar">familiar</option>
        </select>
        <br />
        <p><strong>Estado Actual</strong></p>
        <div>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="EstActual_Iluminacion"
          >
            <option selected value="">Iluminacion</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="EstActual_Ventilacion"
          >
            <option selected value="">Ventilacion</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="EstActual_Paredes"
          >
            <option selected value="">Paredes</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="EstActual_Pisos"
          >
            <option selected value="">Pisos</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="EstActual_Techo"
          >
            <option selected value="">Techo</option>
            <option value="Bueno">Bueno</option>
            <option value="Regular">Regular</option>
            <option value="Malo">Malo</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <p><strong>Servicios Publicos</strong></p>
        <div class="form-check" v-for="opcion in opcionesServPublicos" :key="opcion.id">
          <input
            class="form-check-input"
            type="checkbox"
            :id="'check-' + opcion.id"
            :value="opcion.valor"
            v-model="seleccionadosServPublic"
          />
          <label class="form-check-label" :for="'check-' + opcion.id">
            {{ opcion.texto }}
          </label>
        </div>
        {{ this.seleccionadosServPublic }}
      </div>
    </div>
  </div>

  <br />
  <div class="row">
    <hr>
    <h4>Factores de Riesgo</h4>
    <div class="col-6">  <p><strong>Entorno</strong></p>
      <div class="form-check" v-for="opcionr in factoresRiesgo" :key="opcionr.id">
        <input
          class="form-check-input"
          type="checkbox"
          :id="'check-' + opcionr.id"
          :value="opcionr.valor"
          v-model="seleccionadosFactoresRiesgo"
        />
        <label class="form-check-label" :for="'check-' + opcionr.id">
          {{ opcionr.texto }}
        </label>
        
      </div>
      {{ seleccionadosFactoresRiesgo }}</div>
    <div class="col-6">
      <p><strong>Presencia de Animales</strong></p>
      <div class="form-check" v-for="opcion in OpcionesPresenciaAnimales" :key="opcion.id">
        <input
          class="form-check-input"
          type="checkbox"
          :id="'check-' + opcion.id"
          :value="opcion.valor"
          v-model="seleccionadosPresenciaAnimales"
        />
        <label class="form-check-label" :for="'check-' + opcion.id">
          {{ opcion.texto }}
        </label>
      </div>
      {{ seleccionadosPresenciaAnimales }}
    </div>

  </div>

  <br />
  <div class="row">
    <hr>
    <h4>Grupo Familiar</h4>
  </div>
  <br />
  <div class="row">
    <h4>Antecedentes personales</h4>
    <div class="form-check" v-for="opcion in opcionesAntecedentes" :key="opcion.id">
      <input
        class="form-check-input"
        type="checkbox"
        :id="'check-' + opcion.id"
        :value="opcion.valor"
        v-model="seleccionadosAntecedentes"
      />
      <label class="form-check-label" :for="'check-' + opcion.id">
        {{ opcion.texto }}
      </label>
    </div>
    {{ seleccionadosAntecedentes }}
  </div>
  <br />
  <div class="row">
    <h4>Riesgos</h4>
  </div>
  <br />
  <div class="row">
    <h4>Tamizaje</h4>
    <div class="row">
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="peso" placeholder="">
        <label for="floatingInput">Peso (Libras)</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="talla" placeholder="">
        <label for="floatingInput">Talla</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="imc" placeholder="">
        <label for="floatingInput">IMC</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="clasificacionImc" placeholder="">
        <label for="floatingInput">Clasificacion IMC</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="tensionSistolica" placeholder="">
        <label for="floatingInput">Tension Sistolica</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="tensionDiastolica" placeholder="">
        <label for="floatingInput">Tension Diastolica</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="perimetroAbdominal" placeholder="">
        <label for="floatingInput">Perimetro Abdominal</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="perimetroBranquial" placeholder="">
        <label for="floatingInput">Perimetro Branquial</label>
      </div></div>

      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="oximetria" placeholder="">
        <label for="floatingInput">Oximetria</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="temperatura" placeholder="">
        <label for="floatingInput">Temperatura</label>
      </div></div>
    </div>
  </div>
  <br />
  <div class="row">
    <h4>Tamizaje Visual</h4>
    <div class="row">
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="Oizquierdo" placeholder="">
        <label for="floatingInput">Ojo Izquierdo</label>
      </div></div>
      <div class="col-6"><div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingInput" v-model="Oderecho" placeholder="">
        <label for="floatingInput">Ojo Derecho</label>
      </div></div>
    </div>
   
  </div>
  <br />
  <div class="row">
    <h4>Esquema vacunal</h4>
    <select class="form-select" aria-label="Default select example" v-model="Evacunal">
      <option selected value="">Seleccione</option>
      <option value="Completo">Completo</option>
      <option value="Incompleto">Incompleto</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SopCaracterizacion",
  data() {
    return {
      visita: "",
      tipovivienda: "",
      EstActual_Iluminacion: "",
      EstActual_Ventilacion: "",
      EstActual_Paredes: "",
      EstActual_Pisos: "",
      EstActual_Techo: "",
      seleccionadosServPublic: [],
      opcionesServPublicos: [
        {
          id: 1,
          valor: "acueducto",
          texto: "acueducto",
        },
        {
          id: 2,
          valor: "energia electrica",
          texto: "energia electrica",
        },
        {
          id: 3,
          valor: "gas natural",
          texto: "gas natural",
        },
        {
          id: 4,
          valor: "carbon",
          texto: "carbon",
        },
        {
          id: 5,
          valor: "leña",
          texto: "leña",
        },
        {
          id: 6,
          valor: "gasolina",
          texto: "gasolina",
        },
        {
          id: 7,
          valor: "internet",
          texto: "internet",
        },
        {
          id: 8,
          valor: "television",
          texto: "television",
        },
        {
          id: 9,
          valor: "alcantarillado",
          texto: "alcantarillado",
        },
        {
          id: 10,
          valor: "aseo",
          texto: "aseo",
        },
      ],

      seleccionadosFactoresRiesgo: [],

      factoresRiesgo: [
        {
          id: 11,
          valor: "Droga",
          texto: "Droga",
        },
        {
          id: 12,
          valor: "Prostitucion",
          texto: "Prostitucion",
        },
        {
          id: 13,
          texto: "Aguas Negras",
          valor: "Aguas Negras",
        },
        {
          id: 14,
          valor: "Deslizamientos",
          texto: "Deslizamientos",
        },
        {
          id: 15,
          valor: "Basureros",
          texto: "Basureros",
        },
        {
          id: 16,
          valor: "Inundaciones",
          texto: "Inundaciones",
        },
      ],
      seleccionadosPresenciaAnimales: [],
      OpcionesPresenciaAnimales: [
        {
          id: 17,
          valor: "Vectores",
          texto: "Vectores",
        },
        {
          id: 18,
          valor: "Perros",
          texto: "Perros",
        },
        {
          id: 19,
          valor: "Gatos",
          texto: "Gatos",
        },
        {
          id: 20,
          valor: "Vacas",
          texto: "Vacas",
        },
        {
          id: 21,
          valor: "Cerdos",
          texto: "Cerdos",
        },
        {
          id: 22,
          valor: "Equinos",
          texto: "Equinos",
        },
        {
          id: 23,
          valor: "Salvajes",
          texto: "Salvajes",
        },
        {
          id: 24,
          valor: "Roedores",
          texto: "Roedores",
        },
      ],
      seleccionadosAntecedentes: [],
      opcionesAntecedentes: [
        {
          id: 25,
          valor: "Hipertencion Arterial",
          texto: "Hipertencion Arterial",
        },
        {
          id: 26,
          valor: "Diabetes",
          texto: "Diabetes",
        },
        {
          id: 27,
          valor: "Enfermedad Renal",
          texto: "Enfermedad Renal",
        },
        {
          id: 28,
          valor: "Eventos coronarios",
          texto: "Eventos coronarios",
        },
        {
          id: 29,
          valor: "Hemofilia",
          texto: "Hemofilia",
        },
        {
          id: 30,
          valor: "Artritis",
          texto: "Artritis",
        },
        {
          id: 31,
          valor: "Otros",
          texto: "Otros",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style></style>
