import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import BinarySearchTree from "../views/BinarySearchTree/BinarySearchTree.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: BinarySearchTree,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
