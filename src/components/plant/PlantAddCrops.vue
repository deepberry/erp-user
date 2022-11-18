<template>
    <el-dialog
        v-model="showAddBox"
        :title="isEdit ? '编辑作物' : '新增作物'"
        width="600px"
        :before-close="onClose"
        append-to-body
    >
        <div class="plantAdd" v-loading="loading">
            <div class="item">
                <p class="itemLabel"><span>*</span>种植种类：</p>
                <el-input v-model="form.categoryTitle" placeholder="如：蓝莓" />
            </div>
            <div class="item">
                <p class="itemLabel">种植品种：</p>
                <el-input v-model="form.varietyTitle" placeholder="品种名称" />
            </div>
            <div class="item">
                <p class="itemLabel">种植样图：</p>
                <div class="upload">
                    <img v-if="form.image" :src="form.image" alt="" />
                    <i class="erp erpguanbi" @click="form.image = ''" v-if="form.image"></i>
                    <div class="uploadBox" v-if="!form.image">
                        <input v-if="!form.uploading" @change="uploadFile" ref="file" type="file" />
                        <p v-if="!form.uploading"><i class="erp erpshangchuan"></i></p>
                        <p v-if="!form.uploading">点击上传图片</p>
                        <el-progress v-if="form.uploading" :width="90" type="circle" :percentage="form.percentage" />
                    </div>
                </div>
            </div>
            <div class="item">
                <p class="itemLabel"><span>*</span>棚区：</p>
                <el-input v-model="form.address" placeholder="如：棚区、地块、村组" />
            </div>
            <div class="item">
                <p class="itemLabel">移植方式：</p>
                <div class="userList">
                    <el-select style="width: 475px" v-model="form.growthId" placeholder="请选择移植方式">
                        <el-option
                            v-for="item in plantType"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <p class="itemLabel"><span>*</span>移植时间：</p>
                <el-date-picker
                    style="width: 565px"
                    v-model="form.plantTime"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="请选择时间"
                />
            </div>
            <div class="item">
                <p class="itemLabel"><span>*</span>种植面积：</p>
                <el-input v-model="form.area" placeholder="请输入种植面积">
                    <template #append>亩</template>
                </el-input>
            </div>
            <div class="item">
                <p class="itemLabel">关联设备：</p>
                <div class="userList">
                    <el-select
                        style="width: 475px"
                        v-model="form.smartDeviceBoList"
                        multiple
                        placeholder="请选择关联设备"
                    >
                        <el-option
                            v-for="item in form.smartDeviceBoList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id"
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
                uploading: false,
                percentage: 0,
                varietyTitle: '',
                growthId: '', // 当前选中的移植方式
                smartDeviceBoList: []
            },
            plantType: [], // 移植方式列表
            deviceList: [], // 关联设备列表
            submitting: false,
        };
    },
    mounted() {
        let t = this;
        let ajax = async function (){
            t.loading = true;
            await t.getData();
            await t.getPlantType();
            await t.getDevice();
            t.loading = false;
        }
        let ajax2 = async function (){
            t.loading = true;
            await t.getPlantType();
            await t.getDevice();
            t.loading = false;
        }
        if(t.isEdit) ajax(); else ajax2();
    },
    methods: {
        // 获取数据
        getData (){
            return new Promise((a ,b) => {
                this.ajax.post("/api/v1/adam/plants/getPlants", {
                    id: this.id
                }).then((r) => {
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
            this.$emit("onCloseAdd", params);
            this.showAddBox = false;
        },
        // 获取移植方式列表
        getPlantType (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/garden/getGrowGrowth').then(r => {
                    this.plantType = r.data;
                    this.form.growthId = r.data[0].id;
                    a();
                })
            })
        },
        // 获取关联设备列表
        getDevice (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/garden/getSmartDevice', {
                    "dashboardId": 0,
                    "id": 0,
                    "plantsId": 0,
                    "smartDeviceId": 0,
                    "title": ""
                }).then(r => {
                    this.deviceList = r.data;
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
                    this.form.image = r.data.imageUrl;
                    this.form.uploading = false;
                    this.form.percentage = 0;
                });
        },
        submit() {
            if (!this.form.categoryTitle) {
                this.$message.warning("请输入种类名称");
                return;
            }
            if (!this.form.plantTime) {
                this.$message.warning("请输入棚区");
                return;
            }
            if (!this.form.address) {
                this.$message.warning("请选择移植时间");
                return;
            }
            if (!this.form.area) {
                this.$message.warning("请输入种植面积");
                return;
            }
            this.submitting = true;
            let id = this.isEdit ? this.id : 0;
            let plantTime = this.form.plantTime.length > 12 ? this.form.plantTime : this.form.plantTime + ' 08:00:00';
            let gardenId = this.isEdit ? this.$route.query.gardenId : this.$route.query.id;
            let data = {
                "id": id,
                "categoryTitle": this.form.categoryTitle,
                "varietyTitle": this.form.varietyTitle,
                "plantTime": plantTime,
                "gardenId": gardenId,
                "growthId": this.form.growthId,
                "area": parseInt(this.form.area),
                "address": this.form.address,
                "smartDevice": 0,
                "smartDeviceBoList": [],
                "image": this.form.image,
            }
            this.ajax.post("/api/v1/adam/plants/editPlants", data)
            .then((r) => {
                this.submitting = false;
                this.$message.success("提交成功");
                this.onClose(1);
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
