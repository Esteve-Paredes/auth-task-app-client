import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ProjectDetail from "../pages/ProjectDetail.vue";
import SignIn from "../pages/SignIn.vue";
import SignUp from "../pages/SignUp.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    meta: { requireAuth: true },
  },
  {
    path: "/projectDetail/:projectId",
    component: ProjectDetail,
    name: "ProjectDetail",
    meta: { requireAuth: true },
  },
  {
    path: "/signin",
    component: SignIn,
    name: "SignIn",
    meta: { requireAuth: false },
  },
  {
    path: "/signup",
    component: SignUp,
    name: "SignUp",
    meta: { requireAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userToken = localStorage.getItem("token");
  const needAuth = to.meta.requireAuth;

  if (needAuth && !userToken) {
    next({ name: "SignIn" });
  } else {
    if (to.name) {
      next();
    } else {
      next({ name: "Home" });
    }
  }
});

export default router;
