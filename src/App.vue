<template>
    <!-- 
        这里和UI界面不一致，按UI实现
        <CommonPanel :app="insights" v-model:isOpen="isOpen" />
    -->

    <router-view />
</template>

<script>
export default {
    name: "App",
};
</script>

<style lang="less">
@import "@/assets/css/app.less";

// 自定义全局样式
html,
body,
#app {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    background: #f6f7f8;
    font-size: 14px;
    font-family: "微软雅黑";
}
</style>
