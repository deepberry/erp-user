<template>
    <div class="IndexHeader">
        <div class="logo">
            <img src="../../assets/img/img-logo.png" alt="" />
        </div>
        <div class="userInfo">
            <p>
                <a>{{ userName }}</a>
                你好，{{ companyName }}
                <i class="erp erp31xiala"></i>
            </p>
            <p class="logout" @click="logout">退出</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "IndexHeader",
    data: function () {
        return {
            userName: "张三",
            companyName: "湖南xxx农业科技",
        };
    },
    methods: {
        logout() {
            this.$message.warning("已退出");
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/global.less");
.IndexHeader {
    width: 100%;
    height: 70px;
    background: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: @indexHeaderLayer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
        width: 210px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 152px;
        }
    }
    .userInfo {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 50px;
        font-size: 14px;
        a {
            color: #538dff;
            cursor: pointer;
        }
        i {
            font-size: 14px;
            margin-left: 5px;
        }
        .logout {
            margin-left: 30px;
            cursor: pointer;
        }
    }
}
</style>
