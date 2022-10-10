export default [
    {
        title: "智能设备",
        icon: "erpjiekouyunwei",
        son: [],
        path: "/ied",
        show: false,
    },
    {
        title: "ERP",
        icon: "erpxitongshezhi",
        son: [
            {
                title: "作物种植",
                path: "/erp/plant",
            },
            {
                title: "任务管理",
                path: "/erp/task",
            },
            {
                title: "采购管理",
                path: "/erp/purchase",
            },
            {
                title: "农资库存",
                path: "/erp/stock",
            },
            {
                title: "申领工单",
                path: "/erp/workOrder",
            },
            {
                title: "数据统计",
                path: "/erp/statisti",
            },
        ],
        show: false,
    },
    {
        title: "账号权限",
        icon: "erpgongnengquanxian",
        son: [
            {
                title: "子账号",
                path: "/account/subAccount",
            },
            {
                title: "角色权限",
                path: "/account/role",
            },
        ],
        show: false,
    },

    {
        title: "我的",
        icon: "erpwode",
        son: [],
        path: "/my",
        show: false,
    },
];
