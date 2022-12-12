<template>
    <div class="index">
        <!-- 头部菜单 -->
        <IndexHeader></IndexHeader>

        <!-- 侧边栏菜单 -->
        <IndexMenu></IndexMenu>

        <!-- 主内容区域 -->
        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<script lang="js">
import IndexHeader from "@/components/index/IndexHeader.vue";
import IndexMenu from "@/components/index/IndexMenu.vue";
export default {
    name: "Index",
    components: {
        IndexHeader,
        IndexMenu,
    },
    mounted (){
        // 默认进入 智能设备 ied
        if(this.$route.path == '/'){
            this.$router.push('/erp/plant');
        }
    }
}
</script>

<style lang="less" scoped>
@import url("@/assets/css/global.less");
.index {
    width: 100%;
    height: 100%;
    position: relative;
    .main {
        width: calc(100% - 210px);
        height: calc(100% - 70px);
        position: absolute;
        top: 70px;
        left: 210px;
        z-index: @indexMainLayer;
    }
}
</style>
