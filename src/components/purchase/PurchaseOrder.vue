<template>
    <div class="purchaseOrder" v-loading="loading">
        <div class="ctrl">
            <div class="status">
                <el-button
                    @click="getData"
                    v-for="item in status"
                    :key="item.value"
                    class="statusItem"
                    :type="currentStatus == item.value ? 'primary' : ''"
                    link
                    >{{ item.title }}</el-button
                >
            </div>
            <div class="search">
                <el-input
                    v-model="searchKey"
                    class="searchInput"
                    placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                ></el-input>
                <el-button type="primary" class="searchSubmit" @click="getData">查询</el-button>
                <el-button type="primary" class="searchSubmit" @click="gotoPurchase">去采购</el-button>
                <el-button type="primary" class="searchCreateNewTask" plain @click="showCar"
                    ><i class="erp erpgouwuche"></i> 购物车</el-button
                >
            </div>
        </div>
        <div class="tableWrap">
            <div class="table">
                <el-table size="large" :data="list" style="width: 100%" max-height="600px">
                    <el-table-column
                        prop="orderUuid"
                        label="订单号"
                        show-overflow-tooltip
                        width="400"
                    ></el-table-column>
                    <el-table-column label="农资名称" show-overflow-tooltip>
                        <template #default="scope">
                            <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                >{{ item.title }} <br
                            /></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="农资类型">
                        <template #default="scope">
                            <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                >{{ item.title }} <br
                            /></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量">
                        <template #default="scope">
                            <span v-for="(item, index) in scope.row.totalCount" :key="index"
                                >{{ item.agriculturalCos }}{{ item.unitweight }} <br
                            /></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderStatus" label="状态">
                        <template #default="scope">
                            <span :style="{ color: scope.row.orderStatusColor }">{{ scope.row.orderStatus }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button link type="primary" @click="viewDetail(scope.row.id)">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
        </div>
        <PurchaseOrderDetail
            v-if="showDetailBox"
            :id="currentDetailId"
            @closeDetailBox="closeDetailBox"
        ></PurchaseOrderDetail>
        <PurchaseCar v-if="showCarBox" @closeCarBox="closeCarBox"></PurchaseCar>
    </div>
</template>

<script lang="js">
import PurchaseOrderDetail from '@/components/purchase/PurchaseOrderDetail.vue';
import PurchaseCar from '@/components/purchase/PurchaseCar.vue';
export default {
    name: 'purchaseOrder',
    components: {
        PurchaseOrderDetail, PurchaseCar
    },
    data (){
        return {
            loading: false,
            searchKey: "", // 搜索关键词
            status: [ // 状态列表
                {
                    title: '全部',
                    value: '-1'
                },
                {
                    title: '已提交',
                    value: '0'
                },
                {
                    title: '已完成',
                    value: '1'
                },
                {
                    title: '已关闭',
                    value: '2'
                },
            ],
            currentStatus: '-1', // 当前选定的状态
            list: [], // 数据列表
            currentPage: 1,
            pageSize: 10,
            total: 0,
            showDetailBox: false,
            currentDetailId: '',
            showCarBox: false,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据列表
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/agricultural/order-list', {
                "pageNum": this.currentPage,
                "pageSize": 10,
                "param": {
                    "keyWord": this.searchKey,
                    "orderStatus": this.currentStatus
                }
            }).then(r => {
                this.list = r.data.map(item => {
                    let status = '';
                    let color = '';
                    switch (item.orderStatus) {
                        case 0: status = '已提交'; color = '#1890FF'; break;
                        case 1: status = '已完成'; color = '#0DD71C'; break;
                        case 2: status = '已关闭'; color = '#A8A8A8'; break;
                    }
                    item.orderStatus = status;
                    item.orderStatusColor = color;
                    return item;
                })
                this.total = r.total;
                this.loading = false;
            })
        },
        // 去采购
        gotoPurchase() {
            this.$message.success("跳转到采购链接。。。");
        },
        // 查看详情
        viewDetail (id){
            this.showDetailBox = true;
            this.currentDetailId = id;
        },
        // 关闭详情
        closeDetailBox (){
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                this.currentDetailId = '';
                clearTimeout(timer);
            }, 500);
        },
        // 打开购物车
        showCar (id){
            this.showCarBox = true;
        },
        // 关闭购物车
        closeCarBox (){
            let timer = setTimeout(() => {
                this.showCarBox = false;
                clearTimeout(timer);
            }, 500);
        }
    }
}
</script>

<style lang="less" scoped>
.ctrl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    .status {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        left: -20px;
        .statusItem {
            margin: 0 20px;
        }
    }
    .search {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .searchInput {
            width: 360px;
        }
        .searchSubmit {
            margin-left: 10px;
        }
        .searchCreateNewTask {
            margin-left: 30px;
            i {
                font-size: 14px;
                margin-right: 5px;
            }
        }
        .searchSelect {
            margin-left: 20px;
            width: 120px;
        }
    }
}
.tableWrap {
    width: calc(100% - 40px);
    padding: 0 20px;
    .table {
        width: 100%;
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
