<template>
    <div class="stockPut inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back"
                    ><i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回</el-button
                >
                <span style="position: relative; top: 2px; font-size: 15px">我的工时统计</span>
            </div>
            <div class="content">
                <div class="StatistiProduct">
                    <div class="head">
                        <el-input style="width: 300px" v-model="input" placeholder="关键字搜索：农资类型" />
                        <el-button type="primary" style="margin-left: 10px">查询</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="list" style="width: 100%">
                            <el-table-column prop="num" label="农资类型" width="250" />
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
            </div>
        </div>
    </div>
</template>

<script lang="js">
import timer from "@/utils/timer.js";
export default {
    name: "stockPut",
    props: ["id"],
    data() {
        return {
            list: [
                {
                    type: "蓝莓",
                    num: 1000,
                },
                {
                    type: "蓝莓",
                    num: 1000,
                },
                {
                    type: "蓝莓",
                    num: 1000,
                },
                {
                    type: "蓝莓",
                    num: 1000,
                },
            ],
            currentPage: 1,
            pageSize: 10,
            total: 2,
        }
    },
    mounted() {},
    methods: {
        // 返回列表
        back() {
            this.$router.push("/erp/my/work");
        },
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.content {
    width: calc(100% - 40px);
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px;
    padding-top: 0;
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
}
</style>
