<template>
    <div class="StatistiProduct">
        <div class="head">
            <div>
                <el-input style="width: 300px" v-model="input" placeholder="关键字搜索：农资类型、农资名称" />
                <el-button type="primary" style="margin-left: 10px">查询</el-button>
            </div>
            <div>
                <el-button type="success" style="margin-left: 10px" @click="$router.push('/erp/my/work')"
                    >工时统计</el-button
                >
            </div>
        </div>
        <div class="table">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="time" label="时间" />
                <el-table-column prop="title" label="农资名称" />
                <el-table-column prop="type" label="农事类型" />
                <el-table-column prop="num" label="数量" />
                <el-table-column prop="area" label="实施棚区" />
                <el-table-column prop="user" label="实施人" />
                <el-table-column prop="timenum" label="工时数" />
            </el-table>
        </div>
        <div class="pages" v-if="list.length > 0">
            <span class="total">共 {{ total }} 条</span>
            <el-pagination
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[100, 200, 300, 400]"
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
            list: [
                {
                    time: "2022.10.19",
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    area: "A区B棚",
                    user: "Mins",
                    timenum: 8,
                },
                {
                    time: "2022.10.19",
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    area: "A区B棚",
                    user: "Mins",
                    timenum: 8,
                },
                {
                    time: "2022.10.19",
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    area: "A区B棚",
                    user: "Mins",
                    timenum: 8,
                },
                {
                    time: "2022.10.19",
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    area: "A区B棚",
                    user: "Mins",
                    timenum: 8,
                },
            ],
            currentPage: 1,
            pageSize: 10,
            total: 2,
        };
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
