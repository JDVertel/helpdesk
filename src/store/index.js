import firebase_api from "@/api/ApiFirebase.js";
import { createStore } from 'vuex'  // para Vue 3 y Vuex 4
// Para Vue 2: import Vuex from 'vuex'; import Vue from 'vue'; Vue.use(Vuex);

export default createStore({
    state: {
        usuarios: [],
        encuestas: [],
        comunasBarrios: [],
        datosips: [],
        encuestasFiltradas: [],
        agendas: [],
        token: null,
        uid: null,
    },

    actions: {
        /* ----------------------------------------AUTH------------------------------------- */



        /* ---------------------------------------POST------------------------------------- */
        createNewRegister: async ({ commit }, entradasE) => {
            try {
                const {
                    bd,
                    idEncuesta,
                    idUsuario,
                    eps,
                    regimen,
                    fecha,
                    nombre1,
                    nombre2,
                    apellido1,
                    apellido2,
                    tipodoc,
                    numdoc,
                    sexo,
                    fechanacimiento,
                    direccion,
                    telefono,
                    barrioVeredacomuna,
                    desplazamiento,
                    tipoActividad,
                    poblacionRiesgo,
                    requiereRemision
                } = entradasE;

                const DataToSaveE = {
                    idEncuesta,
                    idUsuario,
                    eps,
                    regimen,
                    fecha,
                    nombre1,
                    nombre2,
                    apellido1,
                    apellido2,
                    tipodoc,
                    numdoc,
                    sexo,
                    fechanacimiento,
                    direccion,
                    telefono,
                    barrioVeredacomuna,
                    desplazamiento,
                    tipoActividad,
                    poblacionRiesgo,
                    requiereRemision
                };

                const Ruta = `/${bd}.json`;

                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveE);

                // Opcional: hacer commit para actualizar el estado con la respuesta
                // commit('mutationName', data);

                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error('Error en Action_createDataEmpresa:', error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },


        createUser: async ({ commit }, entradasU) => {
            try {
                const {
                    bd, nombres, documento, email,cargo, password, estado, rol, grupo
                } = entradasU;

                const DataToSaveE = {
                    nombres,
                    documento,
                    email,
                    cargo,
                    password,
                    estado,
                    rol,
                    grupo
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveE);
                return data; // Retornar la respuesta si se necesita

            } catch (error) {
                console.error('Error en Action_createDataEmpresa:', error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },

        crearComunaBarrio: async ({ commit }, entradasC) => {
            try {
                const {
                    bd, comuna, barrio
                } = entradasC;

                const DataToSaveC = {
                    comuna,
                    barrio
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveC);
                return data; // Retornar la respuesta si se necesita

            } catch (error) {
                console.error('Error en Action_createDataEmpresa:', error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },
        addreserva: async ({ commit }, entradasr) => {
            try {
                const {
                    bd, fecha, grupo
                } = entradasr;

                const DataToSaver = {
                    fecha, grupo
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaver);
                return data; // Retornar la respuesta si se necesita

            } catch (error) {
                console.error('Error en Action_createDataEmpresa:', error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },


        /* ---------------------------------------GET------------------------------------- */
        getUser: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.get(`/usuarios/${id}.json`);
                return data;
            } catch (error) {
                console.error('Error en Action_getUser:', error);
                throw error;
            }
        },
        getAllUsers: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get('/usuarios.json');
                const usuarios = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                commit('setUsuarios', usuarios);
                return usuarios;
            } catch (error) {
                console.error('Error en Action_getAllUsers:', error);
                throw error;
            }
        },




        getRegister: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.get(`/Encuesta/${id}.json`);
                return data;
            } catch (error) {
                console.error('Error en Action_getRegister:', error);
                throw error;
            }
        },

        getAllRegisters: async ({ commit }, idUsuario) => {
            try {
                const { data } = await firebase_api.get('/Encuesta.json');
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));

                // Filtrar por el idUsuario recibido como parámetro
                const encuestasFiltradas = encuestas.filter(encuesta => encuesta.idUsuario === idUsuario);

                commit('setEncuestas', encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error('Error en Action_getAllRegisters:', error);
                throw error;
            }
        },

        GetAllRegistersbyRange: async ({ commit }, rango) => {
            try {
                const { fechaInicio, fechaFin } = rango;
                console.log("data que entra", fechaFin, fechaInicio);
                // Validación de fechas requeridas
                if (!fechaInicio || !fechaFin) {
                    throw new Error('Debes proporcionar ambas fechas para el filtro.');
                }

                const { data } = await firebase_api.get('/Encuesta.json');
                if (!data) {
                    commit('setEncuestasfiltradas', []);
                    return [];
                }

                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));

                // Filtrar por rango de fechas usando el campo 'fecha'
                const encuestasFiltradas = encuestas.filter(encuesta => {
                    const fecha = encuesta.fecha; // El campo de fecha es 'fecha'
                    if (!fecha) return false; // Si no hay fecha, no incluir

                    // Comparar como string porque el formato es YYYY-MM-DD
                    return fecha >= fechaInicio && fecha <= fechaFin;
                });

                commit('setEncuestasfiltradas', encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error('Error en GetAllRegistersbyRange:', error);
                throw error;
            }
        },



        getAllComunaBarrios: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get('/comunasybarrios.json');
                const comunasBarrios = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                commit('setComunasBarrios', comunasBarrios);
                return comunasBarrios;
            } catch (error) {
                console.error('Error en Action_getAllComunaBarrios:', error);
                throw error;
            }
        },


        getdataips: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.get(`/ips/${id}.json`);
                commit('setdatosips', data);
            } catch (error) {
                console.error('Error en Action_getdataips:', error);
                throw error;
            }
        },

        getAgendas: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get('/agendas.json');
                const agendas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                commit('setAgendas', agendas);
                return agendas;
            } catch (error) {
                console.error('Error en Action_getAllUsers:', error);
                throw error;
            }
        },

        getTomamuestras: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get('/agendas.json');
                const agendas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value
                }));
                commit('setAgendas', agendas);
                return agendas;
            } catch (error) {
                console.error('Error en Action_getAllUsers:', error);
                throw error;
            }
        },

        /* ---------------------------------------DELETE------------------------------------- */

        deleteComunaBarrio: async ({ commit }, id) => {
            try {
                if (!id) throw new Error('ID inválido para eliminar');
                const { data } = await firebase_api.delete(`/comunasybarrios/${id}.json`);
                return data;
            } catch (error) {
                console.error('Error en Action deleteComunaBarrio:', error);
                throw error;
            }
        },

        deleteUser: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.delete(`/usuarios/${id}.json`);
                return data;
            } catch (error) {
                console.error('Error en Action_deleteUser:', error);
                throw error;
            }
        },

        removeRegEnc: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.delete(`/Encuesta/${id}.json`);
                return data;
            } catch (error) {
                console.error('Error en Action_removeRegEnc:', error);
                throw error;
            }
        },


        /* ----------------------------------------UPDATE------------------------------------- */

        resetPassword: async ({ commit }, id) => {
            console.log('ID:', id);
            try {
                const { data } = await firebase_api.patch(`/usuarios/${id}.json`, { password: "12345" });
                return data;
            } catch (error) {
                console.error('Error en Action_updateUser:', error);
                throw error;
            }
        },


        NewPassword: async ({ commit }, { id, newPassword }) => {

            try {
                const { data } = await firebase_api.patch(`/usuarios/${id}.json`, { password: newPassword });
                return data;
            } catch (error) {
                console.error('Error en Action_updateUser:', error);
                throw error;
            }
        },
        login({ commit }, { token, uid }) {
            commit('setToken', token);
            commit('setUid', uid);
        },
        logout({ commit }) {
            commit('clearAuth');
          }

    },
    mutations: {
        setUsuarios(state, usuarios) {
            state.usuarios = usuarios;
        },

        setEncuestas(state, encuestas) {
            state.encuestas = encuestas;
        },

        setComunasBarrios(state, comunasBarrios) {
            state.comunasBarrios = comunasBarrios;
        },

        setdatosips(state, datosips) {
            state.dataips = datosips;
        },
        setEncuestasfiltradas(state, encuestasf) {
            state.encuestasFiltradas = encuestasf;
        },
        setAgendas(state, agendas) {
            state.agendas = agendas;
        },

        setToken(state, token) {
            state.token = token;
        },
        setUid(state, uid) {
            state.uid = uid;
        },
        clearAuth(state) {
            state.token = null;
            state.uid = null;
          }


    },
}) 