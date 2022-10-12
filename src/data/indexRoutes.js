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
        children: [
            {
                name: "erpPurchaseOrder",
                path: "/erp/purchase/order",
                component: () => import("../components/purchase/PurchaseOrder.vue"),
            },
            {
                name: "erpPurchaseShop",
                path: "/erp/purchase/shop",
                component: () => import("../components/purchase/PurchaseShop.vue"),
            },
        ],
    },
    {
        name: "erpPurchaseShopDetail",
        path: "/erp/purchase/shop/detail",
        component: () => import("../components/purchase/PurchaseShopDetail.vue"),
    },
    {
        name: "erpStock",
        path: "/erp/stock",
        component: () => import("../views/erp/stock.vue"),
        children: [
            {
                name: "erpStockList",
                path: "/erp/stock/list",
                component: () => import("../components/stock/StockList.vue"),
            },
        ],
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
        name: "erpMy",
        path: "/erp/my",
        component: () => import("../views/erp/my.vue"),
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
];
