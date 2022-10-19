<template>
    <div class="StatistiProduct">
        <div class="head">
            <div>
                <!-- <el-input style="width: 300px" v-model="input" placeholder="关键字搜索：作物名称、日期" />
                <el-button type="primary" style="margin-left: 10px">查询</el-button> -->
            </div>
            <div>
                <el-button type="primary" style="margin-left: 10px" @click="$router.push('/erp/my/get')"
                    >发起申领</el-button
                >
                <el-button type="success" style="margin-left: 10px" @click="$router.push('/erp/my/record')"
                    >申领记录</el-button
                >
            </div>
        </div>
        <div class="table">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="title" label="农资名称" />
                <el-table-column prop="type" label="农资类型" />
                <el-table-column prop="company" label="生产厂家" />
                <el-table-column prop="unit" label="规格" />
                <el-table-column prop="num" label="剩余量" />
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
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    company: "内蒙古xxx肥料厂",
                    unit: "50kg/袋",
                },
                {
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    company: "内蒙古xxx肥料厂",
                    unit: "50kg/袋",
                },
                {
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    company: "内蒙古xxx肥料厂",
                    unit: "50kg/袋",
                },
                {
                    title: "蓝莓",
                    type: "施肥",
                    num: 1000,
                    company: "内蒙古xxx肥料厂",
                    unit: "50kg/袋",
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
