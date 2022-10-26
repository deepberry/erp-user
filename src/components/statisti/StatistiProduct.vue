<template>
    <div class="StatistiProduct">
        <div class="head">
            <el-input style="width: 300px" v-model="searchKey" placeholder="关键字搜索：作物名称" />
            <el-button type="primary" style="margin-left: 10px" @click="getData">查询</el-button>
        </div>
        <div class="table" v-loading="loading">
            <el-table size="large" :data="list" style="width: 100%">
                <el-table-column prop="type" label="种类" width="280" />
                <el-table-column prop="num" label="重量" />
            </el-table>
        </div>
        <div class="pages" v-if="list.length > 0">
            <span class="total">共 {{ total }} 条</span>
            <el-pagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                background
                layout="prev, pager, next, jumper"
                :total="total"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "StatistiProduct",
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
            this.ajax.post("/api/v1/adam/task/dataStatistics").then((r) => {
                this.loading = false;
                console.log(r);
                if (r.code == 200) {
                    // this.list = r.data;
                    // this.total = r.total;
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.StatistiProduct {
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
