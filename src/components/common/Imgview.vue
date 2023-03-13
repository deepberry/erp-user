<template>
    <div class="view" v-show="show">
        <img :src="url" alt="" v-show="mediaType == 'img'" />
        <video controls autoplay :src="url" alt="" v-show="mediaType == 'video'" />
        <div class="viewInfo">
            <span>{{ gardenTitle }} - {{ address }}</span>
            <span>上传时间：{{ timer.time("y-m-d h:i:s", time) }}</span>
        </div>
        <i class="erp erpguanbi" @click="close"></i>
        <i class="erp erpxiangyou1 left" @click="pre"></i>
        <i class="erp erpxiangyou1 right" @click="next"></i>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, reactive, watch } from "vue";
import timer from "@/utils/timer";

const emits = defineEmits(["close"]);
const getProps = defineProps({
    list: Array,
    index: Number,
});
console.log(getProps);
const list = getProps.list.filter((item) => {
    return item.url;
});
let currentIndex = ref(getProps.index);
let mediaType = ref(list[currentIndex.value].mediaType);
let url = ref(list[currentIndex.value].url);
let gardenTitle = ref(list[currentIndex.value].gardenTitle);
let address = ref(list[currentIndex.value].address);
let time = ref(list[currentIndex.value].time);
let show = ref(true);

watch(currentIndex, (newValue, oldValue) => {
    if (newValue < 0) {
        currentIndex.value = list.length - 1;
    }
    if (newValue >= list.length) {
        currentIndex.value = 0;
    }
    console.log(currentIndex.value);
    url.value = list[currentIndex.value].url;
    gardenTitle.value = list[currentIndex.value].gardenTitle;
    address.value = list[currentIndex.value].address;
    time.value = list[currentIndex.value].time;
    mediaType.value = list[currentIndex.value].mediaType;
    console.log(url);
});

// 切换图片
const pre = () => {
    currentIndex.value--;
};
const next = () => {
    currentIndex.value++;
};

// 关闭
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

    video,
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
    .erpxiangyou1 {
        font-size: 50px;
        color: #ffffff;
        position: absolute;
        top: 400px;
        cursor: pointer;
    }
    .erpxiangyou1.left {
        left: 50px;
        transform: rotate(180deg);
    }
    .erpxiangyou1.right {
        right: 50px;
    }
}
</style>
