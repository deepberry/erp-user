export default [
    {
        name: "ied",
        path: "/ied",
        component: () => import("../views/ied.vue"),
    },
    {
        name: "erpPlant",
        path: "/erp/plant",
        component: () => import("../views/erp/plant.vue"),
    },
    {
        name: "erpTask",
        path: "/erp/task",
        component: () => import("../views/erp/task.vue"),
    },
    {
        name: "erpPurchase",
        path: "/erp/purchase",
        component: () => import("../views/erp/purchase.vue"),
    },
    {
        name: "erpStock",
        path: "/erp/stock",
        component: () => import("../views/erp/stock.vue"),
    },
    {
        name: "erpWorkOrder",
        path: "/erp/workOrder",
        component: () => import("../views/erp/workOrder.vue"),
    },
    {
        name: "erpStatisti",
        path: "/erp/statisti",
        component: () => import("../views/erp/statisti.vue"),
    },
    {
        name: "accountSubAccount",
        path: "/account/subAccount",
        component: () => import("../views/account/subAccount.vue"),
    },
    {
        name: "accountRole",
        path: "/account/role",
        component: () => import("../views/account/role.vue"),
    },
    {
        name: "my",
        path: "/my",
        component: () => import("../views/my.vue"),
    },
];
