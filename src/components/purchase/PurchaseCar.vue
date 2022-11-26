<template>
    <div class="purchaseDetailBox">
        <el-dialog
            custom-class="purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showCarBox"
            title="购物车"
            width="900px"
        >
            <div v-loading="carLoading" class="purchaseDetailBoxInner">
                <el-table
                    size="large"
                    ref="table"
                    @select="select"
                    @select-all="select"
                    :data="list"
                    style="width: 100%"
                >
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="agriculturalBo.title" label="农资名称" show-overflow-tooltip />
                    <el-table-column
                        prop="agriculturalBo.agriculturalCategory"
                        label="农资类型"
                        show-overflow-tooltip
                    />
                    <el-table-column prop="agriculturalBo.manufacturers" label="生产厂家" show-overflow-tooltip />
                    <el-table-column label="规格" width="140">
                        <template #default="scope">
                            ({{
                                scope.row.agriculturalBo.agriculturalCount +
                                scope.row.agriculturalBo.unitweight +
                                "/" +
                                scope.row.agriculturalBo.unitmeasurement
                            }})
                        </template>
                    </el-table-column>
                    <el-table-column width="120" label="价格" show-overflow-tooltip>
                        <template #default="scope"> ￥{{ scope.row.agriculturalBo.agriculturalPrice }} </template>
                    </el-table-column>
                    <el-table-column width="120" label="数量" show-overflow-tooltip>
                        <template #default="scope">
                            <el-input
                                type="number"
                                v-model="scope.row.unit"
                                style="width: 60px"
                                size="small"
                                placeholder="数量"
                                @blur="resetCarCount(scope.row)"
                            />
                            {{ scope.row.agriculturalBo.unitmeasurement }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p v-for="item in totalList" :key="item.title">
                            <span>{{ item.title }}</span>
                            <span>{{ item.num }}{{ item.unit }}</span>
                        </p>
                        <p>
                            <span>总价</span>
                            <span>￥{{ allPrice }}.00元</span>
                        </p>
                    </div>
                </div>
                <div class="buttons">
                    <el-button type="primary" round plain @click="showServer">联系客服</el-button>
                    <el-button type="primary" @click="submit" :loading="submitting">提交订单</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tools from "@/utils/tools.js";
export default {
    name: "purchaseOrderCar",
    props: ["id"],
    data() {
        return {
            list: [],
            selected: [],
            showCarBox: true, // 是否显示详情弹窗
            detail: {}, // 详情数据,
            carLoading: false, // 详情数据加载状态
            totalList: [],
            submitting: false,
        };
    },
    computed: {
        allPrice() {
            let num = 0;
            this.selected.map((item) => {
                num += item.agriculturalBo.agriculturalPrice * item.unit;
            });
            return num;
        },
    },
    watch: {
        allPrice() {
            this.totalList = tools.total(this.selected, "agriculturalBo.title");
            this.totalList = this.totalList.map((item) => {
                this.list.map((i) => {
                    if (i.agriculturalBo.title == item.title) {
                        item.unit = i.agriculturalBo.unitweight;
                    }
                });
                return item;
            });
        },
    },
    mounted() {
        this.getCar();
    },
    methods: {
        // 选择行
        select(row) {
            console.log(row);
            this.selected = row;
        },
        // 获取购物车列表
        getCar() {
            this.carLoading = true;
            this.ajax
                .post("/api/v1/adam/agricultural/cart", {
                    pageNum: 0,
                    pageSize: 0,
                    param: {
                        keyWord: "",
                        orderStatus: 0,
                    },
                })
                .then((r) => {
                    let list = [];
                    r.data.map((item) => {
                        if (item.unit > 0) list.push(item);
                    });
                    this.list = list;
                    this.carLoading = false;
                });
        },
        onClose() {
            this.$emit("closeCarBox", 0);
            this.showCarBox = false;
        },
        showServer() {
            this.$alert("客服电话：13606870818", "联系客服");
        },
        // 更新购物车数量
        resetCarCount(v) {
            this.ajax.post("/api/v1/adam/agricultural/cart-update", {
                agriculturalId: v.agriculturalBo.id,
                id: v.id,
                unit: v.unit,
            });
        },
        submit() {
            let t = this;
            if (t.$refs.table.getSelectionRows().length == 0) {
                t.$message.warning("请选择农资");
                return;
            }
            let totalCount = [];
            let orderCartBoList = t.$refs.table.getSelectionRows().map((item) => {
                totalCount.push({
                    agriculturalCos: item.agriculturalBo.agriculturalCount * item.agriculturalBo.agriculturalPrice,
                    id: item.agriculturalBo.agriculturalCategoryId,
                    title: item.agriculturalBo.title,
                    unitweight: item.agriculturalBo.agriculturalCount,
                });
                return {
                    agriculturalId: item.agriculturalBo.id,
                    id: item.id,
                    unit: item.unit,
                };
            });
            t.submitting = true;
            t.ajax
                .post("/api/v1/adam/agricultural/saveOrder", {
                    orderCartBoList,
                    orderCos: t.allPrice,
                    totalCount,
                })
                .then((r) => {
                    t.submitting = false;
                    if (r.code == 200) {
                        t.$message.success("提交成功");
                        t.onClose();
                    } else {
                        t.$message.error(r.message);
                    }
                });
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/purchase.order.less");
</style>
