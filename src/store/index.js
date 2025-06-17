import firebase_api from "@/api/ApiFirebase.js";
import { createStore } from "vuex";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = getFirestore();
const auth = getAuth();
import router from "../router/index.js"; // Asegúrate de que la ruta sea correcta
export default createStore({
    state: {
        encuestasFiltradasLabById: [],
        encuestasFiltradasVisitaById: [],
        usuarios: [],
        encuestas: [],
        comunasBarrios: [],
        datosips: [],
        encuestasFiltradas: [],
        agendas: [],
        token: null,
        uid: null,
        userData: {},
        user: null,
        epss: [],
        accessToken: null, // Para manejar el token de acceso
        cantEncuestas: 0,
        encuestasToday: [], // Para manejar la cantidad de encuestas diarias
        // Puedes agregar más estados según sea necesario
    },

    actions: {
        /* ----------------------------------------AUTH------------------------------------- */

        /* ---------------------------------------POST------------------------------------- */
        createNewRegister: async ({ commit }, entradasE) => {
            try {
                const {
                    bd,
                    idMedicoAtiende,
                    idEnfermeroAtiende,
                    fechavisita,
                    status_encuesta,
                    status_tomamuestras,
                    status_caracterizacion,
                    status_visita,
                    idEncuesta,
                    grupo,
                    idEncuestador,
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
                    requiereRemision,
                } = entradasE;

                const DataToSaveE = {
                    idMedicoAtiende,
                    idEnfermeroAtiende,
                    fechavisita,
                    status_encuesta,
                    status_tomamuestras,
                    status_caracterizacion,
                    status_visita,
                    idEncuesta,
                    grupo,
                    idEncuestador,
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
                    requiereRemision,
                };

                const Ruta = `/${bd}.json`;

                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveE);

                // Opcional: hacer commit para actualizar el estado con la respuesta
                // commit('mutationName', data);

                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error("Error en Action_createDataEmpresa:", error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },

        guardarCaracterizacion: async ({ commit }, entradasC) => {
            const caracterizacion = {
                idEncuesta: entradasC.idEncuesta,
                visita: entradasC.visita,
                tipovisita: entradasC.tipovisita,
                tipovivienda: entradasC.tipovivienda,
                EstActual_Iluminacion: entradasC.EstActual_Iluminacion,
                EstActual_Ventilacion: entradasC.EstActual_Ventilacion,
                EstActual_Paredes: entradasC.EstActual_Paredes,
                EstActual_Pisos: entradasC.EstActual_Pisos,
                EstActual_Techo: entradasC.EstActual_Techo,
                peso: entradasC.peso,
                talla: entradasC.talla,
                tensionSistolica: entradasC.tensionSistolica,
                tensionDiastolica: entradasC.tensionDiastolica,
                perimetroAbdominal: entradasC.perimetroAbdominal,
                perimetroBranquial: entradasC.perimetroBranquial,
                oximetria: entradasC.oximetria,
                temperatura: entradasC.temperatura,
                imc: entradasC.imc,
                clasificacionImc: entradasC.clasificacionImc,
                Oizquierdo: entradasC.Oizquierdo,
                Oderecho: entradasC.Oderecho,
                Evacunal: entradasC.Evacunal,
                seleccionadosServPublic: entradasC.seleccionadosServPublic,
                seleccionadosFactoresRiesgo: entradasC.seleccionadosFactoresRiesgo,
                seleccionadosPresenciaAnimales: entradasC.seleccionadosPresenciaAnimales,
                seleccionadosAntecedentes: entradasC.seleccionadosAntecedentes,
                grupoFamiliar: entradasC.grupoFamiliar,
                seleccionadosRiesgos: entradasC.seleccionadosRiesgos,
            };
            //metodo para guardar

            try {
                const response = await firebase_api.post(
                    `caracterizacion.json`,
                    caracterizacion
                );
                console.error("caracterizacion guardada correctamente");
                return response.data;
                // Retorna la respuesta del servidor
            } catch (error) {
                console.error("Error al guardar caracterización:", error);
                throw error; // Lanza el error para que pueda ser manejado por el componente
            }
        },

        //metodo para guardar agenda de toma de muestras
        guardarAgendaT: async ({ commit }, datos) => {
            const agenda = {
                idAgenda: datos.idAgenda,
                idEncuesta: datos.idEncuesta,
                grupo: datos.grupo,
                tomademuestras: {
                    horalab: datos.horalab,
                    idEncuesta: datos.idEncuesta,
                    grupo: datos.grupo,
                },
            };
            const key = agenda.idAgenda;

            try {
                const response = await firebase_api.get(`/agendas/${key}.json`);

                if (response.data) {
                    // Suponiendo que tomademuestras es un array, agregamos el nuevo dato
                    let tomademuestrasExistentes = response.data.tomademuestras || [];

                    // Si no es array, convertirlo en array para manejar múltiples entradas
                    if (!Array.isArray(tomademuestrasExistentes)) {
                        tomademuestrasExistentes = [tomademuestrasExistentes];
                    }

                    // Agregar el nuevo tomademuestras
                    tomademuestrasExistentes.push(agenda.tomademuestras);

                    // Guardar la lista actualizada
                    await firebase_api.patch(`/agendas/${key}.json`, {
                        tomademuestras: tomademuestrasExistentes,
                    });

                    return { message: "Toma de muestras agregada correctamente" };
                } else {
                    // Si no existe, crear nuevo registro con tomademuestras como array
                    await firebase_api.put(`/agendas/${key}.json`, {
                        ...agenda,
                        tomademuestras: [agenda.tomademuestras],
                    });

                    return { message: "Agenda creada con toma de muestras" };
                }
            } catch (error) {
                console.error("Error al guardar toma de muestras:", error);
                throw error;
            }
        },
        guardarAgendaV: async ({ commit }, datos) => {
            const agenda = {
                idAgenda: datos.idAgenda,
                idEncuesta: datos.idEncuesta,
                grupo: datos.grupo,
                visitamedica: {
                    horavisita: datos.horavisita,
                    idEncuesta: datos.idEncuesta,
                    grupo: datos.grupo,
                },
            };
            const key = agenda.idAgenda;

            try {
                const response = await firebase_api.get(`/agendas/${key}.json`);

                if (response.data) {
                    // Suponiendo que visitamedica es un array, agregamos el nuevo dato
                    let visitamedicaExistentes = response.data.visitamedica || [];

                    // Si no es array, convertirlo en array para manejar múltiples entradas
                    if (!Array.isArray(visitamedicaExistentes)) {
                        visitamedicaExistentes = [visitamedicaExistentes];
                    }

                    // Agregar el nuevo visitamedica
                    visitamedicaExistentes.push(agenda.visitamedica);

                    // Guardar la lista actualizada
                    await firebase_api.patch(`/agendas/${key}.json`, {
                        visitamedica: visitamedicaExistentes,
                    });

                    return { message: "Visita médica agregada correctamente" };
                } else {
                    // Si no existe, crear nuevo registro con visitamedica como array
                    await firebase_api.put(`/agendas/${key}.json`, {
                        ...agenda,
                        visitamedica: [agenda.visitamedica],
                    });

                    return { message: "Agenda creada con visita médica" };
                }
            } catch (error) {
                console.error("Error al guardar visita médica:", error);
                throw error;
            }
        },



        createUser: async ({ commit }, entradasU) => {
            try {
                const {
                    bd,
                    nombres,
                    documento,
                    email,
                    cargo,
                    password,
                    estado,
                    rol,
                    grupo,
                } = entradasU;

                const DataToSaveE = {
                    nombres,
                    documento,
                    email,
                    cargo,
                    password,
                    estado,
                    rol,
                    grupo,
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveE);
                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error("Error en Action_createDataEmpresa:", error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },

        crearComunaBarrio: async ({ commit }, entradasC) => {
            try {
                const { bd, comuna, barrio } = entradasC;

                const DataToSaveC = {
                    comuna,
                    barrio,
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveC);
                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error("Error en Action_createDataEmpresa:", error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },
        crearEps: async ({ commit }, entradaseps) => {
            try {
                const { bd, eps } = entradaseps;

                const DataToSaveC = {
                    eps,
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaveC);
                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error("Error en Action_createDataEmpresa:", error);
                // Opcional: manejar error, por ejemplo con commit a una mutación de error
                throw error; // Re-lanzar para que el componente pueda manejarlo
            }
        },

        addreserva: async ({ commit }, entradasr) => {
            try {
                const { bd, fecha, grupo } = entradasr;

                const DataToSaver = {
                    fecha,
                    grupo,
                };

                const Ruta = `/${bd}.json`;
                // Llamada al servicio (asumiendo que firebase_api está importado y configurado)
                const { data } = await firebase_api.post(Ruta, DataToSaver);
                return data; // Retornar la respuesta si se necesita
            } catch (error) {
                console.error("Error en Action_createDataEmpresa:", error);
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
                console.error("Error en Action_getUser:", error);
                throw error;
            }
        },
        getAllUsers: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get("/usuarios.json");
                const usuarios = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                commit("setUsuarios", usuarios);
                return usuarios;
            } catch (error) {
                console.error("Error en Action_getAllUsers:", error);
                throw error;
            }
        },

        getAllEpss: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get("/eps.json");
                const eps = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                commit("setEps", eps);
                return eps;
            } catch (error) {
                console.error("Error en Action_getAllEps:", error);
                throw error;
            }
        },

        getAllRegisters: async ({ commit }, idUsuario) => {
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por el idUsuario recibido como parámetro
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) => encuesta.idUsuario === idUsuario
                );

                commit("setEncuestas", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_getAllRegisters:", error);
                throw error;
            }
        },

        getAllRegistersByFecha: async ({ commit }, { idUsuario, fecha }) => {
            console.log("datos que entran", idUsuario, fecha);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por idEncuestador y fecha recibidos como parámetros
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) =>
                        encuesta.idEncuestador === idUsuario && encuesta.fecha === fecha // Verifica que el formato de fecha coincida
                );

                commit("setEncuestasToday", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_setEncuestasToday:", error);
                throw error;
            }
        },
        //enuestas finalizadas en el diarias
        getAllRegistersByFechaProf: async ({ commit }, { doc, fecha }) => {
            console.log("grupo consultado", doc, fecha);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                const encuestasFiltradas = encuestas.filter(
                    (encuesta) =>
                        encuesta.status_visita === true &&
                        encuesta.idProfesionalAtiende == doc &&
                        encuesta.fechaVisita === fecha // Verifica que el formato de fecha coincida
                );

                commit("setEncuestasToday", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_setEncuestasToday:", error);
                throw error;
            }
        },
        getAllRegistersByFechaStatus: async ({ commit }, { idUsuario }) => {
            console.log("parametro de consulta  abiertas", idUsuario);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por idEncuestador y visita = false
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) =>
                        encuesta.idEncuestador === idUsuario &&
                        encuesta.status_visita === false
                );

                commit("setEncuestas", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en getAllRegistersByFechaStatus:", error);
                throw error;
            }
        },
        getAllRegistersByFechaStatusProf: async ({ commit }, { grupo }) => {
            console.log("parametro de consulta  abiertas", grupo);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por idEncuestador y visita = false
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) =>
                        encuesta.grupo === grupo && encuesta.status_visita === false
                );

                commit("setEncuestas", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en getAllRegistersByFechaStatus:", error);
                throw error;
            }
        },
        getAllRegistersByIduser: async ({ commit }, { idUsuario }) => {
            console.log("datos que entran", idUsuario);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por idEncuestador
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) => encuesta.idProfesionalAtiende === idUsuario
                );

                const cantidad = encuestasFiltradas.length;
                commit("setcantEncuestas", cantidad);
                return cantidad;
            } catch (error) {
                console.error("Error en getAllRegistersByIduser:", error);
                throw error;
            }
        },

        getAllRegistersByIduserProf: async ({ commit }, { idUsuario }) => {
            console.log("datos que entran", idUsuario);
            try {
                const { data } = await firebase_api.get("/Encuesta.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por idEncuestador
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) => encuesta.idProfesionalAtiende === idUsuario
                );

                const cantidad = encuestasFiltradas.length;
                commit("setcantEncuestas", cantidad);
                return cantidad;
            } catch (error) {
                console.error("Error en getAllRegistersByIduser:", error);
                throw error;
            }
        },

        GetAllRegistersbyRange: async ({ commit }, rango) => {
            try {
                const { fechaInicio, fechaFin } = rango;
                console.log("data que entra", fechaFin, fechaInicio);
                // Validación de fechas requeridas
                if (!fechaInicio || !fechaFin) {
                    throw new Error("Debes proporcionar ambas fechas para el filtro.");
                }

                const { data } = await firebase_api.get("/Encuesta.json");
                if (!data) {
                    commit("setEncuestasfiltradas", []);
                    return [];
                }

                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar por rango de fechas usando el campo 'fecha'
                const encuestasFiltradas = encuestas.filter((encuesta) => {
                    const fecha = encuesta.fecha; // El campo de fecha es 'fecha'
                    if (!fecha) return false; // Si no hay fecha, no incluir

                    // Comparar como string porque el formato es YYYY-MM-DD
                    return fecha >= fechaInicio && fecha <= fechaFin;
                });

                commit("setEncuestasfiltradas", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en GetAllRegistersbyRange:", error);
                throw error;
            }
        },

        getAllComunaBarrios: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get("/comunasybarrios.json");
                const comunasBarrios = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                commit("setComunasBarrios", comunasBarrios);
                return comunasBarrios;
            } catch (error) {
                console.error("Error en Action_getAllComunaBarrios:", error);
                throw error;
            }
        },

        getAllEps: async ({ commit }) => {
            try {
                const { data } = await firebase_api.get("/eps.json");
                const eps = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                commit("setEps", eps);
                return eps;
            } catch (error) {
                console.error("Error en Action_getAllEps:", error);
                throw error;
            }
        },

        getdataips: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.get(`/ips/${id}.json`);
                commit("setdatosips", data);
            } catch (error) {
                console.error("Error en Action_getdataips:", error);
                throw error;
            }
        },

        /* agendamiento listado de agendas grupo*/
        getListAgendas: async ({ commit }, fecha) => {
            console.log("consultando agendas desde:", fecha);
            try {
                // La fecha debe ir entre comillas para la consulta REST
                const fechaQuery = `"${fecha}"`;
                const url = `/agendas.json?orderBy="fecha"&startAt=${fechaQuery}`;

                const { data } = await firebase_api.get(url);

                // Convertir resultado a arreglo
                const agendas = data
                    ? Object.entries(data).map(([key, value]) => ({
                        id: key,
                        ...value,
                    }))
                    : [];

                commit("setAgendas", agendas);
                return agendas;
            } catch (error) {
                console.error("Error en getListagendas:", error);
                throw error;
            }
        },
        //metodo para obtener agendas por id de toma de muestras
        getAgendasTomaLab: async ({ commit }, dataidlab) => {
            console.log("datos que entran xxx", dataidlab);
            try {
                const { data } = await firebase_api.get("/agendas.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar registros por el id recibido
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) =>
                        encuesta.tomademuestras &&
                        encuesta.tomademuestras.dateIDlab &&
                        encuesta.tomademuestras.dateIDlab.id === dataidlab
                );

                commit("setEncuestasfiltradas", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_getAgendasTomaLab:", error);
                throw error;
            }
        },
        getAgendasTomaLabById: async ({ commit }, id) => {
            console.log("datos que entran", id);
            try {
                const { data } = await firebase_api.get("/agendas.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar registros por el id recibido
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) => encuesta.id === id // ✅ usar el parámetro correcto
                );

                commit("setEncuestaslabbyId", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_setEncuestasToday:", error);
                throw error;
            }
        },

        getAgendasVisitaById: async ({ commit }, id) => {
            console.log("datos que entran", id);
            try {
                const { data } = await firebase_api.get("/agendas.json");
                const encuestas = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));

                // Filtrar registros por el id recibido
                const encuestasFiltradas = encuestas.filter(
                    (encuesta) => encuesta.id === id // ✅ usar el parámetro correcto
                );

                commit("setEncuestasvisitaById", encuestasFiltradas);
                return encuestasFiltradas;
            } catch (error) {
                console.error("Error en Action_setEncuestasToday:", error);
                throw error;
            }
        },
        /* ---------------------------------------DELETE------------------------------------- */
        eliminarAgenda: async ({ commit }, { indice, encuestaID }) => {
            console.log("Eliminando agenda con índice:", indice, "y encuestaID:", encuestaID);

            // Validar que los parámetros no sean nulos ni indefinidos ni vacíos
            if (indice === undefined || indice === null || indice === '') {
                throw new Error("Índice inválido para eliminar");
            }
            if (!encuestaID) {
                throw new Error("encuestaID inválido para eliminar");
            }

            try {
                await firebase_api.delete(`/agendas/${encuestaID}/tomademuestras/${indice}.json`);
                console.log("Registro eliminado correctamente");

                // Si tienes mutation para actualizar el estado local, descomenta y ajusta según tu store
                // commit('eliminarTomaDeMuestraLocal', { encuestaID, indice });

                return true;
            } catch (error) {
                console.error("Error en Action eliminarAgenda:", error);
                throw error;
            }
        },
          
          

        deleteComunaBarrio: async ({ commit }, id) => {
            try {
                if (!id) throw new Error("ID inválido para eliminar");
                const { data } = await firebase_api.delete(
                    `/comunasybarrios/${id}.json`
                );
                return data;
            } catch (error) {
                console.error("Error en Action deleteComunaBarrio:", error);
                throw error;
            }
        },
        deleteEps: async ({ commit }, id) => {
            try {
                if (!id) throw new Error("ID inválido para eliminar");
                const { data } = await firebase_api.delete(`/eps/${id}.json`);
                return data;
            } catch (error) {
                console.error("Error en Action deleteComunaBarrio:", error);
                throw error;
            }
        },
        deleteUser: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.delete(`/usuarios/${id}.json`);
                return data;
            } catch (error) {
                console.error("Error en Action_deleteUser:", error);
                throw error;
            }
        },

        removeRegEnc: async ({ commit }, id) => {
            try {
                const { data } = await firebase_api.delete(`/Encuesta/${id}.json`);
                return data;
            } catch (error) {
                console.error("Error en Action_removeRegEnc:", error);
                throw error;
            }
        },

        /* ----------------------------------------UPDATE------------------------------------- */

        resetPassword: async ({ commit }, id) => {
            console.log("ID:", id);
            try {
                const { data } = await firebase_api.patch(`/usuarios/${id}.json`, {
                    password: "12345",
                });
                return data;
            } catch (error) {
                console.error("Error en Action_updateUser:", error);
                throw error;
            }
        },

        NewPassword: async ({ commit }, { id, newPassword }) => {
            try {
                const { data } = await firebase_api.patch(`/usuarios/${id}.json`, {
                    password: newPassword,
                });
                return data;
            } catch (error) {
                console.error("Error en Action_updateUser:", error);
                throw error;
            }
        },
        login({ commit }, { token, uid }) {
            commit("setToken", token);
            commit("setUid", uid);
        },

        async userLogout({ commit }) {
            return auth
                .signOut() // Usa la instancia importada[4][5]
                .then(() => {
                    commit("CLEAR_ALL_STATE");
                    localStorage.clear();
                    sessionStorage.clear();
                    commit("clearAuth");
                    commit("clearUserData");
                    router.push("/login");
                })
                .catch((error) => {
                    console.error("Logout error:", error);
                });
        },
        async fetchUserDataByUid({ commit }, uid) {
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    commit("setUserData", docSnap.data());
                } else {
                    console.log("No existe documento para este UID");
                    commit("clearUserData");
                }
            } catch (error) {
                console.error("Error al obtener datos de Firestore:", error);
                commit("clearUserData");
            }
        },
        cerrarEncuesta: async ({ commit }, { id, user, fecha }) => {
            console.log({ id, user, fecha });
            try {
                const { data } = await firebase_api.patch(`/Encuesta/${id}.json`, {
                    status_visita: true,
                    fechaVisita: fecha,
                    idProfesionalAtiende: user,
                });
                return data;
            } catch (error) {
                console.error("Error en Action cerrarEncuesta:", error);
                throw error;
            }
        },

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
        setEps(state, eps) {
            state.epss = eps;
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
        },
        /*  */
        setUserData(state, data) {
            state.userData = data;
        },
        clearUserData(state) {
            state.userData = null;
        },
        CLEAR_ALL_STATE(state) {
            state.accessToken = null;
            state.userData = {};
        },
        setcantEncuestas(state, cantidad) {
            state.cantEncuestas = cantidad;
        },
        setEncuestasToday(state, encuestas) {
            state.encuestasToday = encuestas;
        },
        setEps(state, eps) {
            state.epss = eps;
        },

        setEncuestaslabbyId(state, encuestas) {
            state.encuestasFiltradasLabById = encuestas;
        },
        setEncuestasvisitaById(state, encuestas) {
            state.encuestasFiltradasVisitaById = encuestas;
        },
    },
    getters: {
        getUserData: (state) => state.userData,
        getAllEpss: (state) => state.epss,
    },
});
