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
        </div>
    </div>
</template>

<script>
export default {
    name: "stock",
    data() {
        return {
            headTab: [],
            activeTabIndex: 0,
        };
    },
    mounted() {
        if (this.$store.state.power.outputStatistics) {
            this.headTab.push({
                title: "产量统计",
                path: "/erp/statisti/product",
            });
        }
        if (this.$store.state.power.materialsStatistics) {
            this.headTab.push({
                title: "出入库统计",
                path: "/erp/statisti/stock",
            });
        }
        if (this.$store.state.power.workingHoursStatistics) {
            this.headTab.push({
                title: "工时统计",
                path: "/erp/statisti/work",
            });
        }
        // 默认进入列表
        this.$router.push(this.headTab[0].path);
    },
    methods: {
        // 去采购
        gotoPurchase() {
            this.$message.success("跳转到采购链接。。。");
        },
        tabClick(index) {
            this.activeTabIndex = index;
            this.$router.push(this.headTab[index].path);
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
