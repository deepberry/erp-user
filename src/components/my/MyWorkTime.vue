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
                        <el-input style="width: 300px" v-model="searchKey" placeholder="关键字搜索：农资类型" />
                        <el-button type="primary" style="margin-left: 10px" @click="getData">查询</el-button>
                    </div>
                    <div class="table">
                        <el-table :data="list" style="width: 100%" v-loading="loading">
                            <el-table-column prop="agricultural" label="农资类型" width="250" />
                            <el-table-column prop="agriculturalCount" label="工时" />
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
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 2,
            searchKey: '',
            loading: false
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 返回列表
        back() {
            this.$router.push("/erp/my/work");
        },
        // 获取数据
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/farm/getMyWorkStatistics', {
                "endTime": "",
                "keyWord": this.searchKey,
                "startTime": ""
            }).then(r => {
                this.loading = false;
                if(r.code == 200){
                    this.list = r.data;
                }
            })
        }
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
