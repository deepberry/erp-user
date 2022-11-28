<template>
    <!-- 
        这里和UI界面不一致，按UI实现
        <CommonPanel :app="insights" v-model:isOpen="isOpen" />
    -->

    <router-view />
</template>

<script lang="js">
export default {
    name: "App",
    mounted (){
        // 获取可见菜单列表
        this.ajax.post('/api/v1/adam/adminMenu/getUserMenusList').then(r => {
            this.$store.commit('setPower', r.data);
        })
    }
}
</script>

<style lang="less">
// 初始化样式
@import "@/assets/css/app.less";
@import "@/assets/css/global.less";

// 重置element-ui样式
@import url("@/assets/css/elementui.less");
</style>
