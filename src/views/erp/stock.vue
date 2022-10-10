<template>
    <div class="stock inner">
        <div class="box">
            <div class="head">
                <span>农资库存</span>
            </div>
            <div class="ctrl">
                <div class="search">
                    <el-input
                        v-model="searchKey"
                        class="searchInput"
                        placeholder="关键词搜索：农资类型、农资名称、厂家名称"
                    ></el-input>
                    <el-button type="primary" class="searchSubmit" :loading="searchLoading">查询</el-button>
                    <el-select v-model="defaultClassify" class="searchSelect" placeholder="全部分类">
                        <el-option label="全部分类" value="0" />
                        <el-option label="分类一" value="1" />
                        <el-option label="分类二" value="2" />
                        <el-option label="分类三" value="3" />
                    </el-select>
                    <el-select v-model="defaultStatus" class="searchSelect" placeholder="全部显示">
                        <el-option label="全部显示" value="0" />
                        <el-option label="分类一" value="1" />
                        <el-option label="分类二" value="2" />
                        <el-option label="分类三" value="3" />
                    </el-select>
                </div>
                <div class="buttons">
                    <el-button type="primary">批量入库</el-button>
                    <el-button type="success">登记新农资</el-button>
                    <el-button type="warning">出入库记录</el-button>
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
                        <div class="item" v-for="item in 20" :key="item">
                            <p>ID124555454</p>
                            <p>张三棚区-蓝莓-B区</p>
                            <p>张三</p>
                            <p>任务内容任务内容任务内容任务内容任务内容任务内容任务内容任务内容</p>
                            <p>待执行</p>
                            <p>
                                <el-button type="primary" link>查看详情</el-button>
                            </p>
                        </div>
                    </div>
                    <div class="pages">
                        <span class="total">第 1 ~ 20 条 / 共 400 条</span>
                        <el-pagination
                            v-model:currentPage="currentPage4"
                            v-model:page-size="pageSize4"
                            :page-sizes="[100, 200, 300, 400]"
                            background
                            layout="prev, pager, next, jumper, sizes"
                            :total="400"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "stock",
    data() {
        return {
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            list: [], // 数据列表
            defaultClassify: "0",
            defaultStatus: "0",
        };
    },
    mounted() {},
    methods: {
        // 去采购
        gotoPurchase() {
            this.$message.success("跳转到采购链接。。。");
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.inner .box .ctrl .search .searchInput {
    width: 320px;
}
</style>
