<template>
    <div class="purchase inner">
        <div class="box">
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
</template>

<script lang="js">
export default {
    name: "purchase",
    data() {
        return {
            headTab: [
                {
                    title: '订单列表',
                    path: '/erp/purchase/order'
                },
                {
                    title: '平台农资',
                    path: '/erp/purchase/shop'
                },
            ],
            activeTabIndex: 0
        }
    },
    mounted (){
        // 默认进入订单列表
        if(this.$route.name == 'erpPurchase'){
            this.$router.push(this.headTab[0].path);
        }
    },
    methods: {
        // 切换tab
        tabClick (index){
            this.activeTabIndex = index;
            this.$router.push(this.headTab[index].path);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
