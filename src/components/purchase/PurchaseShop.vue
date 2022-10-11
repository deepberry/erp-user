<template>
    <div class="purchaseOrder">
        <div class="ctrl">
            <div class="status">
                <el-button
                    @click="selectClick(item.value)"
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
                <el-button type="primary" class="searchSubmit" @click="search">查询</el-button>
                <el-button type="primary" class="searchSubmit" @click="gotoPurchase">去采购</el-button>
                <el-button type="primary" class="searchCreateNewTask" plain
                    ><i class="erp erpgouwuche"></i> 购物车</el-button
                >
            </div>
        </div>
        <div class="tableWrap">
            <div class="table">
                <el-table :data="list" style="width: 100%" size="large" max-height="600px">
                    <el-table-column prop="orderUuid" label="订单号" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatus" label="农资名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatus" label="农资类型"></el-table-column>
                    <el-table-column prop="orderStatus" label="数量" width="180"></el-table-column>
                    <el-table-column prop="orderStatus" label="状态" width="180">
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
                        :page-sizes="[100, 200, 300, 400]"
                        background
                        layout="prev, pager, next, jumper"
                        :total="total"
                    />
                </div>
            </div>
        </div>

        <!-- 详情弹窗 -->
        <el-dialog
            custom-class="purchaseDetailBox"
            append-to-body
            v-model="showDetailBox"
            title="订单详情"
            width="700px"
        >
            <div v-loading="detailLoading" class="purchaseDetailBoxInner">
                <div class="item">
                    <p>订单号：ID124555454</p>
                    <p>已完成</p>
                </div>
                <div class="item">
                    <p>提交人：张三</p>
                    <p>提交时间：2022.09.24 12:45:21</p>
                </div>
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="id" label="农资名称" show-overflow-tooltip />
                    <el-table-column prop="id" label="类型" show-overflow-tooltip />
                    <el-table-column prop="id" label="规格" show-overflow-tooltip />
                    <el-table-column prop="id" label="厂家" show-overflow-tooltip />
                    <el-table-column prop="id" label="申领数量" show-overflow-tooltip />
                    <el-table-column prop="id" label="参考单价" show-overflow-tooltip />
                </el-table>
                <div class="bottom">
                    <div>合计：</div>
                    <div>
                        <p>
                            <span>化肥</span>
                            <span>5000公斤</span>
                        </p>
                        <p>
                            <span>化肥</span>
                            <span>5000公斤</span>
                        </p>
                        <p>
                            <span>总价</span>
                            <span>￥100.00元</span>
                        </p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    name: 'purchaseOrder',
    data (){
        return {
            searchKey: "", // 搜索关键词
            status: [
                {
                    title: '全部',
                    value: ''
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
            currentStatus: '', // 当前选定的状态
            list: [], // 数据列表
            currentPage: 0,
            pageSize: 0,
            total: 0,
            showDetailBox: false, // 是否显示详情弹窗
            detail: {}, // 详情数据,
            detailLoading: false, // 详情数据加载状态
        }
    },
    mounted() {
        this.loading = true;
        this.getData().then(() => this.loading = false);
    },
    methods: {
        // 获取数据列表
        getData (k){
            k = this.searchKey || '';
            return new Promise ((resolve, reject) => {
                this.ajax.post('/api/v1/adam/agricultural/order-list', {
                    "pageNum": 0,
                    "pageSize": 0,
                    "param": {
                        "keyWord": k,
                        "orderStatus": this.currentStatus
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
                    resolve();
                })
            })
        },
        // 去采购
        gotoPurchase() {
            this.$message.success("跳转到采购链接。。。");
        },
        // 查询
        search (){
            this.loading = true;
            this.getData(this.searchKey).then(() => this.loading = false);
        },
        // 按条件筛选
        selectClick (status){
            this.currentStatus = status;
            this.loading = true;
            this.getData().then(() => this.loading = false);
        },
        // 查看详情
        viewDetail (id){
            this.showDetailBox = true;
            this.detailLoading = true;
            this.ajax.post('/api/v1/adam/agricultural/orderDetail', { id }).then(r => {
                console.log(r)
                this.detailLoading = false;
            })
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
