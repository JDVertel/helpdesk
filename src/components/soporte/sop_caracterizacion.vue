<template>
    <form @submit.prevent="guardarFormulario">
      <!-- VISITA -->
      <fieldset>
        <legend>Visita</legend>
        <label>
          <input type="radio" value="efectiva" v-model="formulario.visita" /> Efectiva
        </label>
        <label>
          <input type="radio" value="no efectiva" v-model="formulario.visita" /> No efectiva
        </label>
        <label>
          <input type="radio" value="primera visita" v-model="formulario.visita" /> Primera visita
        </label>
      </fieldset>
  
      <!-- VIVIENDA -->
      <fieldset>
        <legend>Vivienda</legend>
        <input v-model="formulario.vivienda.tipo" placeholder="Tipo (propia, arriendo, etc.)" />
        <input v-model="formulario.vivienda.serviciosPublicos" placeholder="Servicios públicos (acueducto, etc.)" />
        <input v-model="formulario.vivienda.estadoActual" placeholder="Estado actual (iluminación, etc.)" />
      </fieldset>
  
      <!-- FACTORES DE RIESGO -->
      <fieldset>
        <legend>Factores de riesgo</legend>
        <input v-model="formulario.factoresRiesgo.entorno" placeholder="Entorno (droga, prostitución, etc.)" />
        <input v-model="formulario.factoresRiesgo.presenciaAnimales" placeholder="Presencia de animales (vectores, etc.)" />
      </fieldset>
  
      <!-- GRUPO FAMILIAR -->
      <fieldset>
        <legend>Grupo familiar</legend>
        <div v-for="(familiar, idx) in formulario.grupoFamiliar" :key="idx">
          <input v-model="familiar.nombre" placeholder="Nombre" />
          <input v-model="familiar.parentesco" placeholder="Parentesco" />
          <input v-model="familiar.tipoDocumento" placeholder="Tipo documento" />
          <input v-model="familiar.documento" placeholder="Documento" />
          <input v-model="familiar.eps" placeholder="EPS" />
          <input v-model="familiar.edad" placeholder="Edad" />
          <input v-model="familiar.fechaNacimiento" placeholder="Fecha de nacimiento" />
          <input v-model="familiar.cursoVida" placeholder="Curso de vida" />
          <input v-model="familiar.regimenEps" placeholder="Régimen EPS" />
          <input v-model="familiar.genero" placeholder="Género" />
          <input v-model="familiar.ocupacion" placeholder="Ocupación" />
          <input v-model="familiar.viveEnVivienda" placeholder="Vive en la vivienda (sí/no)" />
          <button type="button" @click="eliminarFamiliar(idx)">Eliminar</button>
        </div>
        <button type="button" @click="agregarFamiliar">Agregar familiar</button>
      </fieldset>
  
      <!-- ANTECEDENTES PERSONALES Y RIESGOS -->
      <fieldset>
        <legend>Antecedentes personales y riesgos</legend>
        <input v-model="formulario.antecedentes.hipertension" placeholder="Hipertensión arterial" />
        <input v-model="formulario.antecedentes.diabetes" placeholder="Diabetes" />
        <input v-model="formulario.riesgos.sedentarismo" placeholder="Sedentarismo" />
        <input v-model="formulario.riesgos.consumoAlcohol" placeholder="Consumo de alcohol" />
        <input v-model="formulario.riesgos.consumoCigarrillo" placeholder="Consumo de cigarrillo" />
        <input v-model="formulario.riesgos.alimentosPocoSaludables" placeholder="Alimentos poco saludables (sí/no)" />
        <input v-model="formulario.riesgos.sintomaticoRespiratorio" placeholder="Sintomático respiratorio (sí/no)" />
        <input v-model="formulario.riesgos.sintomaticoPiel" placeholder="Sintomático de piel (sí/no)" />
        <input v-model="formulario.riesgos.contactoTBC" placeholder="Contacto con paciente TBC (sí/no)" />
        <input v-model="formulario.riesgos.sustanciaPsicoactiva" placeholder="Sustancia psicoactiva (sí/no)" />
        <input v-model="formulario.riesgos.hacinamiento" placeholder="Hacinamiento (sí/no)" />
        <input v-model="formulario.riesgos.violenciaIntrafamiliar" placeholder="Violencia intrafamiliar (sí/no)" />
      </fieldset>
  
      <!-- TAMIZAJE -->
      <fieldset>
        <legend>Tamizaje</legend>
        <input v-model.number="formulario.tamizaje.peso" placeholder="Peso" type="number" />
        <input v-model.number="formulario.tamizaje.talla" placeholder="Talla" type="number" />
        <input v-model.number="formulario.tamizaje.imc" placeholder="IMC" type="number" />
        <input v-model.number="formulario.tamizaje.clasificacionIMC" placeholder="Clasificación IMC" type="number" />
        <input v-model.number="formulario.tamizaje.tensionSistolica" placeholder="Tensión sistólica" type="number" />
        <input v-model.number="formulario.tamizaje.tensionDiastolica" placeholder="Tensión diastólica" type="number" />
        <input v-model.number="formulario.tamizaje.perimetroAbdominal" placeholder="Perímetro abdominal" type="number" />
        <input v-model.number="formulario.tamizaje.perimetroBraquial" placeholder="Perímetro braquial" type="number" />
        <input v-model.number="formulario.tamizaje.oximetria" placeholder="Oximetría" type="number" />
        <input v-model.number="formulario.tamizaje.temperatura" placeholder="Temperatura" type="number" />
      </fieldset>
  
      <!-- TAMIZAJE VISUAL -->
      <fieldset>
        <legend>Tamizaje visual</legend>
        <input v-model.number="formulario.tamizajeVisual.ojoDerecho" placeholder="Ojo derecho" type="number" />
        <input v-model.number="formulario.tamizajeVisual.ojoIzquierdo" placeholder="Ojo izquierdo" type="number" />
      </fieldset>
  
      <!-- ESQUEMA VACUNAL -->
      <fieldset>
        <legend>Esquema vacunal</legend>
        <label>
          <input type="checkbox" v-model="formulario.esquemaVacunal.completo" /> Completo
        </label>
      </fieldset>
  
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formulario: {
          visita: '',
          vivienda: {
            tipo: '',
            serviciosPublicos: '',
            estadoActual: ''
          },
          factoresRiesgo: {
            entorno: '',
            presenciaAnimales: ''
          },
          grupoFamiliar: [],
          antecedentes: {
            hipertension: '',
            diabetes: ''
          },
          riesgos: {
            sedentarismo: '',
            consumoAlcohol: '',
            consumoCigarrillo: '',
            alimentosPocoSaludables: '',
            sintomaticoRespiratorio: '',
            sintomaticoPiel: '',
            contactoTBC: '',
            sustanciaPsicoactiva: '',
            hacinamiento: '',
            violenciaIntrafamiliar: ''
          },
          tamizaje: {
            peso: null,
            talla: null,
            imc: null,
            clasificacionIMC: null,
            tensionSistolica: null,
            tensionDiastolica: null,
            perimetroAbdominal: null,
            perimetroBraquial: null,
            oximetria: null,
            temperatura: null
          },
          tamizajeVisual: {
            ojoDerecho: null,
            ojoIzquierdo: null
          },
          esquemaVacunal: {
            completo: false
          }
        },
        registros: []
      }
    },
    methods: {
      guardarFormulario() {
        this.registros.push(JSON.parse(JSON.stringify(this.formulario)));
        this.limpiarFormulario();
      },
      limpiarFormulario() {
        this.formulario = {
          visita: '',
          vivienda: {
            tipo: '',
            serviciosPublicos: '',
            estadoActual: ''
          },
          factoresRiesgo: {
            entorno: '',
            presenciaAnimales: ''
          },
          grupoFamiliar: [],
          antecedentes: {
            hipertension: '',
            diabetes: ''
          },
          riesgos: {
            sedentarismo: '',
            consumoAlcohol: '',
            consumoCigarrillo: '',
            alimentosPocoSaludables: '',
            sintomaticoRespiratorio: '',
            sintomaticoPiel: '',
            contactoTBC: '',
            sustanciaPsicoactiva: '',
            hacinamiento: '',
            violenciaIntrafamiliar: ''
          },
          tamizaje: {
            peso: null,
            talla: null,
            imc: null,
            clasificacionIMC: null,
            tensionSistolica: null,
            tensionDiastolica: null,
            perimetroAbdominal: null,
            perimetroBraquial: null,
            oximetria: null,
            temperatura: null
          },
          tamizajeVisual: {
            ojoDerecho: null,
            ojoIzquierdo: null
          },
          esquemaVacunal: {
            completo: false
          }
        }
      },
      agregarFamiliar() {
        this.formulario.grupoFamiliar.push({
          nombre: '',
          parentesco: '',
          tipoDocumento: '',
          documento: '',
          eps: '',
          edad: '',
          fechaNacimiento: '',
          cursoVida: '',
          regimenEps: '',
          genero: '',
          ocupacion: '',
          viveEnVivienda: ''
        });
      },
      eliminarFamiliar(idx) {
        this.formulario.grupoFamiliar.splice(idx, 1);
      }
    }
  }
  </script>
  