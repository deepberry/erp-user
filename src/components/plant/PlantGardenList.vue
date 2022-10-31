<template>
    <div class="PlantGardenList">
        <el-drawer v-model="showDrawer" title="I am the title" direction="rtl" :before-close="onClose"> </el-drawer>
    </div>
</template>

<script>
export default {
    name: "PlantGardenList",
    data() {
        return {
            showDrawer: true,
        };
    },
    mounted() {},
    methods: {
        onClose() {},
    },
};
</script>

<style lang="less" scoped>
.PlantGardenList {
}
</style>
