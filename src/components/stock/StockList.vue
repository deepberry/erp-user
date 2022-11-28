<template>
    <div class="stockList" v-loading="loading">
        <div class="ctrl">
            <div class="search">
                <el-input
                    v-model="searchKey"
                    class="searchInput"
                    placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                ></el-input>
                <el-button type="primary" class="searchSubmit" @click="getData">查询</el-button>
                <el-select
                    v-model="defaultClassify"
                    class="searchSelect"
                    @change="selectByClassify"
                    placeholder="全部分类"
                >
                    <el-option label="全部分类" value="0" />
                    <el-option
                        v-for="(item, classifyIndex) in classifyList"
                        :key="classifyIndex"
                        :label="item.title"
                        :value="item.id"
                    />
                </el-select>
                <el-select v-model="defaultStatus" class="searchSelect" @change="selectByStatus" placeholder="全部显示">
                    <el-option label="全部显示" value="-1" />
                    <el-option label="无库存" value="1" />
                    <el-option label="有库存" value="2" />
                </el-select>
            </div>
            <div class="buttons">
                <el-button type="primary" @click="showBatch = true" v-if="$store.state.power.batchMaterialsIntoBtn"
                    >批量入库</el-button
                >
                <el-button type="success" @click="showReg = true" v-if="$store.state.power.addMaterialsInfoBtn"
                    >登记新农资</el-button
                >
                <el-button type="warning" @click="gotoRecord" v-if="$store.state.power.stockRecordBtn"
                    >出入库记录</el-button
                >
            </div>
        </div>
        <div class="tableWrap">
            <div class="table">
                <el-table size="large" :data="list" style="width: 100%" max-height="600px">
                    <el-table-column
                        prop="agriculturalBo.title"
                        label="农资名称"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column prop="agriculturalBo.agriculturalCategory" label="类型"></el-table-column>
                    <el-table-column
                        prop="agriculturalBo.manufacturers"
                        label="生产厂家"
                        show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column prop="orderStatus" label="规格">
                        <template #default="scope">
                            {{ scope.row.agriculturalBo.agriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}/{{
                                scope.row.agriculturalBo.unitmeasurement
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column label="库存">
                        <template #default="scope">
                            {{ scope.row.agriculturalUnit }}{{ scope.row.agriculturalBo.unitmeasurement }}（共{{
                                scope.row.agriculturalCount
                            }}{{ scope.row.agriculturalBo.unitweight }}）
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template #default="scope">
                            <el-button
                                link
                                type="primary"
                                @click="viewDetail(scope.row.id)"
                                v-if="$store.state.power.materialsStockDetail"
                                >明细</el-button
                            >
                            <el-button
                                link
                                type="primary"
                                @click="stock(true, scope.row.id)"
                                v-if="$store.state.power.materialsInto"
                                >入库</el-button
                            >
                            <el-button
                                link
                                type="primary"
                                @click="stock(false, scope.row.id)"
                                v-if="$store.state.power.materialsOut"
                                >出库</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pages" v-if="list.length > 0">
                    <span class="total">共 {{ total }} 条</span>
                    <el-pagination
                        v-model:currentPage="currentPage"
                        v-model:page-size="pageSize"
                        background
                        @current-change="getData"
                        layout="prev, pager, next, jumper"
                        :total="total"
                    />
                </div>
            </div>
        </div>
        <StockDetail v-if="showDetailBox" :id="currentDetailId" @closeDetailBox="closeDetailBox"></StockDetail>
        <StockReg v-if="showReg" needSubmit @onSave="onRegSave" @closeReg="closeReg"></StockReg>
        <StockPutBatch v-if="showBatch" @load="getData" @closeBathBox="closeBathBox"> </StockPutBatch>
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
            classifyList: [], // 分类列表
            defaultClassify: "0",
            defaultStatus: "-1",
            currentPage: 1,
            pageSize: 10,
            total: 2,
            currentDetailId: '', // 查看详情的ID
            showDetailBox: false, // 是否显示库存明细弹窗
            showReg: false, // 是否显示登记新农资的弹窗
            showBatch: false, // 是否显示批量入库的弹窗
        }
    },
    mounted() {
        // 获取详情数据
        let t = this;
        const ajax = async function (){
            await t.getData();
            await t.getClassify();
        }
        ajax();
    },
    methods: {
        // 获取数据列表
        getData (){
            return new Promise ((a,b) => {
                this.loading = true;
                this.ajax.post('/api/v1/adam/farmLand/agriculturalSearch-list', {
                    "pageNum": this.currentPage,
                    "pageSize": this.pageSize,
                    "param": {
                        "categoryId": this.defaultClassify,
                        "inventory": this.defaultStatus,
                        "keyWord": this.searchKey
                    }
                }).then(r => {
                    this.list = r.data.map(item => {
                        item.agriculturalBo = item.agriculturalBo || {};
                        return item;
                    })
                    this.currentPage = r.pageNum;
                    this.pageSize = r.pageSize;
                    this.total = r.total;
                    this.loading = false;
                    a();
                })
            })
        },
        // 获取分类列表
        getClassify (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farmLand/getAgriculturalCategory').then(r => {
                    this.classifyList = r.data;
                    a();
                })
            })
        },
        // 按库存状态筛选
        selectByStatus (data){
            this.defaultStatus = data;
            this.getData();
        },
        // 按分类筛选
        selectByClassify (data){
            this.defaultClassify = data;
            this.getData();
        },
        // 查看详情
        viewDetail (id){
            this.showDetailBox = true;
            this.currentDetailId = id;
        },
        // 出入库
        stock (put, id){
            this.$router.push({
                path: `/erp/stock/${put ? 'put' : 'out'}`,
                query: {
                    id
                }
            });
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
        // 保存农资触发
        onRegSave (){
            this.getData();
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
        closeBathBox (){
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
