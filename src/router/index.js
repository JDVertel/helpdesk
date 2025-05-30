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
    meta: { requiresAuth: true },
  },
  {
    path: "/sop_home",
    name: "sop_home",
    component: () => import("../components/soporte/sop_home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/sop_agendamiento",
    name: "sop_agendamiento",
    component: () => import("../components/soporte/sop_agendamiento.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/sop_profesional",
    name: "sop_profesional",
    component: () => import("../components/soporte/sop_profesional.vue"),
    meta: { requiresAuth: true },
  },
  /* Admin */
  {
    path: "/admin_encuestas",
    name: "admin_encuestas",
    component: () => import("../components/administracion/admin_encuestas.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin_parametros",
    name: "admin_parametros",
    component: () =>
      import("../components/administracion/admin_parametros.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin_informes",
    name: "admin_informes",
    component: () => import("../components/administracion/admin_informes.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin_ips",
    name: "admin_ips",
    component: () => import("../components/administracion/admin_ips.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin_programavisitas",
    name: "admin_programavisitas",
    component: () =>
      import("../components/administracion/admin_programavisitas.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/admin_registrousuarios",
    name: "admin_registrousuarios",
    component: () => import("../views/registrousuarios.vue"),
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },

  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/logout.vue"),
  },
  /* Ruta catch-all para redirigir rutas no definidas */
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = !!localStorage.getItem("token"); // O el método que uses para validar sesión

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    // Si la ruta requiere auth y no hay token, redirige a login
    next("/login");
  } else {
    // Si está autenticado o la ruta no es protegida, permite el acceso
    next();
  }
});
export default router;
