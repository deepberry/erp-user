<template>
    <div class="login">
        <div class="box">
            <p class="title">用户登陆</p>
            <el-form :model="form" label-width="0">
                <el-form-item>
                    <el-input placeholder="请输入用户名" type="text" v-model="userName" />
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入密码" type="password" v-model="password" />
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" class="submit" type="primary" @click="onSubmit">立即登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="js">
export default {
    name: "login",
    data (){
        return {
            userName: '18930878891',
            password: '123456',
            loading: false
        }
    },
    methods: {
        onSubmit (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/member/user-login', {
                "code": "",
                "password": this.password,
                "phoneNumber": "",
                "username": this.userName
            }).then(r => {
                localStorage.setItem('erp_token', r.data.accessToken);
                this.loading = false;
                this.$router.push('/');
            }).catch(r => {
                this.loading = false;
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
        width: 300px;
        position: relative;
        top: -100px;
        .title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 40px;
        }
        .submit {
            width: 100%;
        }
    }
}
</style>
