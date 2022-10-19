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
        name: "erpStockOut",
        path: "/erp/stock/out",
        component: () => import("../components/stock/StockOut.vue"),
    },
    {
        name: "erpStockPut",
        path: "/erp/stock/put",
        component: () => import("../components/stock/StockPut.vue"),
    },
    {
        name: "StockRecord",
        path: "/erp/stock/record",
        component: () => import("../components/stock/StockRecord.vue"),
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
        children: [
            {
                name: "erpStatistiProduct",
                path: "/erp/statisti/product",
                component: () => import("../components/statisti/StatistiProduct.vue"),
            },
            {
                name: "erpStatistiStock",
                path: "/erp/statisti/stock",
                component: () => import("../components/statisti/StatistiStock.vue"),
            },
            {
                name: "erpStatistiWork",
                path: "/erp/statisti/work",
                component: () => import("../components/statisti/StatistiWork.vue"),
            },
        ],
    },
    {
        name: "erpMy",
        path: "/erp/my",
        component: () => import("../views/erp/my.vue"),
        children: [
            {
                name: "erpMyProduct",
                path: "/erp/my/product",
                component: () => import("../components/my/MyProduct.vue"),
            },
            {
                name: "erpMyWork",
                path: "/erp/my/work",
                component: () => import("../components/my/MyWork.vue"),
            },
        ],
    },
    {
        name: "erpMyStartGet",
        path: "/erp/my/get",
        component: () => import("../components/my/MyStartGet.vue"),
    },
    {
        name: "erpMyGetRecord",
        path: "/erp/my/record",
        component: () => import("../components/my/MyGetRecord.vue"),
    },
    {
        name: "erpMyWorkTime",
        path: "/erp/my/work",
        component: () => import("../components/my/MyWorkTime.vue"),
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
