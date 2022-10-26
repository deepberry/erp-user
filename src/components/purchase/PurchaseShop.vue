<template>
    <div class="purchaseOrder" v-loading="loading">
        <div class="ctrl">
            <div class="search">
                <div>
                    <el-input
                        v-model="searchKey"
                        class="searchInput"
                        placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                    ></el-input>
                    <el-button type="primary" class="searchSubmit" @click="getData">查询</el-button>
                </div>
                <div>
                    <el-button @click="showCar" type="primary" class="searchCreateNewTask" plain
                        ><i class="erp erpgouwuche"></i> 购物车</el-button
                    >
                </div>
            </div>
        </div>
        <div class="tableWrap">
            <div class="table">
                <el-table size="large" :data="list" style="width: 100%" max-height="600px">
                    <el-table-column prop="title" label="农资名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="agriculturalCategory" label="农资类型"></el-table-column>
                    <el-table-column label="规格">
                        <template #default="scope">
                            {{ scope.row.agriculturalCount + scope.row.unitweight + "/" + scope.row.unitmeasurement }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="manufacturers" label="厂家" show-overflow-tooltip></el-table-column>
                    <el-table-column label="数量"></el-table-column>
                    <el-table-column label="参考单价">
                        <template #default="scope">
                            <span style="color: rgba(224, 29, 29, 1)">￥{{ scope.row.agriculturalPrice }}元</span>
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
        <PurchaseCar v-if="showCarBox" @closeCarBox="closeCarBox"></PurchaseCar>
    </div>
</template>

<script lang="js">
import PurchaseCar from '@/components/purchase/PurchaseCar.vue';
export default {
    name: 'purchaseOrder',
    components: {
        PurchaseCar
    },
    data (){
        return {
            loading: false,
            searchKey: "", // 搜索关键词
            list: [], // 数据列表
            currentPage: 0,
            pageSize: 0,
            total: 0,
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
            this.ajax.post('/api/v1/adam/agricultural/platform-list', {
                "pageNum": this.currentPage,
                "pageSize": 10,
                "param": {
                    "keyWord": this.searchKey,
                    "orderStatus": -1
                }
            }).then(r => {
                console.log(r)
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
                this.currentPage = r.pageNum;
                this.pageSize = r.pageSize;
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
            this.$router.push({
                path: '/erp/purchase/shop/detail',
                query: {
                    id
                }
            });
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
        width: 100%;
        display: flex;
        justify-content: space-between;
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
