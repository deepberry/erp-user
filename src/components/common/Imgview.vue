<template>
    <div class="view" v-show="show">
        <img :src="url" alt="" />
        <div class="viewInfo">{{ gardenTitle }} - {{ address }} 上传时间：{{ time }}</div>
        <i class="erp erpguanbi"></i>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

let show = ref(true);
let url = ref("");
let gardenTitle = ref("");
let address = ref("");
let time = ref("");
</script>

<style lang="less" scoped>
.view {
    position: fixed;
    top: 0;
    left: 220px;
    width: calc(100% - 220px);
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999999999999;
}
</style>
