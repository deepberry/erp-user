<template>
    <div class="IndexHeader">
        <div class="logo">
            <img src="../../assets/img/img-logo.png" alt="" />
        </div>
        <div class="userInfo">
            <p>
                <a>{{ user.name }}</a>
                你好，{{ user.orgzs[0].name }}
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
            user: {
                orgzs: [
                    {
                        name: "",
                    },
                ],
            },
        };
    },
    mounted() {
        // 获取个人信息
        let user = localStorage.getItem("erp_user");
        if (user) {
            this.user = JSON.parse(user);
        } else {
            this.ajax.post("/api/v1/adam/member/user-info").then((r) => {
                this.user = r.data;
                localStorage.setItem("erp_user", JSON.stringify(r.data));
            });
        }
    },
    methods: {
        // 退出登录
        logout() {
            // 清除缓存
            sessionStorage.removeItem("erp_menu_current_index");
            sessionStorage.removeItem("erp_menu_son_index");
            localStorage.removeItem("erp_token");
            localStorage.removeItem("erp_user");

            // 跳转到登陆界面
            this.$router.push("/login");
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
