import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  /* Soportes */
  {
    path: "/",
    name: "home",
    component: () => import("../views/dashboard.vue"),
  },
  /* Rutas equipo */

  {
    path: "/homeviews",
    name: "homeviews",
    component: () => import("../views/HomeView.vue"),
  },


  /* --------------------------------------------- */



  {
    path: "/sop_encuesta",
    name: "sop_encuesta",
    component: () => import("../components/soporte/sop_encuesta.vue"),
  },
  {
    path: "/sop_home",
    name: "sop_home",
    component: () => import("../components/soporte/sop_home.vue"),
  },
  {
    path: "/sop_agendamiento",
    name: "sop_agendamiento",
    component: () => import("../components/soporte/sop_agendamiento.vue"),
  },
  {
    path: "/sop_profesional",
    name: "sop_profesional",
    component: () => import("../components/soporte/sop_profesional.vue"),
  },
  /* Admin */
  {
    path: "/admin_encuestas",
    name: "admin_encuestas",
    component: () => import("../components/administracion/admin_encuestas.vue"),
  },
  {
    path: "/admin_parametros",
    name: "admin_parametros",
    component: () => import("../components/administracion/admin_parametros.vue"),
  },
  {
    path: "/admin_informes",
    name: "admin_informes",
    component: () => import("../components/administracion/admin_informes.vue"),
  },
  {
    path: "/admin_ips",
    name: "admin_ips",
    component: () => import("../components/administracion/admin_ips.vue"),
  },
  {
    path: "/admin_programavisitas",
    name: "admin_programavisitas",
    component: () => import("../components/administracion/admin_programavisitas.vue"),
  },
  {
    path: "/admin_registrousuarios",
    name: "admin_registrousuarios",
    component: () => import("../views/registrousuarios.vue"),
  },
  /* Login y registro */
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/registrousuarios",
    name: "registrousuarios",
    component: () => import("../views/registrousuarios.vue"),
  },

  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/logout.vue"),
  },
  /* Ruta catch-all para redirigir rutas no definidas */
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
