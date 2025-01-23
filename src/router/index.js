import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },

    /* rutas hepdesk */
    {
      path: "/sop_reportes",
      name: "sop_reportes",
      component: () => import("../components/soporte/sop_reportes.vue"),
    },
    {
      path: "/sop_encuesta",
      name: "sop_encuesta",
      component: () => import("../components/soporte/sop_encuesta.vue"),
    },
    {
      path: "/sop_soporte",
      name: "sop_soporte",
      component: () => import("../components/soporte/sop_soporte.vue"),
    },
    {
      path: "/sop_sugerencia",
      name: "sop_sugerencia",
      component: () => import("../components/soporte/sop_sugerencia.vue"),
    },
    {
      path: "/sr_reporte",
      name: "sr_reporte",
      component: () => import("../components/soporte/sr_reporte.vue"),
    },   {
      path: "/sr_solicitud",
      name: "sr_solicitud",
      component: () => import("../components/soporte/sr_solicitud.vue"),
    },
  ],
});

export default router;
