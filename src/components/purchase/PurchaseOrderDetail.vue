<template>
    <div class="purchaseDetailBox">
        <el-dialog
            custom-class="purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="订单详情"
            width="800px"
        >
            <div v-loading="detailLoading" class="purchaseDetailBoxInner">
                <div class="item">
                    <p>订单号：{{ detail.orderUuid }}</p>
                    <p :style="{ color: detail.color }">{{ detail.status }}</p>
                </div>
                <div class="item">
                    <p>提交人：{{ detail.userName }}</p>
                    <p>提交时间：{{ detail.orderTime }}</p>
                </div>
                <el-table size="large" :data="detail.agriculturalCartBos" style="width: 100%; margin-top: 20px">
                    <el-table-column prop="agriculturalBo.title" label="农资名称" show-overflow-tooltip />
                    <el-table-column label="类型" show-overflow-tooltip>
                        <template #default="scope">
                            <span class="tag">{{ scope.row.agriculturalBo.agriculturalCategory }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="规格" show-overflow-tooltip>
                        <template #default="scope">
                            {{
                                scope.row.agriculturalBo.agriculturalCount +
                                scope.row.agriculturalBo.unitweight +
                                "/" +
                                scope.row.agriculturalBo.unitmeasurement
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="agriculturalBo.manufacturers" label="厂家" show-overflow-tooltip />
                    <el-table-column label="采购数量" show-overflow-tooltip>
                        <template #default="scope">
                            {{ scope.row.unit }}{{ scope.row.agriculturalBo.unitmeasurement }}（共{{
                                scope.row.agriculturalCount
                            }}{{ scope.row.agriculturalBo.unitweight }}）
                        </template>
                    </el-table-column>
                    <el-table-column prop="agriculturalBo.agriculturalPrice" label="参考单价" show-overflow-tooltip>
                        <template #default="scope"
                            ><span style="color: red"
                                >￥{{ scope.row.agriculturalBo.agriculturalPrice }}元
                            </span></template
                        >
                    </el-table-column>
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p v-for="(item, index) in detail.totalCount" :key="index">
                            <span>{{ item.title }}</span>
                            <span>
                                {{ item.unitCount }}{{ item.unitdict }} 共（{{ item.unitCount * item.weightCount
                                }}{{ item.unitweight }}）
                            </span>
                        </p>
                        <p>
                            <span>总价</span>
                            <span>￥{{ detail.orderCos }}元</span>
                        </p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import timer from "@/utils/timer.js";
export default {
    name: "purchaseOrderDetail",
    props: ["id"],
    data() {
        return {
            showDetailBox: true, // 是否显示详情弹窗
            detail: {}, // 详情数据,
            detailLoading: false, // 详情数据加载状态
        };
    },
    mounted() {
        this.detailLoading = true;
        this.ajax
            .post("/api/v1/adam/agricultural/orderDetail", {
                id: this.id,
            })
            .then((r) => {
                let status = "";
                let color = "";
                switch (r.data.orderStatus) {
                    case 0:
                        status = "已提交";
                        color = "#1890FF";
                        break;
                    case 1:
                        status = "已完成";
                        color = "#0DD71C";
                        break;
                    case 2:
                        status = "已关闭";
                        color = "#A8A8A8";
                        break;
                }
                r.data.status = status;
                r.data.color = color;
                r.data.orderTime = timer.time("y-m-d h:i:s", r.data.orderTime);
                this.detail = r.data;
                this.detailLoading = false;
            });
    },
    methods: {
        onClose() {
            this.$emit("closeDetailBox", 0);
            this.showDetailBox = false;
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/purchase.order.less");
.tag {
    background: #c3f8c7;
    color: #000000;
    display: inline-block;
    padding: 2px 10px;
    font-size: 12px;
    border-radius: 3px;
}
</style>
