export default [
    {
        title: "智能设备",
        icon: "erpjiekouyunwei",
        son: [],
        path: "/ied",
    },
    {
        title: "ERP",
        icon: "erpxitongshezhi",
        son: [
            {
                title: "作物种植",
                path: "/erp/plant",
                show: false,
            },
            {
                title: "任务管理",
                path: "/erp/task",
                show: false,
            },
            {
                title: "农资采购",
                path: "/erp/purchase",
                show: false,
            },
            {
                title: "农资库存",
                path: "/erp/stock",
                show: false,
            },
            {
                title: "申领工单",
                path: "/erp/workOrder",
                show: false,
            },
            {
                title: "数据统计",
                path: "/erp/statisti",
                show: false,
            },
            {
                title: "我的",
                path: "/erp/my",
                show: true,
            },
        ],
    },
    {
        title: "账号权限",
        icon: "erpgongnengquanxian",
        son: [
            {
                title: "子账号",
                path: "/account/subAccount",
                show: true,
            },
            {
                title: "角色权限",
                path: "/account/role",
                show: false,
            },
        ],
    },
];
