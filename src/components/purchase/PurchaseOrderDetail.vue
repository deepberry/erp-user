<template>
    <div class="purchaseDetailBox">
        <el-dialog
            custom-class="purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="订单详情"
            width="700px"
        >
            <div v-loading="detailLoading" class="purchaseDetailBoxInner">
                <div class="item">
                    <p>订单号：{{ detail.orderUuid }}</p>
                    <p>订单状态</p>
                </div>
                <div class="item">
                    <p>提交人：{{ detail.userName }}</p>
                    <p>提交时间：{{ detail.orderTime }}</p>
                </div>
                <el-table size="large" :data="detail.agriculturalCartBos" style="width: 100%; margin-top: 20px">
                    <el-table-column prop="agriculturalBo.title" label="农资名称" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo.agriculturalCategory" label="类型" show-overflow-tooltip />
                    <el-table-column prop="id" label="规格" show-overflow-tooltip>
                        <template #default="scope">
                            ({{
                                scope.row.agriculturalBo.agriculturalCount +
                                scope.row.agriculturalBo.unitweight +
                                "/" +
                                scope.row.agriculturalBo.unitmeasurement
                            }})
                        </template>
                    </el-table-column>
                    <el-table-column prop="agriculturalBo.manufacturers" label="厂家" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo.agriculturalCount" label="申领数量" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo.agriculturalPrice" label="参考单价" show-overflow-tooltip />
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p v-for="(item, index) in detail.totalCount" :key="index">
                            <span>{{ item.title }}</span>
                            <span>{{ item.agriculturalCos }}{{ item.unitweight }}</span>
                        </p>
                        <p>
                            <span>总价</span>
                            <span>￥100.00元</span>
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
                console.log(r);
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
</style>
