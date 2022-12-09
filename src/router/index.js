import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/Index.vue";
import indexRoutes from "@/data/indexRoutes.js";

const routes = [
    {
        name: "index",
        path: "/",
        component: index,
        children: [...indexRoutes],
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/views/login.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // 判断是否在登陆状态
    if (to.path != "/login" && !localStorage.getItem("erp_token")) {
        next({
            path: "/login",
        });
    }

    next();
});

export default router;
