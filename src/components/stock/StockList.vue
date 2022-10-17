<template>
    <div class="stockList" v-loading="loading">
        <div class="ctrl">
            <div class="search">
                <el-input
                    v-model="searchKey"
                    class="searchInput"
                    placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                ></el-input>
                <el-button type="primary" class="searchSubmit">查询</el-button>
                <el-select
                    v-model="defaultClassify"
                    class="searchSelect"
                    @change="selectByClassify"
                    placeholder="全部分类"
                >
                    <el-option label="全部分类" value="0" />
                    <el-option label="分类一" value="1" />
                    <el-option label="分类二" value="2" />
                    <el-option label="分类三" value="3" />
                </el-select>
                <el-select v-model="defaultStatus" class="searchSelect" @change="selectByStatus" placeholder="全部显示">
                    <el-option label="全部显示" value="-1" />
                    <el-option label="无库存" value="1" />
                    <el-option label="有库存" value="2" />
                </el-select>
            </div>
            <div class="buttons">
                <el-button type="primary" @click="showBatch = true">批量入库</el-button>
                <el-button type="success" @click="showReg = true">登记新农资</el-button>
                <el-button type="warning" @click="gotoRecord">出入库记录</el-button>
            </div>
        </div>
        <div class="tableWrap">
            <div class="table">
                <el-table :data="list" style="width: 100%" size="large" max-height="600px">
                    <el-table-column prop="title" label="农资名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="company" label="生产厂家" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatus" label="规格">
                        <template #default="scope">
                            <!-- <span :style="{ color: scope.row.orderStatusColor }">{{ scope.row.orderStatus }}</span> -->
                            <span>{{ scope.row.unit }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" label="库存"></el-table-column>
                    <el-table-column label="操作" width="260">
                        <template #default="scope">
                            <el-button link type="primary" @click="viewDetail(scope.row.id)">明细</el-button>
                            <el-button link type="primary" @click="stock(true, scope.row.id)">入库</el-button>
                            <el-button link type="primary" @click="stock(false, scope.row.id)">出库</el-button>
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
        <StockDetail v-if="showDetailBox" @closeDetailBox="closeDetailBox"></StockDetail>
        <StockReg v-if="showReg" @closeReg="closeReg"></StockReg>
        <StockPutBatch v-if="showBatch" @closeBatch="closeBatch"> </StockPutBatch>
    </div>
</template>

<script lang="js">
import StockDetail from '@/components/stock/StockDetail.vue';
import StockReg from '@/components/stock/StockReg.vue';
import StockPutBatch from '@/components/stock/StockPutBatch.vue';
export default {
    name: 'purchaseOrder',
    components: {
        StockDetail, StockReg, StockPutBatch
    },
    data (){
        return {
            loading: false,
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            list: [], // 数据列表
            defaultClassify: "0",
            defaultStatus: "-1",
            currentPage: 1,
            pageSize: 10,
            total: 2,
            showDetailBox: false, // 是否显示库存明细弹窗
            showReg: false, // 是否显示登记新农资的弹窗
            showBatch: false, // 是否显示批量入库的弹窗
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
                this.ajax.post('/api/v1/adam/farmLand/agriculturalSearch-list', {
                    "pageNum": 0,
                    "pageSize": 0,
                    "param": {
                        "categoryId": 0,
                        "inventory": this.defaultStatus,
                        "keyWord": ""
                    }
                }).then(r => {
                    console.log(r)
                    // this.list = r.data;
                    // mock 数据
                    this.list = [
                        {
                            title: '哈哈哈复合肥',
                            type: '化肥',
                            company: '上海xxxxx化肥厂',
                            unit: '50kg/袋',
                            num: 100
                        },
                        {
                            title: '哈哈哈复合肥',
                            type: '化肥',
                            company: '上海xxxxx化肥厂',
                            unit: '50kg/袋',
                            num: 100
                        },
                        {
                            title: '哈哈哈复合肥',
                            type: '化肥',
                            company: '上海xxxxx化肥厂',
                            unit: '50kg/袋',
                            num: 100
                        },
                    ]
                    this.currentPage = r.pageNum;
                    this.pageSize = r.pageSize;
                    this.total = r.total;
                    resolve();
                })
            })
        },
        // 查询
        search (){
            this.loading = true;
            this.getData(this.searchKey).then(() => this.loading = false);
        },
        // 按库存状态筛选
        selectByStatus (data){
            this.defaultStatus = data;
            this.loading = true;
            this.getData().then(() => this.loading = false);
        },
        // 按分类筛选
        selectByClassify (data){
            this.defaultClassify = data;
            this.loading = true;
            this.getData().then(() => this.loading = false);
        },
        // 查看详情
        viewDetail (id){
            this.showDetailBox = true;
            this.currentDetailId = id;
        },
        // 出入库
        stock (put, id){
            this.$router.push(`/erp/stock/${put ? 'put' : 'out'}`);
        },
        // 关闭详情
        closeDetailBox (){
            let timer = setTimeout(() => {
                this.showDetailBox = false;
                this.currentDetailId = '';
                clearTimeout(timer);
            }, 500);
        },
        // 关闭登记新农资的弹窗
        closeReg (){
            let timer = setTimeout(() => {
                this.showReg = false;
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
        },
        // 关闭批量入库
        closeBatch (){
            let timer = setTimeout(() => {
                this.showBatch = false;
                clearTimeout(timer);
            }, 500);
        },
        // gotoRecord
        gotoRecord (){
            this.$router.push('/erp/stock/record');
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
