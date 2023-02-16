<template>
    <div class="view" v-show="show">
        <img :src="img.url" alt="" />
        <div class="viewInfo">
            <span>{{ img.gardenTitle }} - {{ img.address }}</span>
            <span>上传时间：{{ timer.time("y-m-d h:i:s", img.time) }}</span>
        </div>
        <i class="erp erpguanbi" @click="close"></i>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import timer from "@/utils/timer";

const emits = defineEmits(["close"]);
const getProps = defineProps({
    img: Object,
});
let show = ref(true);

const close = () => {
    show.value = false;
    emits("close");
};
</script>

<style lang="less" scoped>
.view {
    position: fixed;
    top: 70px;
    left: 220px;
    width: calc(100% - 220px);
    height: calc(100% - 70px);
    background: rgba(0, 0, 0, 0.8);
    z-index: 999999999999;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 1500px;
        max-height: 760px;
    }

    .viewInfo {
        width: 100%;
        position: absolute;
        bottom: 20px;
        left: 0;
        text-align: center;
        color: #ffffff;
        span {
            display: inline-block;
            margin: 0 20px;
        }
    }

    .erpguanbi {
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 20px;
        color: #ffffff;
        font-size: 24px;
        cursor: pointer;
    }
}
</style>
