<template>
    <div class="StatisticsProduct">
        <div class="head">
            <el-input style="width: 300px" v-model="searchKey" placeholder="关键字搜索：农户姓名" />
            <el-button type="primary" style="margin-left: 10px" @click="getData">查询</el-button>
        </div>
        <div class="table" v-loading="loading">
            <el-table size="large" :data="list" style="width: 100%" max-height="600">
                <el-table-column prop="userName" label="姓名" width="280" />
                <el-table-column prop="workHours" label="工时" />
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
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            searchKey: "",
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/task/workHoursSta", {
                    endTime: "",
                    keyWord: this.searchKey,
                    startTime: "",
                })
                .then((r) => {
                    this.loading = false;
                    if (r.code == 200) {
                        this.list = r.data.workDetailHoursList;
                        // this.total = r.total;
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
        justify-content: flex-start;
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
}
</style>
