import ajax from "./ajax";
// 获取植物生长阶段
const growthStageDataApi = function (params) {
    return ajax.post("/api/v1/adam/farm/getGrowthStageByPlantId", params).then((r) => {
        return r;
    });
};

// 获取农事操作指导列表
const plantOperationGuideListApi = function (params) {
    return ajax.post("/api/v1/adam/farm/getPlantOperationGuidanceList", params).then((r) => {
        return r;
    });
};

export { growthStageDataApi, plantOperationGuideListApi };
