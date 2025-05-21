import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* --------------------soportes------------- */
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
      path: "/sop_encuesta",
      name: "sop_encuesta",
      component: () => import("../components/soporte/sop_encuesta.vue"),
    },
    {
      path: "/sop_soporte",
      name: "sop_soporte",
      component: () => import("../components/soporte/sop_soporte.vue"),
    },

  
    /* -------------------admin----------------------------- */
    {
      path: "/admin_encuestas",
      name: "admin_encuestas",
      component: () => import("../components/administracion/admin_encuestas.vue"),
    },
    {
      path: "/admin_usuarios",
      name: "admin_usuarios",
      component: () => import("../components/administracion/admin_usuarios.vue"),
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


   
  ],
});

export default router;
