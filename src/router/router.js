import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../pages/MainPage"),
  },
  {
    path: "/test",
    component: () => import ("../pages/TestComponent"),
  },
  {
    path: "/login",
    component: () => import ("../pages/LoginPage"),
  },
  {
    path: "/profile",
    component: () => import ("../pages/UserProfilePage"),
  },
  {
    path: "/record",
    component: () => import ("../pages/RecordPage"),
  },
  {
    path: "/about",
    component: () => import ("../pages/AboutPage"),
  },
  {
    path: "/register",
    component: () => import ("../pages/RegisterPage"),
  },
  {
    path: "/error404",
    component: () => import("../pages/Error404"),
  },
  { path: "/:catchAll(.*)", redirect: "/error404" },
];

export default new VueRouter({
  mode: "history",
  routes: routes,
});