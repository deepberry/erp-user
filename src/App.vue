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

*::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
*::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(184, 184, 184, 0.5);
}
*::-webkit-scrollbar-track {
    background: rgba(226, 226, 226, 0.5);
}

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

// 重置element-ui样式
.el-badge__content.el-badge__content--danger.is-fixed {
    transform: translateY(-50%) translateX(100%) scale(0.8);
}
</style>
