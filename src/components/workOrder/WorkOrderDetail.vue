<template>
    <div class="workOrderDetail purchaseDetailBox">
        <el-dialog
            custom-class="workOrderDetail purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="工单详情"
            width="1000px"
        >
            <div v-loading="detailLoading" class="workOrderDetailInner purchaseDetailBoxInner">
                <div class="item">
                    <p>工单号：{{ detail.orderNo }}</p>
                    <p :style="{ color: detail.color }">{{ detail.status }}</p>
                </div>
                <div class="item">
                    <p>提交人：{{ detail.userName }}</p>
                    <p>提交时间：{{ detail.orderTime }}</p>
                </div>
                <el-table size="large" :data="detail.agriculturalCartBos" style="width: 100%; margin-top: 20px">
                    <el-table-column
                        label="农资名称"
                        prop="agriculturalBo.title"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                        label="类型"
                        width="140"
                        prop="agriculturalBo.agriculturalCategory"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column label="规格" width="140" show-overflow-tooltip>
                        <template #default="scope">
                            {{ scope.row.agriculturalBo.agriculturalCount }}
                            {{ scope.row.agriculturalBo.unitweight }}/{{ scope.row.agriculturalBo.unitmeasurement }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="厂家"
                        prop="agriculturalBo.manufacturers"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column label="申领数量" show-overflow-tooltip>
                        <template #default="scope">
                            {{ scope.row.agriculturalCos }} {{ scope.row.agriculturalBo.unitweight }}
                        </template>
                    </el-table-column>
                    <el-table-column label="当前库存" show-overflow-tooltip>
                        <template #default="scope">
                            {{ scope.row.unit }} {{ scope.row.agriculturalBo.unitweight }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p v-for="(item, index) in detail.totalCount" :key="index">
                            <span>{{ item.title }}</span>
                            <span>{{ item.agriculturalCos }}{{ item.unitweight }}</span>
                        </p>
                        <p style="height: 0px"></p>
                    </div>
                </div>
                <div class="form">
                    <p class="formTitle">审核流程</p>
                    <p v-for="(item, index) in detail.orderManagerBoList" :key="index">
                        <span>{{ item.username }}</span>
                        <span :style="{ color: item.color }">{{ item.check }}</span>
                        <span>{{ item.checkTime }}</span>
                    </p>
                </div>
                <div class="formButton">
                    <el-button
                        type="primary"
                        @click="check(2)"
                        plain
                        v-if="$store.state.power.reviewOrderBtn && detail.isCheckBth == 1"
                        >不通过</el-button
                    >
                    <el-button
                        type="primary"
                        @click="check(1)"
                        v-if="$store.state.power.reviewOrderBtn && detail.isCheckBth == 1"
                        >通过</el-button
                    >
                    <el-button
                        type="primary"
                        @click="out(detail.id)"
                        v-if="$store.state.power.simpleMaterialsOut && detail.isOutBth == 1"
                        >一键出库</el-button
                    >
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
export default {
    name: "workOrderDetail",
    props: ["id"],
    data() {
        return {
            detailLoading: false,
            showDetailBox: true, // 是否显示详情弹窗
            detail: {},
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 出库
        out(id) {
            let data = this.detail.agriculturalCartBos.map((item) => {
                return item.agriculturalBo.title;
            });
            ElMessageBox.confirm("农资名称：" + data.join(",") + " <br> 确定要出库吗？", "一键出库", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                dangerouslyUseHTMLString: true,
            })
                .then(() => {
                    this.ajax
                        .post("/api/v1/adam/farmLand/saveAgriculturalOutIn", {
                            checkStatus: 0,
                            id: this.detail.id,
                            orderNo: this.detail.orderNo,
                        })
                        .then((r) => {
                            if (r.code == 200) {
                                this.$message.success("出库成功");
                                this.onClose(1);
                            } else {
                                this.$message.error(r.message);
                            }
                        });
                })
                .catch(() => {});
        },
        // 审核工单
        check(v) {
            this.ajax
                .post("/api/v1/adam/workOrder/checkOrder", {
                    checkStatus: v,
                    id: this.detail.id,
                    orderNo: this.detail.orderNo,
                })
                .then((r) => {
                    this.onClose(1);
                });
        },
        // 获取详情
        getData() {
            this.detailLoading = true;
            this.ajax
                .post("/api/v1/adam/workOrder/workOrderDetail", {
                    id: this.id,
                })
                .then((r) => {
                    // 是否显示审核按钮
                    let user = JSON.parse(localStorage.getItem("erp_user")).id;

                    switch (r.data.orderStatus) {
                        case 0:
                            r.data.status = "待审核";
                            r.data.color = "#EC2626";
                            break;
                        case 1:
                            r.data.status = "待出库";
                            r.data.color = "#0DD71C";
                            break;
                        case 2:
                            r.data.status = "不通过";
                            r.data.color = "#1890FF";
                            break;
                        case 3:
                            r.data.status = "已出库";
                            r.data.color = "#A8A8A8";
                            break;
                    }
                    r.data.orderManagerBoList = r.data.orderManagerBoList.map((item) => {
                        switch (item.isCheck) {
                            case -1:
                                item.check = "发起人";
                                item.color = "#979797";
                                break;
                            case 0:
                                item.check = "待审核";
                                item.color = "#538DFF";
                                break;
                            case 1:
                                item.check = "通过";
                                item.color = "#3DC947";
                                break;
                            case 2:
                                item.check = "拒绝";
                                item.color = "#EC2D2D";
                                break;
                        }
                        return item;
                    });
                    this.detail = r.data;
                    console.log(this.detail);
                    this.detailLoading = false;
                });
        },
        onClose(v) {
            if (typeof v == "function") {
                v = null;
            }
            this.$emit("onCloseDetail", v);
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
