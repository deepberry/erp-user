<template>
    <div class="purchaseDetailBox">
        <el-dialog
            custom-class="purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showCarBox"
            title="购物车"
            width="700px"
        >
            <div v-loading="carLoading" class="purchaseDetailBoxInner">
                <el-table :data="list" style="width: 100%">
                    <el-table-column type="selection" width="40" />
                    <el-table-column prop="agriculturalBo.title" label="农资名称" show-overflow-tooltip />
                    <el-table-column
                        prop="agriculturalBo.agriculturalCategory"
                        label="农资类型"
                        show-overflow-tooltip
                    />
                    <el-table-column prop="agriculturalBo.manufacturers" label="生产厂家" show-overflow-tooltip />
                    <el-table-column label="规格" width="100">
                        <template #default="scope">
                            ({{
                                scope.row.agriculturalBo.agriculturalCount +
                                scope.row.agriculturalBo.unitweight +
                                "/" +
                                scope.row.agriculturalBo.unitmeasurement
                            }})
                        </template>
                    </el-table-column>
                    <el-table-column width="70" label="价格" show-overflow-tooltip>
                        <template #default="scope"> ￥{{ scope.row.agriculturalBo.agriculturalPrice }} </template>
                    </el-table-column>
                    <el-table-column width="120" label="数量" show-overflow-tooltip>
                        <template #default="scope">
                            <el-input
                                type="number"
                                v-model="scope.row.agriculturalBo.agriculturalCount"
                                style="width: 60px"
                                size="small"
                                placeholder="数量"
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
                            <span>{{ item.num }}公斤</span>
                        </p>
                        <p>
                            <span>总价</span>
                            <span>￥{{ allPrice }}元</span>
                        </p>
                    </div>
                </div>
                <div class="buttons">
                    <el-button type="primary" round plain>联系客服</el-button>
                    <el-button type="primary">提交订单</el-button>
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
            showCarBox: true, // 是否显示详情弹窗
            detail: {}, // 详情数据,
            carLoading: false, // 详情数据加载状态
            totalList: [],
        };
    },
    computed: {
        allPrice() {
            let num = 0;
            this.list.map((item) => {
                num += item.agriculturalBo.agriculturalPrice * item.agriculturalBo.agriculturalCount;
            });
            return num;
        },
    },
    watch: {
        allPrice() {
            this.totalList = tools.total(this.list, "agriculturalBo.title");
        },
    },
    mounted() {
        // 获取购物车列表
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
                console.log(r);
                this.list = r.data;
                this.carLoading = false;
            });
    },
    methods: {
        onClose() {
            this.$emit("closeCarBox", 0);
            this.showCarBox = false;
        },
    },
};
</script>
