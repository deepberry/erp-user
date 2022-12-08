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
                <span style="position: relative; top: 2px; font-size: 15px">申领记录</span>
            </div>
            <div class="content" v-loading="loading">
                <div class="StatistiProduct">
                    <div class="head">
                        <el-input
                            style="width: 300px"
                            v-model="searchKey"
                            placeholder="关键字搜索：农资类型、农资名称"
                        />
                        <el-button type="primary" style="margin-left: 10px" @click="getData">查询</el-button>
                        <el-select
                            @change="getData"
                            v-model="currentStatus"
                            placeholder="全部状态"
                            style="margin-left: 20px"
                        >
                            <el-option v-for="item in status" :key="item.v" :label="item.k" :value="item.v"></el-option>
                        </el-select>
                    </div>
                    <div class="table">
                        <el-table size="large" :data="list" style="width: 100%">
                            <el-table-column prop="orderUuid" label="工单号" width="150" />
                            <el-table-column label="农资名称">
                                <template #default="scope">
                                    <p v-for="item in scope.row.totalCount" :key="item.id">{{ item.title }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="农资类型">
                                <template #default="scope">
                                    <p v-for="item in scope.row.totalCount" :key="item.id">{{ item.variety }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column label="数量">
                                <template #default="scope">
                                    <p v-for="item in scope.row.totalCount" :key="item.id">
                                        {{ item.agriculturalCos }}{{ item.unitweight }}
                                    </p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createTime" label="申请日期" />
                            <el-table-column label="状态">
                                <template #default="scope">
                                    <span :style="{ color: scope.row.color }">{{ scope.row.orderStatusString }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="userName" label="当前审批人" />
                        </el-table>
                    </div>
                    <div class="pages" v-if="list.length > 0">
                        <span class="total">共 {{ total }} 条</span>
                        <el-pagination
                            @current-change="getData"
                            v-model:currentPage="currentPage"
                            v-model:page-size="pageSize"
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
            loading: false,
            searchKey: '',
            status: [
                { k: '全部状态', v: -1 },
                { k: '待审核', v: 0 },
                { k: '待出库', v: 1 },
                { k: '不通过', v: 2 },
                { k: '已出库', v: 3 },
            ],
            currentStatus: -1,
            list: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/workOrder/my-workOrder-list', {
                "pageNum": this.currentPage,
                "pageSize": 10,
                "param": {
                    "keyWord": this.searchKey,
                    "orderStatus": this.currentStatus
                }
            }).then(r => {
                this.loading = false;
                if(r.code == 200){
                    this.list = r.data.map(item => {
                        switch (item.orderStatus) {
                            case 0:
                                item.orderStatusString = '待审核';
                                item.color = '#1890FF';
                                break;
                            case 1:
                                item.orderStatusString = '待出库';
                                item.color = '#0DD71C';
                                break;
                            case 2:
                                item.orderStatusString = '不通过';
                                item.color = '#FF4949';
                                break;
                            case 3:
                                item.orderStatusString = '已出库';
                                item.color = '#A8A8A8';
                                break;
                        }
                        return item;
                    })
                    this.total = r.total;
                }else{
                    this.$message.error(r.message);
                }
            })
        },
        // 返回列表
        back() {
            this.$router.push("/erp/my/product");
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
    padding: 0 20px;

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
