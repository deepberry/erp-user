<template>
    <div class="stock inner">
        <div class="box">
            <div class="head">
                <div class="headBox">
                    <div>
                        <span
                            @click="tabClick(index)"
                            :class="activeTabIndex == index ? 'active' : ''"
                            v-for="(item, index) in headTab"
                            :key="item.title"
                            >{{ item.title }}</span
                        >
                    </div>
                    <el-button type="primary">新增作物</el-button>
                </div>
                <router-view></router-view>
            </div>
            <div class="btn">
                <i class="erp erpanniu_jiantouxiangzuo_o"></i>
                <p>园区列表</p>
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
                    title: "张三园区",
                    path: "/erp/plant/list",
                },
            ],
            activeTabIndex: 0,
        };
    },
    mounted() {
        // 默认进入订单列表
        if (this.$route.name == "erpPlant") {
            this.$router.push(this.headTab[0].path);
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
.headBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn {
    width: 94px;
    height: 50px;
    padding: 0 20px;
    position: absolute;
    top: 10px;
    right: 0;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
    border-radius: 100px 0px 0px 100px;
    color: #538dff;
    i {
        display: inline-block;
        font-size: 18px;
    }
}
</style>
