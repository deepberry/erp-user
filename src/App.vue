<template>
    <div class="p-entry">
        <CommonPanel :app="insights" v-model:isOpen="isOpen" />
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            isOpen: false,
        };
    },
    computed: {},
    watch: {},
    methods: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "@/assets/css/app.less";
</style>
