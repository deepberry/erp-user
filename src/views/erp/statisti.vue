<template>
    <div class="purchase inner">
        <div class="box">
            <div class="head">
                <span class="active">产量统计</span>
                <span>出入库统计</span>
                <span>工时统计</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "statisti",
    data() {
        return {
            searchKey: "", // 搜索关键词
            searchLoading: false, // 搜索中状态,
            list: [], // 数据列表
            currentPage: 1,
            pageSize: 200,
        };
    },
    mounted() {},
    methods: {},
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
</style>
