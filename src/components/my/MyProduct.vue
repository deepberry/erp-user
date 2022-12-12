<template>
    <div class="StatisticsProduct">
        <div class="head">
            <div>
                <!-- <el-input style="width: 300px" v-model="input" placeholder="关键字搜索：作物名称、日期" />
                <el-button type="primary" style="margin-left: 10px">查询</el-button> -->
            </div>
            <div>
                <el-button
                    type="primary"
                    style="margin-left: 10px"
                    v-if="$store.state.power.applyBtn"
                    @click="$router.push('/erp/my/get')"
                    >发起申领</el-button
                >
                <el-button type="success" style="margin-left: 10px" @click="$router.push('/erp/my/record')"
                    >申领记录</el-button
                >
            </div>
        </div>
        <div class="table">
            <el-table size="large" :data="list" style="width: 100%" max-height="600" v-loading="loading">
                <el-table-column prop="agriculturalBo.title" label="农资名称" />
                <el-table-column label="农资类型">
                    <template #default="scope">
                        <span class="tag">{{ scope.row.agriculturalBo.agriculturalCategory }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="agriculturalBo.manufacturers" label="生产厂家" />
                <el-table-column label="规格">
                    <template #default="scope">
                        {{ scope.row.agriculturalBo.agriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}/{{
                            scope.row.agriculturalBo.unitmeasurement
                        }}
                    </template>
                </el-table-column>
                <el-table-column label="剩余量">
                    <template #default="scope">
                        {{ scope.row.agriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "StatisticsProduct",
    data() {
        return {
            loading: false,
            searchKey: "",
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/farmLand/agriculturalUser-list", {
                    pageNum: this.currentPage,
                    pageSize: 10,
                    param: {
                        endTime: "",
                        id: 0,
                        keyWord: this.searchKey,
                        startTime: "",
                    },
                })
                .then((r) => {
                    this.loading = false;
                    if (r.code == 200) {
                        this.list = r.data;
                        this.total = r.total;
                    } else {
                        this.$message.error("获取数据失败，请稍后再试！");
                    }
                });
        },
    },
};
</script>

<style lang="less" scoped>
.StatisticsProduct {
    .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
    }
    .pages {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px 0;
        .total {
            color: #a0a0a0;
            margin-right: 10px;
        }
    }
    .tag {
        background: #c3f8c7;
        color: #000000;
        display: inline-block;
        padding: 2px 10px;
        font-size: 12px;
        border-radius: 3px;
    }
}
</style>
