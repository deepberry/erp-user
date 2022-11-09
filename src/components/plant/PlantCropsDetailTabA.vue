<template>
    <div class="box">
        <div class="status">
            <span class="active">全部</span>
            <span>待执行</span>
            <span>待检查</span>
            <span>合格</span>
            <span>不合格</span>
        </div>
        <div class="item">
            <div class="itemBox">施肥，每亩1000公斤</div>
            <div class="itemBox">截止时间：2022.11.09</div>
            <div class="itemBox h">建议：修建的更细致些</div>
            <div class="itemBox">执行人：张三</div>
            <div class="itemBox s_0">待执行</div>
        </div>
        <div class="item">
            <div class="itemBox">施肥，每亩1000公斤</div>
            <div class="itemBox">截止时间：2022.11.09</div>
            <div class="itemBox">建议：无</div>
            <div class="itemBox">执行人：张三</div>
            <div class="itemBox s_1">待检查</div>
        </div>
        <div class="item">
            <div class="itemBox">施肥，每亩1000公斤</div>
            <div class="itemBox">截止时间：2022.11.09</div>
            <div class="itemBox">建议：无</div>
            <div class="itemBox">执行人：张三</div>
            <div class="itemBox s_2">合格</div>
        </div>
        <div class="item">
            <div class="itemBox">施肥，每亩1000公斤</div>
            <div class="itemBox">截止时间：2022.11.09</div>
            <div class="itemBox">建议：无</div>
            <div class="itemBox">执行人：张三</div>
            <div class="itemBox s_3">不合格</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.box {
    padding: 0 20px;
    .status {
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
            margin: 0 10px;
            color: #8f8f8f;
            cursor: pointer;
        }
        span.active {
            color: #538dff;
        }
    }
    .item {
        width: calc(100% - 80px);
        background: #ffffff;
        box-shadow: 0px 0px 14px 0px #e5ecf2;
        border-radius: 8px;
        margin-top: 20px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemBox:nth-child(1) {
            width: 20%;
            padding: 5px;
            background: linear-gradient(to right, rgb(226, 236, 248), rgba(226, 236, 248, 0));
        }
        .itemBox:nth-child(2) {
            width: 20%;
        }
        .itemBox:nth-child(3) {
            width: 20%;
            color: #8f8f8f;
        }
        .itemBox:nth-child(5) {
            width: 100px;
        }
        .itemBox.h {
            color: #fe915d;
        }
        .itemBox.s_0 {
            color: #fe915d;
        }
        .itemBox.s_1 {
            color: #538dff;
        }
        .itemBox.s_2 {
            color: #3dc947;
        }
        .itemBox.s_3 {
            color: #f34f26;
        }
    }
}
</style>
