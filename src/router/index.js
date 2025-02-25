// router/index.js
import { createRouter, createWebHistory } from "vue-router";

const Login = () => import("@/views/Login.vue");
const NotFound = () => import("@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

//TODO: AUTH validation
// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !userIsAuthenticated()) {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;
