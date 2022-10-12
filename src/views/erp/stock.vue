<template>
    <div class="stock inner">
        <div class="box">
            <div class="head">
                <div class="head">
                    <span
                        @click="tabClick(index)"
                        :class="activeTabIndex == index ? 'active' : ''"
                        v-for="(item, index) in headTab"
                        :key="item.title"
                        >{{ item.title }}</span
                    >
                </div>
                <router-view></router-view>
            </div>

            <!-- <div class="tableWrap">
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
            </div> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "stock",
    data() {
        return {
            headTab: [
                {
                    title: "农资库存",
                    path: "/erp/stock/list",
                },
            ],
            activeTabIndex: 0,
        };
    },
    mounted() {
        // 默认进入列表
        this.$router.push(this.headTab[0].path);
    },
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
