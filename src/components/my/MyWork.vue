<template>
    <div class="StatistiProduct">
        <div class="head">
            <div>
                <el-input style="width: 300px" v-model="searchKey" placeholder="关键字搜索：农资类型、农资名称" />
                <el-button type="primary" style="margin-left: 10px" @click="getData">查询</el-button>
            </div>
            <div>
                <el-button type="success" style="margin-left: 10px" @click="$router.push('/erp/my/workTime')"
                    >工时统计</el-button
                >
            </div>
        </div>
        <div class="table">
            <el-table size="large" :data="list" style="width: 100%" v-loading="loading">
                <el-table-column prop="workTime" label="时间" />
                <el-table-column prop="title" label="农事类型" />
                <el-table-column label="农资名称">
                    <template #default="scope">
                        <p v-for="item in scope.row.farmUseBos" :key="item.id">{{ item.agricultural }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="农资数量">
                    <template #default="scope">
                        <p v-for="item in scope.row.farmUseBos" :key="item.id">
                            {{ item.agriculturalCount }}{{ item.agriculturalUnit }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="gardenName" label="实施棚区" />
                <el-table-column prop="userName" label="实施人" />
                <el-table-column prop="workHour" label="工时数" />
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
import timer from "@/utils/timer";
export default {
    name: "StatistiProduct",
    data() {
        return {
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 2,
            searchKey: "",
            loading: false,
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
                .post("/api/v1/adam/farm/getMyWorkTime", {
                    endTime: "",
                    keyWord: this.searchKey,
                    startTime: "",
                })
                .then((r) => {
                    this.loading = false;
                    if (r.code == 200) {
                        this.list = r.data.map((item) => {
                            item.workTime = timer.time("y-m-d h:i:s", item.workTime);
                            return item;
                        });
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
}
</style>
