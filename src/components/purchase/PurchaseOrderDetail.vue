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
                    <p>订单号：ID124555454 - {{ id }}</p>
                    <p>已完成</p>
                </div>
                <div class="item">
                    <p>提交人：张三</p>
                    <p>提交时间：2022.09.24 12:45:21</p>
                </div>
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="id" label="农资名称" show-overflow-tooltip />
                    <el-table-column prop="id" label="类型" show-overflow-tooltip />
                    <el-table-column prop="id" label="规格" show-overflow-tooltip />
                    <el-table-column prop="id" label="厂家" show-overflow-tooltip />
                    <el-table-column prop="id" label="申领数量" show-overflow-tooltip />
                    <el-table-column prop="id" label="参考单价" show-overflow-tooltip />
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
export default {
    name: "purchaseOrderDetail",
    props: ["id"],
    data() {
        return {
            list: [],
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
