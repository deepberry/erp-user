<template>
    <el-dialog
        v-model="showAddBox"
        :title="isEdit ? '编辑园区' : '新增园区'"
        width="600px"
        :before-close="onClose"
        append-to-body
    >
        <div class="plantAdd" v-loading="loading">
            <div class="item">
                <p class="itemLabel"><span>*</span>园区名称：</p>
                <el-input v-model="form.title" placeholder="请输入园区名称" />
            </div>
            <div class="item">
                <p class="itemLabel"><span>*</span>园区图片：</p>
                <div class="upload">
                    <img v-if="form.img" :src="form.img" alt="" />
                    <i class="erp erpguanbi" @click="form.img = ''" v-if="form.img"></i>
                    <div class="uploadBox" v-if="!form.img">
                        <input v-if="!form.uploading" @change="uploadFile" ref="file" type="file" />
                        <p v-if="!form.uploading"><i class="erp erpshangchuan"></i></p>
                        <p v-if="!form.uploading">点击上传图片</p>
                        <el-progress v-if="form.uploading" :width="90" type="circle" :percentage="form.percentage" />
                    </div>
                </div>
            </div>
            <div class="item">
                <p class="itemLabel"><span>*</span>管理人员：</p>
                <div class="userList">
                    <el-select style="width: 475px" v-model="form.user" multiple placeholder="请选择人员">
                        <el-option
                            v-for="item in userList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.defaultCheck"
                        ></el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="btn">
            <p></p>
            <el-button type="primary" :loading="submitting" @click="submit">保存</el-button>
        </div>
    </el-dialog>
</template>

<script lang="js">
export default {
    name: "plantAdd",
    props: ['isEdit', 'id'],
    emits: ['onCloseAdd'],
    data() {
        return {
            loading: false,
            showAddBox: true,
            form: {
                title: "",
                img: "",
                uploading: false,
                percentage: 0, // 上传进度
                user: [],
            },
            userList: [],
            submitting: false,
            currentUser: {}
        };
    },
    mounted() {
        let t = this;
        let ajax = async function (){
            t.loading = true;
            await t.getData();
            await t.getUserList();
            t.loading = false;
        }
        let ajax2 = async function (){
            t.loading = true;
            await t.getUserList();
            t.loading = false;
        }
        if(t.isEdit) ajax(); else ajax2();
    },
    methods: {
        // 获取数据
        getData (){
            return new Promise((a ,b) => {
                this.ajax.post("/api/v1/adam/garden/details", {
                    id: this.id
                }).then((r) => {
                    r.data.img = r.data.detailImage;
                    r.data.user = r.data.gardenManagerBoList.map(item => Number(item.aid));
                    console.log(r.data.user)
                    this.form = r.data;
                    a();
                })
            })
        },
        // 关闭新增弹窗
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            console.log(params)
            this.$emit("onCloseAdd", params);
            this.showAddBox = false;
        },
        // 获取人员列表
        getUserList() {
            return new Promise((a ,b) => {
                this.ajax.post("/api/v1/adam/task/getOrganizationUsers").then((r) => {
                    this.currentUser = JSON.parse(localStorage.getItem('erp_user'));
                    let name = '';
                    this.userList = r.data.map(item => {
                        if(item.id == this.currentUser.id){
                            item.defaultCheck = true;
                        }
                        return item;
                    })
                    if(!this.form.user.includes(this.currentUser.id)) this.form.user.push(this.currentUser.id);
                    a();
                })
            })
        },
        // 上传图片
        uploadFile() {
            this.form.uploading = true;
            let file = this.$refs.file.files[0];
            this.ajax
                .upload(
                    "/api/v1/adam/upload",
                    {
                        file,
                    },
                    (num) => {
                        this.form.percentage = parseInt(num);
                    }
                )
                .then((r) => {
                    this.form.img = r.data.imageUrl;
                    this.form.uploading = false;
                    this.form.percentage = 0;
                });
        },
        submit() {
            if (!this.form.title) {
                this.$message.warning("请输入园区名称");
                return;
            }
            if (!this.form.img) {
                this.$message.warning("请上传园区图片");
                return;
            }
            if (this.form.user.length == 0) {
                this.$message.warning("请选择管理人员");
                return;
            }
            let user = this.form.user.map((item) => {
                this.userList.map((u) => {
                    if (item == u.id) {
                        item = {
                            aid: u.id,
                            username: u.name,
                        };
                    }
                });
                return item;
            });
            this.submitting = true;
            this.ajax
                .post("/api/v1/adam/garden/editGarden", {
                    detailImage: this.form.img,
                    gardenManagerBoList: user,
                    growPlantsBoList: [
                        {
                            address: "",
                            area: 0,
                            categoryId: 0,
                            categoryTitle: "",
                            endTime: "",
                            gardenId: 0,
                            growthId: 0,
                            id: 0,
                            image: "",
                            isEnd: 0,
                            plantTime: "",
                            smartDevice: 0,
                            smartDeviceBoList: [
                                {
                                    id: 0,
                                    plantsId: 0,
                                    smartDeviceId: 0,
                                    title: "",
                                },
                            ],
                            varietyId: 0,
                            varietyTitle: "",
                            weightAll: 0,
                        },
                    ],
                    id: this.id,
                    title: this.form.title,
                })
                .then((r) => {
                    this.submitting = false;
                    this.$message.success("提交成功");
                    this.onClose(!this.isEdit ? 'add' : {
                        title: this.form.title,
                        detailImage: this.form.img,
                        id: this.id
                    });
                });
        },
    },
};
</script>

<style lang="less" scoped>
.plantAdd {
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    position: relative;
    top: -20px;
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 0;
        .itemLabel {
            width: 100px;
            position: relative;
            top: 5px;
            span {
                color: red;
            }
        }
        .upload {
            width: 180px;
            height: 100px;
            position: relative;
            left: -10px;
            img {
                width: 180px;
                height: 100px;
                border-radius: 10px;
            }
            .erpguanbi {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 999;
                background: rgba(0, 0, 0, 0.5);
                padding: 5px;
                font-size: 12px;
                border-top-right-radius: 5px;
                color: #ffffff;
                cursor: pointer;
            }
            .uploadBox {
                width: 180px;
                height: 100px;
                border-radius: 5px;
                background: rgba(244, 248, 251, 1);
                display: flex;
                justify-content: center;
                align-content: center;
                flex-wrap: wrap;
                font-size: 12px;
                color: rgba(107, 145, 242, 1);
                cursor: pointer;
                position: relative;
                p {
                    width: 100%;
                    text-align: center;
                    padding: 5px 0;
                    i {
                        font-size: 22px;
                    }
                }
                input {
                    width: 180px;
                    height: 100px;
                    background: rgba(0, 0, 0, 0.5);
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                    opacity: 0;
                }
                .el-progress--circle {
                    position: absolute;
                    top: 5px;
                    z-index: 10;
                }
            }
        }
    }
}
.btn {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
</style>
