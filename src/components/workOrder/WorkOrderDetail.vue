<template>
    <div class="workOrderDetail purchaseDetailBox">
        <el-dialog
            custom-class="workOrderDetail purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="工单详情"
            width="700px"
        >
            <div v-loading="detailLoading" class="workOrderDetailInner purchaseDetailBoxInner">
                <div class="item">
                    <p>订单号：1544555554</p>
                    <p>订单状态</p>
                </div>
                <div class="item">
                    <p>提交人：mins</p>
                    <p>提交时间：2022-10-17 12:00:00</p>
                </div>
                <el-table :data="detail" style="width: 100%; margin-top: 20px">
                    <el-table-column prop="agriculturalBo" label="农资名称" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo" label="类型" show-overflow-tooltip />
                    <el-table-column prop="id" label="规格" show-overflow-tooltip>
                        <template #default="scope"> 50gk/袋 {{ scope.row }} </template>
                    </el-table-column>
                    <el-table-column prop="agriculturalBo" label="厂家" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo" label="申领数量" show-overflow-tooltip />
                    <el-table-column prop="agriculturalBo" label="参考单价" show-overflow-tooltip />
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p>
                            <span>化肥</span>
                            <span>5000公斤</span>
                        </p>
                        <p>
                            <span>化肥</span>
                            <span>5000公斤</span>
                        </p>
                    </div>
                </div>
                <div class="form">
                    <p class="formTitle">审核流程</p>
                    <p>
                        <span>张三</span>
                        <span class="ed">发起人</span>
                        <span>2022.10.17 22:16:01</span>
                    </p>
                    <p>
                        <span>李四</span>
                        <span>待审核</span>
                    </p>
                    <p>
                        <span>李四</span>
                        <span>待审核</span>
                    </p>
                </div>
                <div class="formButton">
                    <el-button type="primary" plain>不通过</el-button>
                    <el-button type="primary">通过</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "workOrderDetail",
    props: ["id"],
    data() {
        return {
            detailLoading: false,
            showDetailBox: true, // 是否显示详情弹窗
            detail: "",
        };
    },
    mounted() {},
    methods: {
        onClose() {
            this.$emit("onCloseDetail", 0);
            this.showDetailBox = false;
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
@import url("@/assets/css/purchase.order.less");
.workOrderDetailInner {
    position: relative;
    top: -10px;
    padding: 10px 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .form {
        padding: 20px 0;
        margin-top: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.09);
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        p {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 10px 0;
            color: #1f1f1f;
            span {
                display: inline-block;
                width: 120px;
            }
            span:nth-child(2) {
                color: #538dff;
            }
            span:nth-child(3) {
                width: 300px;
                color: #979797;
            }
            span.ed {
                color: #979797;
            }
        }
        .formTitle {
            color: #333333;
            font-weight: bold;
        }
    }
    .formButton {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>
