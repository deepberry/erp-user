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
            headTab: [
                {
                    title: "我的农资",
                    path: "/erp/my/product",
                },
                {
                    title: "我的工时",
                    path: "/erp/my/work",
                },
            ],
            activeTabIndex: 0,
        };
    },
    mounted() {
        // 默认进入订单列表
        if (this.$route.name == "erpMy") {
            this.$router.push(this.headTab[0].path);
        }

        // 菜单高亮
        if (this.$route.name == "erpMy" || this.$route.name == "erpMyProduct") {
            this.activeTabIndex = 0;
        } else {
            this.activeTabIndex = 1;
        }
    },
    methods: {
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
