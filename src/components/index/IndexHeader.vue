<template>
    <div class="IndexHeader">
        <div class="logo">
            <img src="../../assets/img/img-logo.png" alt="" />
        </div>
        <div class="userInfo">
            <p class="un">
                <a>{{ user.name }} 你好，{{ user.organization.name }}</a>
            </p>
            <!-- <el-dropdown size="large" trigger="click">
                <p class="group">
                    你好，{{ user.organization.name }}
                    <i class="erp erp31xiala"></i>
                </p>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="(item, index) in user.orgzs" :key="index">{{
                            item.name
                        }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown> -->
            <!-- <p class="logout" @click="logout">退出</p> -->
        </div>
    </div>
</template>

<script>
export default {
    name: "IndexHeader",
    data: function () {
        return {
            user: {
                organization: {},
                orgzs: [],
            },
        };
    },
    mounted() {
        // 获取个人信息
        this.ajax.post("/api/v1/adam/member/user-info").then((r) => {
            if (r.data.orgzs.length == 0) {
                r.data.orgzs = [
                    {
                        name: "苏州xxx化肥厂",
                    },
                ];
            }
            this.user = r.data;
            localStorage.setItem("erp_user", JSON.stringify(r.data));
        });
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
        .un {
            margin-right: 5px;
            position: relative;
            top: -1px;
        }
        p.group {
            cursor: pointer;
        }
        a {
            color: #538dff;
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
