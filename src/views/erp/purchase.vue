<template>
    <div class="purchase inner">
        <div class="box">
            <div class="head">
                <span>订单列表</span>
                <el-button link style="font-size: 16px; margin-left: 30px" @click="gotoPurchase">去采购</el-button>
            </div>
            <div class="ctrl">
                <div class="status">
                    <el-badge class="statusItem" :value="12">
                        <el-button type="primary" link>全部</el-button>
                    </el-badge>
                    <el-badge class="statusItem" :value="0">
                        <el-button link>待执行</el-button>
                    </el-badge>
                    <el-badge class="statusItem" :value="12">
                        <el-button link>待检查</el-button>
                    </el-badge>
                    <el-badge class="statusItem" :value="12">
                        <el-button link>合格</el-button>
                    </el-badge>
                    <el-badge class="statusItem" :value="12">
                        <el-button link>不合格</el-button>
                    </el-badge>
                </div>
                <div class="search">
                    <el-input
                        v-model="searchKey"
                        class="searchInput"
                        placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                    ></el-input>
                    <el-button type="primary" class="searchSubmit" :loading="searchLoading" @click="search"
                        >查询</el-button
                    >
                    <el-button type="primary" class="searchSubmit" @click="getData">刷新</el-button>
                    <el-button type="primary" class="searchCreateNewTask"
                        ><i class="erp erpjiufuqianbaoicon06"></i> 创建任务</el-button
                    >
                </div>
            </div>
            <div class="tableWrap">
                <div class="table">
                    <div class="item tableHead">
                        <p>任务单号</p>
                        <p>所属棚区</p>
                        <p>执行人</p>
                        <p>任务内容</p>
                        <p>状态</p>
                        <p>操作</p>
                    </div>
                    <div class="list">
                        <div class="item" v-for="item in list" :key="item.id">
                            <p>{{ item.orderUuid }}</p>
                            <p>张三棚区-蓝莓-B区</p>
                            <p>张三</p>
                            <p>任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容</p>
                            <p>{{ item.orderStatus }}</p>
                            <p>
                                <el-button type="primary" link>查看详情</el-button>
                            </p>
                        </div>
                        <div class="nodata" v-if="list.length == 0">暂无数据</div>
                    </div>
                    <div class="pages" v-if="list.length > 0">
                        <span class="total"
                            >第 {{ pageSize * (currentPage - 1) + 1 }} ~ {{ pageSize * currentPage }} 条 / 共
                            {{ total }} 条</span
                        >
                        <el-pagination
                            v-model:currentPage="currentPage"
                            v-model:page-size="pageSize"
                            :page-sizes="[100, 200, 300, 400]"
                            background
                            layout="prev, pager, next, jumper, sizes"
                            :total="total"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: "purchase",
    data() {
        return {
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            loading: false, // 刷新数据中
            list: [], // 数据列表
            currentPage: 0,
            pageSize: 0,
            total: 0
        };
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
                        "orderStatus": 0
                    }
                }).then(r => {
                    this.list = r.data;
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
            if(!this.searchKey){
                this.$message.warning('请输入关键词');
                return;
            }

            this.searchLoading = true;
            this.getData(this.searchKey).then(() => this.searchLoading = false);
        },
        // 刷新数据
        reload (){
            this.loading = true;
            this.getData().then(() => this.loading = false);
        }
    },
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
