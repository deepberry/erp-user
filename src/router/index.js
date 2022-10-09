import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/index.vue";
import indexRoutes from "@/data/indexRoutes.js";

const routes = [
    {
        name: "index",
        path: "/",
        component: index,
        children: [...indexRoutes],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
