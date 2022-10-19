<template>
    <div class="StatistiProduct">
        <div class="head">
            <el-input style="width: 300px" v-model="input" placeholder="关键字搜索：农户姓名、日期" />
            <el-button type="primary" style="margin-left: 10px">查询</el-button>
        </div>
        <div class="table">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="title" label="姓名" />
                <el-table-column prop="num" label="工时" />
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
                    title: "张三",
                    num: 1000,
                },
                {
                    title: "张三",
                    num: 1000,
                },
                {
                    title: "张三",
                    num: 1000,
                },
                {
                    title: "张三",
                    num: 1000,
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
