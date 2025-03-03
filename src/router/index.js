import { createRouter, createWebHistory } from "vue-router";
import { API } from "@/lib/supabaseClient";

const Login = () => import("@/views/Login.vue");
const NotFound = () => import("@/views/NotFound.vue");
const Dashboard = () => import("@/views/Dashboard.vue");

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
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

const isAuthenticated = async () => {
  try {
    const { data } = await API.auth.getUser();
    console.log(data);
    return data?.user ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

router.beforeEach(async (to, from, next) => {
  const isValidUser = await isAuthenticated();

  if (to.name === "Login" && isValidUser) next({ name: "Dashboard" });
  else if (to.meta.requiresAuth && !isValidUser) next({ name: "Login" });
  else next();
});

export default router;
