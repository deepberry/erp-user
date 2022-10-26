<template>
    <div class="stockRecordDetail">
        <el-dialog
            custom-class="stockRecordDetail"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="出入库统计"
            width="700px"
        >
            <div v-loading="detailLoading" class="stockRecordDetailInner">
                <div class="search">
                    <el-input style="width: 360px" v-model="keyWord" placeholder="关键字搜索：农资名称" />
                    <el-button type="primary" plain style="margin-left: 10px" @click="getData">查询</el-button>
                </div>
                <div class="table">
                    <el-table size="large" :data="list" max-height="500">
                        <el-table-column prop="agriculturalBo.title" label="农资名称" width="200" />
                        <el-table-column prop="agriculturalBo.manufacturers" width="260" label="生产厂家" />
                        <el-table-column label="入库量">
                            <template #default="scope">
                                <span class="und" v-if="scope.row.inAgriculturalCount"
                                    >{{ scope.row.inAgriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}</span
                                >
                                <span v-if="!scope.row.inAgriculturalCount">-</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="出库量">
                            <template #default="scope">
                                <span class="und" v-if="scope.row.outAgriculturalCount"
                                    >{{ scope.row.outAgriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}</span
                                >
                                <span v-if="!scope.row.outAgriculturalCount">-</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "stockRecordDetail",
    props: ["id"],
    data() {
        return {
            list: [],
            detailLoading: false,
            showDetailBox: true, // 是否显示详情弹窗
            keyWord: "",
        };
    },
    mounted() {
        // 获取数据
        this.getData();
    },
    methods: {
        getData() {
            this.detailLoading = true;
            this.ajax
                .post("/api/v1/adam/farmLand/outInStorageCount", {
                    endTime: "",
                    id: 0,
                    keyWord: this.keyWord,
                    startTime: "",
                })
                .then((r) => {
                    this.list = r.data;
                    this.detailLoading = false;
                });
        },
        onClose() {
            this.$emit("close", 0);
            this.showDetailBox = false;
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.stockRecordDetailInner {
    position: relative;
    top: -10px;
    padding: 10px 0px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .search {
        margin-top: 10px;
    }
    .table {
        margin-top: 20px;
        .und {
            text-decoration: underline;
            color: rgba(83, 141, 255, 1);
            font-size: 12px;
        }
    }
}
</style>
